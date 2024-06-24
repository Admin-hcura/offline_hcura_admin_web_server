const Joi = require("joi");
const moment = require("moment-timezone");

let now = moment().format("YYYY-MM-DD");
// let next = moment().add(15, "days").format("YYYY-MM-DD");


exports.authRule = Joi.object({
    branchCode: Joi.string().required().error(new Error("branchCode is required")),
    branchName: Joi.string().required().error(new Error("branchName is required")),
    location: Joi.string().required().error(new Error("location is required")),
});

exports.roleRule = Joi.object({
    roleCode: Joi.string().required().error(new Error("branchCode is required")),
    roleName: Joi.string().required().error(new Error("role Name is required"))
});

exports.addAdminRule = Joi.object({
    firstName: Joi.string().required().error(new Error("firstName is required")),
    lastName: Joi.string().required().error(new Error("lastName is required")),
    username: Joi.string().required().error(new Error("userName is required")),
    password: Joi.string().required().error(new Error("pasword is required")),
    emailId: Joi.string().required().error(new Error("emailId is required")),
    phoneNumber: Joi.string().required().error(new Error("phoneNumber is required")),
    birthDate: Joi.string().required().error(new Error("birthDate is required")),
    roleId: Joi.string().required().error(new Error("roleId is required")),
    branchId: Joi.string().required().error(new Error("branchId is required"))
});

exports.sessionRules = Joi.object({
    authtoken: Joi.string().required().error(new Error("authtoken is required")),
});

exports.updatePasswordRule = Joi.object({
    emailId: Joi.string().required().error(new Error("emailId is required")),
    userId: Joi.string().required().error(new Error("userId is required")),
    password: Joi.string().required().error(new Error("password is required")),
    otp: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required()
    .error(new Error("OTP is required")),
});

exports.forgetPasswordRule = Joi.object({
    username: Joi.string().required().error(new Error("username is required")),
});

exports.patientRegRule = Joi.object({
    
})