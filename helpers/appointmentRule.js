const Joi = require("joi");
const moment = require("moment-timezone");

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
    appointmentFor: Joi.string().valid("homeopathy", "aesthetics", "dental").required(),
    // symptoms: Joi.array()
    //     .min(0)
    //     .required()
    //     .error(new Error("Symptoms is required")),
    // allergies: Joi.array()
    //     .min(0)
    //     .required()
    //     .error(new Error("Allergies is required")),
    // consultationMode: Joi.string().required().error(new Error("consultationMode is required")),
    consultationType: Joi.string().required().error(new Error("consultationType is required")),
    bookedBy: Joi.string().required().error(new Error("bookedBy ID is required")),
});

exports.rescheduleApptRule = Joi.object({
    oldApptId: Joi.string().required().error(new Error("oldApptId Id is required")),
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
    rescheduledBy: Joi.string().required().error(new Error("rescheduledBy ID is required")),
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
    // appointmentId: Joi.string().required().error(new Error("appointmentId is Required")),
    // courierCharges: Joi.number().required().error(new Error("courierCharges is Required")),
    promoCodes: Joi.string().empty("").allow(null).default(null),
    // installements: Joi.number().required().error(new Error("installements is required")),
    // remarks: Joi.string().required().error(new Error("remarks is required")),
    paymentDoneBy: Joi.string().required().error(new Error("paymentDoneBy is required")),
    patientId: Joi.string().required().error(new Error("userId is Required")),
    packageId: Joi.string().required().error(new Error("packageId is Required")),
    // paymentMode: Joi.string().valid('cash', 'qr_code', 'swiping_machine', 'online').required().error(new Error("payment Mode is Required")),
    payableAmount: Joi.number().required().error(new Error("payable Amount is Required")),
    // address: Joi.array().items({
    //     houseNo: Joi.string().required().error(new Error("houseNo is required")),
    //     street: Joi.string().required().error(new Error("street is required")),
    //     city: Joi.string().required().error(new Error("city is required")),
    //     state: Joi.string().required().error(new Error("state is required")),
    //     pinCode: Joi.number().required().error(new Error("pinCode is required")),
    //   }).required(),
  });
  exports.advancePaymentRule = Joi.object({
    patientId: Joi.string().required().error(new Error("Patient ID is required")),
    payableAmount: Joi.number().required().error(new Error("Advance amount is required")),
    paymentMode: Joi.string().valid("cash", "qr_code", "swiping_machine", "online").required()
        .error(new Error("Valid payment mode is required")),
    paymentDoneBy: Joi.string().required().error(new Error("Payment done by is required")),
 });
exports.createEstimationRule = Joi.object({
    patientId: Joi.string().required().error(new Error("patientId is required")),
    doctorId: Joi.string().required().error(new Error("doctorId is required")),
    branchId: Joi.string().required().error(new Error("branchId is required")),
    createdBy: Joi.string().required().error(new Error("createdBy is required")),
    appointmentId: Joi.string().required().error(new Error("branchId is required")),
    homeopathy: Joi.array().items(Joi.object({
        packageName: Joi.string().empty("").allow(null).default(null),
        amount: Joi.number().empty("").allow(null).default(null),
        months: Joi.number().empty("").allow(null).default(null),
        packageId: Joi.string().empty("").allow(null).default(null),     
        isGstApplicable: Joi.boolean().empty("").allow(null).default(null),
    })),
    skin: Joi.array().items(Joi.object({
        packageName: Joi.string().empty("").allow(null).default(null),
        amount: Joi.number().empty("").allow(null).default(null),
        months: Joi.number().empty("").allow(null).default(null),
        packageId: Joi.string().empty("").allow(null).default(null),     
        isGstApplicable: Joi.boolean().empty("").allow(null).default(null),

    })),
    hair: Joi.array().items(Joi.object({
        packageName: Joi.string().empty("").allow(null).default(null),
        amount: Joi.number().empty("").allow(null).default(null),
        months: Joi.number().empty("").allow(null).default(null),
        packageId: Joi.string().empty("").allow(null).default(null),       
        isGstApplicable: Joi.boolean().empty("").allow(null).default(null),

    })),
    dental: Joi.array().items(Joi.object({
        packageName: Joi.string().empty("").allow(null).default(null),
        amount: Joi.number().empty("").allow(null).default(null),
        months: Joi.number().empty("").allow(null).default(null),
        packageId: Joi.string().empty("").allow(null).default(null),    
        isGstApplicable: Joi.boolean().empty("").allow(null).default(null),

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
    all: Joi.string().required().error(new Error("all is required")),
    branchId: Joi.string().empty("").allow(null).default(null),
    startDate: Joi.string().required().error(new Error("startDate is Required")),
    endDate :Joi.string().required().error(new Error("startDate is required")),
});

exports.apptStatusRule = Joi.object({
    updatedBy : Joi.string().required().error(new Error("updatedBy Id is required")),
    appointmentStatus : Joi.string().required().error(new Error("appointmentStatus Id is required")),
    appointmentId : Joi.string().required().error(new Error("appointmentId Id is required")),
});
exports.performedEstimationRule = Joi.object({
           patientId: Joi.string().required(),
            roleId: Joi.string().required(),
            doctorId: Joi.string().required(),
            estimationId: Joi.string().required(),
            categories: Joi.array()
                .items(
                    Joi.object({
                        category: Joi.string().required(),
                        packageName: Joi.string().required(),
                        packageId :  Joi.string().required(),
                        isGstApplicable: Joi.boolean().required(),
                        months: Joi.array()
                            .items(
                                Joi.object({
                                    month: Joi.number().integer().min(1).max(12).required(),
                                    amount: Joi.number().positive().required(),
                                    performed: Joi.boolean().required(),
                                })
                            )
                            .min(1)
                            .required(),
                    })
                )
                .min(1)
                .required(),
});
exports.dashboard = Joi.object({
    startDate: Joi.string().required().error(new Error("Start date is required")),
    endDate: Joi.string().required().error(new Error("End date is required")),
    all: Joi.string().required().error(new Error("all is required")),
    branchId: Joi.string().empty("").allow(null).default(null),
});

exports.changeStatusisCompletedTemp = Joi.object({
    patientId: Joi.string().required().error(new Error("patientId is required")),
    updatedBy: Joi.string().required().error(new Error("updatedBy is required")),
    isConverted: Joi.boolean().required().error(new Error("isConverted (true/false) is required"))
});

exports.transactionReport = Joi.object({
    startDate: Joi.string().allow("").error(new Error("Start date is required")),
    endDate: Joi.string().allow("").error(new Error("End date is required")),
    sorting: Joi.object().required().error(new Error("Sorting is required")),
    search: Joi.string().allow("").error(new Error("Search field is required")),
    type: Joi.string().allow(null).error(new Error("Type field is required")),
    status: Joi.string().allow(null).error(new Error("Status field is required")),
    page: Joi.number().required().error(new Error("Page filed is required")),
    branchId: Joi.string().allow(null).error(new Error("branchId is required")),
});

exports.masterReport = Joi.object({
    startDate: Joi.string().allow("").error(new Error("Start date is required")),
    endDate: Joi.string().allow("").error(new Error("End date is required")),
    sorting: Joi.object().required().error(new Error("Sorting is required")),
    search: Joi.string().allow("").error(new Error("Search field is required")),
    type: Joi.string().allow(null).error(new Error("Type field is required")),
    status: Joi.string().allow(null).error(new Error("Status field is required")),
    page: Joi.number().required().error(new Error("Page filed is required")),
});

exports.masterReportDown = Joi.object({
    startDate: Joi.string().allow("").error(new Error("Start date is required")),
    endDate: Joi.string().allow("").error(new Error("End date is required")),
    sorting: Joi.object().required().error(new Error("Sorting is required")),
    search: Joi.string().allow("").error(new Error("Search field is required")),
    type: Joi.string().allow(null).error(new Error("Type field is required")),
    status: Joi.string().allow(null).error(new Error("Status field is required")),
});

exports.transactionReportDown = Joi.object({
    startDate: Joi.string().allow("").error(new Error("Start date is required")),
    endDate: Joi.string().allow("").error(new Error("End date is required")),
    sorting: Joi.object().required().error(new Error("Sorting is required")),
    search: Joi.string().allow("").error(new Error("Search field is required")),
    type: Joi.string().allow(null).error(new Error("Type field is required")),
    status: Joi.string().allow(null).error(new Error("Status field is required")),
    branchId: Joi.string().allow(null).error(new Error("branchId is required")),
});

exports.statusCaseStudy = Joi.object({
    startDate: Joi.string().allow("").error(new Error("Start date is required")),
    endDate: Joi.string().allow("").error(new Error("End date is required")),
    doctorId: Joi.string().allow(null).error(new Error("doctorId is required")),
    branchId: Joi.string().allow(null).error(new Error("branchId is required")),
});

exports.patientReport = Joi.object({
    startDate: Joi.string().allow("").error(new Error("Start date is required")),
    endDate: Joi.string().allow("").error(new Error("End date is required")),
    sorting: Joi.object().required().error(new Error("Sorting is required")),
    search: Joi.string().allow("").error(new Error("Search field is required")),
    source: Joi.string().allow(null).error(new Error("Source field is required")),
    occupation: Joi.string().allow(null).error(new Error("Occupation field is required")),
    page: Joi.number().required().error(new Error("Page filed is required")),
    branchId: Joi.string().allow(null).error(new Error("branchId is required")),
    stateId: Joi.string().allow(null).error(new Error("stateId is required")),
    gender: Joi.string().allow(null).error(new Error("Gender is required")),
});

exports.patientReportDown = Joi.object({
    startDate: Joi.string().allow("").error(new Error("Start date is required")),
    endDate: Joi.string().allow("").error(new Error("End date is required")),
    sorting: Joi.object().required().error(new Error("Sorting is required")),
    search: Joi.string().allow("").error(new Error("Search field is required")),
    source: Joi.string().allow(null).error(new Error("Source field is required")),
    occupation: Joi.string().allow(null).error(new Error("Occupation field is required")),
    branchId: Joi.string().allow(null).error(new Error("branchId is required")),
    stateId: Joi.string().allow(null).error(new Error("stateId is required")),
    gender: Joi.string().allow(null).error(new Error("Gender is required")),
});

exports.apptReport = Joi.object({
    startDate: Joi.string().allow("").error(new Error("Start date is required")),
    endDate: Joi.string().allow("").error(new Error("End date is required")),
    sorting: Joi.object().required().error(new Error("Sorting is required")),
    search: Joi.string().allow("").error(new Error("Search field is required")),
    consultationType: Joi.string().allow(null).error(new Error("consultationType field is required")),
    appointmentStatus: Joi.string().allow(null).error(new Error("appointmentStatus field is required")),
    branchId: Joi.string().allow(null).error(new Error("branchId is required")),
    doctorId: Joi.string().allow(null).error(new Error("doctorId is required")),
    type: Joi.string().allow(null).error(new Error("type is required")),
    page: Joi.number().required().error(new Error("Page filed is required")),
});

exports.apptReportDown = Joi.object({
    startDate: Joi.string().allow("").error(new Error("Start date is required")),
    endDate: Joi.string().allow("").error(new Error("End date is required")),
    sorting: Joi.object().required().error(new Error("Sorting is required")),
    search: Joi.string().allow("").error(new Error("Search field is required")),
    consultationType: Joi.string().allow(null).error(new Error("consultationType field is required")),
    appointmentStatus: Joi.string().allow(null).error(new Error("appointmentStatus field is required")),
    branchId: Joi.string().allow(null).error(new Error("branchId is required")),
    doctorId: Joi.string().allow(null).error(new Error("doctorId is required")),
    type: Joi.string().allow(null).error(new Error("type is required")),
});

exports.homeCountRule = Joi.object({
    onlineConsultation: Joi.number().required().error(new Error("onlineConsultation Id is required")),
    offlineConsultation: Joi.number().required().error(new Error("offlineConsultation is required")),
    treatmentCompleted: Joi.number().required().error(new Error("treatmentCompleted is required")),
    ongoingPatients: Joi.number().required().error(new Error("ongoingPatients is required")),
    skinCured: Joi.number().required().error(new Error("skinCured is required")),
    hairTreated: Joi.number().required().error(new Error("hairTreated is required")),
    pcodTreated: Joi.number().required().error(new Error("pcodTreated is required")),
    infertilityCured: Joi.number().required().error(new Error("infertilityCured is required")),
    psoriasis: Joi.number().required().error(new Error("psoriasis is required")),
    prp: Joi.number().required().error(new Error("prp is required")),
    gfc: Joi.number().required().error(new Error("gfc is required")),
    hydrafacial: Joi.number().required().error(new Error("hydrafacial is required"))
});