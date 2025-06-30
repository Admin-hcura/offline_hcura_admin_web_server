const redisClient = require("../config/redisConfiguration");
const { promisify } = require("util");
const Boom = require("@hapi/boom");
const apiResponse = require("../helpers/apiResponse");

class sessionValidator {
    async validateAdminSession(req, res, next) {
        try {
            const authToken = req.headers["authtoken"];
            if (!authToken) {
                throw Boom.unauthorized('authToken is missing');
            }
            const sessionId = authToken;
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
    let parts = sessionId.split("@");
    if (parts.length > 1) {
        return parts[1];
    } else {
        throw new Error("Invalid session ID format");
    }
}


module.exports = new sessionValidator();