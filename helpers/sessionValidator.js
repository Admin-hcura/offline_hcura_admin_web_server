const redisClient = require("../config/redisConfiguration");
const { promisify } = require("util");
const redisGet = promisify(redisClient.get).bind(redisClient);
const Boom = require("@hapi/boom");
const rule = require("../helpers/autthenticationRule");
const apiResponse = require("../helpers/apiResponse");

class sessionValidator {
    async validateAdminSession(req, res, next) {
        try {
          let authtoken = req.header("authToken");
          const { error } = rule.sessionRules.validate({ authtoken: authtoken });
          if (!error) {
            let key = authtoken.split("@")[0];
            let sessionId = authtoken.split("@")[1];
    
            let data = await redisGet(key);
            console.log("data....",data)
            if (data) {
              data = JSON.parse(data);
              if (data.sessionId == sessionId) {
                req._id = data._id;
                return next();
              } else {
                throw Boom.clientTimeout(
                  apiResponse.ServerErrors.error.session_expired
                );
              }
            } else {
              throw Boom.clientTimeout(
                apiResponse.ServerErrors.error.session_expired
              );
            }
          } else {
            throw Boom.clientTimeout(
              apiResponse.ServerErrors.error.session_expired
            );
          }
        } catch (e) {
          next(e);
        }
      }
}

module.exports = new sessionValidator();