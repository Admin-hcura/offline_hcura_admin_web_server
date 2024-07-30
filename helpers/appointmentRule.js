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
    bookedBy: Joi.string().required().error(new Error("bookedBy ID is required")),
});

exports.patientIdRule = Joi.object({
    hcuraId: Joi.string().required().error(new Error("hcuraId is required")),
});

exports.paymentConsultationRule = Joi.object({
    paymentDoneBy: Joi.string().required().error(new Error("paymentDoneBy is required")),
    appointmentId: Joi.string().required().error(new Error("appointmentId is required")),
    patientId: Joi.string().required().error(new Error("patientId is required")),
    paymentFor: Joi.string().required().error(new Error("paymentFor is required")),
    promoCodes: Joi.string().empty("").allow(null).default(null),
    payableAmount: Joi.number().required().error(new Error("payableAmount is required")),
    paymentMode: Joi.string().required().error(new Error("paymentMode is required")),
});

exports.hcuraIdRule = Joi.object({
    hcuraId: Joi.string().required().error(new Error("hcuraId is required"))
});

exports.appointmentIdRule = Joi.object({
    appointmentId: Joi.string().required().error(new Error("appointmentId is required"))
});

exports.consultationTypeRule = Joi.object({
    consultationType: Joi.string().required().error(new Error("consultationType is required"))
});

exports.promoCodeRule = Joi.object({
    promoCode: Joi.string().required().error(new Error("promoCode is required"))
});

exports.avaliableSlotsRule = Joi.object({
    selectedDate: Joi.date().required().error(new Error("selectedDate is required")),
    doctorId: Joi.string().required().error(new Error("doctorId is required"))
});

exports.generatePaymentLinkPackageRule = Joi.object({
    phoneNumber: Joi.number().required().error(new Error ("Phone number is Required")),
    appointmentId: Joi.string().required().error(new Error("appointmentId is Required")),
    courierCharges: Joi.number().required().error(new Error("courierCharges is Required")),
    promoCodes: Joi.string().empty("").allow(null).default(null),
    // installements: Joi.number().required().error(new Error("installements is required")),
    remarks: Joi.string().required().error(new Error("remarks is required")),
    paymentDoneBy: Joi.string().required().error(new Error("paymentDoneBy is required")),
    userId: Joi.string().required().error(new Error("userId is Required")),
    packageId: Joi.string().required().error(new Error("packageId is Required")),
    paymentMode: Joi.string().valid('cash', 'qr_code', 'swiping_machine', 'online').required().error(new Error("payment Mode is Required")),
    payableAmount: Joi.number().required().error(new Error("payable Amount is Required")),
    address: Joi.array()
      .items({
        fullName: Joi.string().required().error(new Error("Name is required")),
        countryCode: Joi.string()
          .required()
          .error(new Error("Country code is required")),
        phoneNumber: Joi.number()
          .required()
          .error(new Error("Phone number is required")),
        postCode: Joi.number()
          .required()
          .error(new Error("Postcode is required")),
        houseNameOrNumber: Joi.string()
          .required()
          .error(new Error("House name or Number is required")),
        street: Joi.string().empty("").allow(null),
        city: Joi.string().required().error(new Error("City is required")),
        state: Joi.string().required().error(new Error("State is required")),
      })
      .min(1)
      .max(1)
      .required(),
  });