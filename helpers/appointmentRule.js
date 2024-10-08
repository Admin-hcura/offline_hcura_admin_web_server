const Joi = require("joi");
const moment = require("moment-timezone");
const { updateAppointmentStatus } = require("../controller/appointment");

let now = moment().format("YYYY-MM-DD");


exports.appointmentRule = Joi.object({
    patientId: Joi.string().required().error(new Error("Patient Id is required")),
    doctorId: Joi.string().required().error(new Error("doctorId is required")),
    day: Joi.string().required().error(new Error("day is required")),
    timeId: Joi.string().required().error(new Error("timeId is required")),
    dayId: Joi.string().required().error(new Error("dayId is required")),
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

exports.paymentConsultationRule = Joi.object({
    paymentDoneBy: Joi.string().required().error(new Error("paymentDoneBy is required")),
    phoneNumber: Joi.number().required().error(new Error("phoneNumber is required")),
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

exports.searchHcuraIdRule = Joi.object({
    hcuraId: Joi.string().required().error(new Error("hcuraId is required")),
    roleId: Joi.string().required().error(new Error("roleId is required")),
    branchId: Joi.string().required().error(new Error("branchId is required"))
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

exports.paymenPackageRule = Joi.object({
    phoneNumber: Joi.number().required().error(new Error ("Phone number is Required")),
    appointmentId: Joi.string().required().error(new Error("appointmentId is Required")),
    // courierCharges: Joi.number().required().error(new Error("courierCharges is Required")),
    promoCodes: Joi.string().empty("").allow(null).default(null),
    // installements: Joi.number().required().error(new Error("installements is required")),
    remarks: Joi.string().required().error(new Error("remarks is required")),
    paymentDoneBy: Joi.string().required().error(new Error("paymentDoneBy is required")),
    patientId: Joi.string().required().error(new Error("userId is Required")),
    packageId: Joi.string().required().error(new Error("packageId is Required")),
    paymentMode: Joi.string().valid('cash', 'qr_code', 'swiping_machine', 'online').required().error(new Error("payment Mode is Required")),
    payableAmount: Joi.number().required().error(new Error("payable Amount is Required")),
    address: Joi.array().items({
        houseNo: Joi.string().required().error(new Error("houseNo is required")),
        street: Joi.string().required().error(new Error("street is required")),
        city: Joi.string().required().error(new Error("city is required")),
        state: Joi.string().required().error(new Error("state is required")),
        pinCode: Joi.number().required().error(new Error("pinCode is required")),
      }).required(),
  });

exports.createEstimationRule = Joi.object({
    patientId: Joi.string().required().error(new Error("patientId is required")),
    doctorId: Joi.string().required().error(new Error("doctorId is required")),
    branchId: Joi.string().required().error(new Error("branchId is required")),
    createdBy: Joi.string().required().error(new Error("createdBy is required")),
    homeopathy: Joi.array().items(Joi.object({
        packageName: Joi.string().empty("").allow(null).default(null),
        amount: Joi.number().empty("").allow(null).default(null),
        packageId: Joi.string().empty("").allow(null).default(null),
    })),
    asthetic: Joi.array().items(Joi.object({
        packageName: Joi.string().empty("").allow(null).default(null),
        amount: Joi.number().empty("").allow(null).default(null),
        packageId: Joi.string().empty("").allow(null).default(null),
    })),
});

exports.paymentExtrnalSourceRule = Joi.object({
    patientId: Joi.string().required().error(new Error("patientId is Required")),
    phoneNumber: Joi.number().required().error(new Error ("Phone number is Required")),
    payableAmount: Joi.number().required().error(new Error("payable Amount is Required")),
    remarks: Joi.string().required().error(new Error ("Remarks is Required")),
    paymentMode: Joi.string().valid('cash', 'qr_code', 'swiping_machine', 'online').required().error(new Error("payment Mode is Required")),
    prescribedBy: Joi.string().required().error(new Error("prescribedBy is Required")),
    paymentDoneBy :Joi.string().required().error(new Error("paymentDoneBy is required")),
});

exports.dashboardPtDetailsRule = Joi.object({
    roleId: Joi.string().required().error(new Error("roleId is required")),
    branchId: Joi.string().required().error(new Error("branchId is required")),
    startDate: Joi.string().required().error(new Error("startDate is Required")),
    endDate :Joi.string().required().error(new Error("startDate is required")),
});

exports.apptStatusRule = Joi.object({
    updatedBy : Joi.string().required().error(new Error("updatedBy Id is required")),
    appointmentStatus : Joi.string().required().error(new Error("appointmentStatus Id is required")),
    appointmentId : Joi.string().required().error(new Error("appointmentId Id is required")),
});

exports.dashboard = Joi.object({
    startDate: Joi.string().required().error(new Error("Start date is required")),
    endDate: Joi.string().required().error(new Error("End date is required")),
    all: Joi.string().required().error(new Error("all is required")),
    branchId: Joi.string().required().error(new Error("branchId is required")),
});

exports.changeStatusisCompletedTemp = Joi.object({
    patientId: Joi.string().required().error(new Error("patientId is required")),
    updatedBy: Joi.string().required().error(new Error("updatedBy is required")),
    isConverted: Joi.boolean().required().error(new Error("isConverted (true/false) is required"))
});