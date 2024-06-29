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
                let adminExist = await authentationDAObj.adminExistDA(body.emailId, body.username, body.phoneNumber);
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
            console.log("---------",response)
            let roleCode = await authentationDAObj.getroleCodeDA(response.roleId);
            response.roleCode = roleCode
            if (!roleCode){
                apiResponse.ServerErrors.error.role_not_found
            }
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

    async adminLogout(req, res, next){
        try{
            let userId = req.userId;
            const { error } = rule.logoutRule.validate(body);
                if (error) {
                    throw Boom.badData(error.message);
                }
            await redisClient.del(userId + "_offline_admin_web");
            await authentationDAObj.adminLogoutDA(userId);
            res.send({ success: true, message: 'Logged out successfully'});
        } catch(e){
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
            res.send({success: true, data: result})
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
        try{
            let body = req.body
            const { error } = rule.patientRegRule.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let patientExist = await authentationDAObj.patientExistDA(body.phoneNumber);
            let branchCode = await authentationDAObj.getBrachDetailsDA(body.branchId);
            if(!branchCode){
                throw Boom.conflict(apiResponse.ServerErrors.error.branchCode_not_exist);
            }
            if(patientExist){
            throw Boom.conflict(apiResponse.ServerErrors.error.phoneNumber_Exist);
            } else {
                const now = new Date();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const year = String(now.getFullYear()).slice(-2);
                let existingIDss = await authentationDAObj.getHcuraIdDA();
                const hcuraIds = existingIDss.map(item => item.hcuraId);
                const existingIDsArray = hcuraIds.map(id => ({
                    prefix: id.substring(0, 4),  // Extract "H01J" part
                    month: id.substring(4, 6),   // Extract "06" part
                    year: id.substring(6, 8),    // Extract "24" part
                    count: id.substring(8)       // Extract the count part, e.g., "01", "02", etc.
                }));
                    // Find the maximum count for the current month and year
                let maxCount = 0;
                existingIDsArray.forEach(id => {
                    if (id.month === month && id.year === year) {
                        const count = parseInt(id.count, 10);
                        if (count > maxCount) {
                            maxCount = count;
                        }
                    }
                });
                    // Increment the maximum count by one
                const countThisMonth = maxCount + 1;
                const hcuraId = `${branchCode.branchCode}${month}${year}${String(countThisMonth).padStart(2, '0')}`;
                let patientReg = await authentationDAObj.patientRegDA(
                    hcuraId, body.branchId, body.firstName.trim(), body.lastName.trim(), body.birthDate,
                    body.gender, body.emailId.trim(), body.phoneNumber, body.alternativeNumber,
                    body.bloodGroup, body.address, body.registeredBy, body.source, body.occupation);
                await emailSender.patientWelcomeEmail(
                    patientReg.firstName, 
                    patientReg.lastName, 
                    hcuraId, 
                    patientReg.emailId, 
                    patientReg.phoneNumber
                );
                res.send({success: true, data: patientReg});
            }
        } catch(e){
        next(e);
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

// async function createAdminSession(response, res, userAgent) {
//     response = JSON.parse(JSON.stringify(response));
//     console.log("============response========",response);
//     let sessionKey = response._id + "_session@" + Date.now();
//     console.log("--------- sessionKey--------", sessionKey);
//     let sessionId = await utilities.encryptSession(sessionKey);
//     console.log("................sessionId.........",sessionId)
//     response.sessionId = sessionId;
//     sessionId = response._id + "_offline_admin_web@" + sessionId;
//     console.log(";;;;;;;;;sessiodId;;;;;;;",sessionId)
//     if (!redisClient.isReady) {
//         await redisClient.connect();
//     }
//     await redisClient.set(
//       response._id + "_offline_admin_web",
//       JSON.stringify(response)
//     );
//   console.log("'''''''''''response.sessionId'''''''",response.sessionId)
//     response.sessionId = sessionId;
//     res.send({ success: true, data: response });
// }
async function createAdminSession(response, res, userAgent) {
    response = JSON.parse(JSON.stringify(response));
    let sessionKey = response._id + "_session@" + Date.now();    
    let sessionId = await utilities.encryptSession(sessionKey);    
    response.sessionId = sessionId;
    sessionId = response._id + "_offline_admin_web@" + sessionId;
    if (!redisClient.isReady) {
        await redisClient.connect();
    }
    // Invalidate any existing session for this user
    let existingSession = await redisClient.get(response._id + "_offline_admin_web");
    if (existingSession) {
        let existingSessionData = JSON.parse(existingSession);
        existingSessionData.sessionId = null; // Mark the old session as invalid
        await redisClient.set(
            response._id + "_offline_admin_web",
            JSON.stringify(existingSessionData)
        );
    }
    // Store the new session without TTL
    await redisClient.set(
        response._id + "_offline_admin_web",
        JSON.stringify(response)
    );
    await authentationDAObj.updateAdminFcmTokenDA(response._id, sessionId);
    response.sessionId = sessionId;
    res.send({ success: true, data: response });
}


module.exports = new authentication();