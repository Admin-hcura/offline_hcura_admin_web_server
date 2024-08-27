const redisClient = require("../config/redisConfiguration");
const { promisify } = require("util");
const redisGet = promisify(redisClient.get).bind(redisClient);
const Boom = require("@hapi/boom");
const rule = require("../helpers/autthenticationRule");
const apiResponse = require("../helpers/apiResponse");

class sessionValidator {
    // async validateAdminSession(req, res, next) {
    //     try {
    //       let authtoken = req.header("authToken");
    //       const { error } = rule.sessionRules.validate({ authtoken: authtoken });
    //       if (!error) {
    //         let key = authtoken.split("@")[0];
    //         let sessionId = authtoken.split("@")[1];
    
    //         let data = await redisGet(key);
    //         console.log("data....",data)
    //         if (data) {
    //           data = JSON.parse(data);
    //           if (data.sessionId == sessionId) {
    //             req._id = data._id;
    //             return next();
    //           } else {
    //             throw Boom.clientTimeout(
    //               apiResponse.ServerErrors.error.session_expired
    //             );
    //           }
    //         } else {
    //           throw Boom.clientTimeout(
    //             apiResponse.ServerErrors.error.session_expired
    //           );
    //         }
    //       } else {
    //         throw Boom.clientTimeout(
    //           apiResponse.ServerErrors.error.session_expired
    //         );
    //       }
    //     } catch (e) {
    //       next(e);
    //     }
    // };
    async validateAdminSession(req, res, next) {
    try {
        const authToken = req.headers["authToken"];
        console.log("------------------------",req.headers["authToken"])
        if (!authToken) {
            throw Boom.unauthorized('authToken is missing');
        }
        const { sessionId } = authToken;
        console.log("------------------------",sessionId)
        let userId = getUserIdFromSessionId(sessionId); // Implement this function to extract user ID
        let extractedSession = getSessionPartFromSessionId(sessionId);
        let sessionData = await redisClient.get(userId + "_offline_admin_web");
        if (!sessionData) {
            throw Boom.unauthorized(apiResponse.ServerErrors.error.session_expired);
        }
        let session = JSON.parse(sessionData);
        if (session.sessionId !== extractedSession || session.sessionId === null) {
          throw Boom.unauthorized(apiResponse.ServerErrors.error.session_expired);
        }
        req.user = session; // Attach session data to request
        next();
    } catch (e) {
      next(e);
    }
  }
}

function getUserIdFromSessionId(sessionId) {
  // The sessionId is in the format userId_offline_admin_web@encryptedSessionId
  // Split the sessionId by "_offline_admin_web@"
  let parts = sessionId.split("_offline_admin_web@");
  if (parts.length > 0) {
      return parts[0];
  } else {
      throw new Error("Invalid session ID format");
  }
}

function getSessionPartFromSessionId(sessionId) {
  if (!sessionId) {
      throw new Error("Session ID is undefined or null");
  }
  // Split the sessionId by "@" to get the parts
  let parts = sessionId.split("@");
  if (parts.length > 1) {
      return parts[1]; // Return the part after the "@" which is the session part
  } else {
      throw new Error("Invalid session ID format");
  }
}


module.exports = new sessionValidator();