const { promisify, isNull } = require("util");
const redisClient = require("../config/redisConfiguration");
const Boom = require("@hapi/boom");
// const multiparty = require("multiparty");
const rule = require("../helpers/autthenticationRule");
const authentationDAObj = require("../layers/dataLayer/authentationDA");
const apiResponse = require("../helpers/apiResponse");
const emailSender = require("../helpers/emailSender");
const ua_parser = require("ua-parser-js");
const utilities = require("../helpers/utilities");
const constants = require("../helpers/constants");

async function redisGet(key) {
    try {
        const value = await redisClient.get(key);
        return value;
    } catch (err) {
        console.error("Error retrieving from Redis:", err);
        throw err;
    }
}

class authentication {
    async insertBranch(req, res, next){
        try{
            let body = req.body
            const { error } = rule.authRule.validate(body);
              if (error) {
                throw Boom.badData(error.message);
              }
              let insertedBranch = await authentationDAObj.insertBranchDA(body);
              res.send({ success: true, data: insertedBranch});
          } catch (e) {
              next(e);
          }
    };

    async insertRole(req, res, next){
        try{
          let body = req.body
          const { error } = rule.roleRule.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let insertedRole = await authentationDAObj.insertRoleDA(body);
            res.send({ success: true, data: insertedRole});
        } catch (e) {
            next(e);
        }
    };

    async addAdmin(req, res, next){
        try{
            let body = req.body
            const { error } = rule.addAdminRule.validate(body);
                if (error) {
                    throw Boom.badData(error.message);
                }
                let adminExist = await authentationDAObj.adminExistDA();
                if (adminExist){
                    throw Boom.conflict(apiResponse.ServerErrors.error.admin_already_exist);
                } else {
                    let response = await authentationDAObj.addAdminDA(body);
                    await emailSender.welcomeMail(
                        response.emailId,
                        response.username,
                        response.phoneNumber,
                        response.firstName,
                        response.lastName
                    )
                    res.send({ success: true, data: response});
                }
        } catch(e) {
            next(e);
        }
    };

    async adminLogin(req, res, next){
        try {
            let userAgent = ua_parser(req.headers["user-agent"]);
            let { username, password, fcmToken } = req.body;
            let response = await authentationDAObj.adminIsExistDA(username);
            if (!response) {
              throw Boom.conflict(
                apiResponse.ServerErrors.error.user_not_exist_admin
              );
            } else {
              let checkPassword = await authentationDAObj.adminPasswordDA(
                password,
                response.password
              );
              if (checkPassword) {
                await authentationDAObj.updateAdminFcmTokenDA(response._id, fcmToken);
                await createAdminSession(response, res, userAgent);
              } else {
                throw Boom.conflict(apiResponse.ServerErrors.error.password);
              }
            }
          } catch (e) {
            next(e);
          }
    };

    async forgetPassword(req, res, next){
        try{
            let body = req.body
            const { error } = rule.forgetPasswordRule.validate(body);
            if(error){
                throw Boom.badData(error.message);
            }
            let result = await authentationDAObj.adminIsExistDA(body.username);
            if(!result) {
                throw Boom.conflict(
                    apiResponse.ServerErrors.error.user_not_exist_admin
                );
            }
            let mailKey = result.emailId;
            let forgetPasswordOtp = utilities.generateAndGetOTP(constants.OTP.otpLength);
            await redisClient.set(
                mailKey,
                JSON.stringify({ forgetPasswordOtp: forgetPasswordOtp }),
                'EX',
                constants.OTP_STORE_TIME_LIMIT
              );
            await emailSender.sendOtp(result.emailId, forgetPasswordOtp, result.firstName);
            res.send({success: true, data: { result, forgetPasswordOtp }})
        } catch (e){
            next(e);
        }
    };

    async updatePassword(req, res, next){
        try{
            let body = req.body
            const { error } = rule.updatePasswordRule.validate(body);  
            if (error) {
                    throw Boom.badData(error.message);
                }
                let mailKey = body.emailId;
                let forgetPasswordOtpDetails = await redisGet(mailKey);
                if (forgetPasswordOtpDetails) {
                    forgetPasswordOtpDetails = JSON.parse(forgetPasswordOtpDetails);
                    if(forgetPasswordOtpDetails.forgetPasswordOtp == body.otp){
                        let response = await authentationDAObj.updatePasswordDA(body);
                        res.send({ success: response.acknowledged == 1 ? true : false });
                    } else {
                        throw Boom.badRequest(apiResponse.ServerErrors.error.invalid_Otp);
                    }
                } else {
                    throw Boom.badRequest(apiResponse.ServerErrors.error.otp_expired);
                }
        } catch(e) {
            next(e);
        }
    };

    async patientRegistartion(req, res, next){
        let body = req.body
        const { error } = rule.addAdminRule.validate(body);
                if (error) {
                    throw Boom.badData(error.message);
                }
    };

    async getBranchList(req, res, next){
        try{
            let branchList = await authentationDAObj.branchListDA();
            if (!branchList) {
                throw Boom.conflict(
                  apiResponse.ServerErrors.error.branches_not_found
                );
              } else {
                res.send({ success: true, data: branchList});
              }
        } catch (e){
            next(e);
        }
    }

    async getRoleList(req, res, next){
        try{
            let roleList = await authentationDAObj.roleListDA();
            if (!roleList) {
                throw Boom.conflict(
                  apiResponse.ServerErrors.error.role_not_found
                );
              } else {
                res.send({ success: true, data: roleList});
              }
        } catch (e){
            next(e);
        }
    }
}

async function createAdminSession(response, res, userAgent) {
    response = JSON.parse(JSON.stringify(response));
    let sessionKey = response._id + "_session@" + Date.now();
    let sessionId = await utilities.encryptSession(sessionKey);
  
    response.sessionId = sessionId;
    sessionId = response._id + "_offline_admin_web@" + sessionId;
    if (!redisClient.isReady) {
        await redisClient.connect();
    }
    await redisClient.set(
      response._id + "_offline_admin_web",
      JSON.stringify(response)
    );
  
    response.sessionId = sessionId;
    res.send({ success: true, data: response });
}

module.exports = new authentication();