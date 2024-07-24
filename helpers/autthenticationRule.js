const Joi = require("joi");
const moment = require("moment-timezone");

let now = moment().format("YYYY-MM-DD");
// let next = moment().add(15, "days").format("YYYY-MM-DD");


exports.authRule = Joi.object({
    branchCode: Joi.string().required().error(new Error("branchCode is required")),
    branchName: Joi.string().required().error(new Error("branchName is required")),
    location: Joi.string().required().error(new Error("location is required")),
    insertedBy: Joi.string().required().error(new Error("insertedBy is required")),
    stateId: Joi.string().required().error(new Error("stateId is required")),
    branchPhoneNumber: Joi.number().required().error(new Error("branchPhoneNumber is required")),
});

exports.roleRule = Joi.object({
    roleCode: Joi.string().required().error(new Error("branchCode is required")),
    roleName: Joi.string().required().error(new Error("role Name is required")),
    insertedBy: Joi.string().required().error(new Error("insertedBy is required"))
});

exports.addAdminRule = Joi.object({
    firstName: Joi.string().required().error(new Error("firstName is required")),
    lastName: Joi.string().required().error(new Error("lastName is required")),
    username: Joi.string().required().error(new Error("username is required")),
    password: Joi.string().required().error(new Error("password is required")),
    emailId: Joi.string().required().error(new Error("emailId is required")),
    phoneNumber: Joi.string().required().error(new Error("phoneNumber is required")),
    birthDate: Joi.string().required().error(new Error("birthDate is required")),
    roleId: Joi.string().required().error(new Error("roleId is required")),
    branchId: Joi.string().required().error(new Error("branchId is required")),
    registeredBy: Joi.string().required().error(new Error("registeredBy is required")),
    gender: Joi.string().required().error(new Error("Gender is required")),
    EmpNumber: Joi.string().required().error(new Error("Employee number is required")),
    registerationNumber: Joi.string().required().error(new Error("registerationNumber is required")),
    qualifaction: Joi.string().required().error(new Error("qualifaction is required")),
    specilazation: Joi.string().required().error(new Error("specilazation is required")),
    experience: Joi.number().required().error(new Error("experience is required")),
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
    registeredBy: Joi.string().required().error(new Error("registeredBy Id is required")),
    branchId: Joi.string().required().error(new Error("branchId is required")),
    firstName: Joi.string().required().error(new Error("firstName is required")),
    lastName: Joi.string().required().error(new Error("lastName is required")),
    birthDate: Joi.date().required().error(new Error("birtDate is required")),
    gender: Joi.string().required().error(new Error("Gender is required")),
    emailId: Joi.string().required().error(new Error("Email Id is required")),
    phoneNumber: Joi.number().required().error(new Error("phone Number is required")),
    whatsappNumber: Joi.number().empty("").allow(null),
    stateId: Joi.number().required().error(new Error("stateId is required")),
    stateName: Joi.number().required().error(new Error("stateId is required")),
    bloodGroup: Joi.string().empty("").allow(null),
    address: Joi.array().items(Joi.object({
        houseNo: Joi.string().empty("").allow(null).default(null),
        street: Joi.string().empty("").allow(null).default(null),
        city: Joi.string().empty("").allow(null).default(null),
        state: Joi.string().empty("").allow(null).default(null),
        pinCode: Joi.number().empty("").allow(null).default(null),
      })),
    source: Joi.string().required().error(new Error("source is required")),
    occupation: Joi.string().required().error(new Error("occupation is required")),
});

exports.logoutRule = Joi.object({
    userId: Joi.string().required().error(new Error("userId is required")),
});

exports.insertPackageRule = Joi.object({
    name: Joi.string().required().error(new Error("name is required")),
    type: Joi.string().required().error(new Error("package type is required")),
    months: Joi.number().required().error(new Error("months is required")),
    amount: Joi.number().required().error(new Error("amount is required")),
});

exports.offlinePaymentStatusRule = Joi.object({
    paymentId: Joi.string()
      .required()
      .error(new Error("Payment Id Required")),
  });
  exports.tempAppointmentRule = Joi.object({
    firstName: Joi.string().required().error(new Error("firstName is required")),
    lastName: Joi.string().required().error(new Error("lastName is required")),
    gender: Joi.string().required().error(new Error("Gender is required")),
    phoneNumber: Joi.number().required().error(new Error("phone Number is required")),
    complaint: Joi.string().required().error(new Error("complaint is required")),
    appointmentDate: Joi.date().required().error(new Error("Appointment date is required")),
    doctorId: Joi.string().required().error(new Error("doctorId is required")),
    branchId: Joi.string().required().error(new Error("branchId is required")),
    bookedBy: Joi.string().required().error(new Error("bookedBy is required")),
  });