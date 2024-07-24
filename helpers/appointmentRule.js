const Joi = require("joi");
const moment = require("moment-timezone");

let now = moment().format("YYYY-MM-DD");


exports.appointmentRule = Joi.object({
    patientId: Joi.string().required().error(new Error("Patient Id is required")),
    doctorId: Joi.string().required().error(new Error("doctorId is required")),
    day: Joi.string().required().error(new Error("day is required")),
    timeId: Joi.string().required().error(new Error("timeId is required")),
    dayId: Joi.string().required().error(new Error("dayId is required")),
    branchId: Joi.string().required().error(new Error("branchId is required")),
    appointmentDate: Joi.string().required().error(new Error("appointmentDate is required")),
    startTime: Joi.string().required().error(new Error("startTime is required")),
    endTime: Joi.string().required().error(new Error("endTime is required")),
    symptoms: Joi.array()
        .min(0)
        .required()
        .error(new Error("Symptoms is required")),
    allergies: Joi.array()
        .min(0)
        .required()
        .error(new Error("Allergies is required")),
    consultationMode: Joi.string().required().error(new Error("consultationMode is required")),
    consultationType: Joi.string().required().error(new Error("consultationType is required")),
    paymentDoneBy: Joi.string().required().error(new Error("paymentDoneBy is required")),
    paymentMode: Joi.string().required()
                .error(new Error("Must be one of [cash, qr_code, swiping_machine]"))
                .valid("cash", "qr_code", "swiping_machine", "online"),
    paymentFor: Joi.string().required()
                .error(new Error("Must be one of [CONSULTATION, PACKAGE, EXTERNAL_SOURCE, ASTHETIC]"))
                .valid( "CONSULTATION", "PACKAGE", "EXTERNAL_SOURCE", "ASTHETIC"),
    // promoCodes: Joi.array()
    //             .min(0)
    //             .max(1)
    //             .required()
    //             .error(new Error("Applying Multiple Promo-codes is not allowed")),
    payableAmount: Joi.number().required().error(new Error("payableAmount is required")),

});