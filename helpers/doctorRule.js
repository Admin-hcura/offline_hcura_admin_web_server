const Joi = require("joi");
const moment = require("moment-timezone");

let now = moment().format("YYYY-MM-DD");

exports.insertCaseStudyRule = Joi.object({
    patientId: Joi.string().required().error(new Error("patientId is Required")),
    appointmentId: Joi.string().required().error(new Error("appointmentId is Required")),
    doctorId: Joi.string().required().error(new Error("doctorId is Required")),
    createdBy: Joi.string().required().error(new Error("createdBy Id required")),
    branchId: Joi.string().required().error(new Error("branchId is Required")),
    bloodPressure: Joi.string().required().error(new Error("Blood Pressure Required")),
    weight: Joi.string().required().error(new Error("weight Required")),
    height: Joi.string().required().error(new Error("height Required")),
    // consultationSummary: Joi.string().required().error(new Error("consultationSummary Required")),
    presentComplaint: Joi.string().required().error(new Error("presentComplaint Required")),
    // symptoms: Joi.array().items(Joi.object({
    //   symptoms: Joi.string().empty("").allow(null).default(null),
    //   location: Joi.string().empty("").allow(null).default(null),
    //   sensation: Joi.string().empty("").allow(null).default(null),
    //   modalities: Joi.string().empty("").allow(null).default(null),
    //   concomitants: Joi.string().empty("").allow(null).default(null),
    // })),
    pastHistory: Joi.string().empty("").allow(null).default(null),
    anyInjuryOrFracture: Joi.string().empty("").allow(null).default(null),
    anyHospitalisation: Joi.string().empty("").allow(null).default(null),
    vaccinationsOrBirthHistory: Joi.string().empty("").allow(null).default(null),
    anyAllergy: Joi.string().empty("").allow(null).default(null),
    familyHistory: Joi.string().empty("").allow(null).default(null),
    ageofMenarche: Joi.string().empty("").allow(null).default(null),
    Lmp: Joi.string().empty("").allow(null).default(null),
    daysofFlow: Joi.string().empty("").allow(null).default(null),
    quality: Joi.string().empty("").allow(null).default(null),
    pain: Joi.string().empty("").allow(null).default(null),
    character: Joi.string().empty("").allow(null).default(null),
    associatedSymptoms: Joi.string().empty("").allow(null).default(null),
    leucorrhoea: Joi.string().empty("").allow(null).default(null),
    pregnancyHistory: Joi.string().empty("").allow(null).default(null),
    appetitte: Joi.string().required().error(new Error("appetitte Required")),
    stool: Joi.string().required().error(new Error("stool Required")),
    desire: Joi.string().required().error(new Error("desire Required")),
    urine: Joi.string().required().error(new Error("urine Required")),
    aversion: Joi.string().required().error(new Error("aversion Required")),
    sweat: Joi.string().required().error(new Error("sweat Required")),
    thirst: Joi.string().required().error(new Error("thirst Required")),
    sleep: Joi.string().required().error(new Error("sleep Required")),
    thermal: Joi.string().required().error(new Error("thermal Required")),
    dreams: Joi.string().required().error(new Error("dreams Required")),
    addiction: Joi.string().required().error(new Error("addiction Required")),
    sexualActivity: Joi.string().required().error(new Error("sexualActivity Required")),
    intermediateRelationship: Joi.string().required().error(new Error("intermediateRelationship Required")),
    mentalGenerals: Joi.string().required().error(new Error("mentalGenerals Required")),
    investigation: Joi.string().required().error(new Error("investigation Required")),
    diagnosis: Joi.string().required().error(new Error("diagnosis Required")),
    treatmentAdvice: Joi.string().required().error(new Error("treatmentAdvice Required")),
    treatmentAdviceAmount: Joi.string().required().error(new Error("treatmentAdviceAmount Required")),
    dietAdviceAndRegimen: Joi.array().items(Joi.object({
        dos: Joi.string().required().error(new Error("dos Required")),
        donts: Joi.string().required().error(new Error("donts Required")),
    })),
    suggestion: Joi.string().required().error(new Error("prescriptions Required")),
    totalityofSymptoms: Joi.string().empty("").allow(null).default(null),
});
// update Suggestion Prescription details
exports.updateSuggestionPrescriptionRule = Joi.object({
    suggestionPrescriptionId: Joi.string().required().error(new Error("suggestionPrescription Id  Required")),
    updatedBy: Joi.string().required().error(new Error("Updated By is Required")),
    followupSheets: Joi.array().items(Joi.object({
      followupNotes: Joi.string().required().error(new Error("followupNotes is Required")),
      prescriptions: Joi.string().required().error(new Error("followup prescriptions is Required")),
    })),
    remarks: Joi.string().required().error(new Error("remarks is Required")),
    curedCaseSummary: Joi.string().required().error(new Error("curedCaseSummary is Required")),
});
// casestudy part 2
exports.insertCaseStudySuggestionPrescriptionRule = Joi.object({
    patientId: Joi.string().required().error(new Error("patientId  Required")),
    appointmentId: Joi.string().required().error(new Error("appointmentId is Required")),
    doctorId: Joi.string().required().error(new Error("doctorId  Required")),
    branchId: Joi.string().required().error(new Error("branchId  Required")),
    createdBy: Joi.string().required().error(new Error("createdBy is Required")),
    followupSheets: Joi.array().items(Joi.object({
      followupNotes: Joi.string().required().error(new Error("followupNotes is Required")),
      prescriptions: Joi.string().required().error(new Error("prescriptions is Required")),
    })),
    remarks: Joi.string().required().error(new Error("remarks is Required")),
    curedCaseSummary: Joi.string().empty("").allow(null).default(null),
});
exports.insertPrescriptionRule = Joi.object({
    patientId: Joi.string().required().error(new Error("patientId  Required")),
    appointmentId: Joi.string().required().error(new Error("appointmentId is Required")),
    doctorId: Joi.string().required().error(new Error("doctorId  Required")),
    branchId: Joi.string().required().error(new Error("branchId  Required")),
    createdBy: Joi.string().required().error(new Error("createdBy is Required")),
    medicines: Joi.array().items(Joi.object({
        originalName: Joi.string().allow(null).default(null),
        medicinesName: Joi.string().allow(null).default(null),
        dosage: Joi.array().items(Joi.object({
            morning: Joi.string().allow(null).default(null),
            afternoon: Joi.string().allow(null).default(null),
            night: Joi.string().allow(null).default(null)
        })),
        time: Joi.string().allow(null).default(null),
        days: Joi.string().allow(null).default(null),
    })).required().error(new Error("Medicines are required")),
    expiryDate: Joi.string().required().error(new Error("Expiry Date is Required")), 
    consultationSummary: Joi.string().required().error(new Error("consultationSummary  is Required")),
    instructions: Joi.string().required().error(new Error("instructions  is Required")),
    diagnostics: Joi.array().items(Joi.string()).default([]), 
    diagnosis: Joi.array().items(Joi.string()).required().error(new Error("diagnosis  is Required")),
    followUpDate: Joi.date().required().error(new Error("Followup Date is Required")),
});
exports.searchHcuraIdRule = Joi.object({
    hcuraId: Joi.string().required().error(new Error("hcuraId is required")),
    roleId: Joi.string().required().error(new Error("roleId is required")),
    branchId: Joi.string().required().error(new Error("branchId is required"))
});
exports.getCaseStudyDetailsRule = Joi.object({
    caseStudyId: Joi.string().required().error(new Error("Case Study Id is Required"))
});
exports.updatePrescriptionRule = Joi.object({
    prescriptionId: Joi.string().required().error(new Error("prescriptionId is Required")),
    updatedBy: Joi.string().required().error(new Error("updatedBy is Required")),
    medicines: Joi.array().items(Joi.object({
        originalName: Joi.string().allow(null).default(null),
        medicinesName: Joi.string().allow(null).default(null),
        dosage: Joi.array().items(Joi.object({
            morning: Joi.string().allow(null).default(null),
            afternoon: Joi.string().allow(null).default(null),
            night: Joi.string().allow(null).default(null)
        })),
        time: Joi.string().allow(null).default(null),
        days: Joi.string().allow(null).default(null),
    })).required().error(new Error("Medicines are required")),
    expiryDate: Joi.string().required().error(new Error("Expiry Date is Required")), 
    consultationSummary: Joi.string().required().error(new Error("consultationSummary  is Required")),
    instructions: Joi.string().required().error(new Error("instructions  is Required")),
    diagnostics: Joi.array().items(Joi.string()).default([]), 
    diagnosis: Joi.array().items(Joi.string()).required().error(new Error("diagnosis  is Required")),
    followUpDate: Joi.date().required().error(new Error("Followup Date is Required")),
});
exports.getPackageScheduleDetailsRule = Joi.object({
    patientId: Joi.string().required().error(new Error("patientId is Required"))
});
exports.appointmentIdRule = Joi.object({
    appointmentId: Joi.string().required().error(new Error("appointmentId is Required"))
});