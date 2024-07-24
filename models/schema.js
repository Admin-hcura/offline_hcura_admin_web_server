const { number, required } = require("joi");

(function(){
//   const mongoose = require("mongoose");
  const mongoose = require('mongoose');
//   mongoose.set("useCreateIndex", true);
  const schema = mongoose.Schema;
  const moment = require("moment-timezone");
//   var mongooseIncrement = require("mongoose-increment");
//   var increment = mongooseIncrement(mongoose);
//   const mongoose = require('mongoose');
  const increment = require('mongoose-increment')(mongoose);
  
//   const Schema = mongoose.Schema;
  

  let branches = new schema ({
    branchCode: {type: String, required: true,unique: true },
    branchName: {type: String, required: true,unique: true },
    createdOn: {type: Date, default: new Date()},
    location: {type: String, required: true},
    isDeleted: {type: Boolean, default: false },
    isLocked: {
        type: String,
        enum: ["ENABLED", "DISABLED"],
        default: "ENABLED",
      },
    insertedBy: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true},
  });

  let role = new schema ({
    roleName: {type: String, required: true, unique: true },
    roleCode: {type: String, required: true,unique: true },
    createdOn: {type: Date, default: new Date()},
    isDeleted: {type: Boolean, default: false },
    isLocked: {
        type: String,
        enum: ["ENABLED", "DISABLED"],
        default: "ENABLED",
      },
    insertedBy: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true},
  });

  let admin = new schema ({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    username: {type: String, required: true, unique: true},
    emailId: {type: String, required: true, unique: true},
    phoneNumber: {type: String, required: true, unique: true},
    birthDate: {type: Date, required: true},
    fcmToken: {type: String, default: null},
    createdOn: {type: Date, default: new Date()},
    isDeleted: {type: Boolean, default: false},
    isLocked: {
        type: String,
        enum: ["ENABLED", "DISABLED"],
        default: "ENABLED",
      },
    roleId: {type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true},
    branchId: {type: mongoose.Schema.Types.ObjectId, ref: "Branches", required: true},
    lockedBy: {type: mongoose.Schema.Types.ObjectId, default: null, ref: "Admin"},
    remarks: {type: String, default: null},
    gender: {type: String, enum: ["Male", "Female", "Others"], required: true },
    password: {type: String, required: true},
    EmpNumber: {type: String, default: null},
    registerationNumber: {type: String, default: null},
    qualifaction: {type: String, default: null},
    specilazation: {type: String, default: null},
    experience: {type: Number, default: null},
  });

  let patient = new schema ({
    hcuraId: {type: String, required: true},
    branchId: {type: mongoose.Schema.Types.ObjectId, ref: "Branches", required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    birthDate : {type: Date, required: true },
    gender: {type: String, enum: ["Male", "Female", "Others"], required: true },
    emailId: {type:String, required: true},
    phoneNumber: {type: Number, required: true},
    countryCode: {type: String, default: "+91"},
    whatsappNumber: {type: Number, default: null},
    stateId: {type: String, default: null},
    stateName: {type: String, default: null},
    bloodGroup: {type: String, default: null},
    address: {
        houseNo: {type: String, default: null},
        street: {type: String, default: null},
        city: {type: String, default: null},
        state: {type: String, default: null},
        pinCode: {type: Number, default: null},
    },
    consultationType: {type: String, required: true, default: "OFFLINE", enum: ["OFFLINE", "ONLINE"]},
    registeredBy: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Admin"},
    registeredOn: {type: Date, default: new Date()},
    source: {type: String, default: null},
    occupation: {type: String, default: null},
    lockedBy: {type: mongoose.Schema.Types.ObjectId, default: null, ref: "Admin"},
    lockedOn: {type: Date, default: null},
    isDeleted: {type: Boolean, default: false},
    deletedOn: {type: Date, default: null},
    registeredBy: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true},
  });

  let time = new schema ({
    slots: [
        {
          start: { type: String, default: null },
          end: { type: String, default: null },
          isLocked: { type: Boolean, default: false },
        },
      ],
    isActive: {type: Boolean, default: true},
    createdOn: {type: Date, default: new Date()},
  });

  let day = new schema ({
    day: { type: String, default: null },
    createdOn: {type: Date, default: new Date()},
    isActive: {type: Boolean, default: true},
  });

  let slot = new schema ({
    date: {type: Date, default: null},
    dayId: {type: mongoose.Schema.Types.ObjectId, ref: "TimeSchema", default: null},
    timeId: {type: mongoose.Schema.Types.ObjectId, ref: "DaySchema", default: null},
    day: { type: String, default: null },
    startTime: { type: String, default: null },
    endTime: { type: String, default: null },
    doctorId: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null},
    createdOn: {type: Date, default: new Date()},
    isBooked: { type: Boolean, default: true },
    isActive: {type: Boolean, default: true},
  });

  let appointment = new schema ({
    patientId: {type: mongoose.Schema.Types.ObjectId, ref: "Patient", default: null},
    doctorId: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null},
    slotId: {type: mongoose.Schema.Types.ObjectId, ref: "Slot", default: null},
    dayId: {type: mongoose.Schema.Types.ObjectId, ref: "Day", default: null},
    paymentId: {type: mongoose.Schema.Types.ObjectId, ref: "Payment", default: null},
    caseStudyId: {type: mongoose.Schema.Types.ObjectId, ref: "caseStudy", default: null},
    prescriptionId: {type: mongoose.Schema.Types.ObjectId, ref: "Prescription", default: null},
    branchId: {type: mongoose.Schema.Types.ObjectId, ref: "Branches", default: null},
    bookedBy: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null},
    appointmentDate: { type: Date, default: null },
    startTime: { type: Date, default: null },
    endTime: { type: Date, default: null },
    followupDate: { type: Date, default: null },
    followupId: {type: mongoose.Schema.Types.ObjectId, ref: "Appointments", default: null},
    symptoms: [],
    allegires: [],
    consultationMode: {
        type: String,
        enum: ["ONLINE", "OFFLINE"],
        default: "OFFLINE"
    },
    consultationType: {
        type: String,
        enum: ["FOLLOW-UP", "FIRST-CONSULTATION"],
        default: "FIRST-CONSULTATION"
    },
    appointmentStatus: {
        type: String,
        enum: [
          "CONFIRMED",
          "CANCELLED",
          "COMPLETED",
          "RESCHEDULE",
          "CREATED",
        ],
        default: "CREATED",
      },
    createdOn: {type: Date, default: new Date() },
    visitedClinic: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false},
    isActive: {type: Boolean, default: true},
    appointmentNumber: { type: String, default: null },
  });
//   appointment.plugin(increment, {
//     type: String,
//     modelName: "Appointment",
//     fieldName: "appointmentNumber",
//     prefix: "HCA",
//   });

  let payment = new schema ({
    patientId: {type: mongoose.Schema.Types.ObjectId, ref: "Patient", default: null},
    doctorId: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null},
    branchId: {type: mongoose.Schema.Types.ObjectId, ref: "Branch", default: null},
    packageId: {type: mongoose.Schema.Types.ObjectId, ref: "Package", default: null},
    appointmentId: {type: mongoose.Schema.Types.ObjectId, ref: "Appointment", default: null},
    paymentDoneBy: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null},
    dayId: {type: mongoose.Schema.Types.ObjectId, ref: "Day", default: null},
    slotId: {type: mongoose.Schema.Types.ObjectId, ref: "Slot", default: null},
    paymentFor: {
        type: String,
        enum: [
          "CONSULTATION",
          "PACKAGE",
          "EXTERNAL_SOURCE",
          "ASTHETIC"
        ],
        default: "CONSULTATION",
      },
    prescribedBy: {type: String, default: null},
    installments: {type: Number, default: null},
    remarks: {type: String, default: null},
    promoCodes: [],
    payableAmount: {type: Number, default: null},
    discount: {type: Number, default: null},
    GST: {type: Number, default: null},
    GSTID: {type: mongoose.Schema.Types.ObjectId, ref: "GST", default: null},
    afterRemovingGST: {type: Number, default: null},
    paymentMethod: {type: String, default: null},
    paymentStatus: {type: String, default: null},
    shortUrl: {type: String, default: null},
    paymentLinkId: {type: String, default: null},
    paymentRelationId: {type: String, default: null},
    paymentId: {type: String, default: null},
    courierCharges: {type: Number, default: '0'},
    serviceCharges: {type: Number, default: '0'},
    invoiceNumber: {type: String, default: null},
    createdOn: {type: Date, default: new Date()},
    paidOn: {type: Date, default: new Date()},
    isDeleted: {type: Boolean, default: false},
    refundId: {type: String, default: null},
    refundAmount: {type: Number, default: null},
    refundStatus: {type: String, default: null},
    refundOn: {type: Date, default: null},
  });

  let consulatationAmount= new schema ({
    type: {type: String, default: null},
    amount: {type: Number, default: null},
    isActive: {type: Boolean, default: true},
    createdOn: {type: Date, default: new Date()},
  });

  let occupation = new schema({
    name: {type: String, default: null},
    createdOn: {type: Date, default: new Date()},
    isActive: {type: Boolean, default: true},
  });

  let source = new schema({
    name: {type: String, default: null},
    createdOn: {type: Date, default: new Date()},
    isActive: {type: Boolean, default: true},
  })

  let symptomsAllegry = new schema({
    symptoms: [String],
    allegires: [String],
    isActive: {type: Boolean, default: true},
  });

  let tempAppointment = new schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    gender: {type: String, enum: ["Male", "Female", "Others"], required: true },
    phoneNumber: {type: Number, required: true},
    hcuraTId: {type: String, required: true},
    complaint: {type: String, default: null},
    appointmentDate: { type: Date, default: null },
    doctorId: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null},
    branchId: {type: mongoose.Schema.Types.ObjectId, ref: "Branches", default: null},
    bookedBy: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null},
    createdOn: {type: Date, default: new Date()},
    isActive: {type: Boolean, default: true},
    isConverted: {type: Boolean, default: false},
  });

  let package = new schema ({
    name: { type: String, default: null},
    type: {type: String, default: "OTHERS"},
    months: { type: Number, default: 0},
    amount: { type: Number, default: 0},
    createdOn: { type: Date, default: new Date() },
    isDelete: { type: String, enum: ["YES", "NO"], default: "NO" },
  });

  let states = new schema ({
    name: {type: String, default: null},
    stateCode: {type: String, default: null},
    stateId: {type: Number, default: null},
    CGST: {type: Number, default: null},
    SGST: {type: Number, default: null},
    UGST: {type: Number, default: null},
    IGST: {type: Number, default: null},
    isActive: {type: Boolean, default: true},
    createdOn: {type: Date, default: new Date()},
  });

  let promoCodes = new schema({
    promoCodeName: { type: String, default: null },
    promoCodeFor: { type: String, enum: ["ADMIN", "MOBILE"], default:null },
    discount: { type: Number, default: null },
    deleteOn: { type: Date, default: null },
    createdOn: { type: Date, default: new Date() },
    expiredOn: { type: Date, default: null },
    isDeleted: { type: String, enum: ["YES", "NO"], default: "NO" },
  });

  let caseSheet = new schema ({

  });

  let prescription = new schema ({

  });

  exports.branchesModel = mongoose.model("Branches", branches, "branches");
  exports.roleModel = mongoose.model("Role", role, "role");
  exports.adminModel = mongoose.model("Admin", admin, "admin");
  exports.patientModel = mongoose.model("Patient", patient, "patient");
  exports.timeModel = mongoose.model("Time", time, "time");
  exports.dayModel = mongoose.model("Day", day, "day");
  exports.slotModel = mongoose.model("Slot", slot, "slot");
  exports.appointmentModel = mongoose.model("Appointment", appointment, "appointment");
  exports.paymentModel = mongoose.model("Payment", payment, "payment");
  exports.packageModel = mongoose.model("Package", package, "package");
  exports.caseSheetModel = mongoose.model("CaseSheet", caseSheet, "caseSheet");
  exports.prescriptionModel = mongoose.model("Prescription", prescription, "prescription");
  exports.consulatationAmountModel = mongoose.model("ConsulatationAmount", consulatationAmount, "consulatationAmount");
  exports.sourceModel = mongoose.model("Source", source, "source");
  exports.occupationModel = mongoose.model("Occupation", occupation, "occupation");
  exports.statesModel = mongoose.model("States", states, "states");
  exports.symptomsAllegryModel = mongoose.model("SymptomsAllegry", symptomsAllegry, "symptomsAllegry");
  exports.tempAppointmentModel = mongoose.model("TempAppointment", tempAppointment, "tempAppointment");

}.call(this))