const { number, required } = require("joi");

(function(){
  const mongoose = require('mongoose');
  const schema = mongoose.Schema;
  const moment = require("moment-timezone");
  const increment = require('mongoose-increment')(mongoose); 
  let createdOn = moment().format();

  let branches = new schema ({
    branchCode: {type: String, required: true,unique: true },
    branchName: {type: String, required: true,unique: true },
    branchPhoneNumber: {type: Number, required: true },
    stateId: {type: mongoose.Schema.Types.ObjectId, ref: "States", required: true},
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
    countryCode: {type: String, default: "91"},
    whatsappNumber: {type: Number, default: null},
    stateId: {type: mongoose.Schema.Types.ObjectId, ref: "States", default: null},
    stateName: {type: String, default: null},
    bloodGroup: {type: String, default: null},
    address: [{
      houseNo: { type: String, default: null },
      street: { type: String, default: null },
      city: { type: String, default: null },
      state: { type: String, default: null },
      pinCode: { type: Number, default: null },
    }],
    consultationType: {type: String, required: true, default: "OFFLINE", enum: ["OFFLINE", "ONLINE"]},
    registeredBy: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Admin"},
    registeredOn: {type: Date, default: new Date()},
    createdOn: {type: Date, default: new Date()},
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
    date: {type: Date, default: () => {
      let today = new Date ();
      today.setHours(0, 0, 0, 0); // Set time to 12 AM (midnight)
      return today;
    }},
    appointmentDate : {type: Date, default: null},
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
    packageId: {type: mongoose.Schema.Types.ObjectId, ref: "Package", default: null},
    packagePaymentId: {type: mongoose.Schema.Types.ObjectId, ref: "Payment", default: null},
    astheticPaymentId: {type: mongoose.Schema.Types.ObjectId, ref: "Payment", default: null},
    astheticId: {type: mongoose.Schema.Types.ObjectId, ref: "Package", default: null},
    appointmentDate: { type: Date, default: null },
    startTime: { type: Date, default: null },
    endTime: { type: Date, default: null },
    followupDate: { type: Date, default: null },
    followupId: {type: mongoose.Schema.Types.ObjectId, ref: "Appointments", default: null},
     
    rescheduledApptId: {type: mongoose.Schema.Types.ObjectId, ref: "Appointments", default: null},
    
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
        "SCHEDULED",
        "VISITED"
      ],
      default: "SCHEDULED",
    },
    appointmentFor: {
      type: String,
      enum: ["homeopathy", "aesthetics", "dental"],
      required: true
    },
    confirmedUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
    visitedUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
    rescheduleUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
    canceledUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
    completedUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
    createdOn: {type: Date, default: new Date()},
    isScheduled: {type: Boolean, default: true},
    isConfirmed: {type: Boolean, default: false},
    visitedClinic: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false},
    isRescheduled: {type: Boolean, default: false},
    isCancelled: {type: Boolean, default: false},
    isActive: {type: Boolean, default: true},
    appointmentNumber: { type: String, default: null },
  });

  let appointmentforestimation = new schema ({
    patientId: {type: mongoose.Schema.Types.ObjectId, ref: "Patient", default: null},
    doctorId: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null},
    slotId: {type: mongoose.Schema.Types.ObjectId, ref: "Slot", default: null},
    dayId: {type: mongoose.Schema.Types.ObjectId, ref: "Day", default: null},
    paymentId: {type: mongoose.Schema.Types.ObjectId, ref: "Payment", default: null},
    caseStudyId: {type: mongoose.Schema.Types.ObjectId, ref: "caseStudy", default: null},
    prescriptionId: {type: mongoose.Schema.Types.ObjectId, ref: "Prescription", default: null},
    branchId: {type: mongoose.Schema.Types.ObjectId, ref: "Branches", default: null},
    bookedBy: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null},
    packageId: {type: mongoose.Schema.Types.ObjectId, ref: "Package", default: null},
    packagePaymentId: {type: mongoose.Schema.Types.ObjectId, ref: "Payment", default: null},
    astheticPaymentId: {type: mongoose.Schema.Types.ObjectId, ref: "Payment", default: null},
    astheticId: {type: mongoose.Schema.Types.ObjectId, ref: "Package", default: null},
    appointmentDate: { type: Date, default: null },
    startTime: { type: Date, default: null },
    endTime: { type: Date, default: null },
    followupDate: { type: Date, default: null },
    followupId: {type: mongoose.Schema.Types.ObjectId, ref: "Appointments", default: null},
    symptoms: [],
    allegires: [],
    rescheduledApptId: {type: mongoose.Schema.Types.ObjectId, ref: "Appointments", default: null},
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
     
    confirmedUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
    visitedUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
    rescheduleUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
    canceledUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
    completedUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
    createdOn: {type: Date, default: new Date()},
    isScheduled: {type: Boolean, default: true},
    isConfirmed: {type: Boolean, default: false},
    visitedClinic: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false},
    isRescheduled: {type: Boolean, default: false},
    isCancelled: {type: Boolean, default: false},
    isActive: {type: Boolean, default: true},
    appointmentNumber: { type: String, default: null },
  });


  let payment = new schema ({
    patientId: {type: mongoose.Schema.Types.ObjectId, ref: "Patient", default: null},
    doctorId: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null},
    branchId: {type: mongoose.Schema.Types.ObjectId, ref: "Branch", default: null},
    packageId: {type: mongoose.Schema.Types.ObjectId, ref: "Package", default: null},
    appointmentId: {type: mongoose.Schema.Types.ObjectId, ref: "Appointment", default: null},
    paymentDoneBy: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null},
    dayId: {type: mongoose.Schema.Types.ObjectId, ref: "Day", default: null},
    slotId: {type: mongoose.Schema.Types.ObjectId, ref: "Slot", default: null},
    astheticPaymentId: {type: mongoose.Schema.Types.ObjectId, ref: "Payment", default: null},
  
    paymentFor: { type: String, required: true }, // "CONSULTATION", "SKIN", etc.
    orderId: {type: String, default: null},
    prescribedBy: {type: String, default: null},
    installments: {type: Number, default: null},
    remarks: {type: String, default: null},
    promoCodes: {type: String, default: null},
    payableAmount: {type: Number, default: null},
    discount: {type: Number, default: 0},
    SGST: {type: Number, default: 0},
    CGST: {type: Number, default: 0},
    IGST: {type: Number, default: 0},
    UGST: {type: Number, default: 0},
    GSTAmount: {type: Number, default: 0},
    GSTID: {type: mongoose.Schema.Types.ObjectId, ref: "GST", default: null},
    afterRemovingGST: {type: Number, default: null},
    paymentMethod: {type: String, default: null},
    paymentStatus: {type: String, default: null},
    shortUrl: {type: String, default: null},
    paymentLinkId: {type: String, default: null},
    paymentRelationId: {type: String, default: null},
    paymentId: {type: String, default: null},
    courierCharges: {type: Number, default: 0},
    serviceCharges: {type: Number, default: 0},
    invoiceNumber: {type: String, default: null},
    createdOn: {type: Date, default: new Date()},
    paidOn: {type: Date, default: new Date ()},
    isDeleted: {type: Boolean, default: false},
    refundId: {type: String, default: null},
    refundAmount: {type: Number, default: null},
    refundStatus: {type: String, default: null},
    refundOn: {type: Date, default: null},
    sessions: [
      {
        monthId: { type: mongoose.Schema.Types.ObjectId, ref: 'PerformedMonth' },
        month: Number,
        amount: Number
      }
    ]
    
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
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null},
  });

  let package = new schema ({
    name: { type: String, default: null},
    packageFor: {type: String, enum: ["HOMEOPATHY", "SKIN","HAIR","DENTAL"], default: "HOMEOPATHY"},
    months: { type: Number, default: 0},
    amount: { type: Number, default: 0},
    gstAmount: { type: Number, default: 0},
    isGstApplicable: { type: Boolean, default: false},
    amountWithoutGST: { type: Number, default: 0},
    installments: { type: Number, default: 0},
    createdOn: { type: Date, default: new Date()},
    isActive: { type: Boolean, default: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null},
  });

  let packageSubscription = new schema({
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Patient",
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Package",
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "payment",
    },
    startDate : { type: Date, default: null },
    endDate : { type: Date, default: null},
    createdOn : { type: Date, default: new Date()},
    paidOn : { type: Date, default: null},
    isActive : { type: Boolean, default: true}
  })

  let states = new schema ({
    name: {type: String, default: null},
    stateCode: {type: String, default: null},
    stateId: {type: Number, default: null},
    consultationGST: {type: Number, default: 0},
    packageGST: {type: Number, default: 0},
    CGST: {type: Number, default: null},
    SGST: {type: Number, default: null},
    UGST: {type: Number, default: null},
    IGST: {type: Number, default: null},
    isActive: {type: Boolean, default: true},
    createdOn: {type: Date, default: new Date()},
  });

  let promoCodes = new schema({
    promoCodeName: { type: String, required: true, unique: true},
    promoCodeFor: { type: String, enum: ["CONSULTATION", "HOMEOPATHY", "ASTHETIC", "DENTAL"], default:"HOMEOPATHY" },
    discount: { type: Number, default: null},
    startsOn: { type: Date, default: null},
    expiredOn: { type: Date, default: null},
    createdOn: { type: Date, default: new Date()},
    deleteOn: { type: Date, default: null},
    isDeleted: { type: Boolean, default: false},
  });

  let prescription = new schema ({
    patientId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Patient"},
    appointmentId: {type: mongoose.Schema.Types.ObjectId, ref: "Appointment", default: null},
    doctorId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Admin" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Admin"},
    updatedBy: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Admin"},
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", default: null},
    createdOn : { type: Date, default: new Date()},
    expiryDate: { type: String, default: null },
    consultationSummary: { type: String, default: null },
    instructions: {type: String, default: null},
    diagnostics: [],
    diagnosis: [],
    medicines: [
      {
        originalName: { type: String, default: null},
        medicinesName: { type: String, default: null },
        dosage: [],
        time: { type: String, default: null },
        days: { type: String, default: null },
      },
    ],
    followUpDate: { type: Date, default: null },
  });

  // CASESTUDY PART - 1
  let caseStudy = new schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Patient"},
    appointmentId: {type: schema.Types.ObjectId,ref: "Appointment",default: null,},
    doctorId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Admin" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Admin"},
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", default: null},
    createdOn : { type: Date, default: new Date()},
    bloodPressure : { type: String, default: null},
    height : { type: String, default: null},
    weight : { type: String, default: null},
    // consultationSummary : { type: String, default: null},
    presentComplaint : { type: String, default: null},
 
    pastHistory : { type: String, default: null},
     
    anyInjuryOrFracture : { type: String, default: null},
    anyHospitalisation : { type: String, default: null},
    anyAllergy : { type: String, default: null},
    vaccinationsOrBirthHistory : { type: String, default: null},
    familyHistory : { type: String, default: null}, 
    // Menstrual History
    ageofMenarche : { type: String, default: null},
    Lmp : { type: String, default: null},
    daysofFlow : { type: String, default: null},
    quality : { type: String, default: null},
    pain : { type: String, default: null},
    character : { type: String, default: null},
    associatedSymptoms : { type: String, default: null},
    leucorrhoea : { type: String, default: null},
    pregnancyHistory : { type: String, default: null},
    //  Physical Generals
    appetitte : { type: String, default: null},
    stool : { type: String, default: null},
    desire : { type: String, default: null},
    urine : { type: String, default: null},
    aversion : { type: String, default: null},
    sweat : { type: String, default: null},
    thirst : { type: String, default: null},
    sleep : { type: String, default: null},
    thermal  : { type: String, default: null},
    dreams : { type: String, default: null},
    addiction : { type: String, default: null},
    sexualActivity : { type: String, default: null},
    intermediateRelationship : { type: String, default: null},
    mentalGenerals : { type: String, default: null},
    investigation : { type: String, default: null},
    estimation : { type: String, default: null},
   
    totalityofSymptoms : { type: String, default: null},
    followupSheets : [
      {
        followupNotes : { type: String, default: null},
        prescriptions : { type: String, default: null},
      }
    ],
     curedCaseSummary : { type: String, default: null},
     updatedOn : { type: Date, default: null },
  });
 
  // CASESTUDY PART - 2
  let suggestionPrescription = new schema({
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Patient",
    },
    branchId: {type: mongoose.Schema.Types.ObjectId, ref: "Branch", default: null},
    appointmentId: {
      type: schema.Types.ObjectId,
      ref: "Appointment",
      default: null,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Admin",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Admin",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Admin",
    },
    updatedOn : { type: Date, default: null },
    createdOn : { type: Date, default: new Date()},
    followupSheets : [
      {
        followupNotes : { type: String, default: null},
        prescriptions : { type: String, default: null},
      }
    ],
    remarks : { type: String, default: null},
    curedCaseSummary : { type: String, default: null},
  });

  // CASESTUDY Of Aesthetic
  let  caseStudyAesthetic = new schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Patient"},
    appointmentId: {type: schema.Types.ObjectId,ref: "Appointment",default: null,},
    doctorId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Admin" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Admin"},
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Admin",
    },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", default: null},
    createdOn : { type: Date, default: new Date()},
    bloodPressure : { type: String, default: null},
    height : { type: String, default: null},
    weight : { type: String, default: null},
     presentComplaint : { type: String, default: null},
    pastHistory : { type: String, default: null},
    menstrualHistory: { type: String, default: null},
     
    appetitte : { type: String, default: null},
    stool : { type: String, default: null},
    desire : { type: String, default: null},
    urine : { type: String, default: null},
     
    thirst : { type: String, default: null},
    sleep : { type: String, default: null},
    thermal  : { type: String, default: null},
    
    addiction : { type: String, default: null},
     
    suggestion : { type: String, default: null},
    curedCaseSummary : { type: String, default: null},

 
  });

 // CASESTUDY Of Aesthetic
 let  caseStudyDental = new schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Patient"},
  appointmentId: {type: schema.Types.ObjectId,ref: "Appointment",default: null,},
  doctorId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Admin" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Admin"},
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: "Admin",
  },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", default: null},
  createdOn : { type: Date, default: new Date()},
  bloodPressure : { type: String, default: null},
  heartDisease : { type: String, default: null},
  bloodDisorder : { type: String, default: null},
  diabetes : { type: String, default: null},
 pregnancy : { type: String, default: null},
   presentComplaint : { type: String, default: null},
  pastHistory : { type: String, default: null},
  anyAllergy: { type: String, default: null},
   
  oralExamination : { type: String, default: null},
  radiologicalinvestigation : { type: String, default: null},
  investigation: { type: String, default: null},
  diagnosis : { type: String, default: null},
   
  treatmentplan: { type: String, default: null},
  poi : { type: String, default: null},
  prescription : { type: String, default: null},
  
  treatmentSheet : [
    {
      treatment : { type: String, default: null},
      consultant : { type: String, default: null},
    }
  ],

});

 
  let estimation = new schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", default: null },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
    appointmentId : { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", default: null },
    homeopathy: [
        {
            packageName: { type: String, default: null },
            amount: { type: Number, default: null },
            months: { type: Number, default: null }, 
            packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true, default: null },
            isGstApplicable: { type: Boolean, default: false },
        }
    ],
    skin: [
        {
            packageName: { type: String, default: null },
            amount: { type: Number, default: null },
            months: { type: Number, default: null }, 
            packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true, default: null },
                        isGstApplicable: { type: Boolean, default: false },

        }
    ],
    hair: [
      {
          packageName: { type: String, default: null },
          amount: { type: Number, default: null },
          months: { type: Number, default: null }, 
          packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true, default: null },
                      isGstApplicable: { type: Boolean, default: false },

      }
  ],
    dental: [
      {
          packageName: { type: String, default: null },
          amount: { type: Number, default: null },
          months: { type: Number, default: null }, 
          packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true, default: null },
                      isGstApplicable: { type: Boolean, default: false },

      }
  ],
    createdOn: { type: Date, default: new Date() },
    isActive: { type: Boolean, default: false }, // <-- change from true to false
  });
  let bookApptForm = new schema({
    name: { type: String, default: "NA" },
    age: { type: Number, default: 0 },
    phoneNo: { type: String, default: "NA" },
    whatsAppNo: { type: String, default: "NA" },
    concern:  { type: String, default: "NA" },
    emailId: { type: String, default: "NA" },
    gender: { type: String, default: "NA" },
    state: { type: String, default: "NA" },
    consultationType: { type: String, default: "NA" },
    branch: { type: String, default: "NA" },
    message: { type: String, default: "NA" },
    formId: { type: String, default: "NA" }, // HAF01
    createdOn: { type: Date, default: createdOn }
  });

  let contactUs = new schema({
    name: { type: String, default: null },
    emailId: { type: String, default: null },
    phoneNo: { type: String, default: null },
    city: { type: String, default: null },
    comment: { type: String, default: null },
    contactId: { type: String, default: null }, // HCU01
    createdOn: { type: Date, default: null }
  });

  let corporate = new schema({
    name: { type: String, default: null },
    workEmail: { type: String, default: null },
    phoneNo: { type: String, default: null },
    companyName: { type: String, default: null },
    companySize: { type: String, default: null },
    prefferedDate: { type: Date, default: null },
    street: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    zipcode: { type: Number, default: null },
    corporateId: { type: String, default: null }, //HCO01
    createdOn: { type: Date, default: null }
  });

  let offerForm = new schema({
    name: { type: String, default: null },
    emailId: { type: String, default: null },
    phoneNo: { type: String, default: null },
    state: { type: String, default: null },
    couponCode: { type: String, default: null },
    offerId: { type: String, default: null }, //HOF01
    createdOn: { type: Date, default: null }
  });

  let homeCount = new schema({
    onlineConsultation: { type: Number, default: null },
    offlineConsultation: { type: Number, default: null },
    treatmentCompleted: { type: Number, default: null },
    ongoingPatients: { type: Number, default: null },
    skinCured: { type: Number, default: null },
    hairTreated: { type: Number, default: null },
    pcodTreated: { type: Number, default: null },
    infertilityCured: { type: Number, default: null },
    psoriasis: { type: Number, default: null },
    prp: { type: Number, default: null },
    gfc: { type: Number, default: null },
    hydrafacial: { type: Number, default: null },
    createdOn: { type: Date, default: null },
    isActive: { type: Boolean, default: true }
  });
 
const advancePaymentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  patientName: {
    type: String,
    required: true // make required if you always want to store it
  },
  totalAdvance: {
    type: Number,
    required: true
  },
  remainingBalance: {
    type: Number,
    required: true
  },
  paymentMode: {
    type: String,
    enum: ["cash", "qr_code", "swiping_machine", "online"],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["created", "pending", "completed", "failed"],
    default: "created"
  },
  paymentDoneBy: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    default: null
  },
  paymentRelationId: {
    type: String,
    default: null
  },
  paymentLinkId: {
    type: String,
    default: null
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});
 

const PerformedEstimationSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, required: true },
    estimationId: { type: mongoose.Schema.Types.ObjectId, required: true },
    roleId: { type: String, required: true },
    categories: [
      {
        category: { type: String, required: true },
        packageName: { type: String, required: true },
        packageId :  { type: String, required: true },
        isGstApplicable: { type: Boolean, default: false },
        
        months: [
          {
            month: { type: Number, required: true },
            amount: { type: Number, required: true },
            performed: { type: Boolean, default: false },
            paid: { type: Boolean, default: false },
            doctorId: { type: mongoose.Schema.Types.ObjectId } // ✅ add here
          }
        ]

      }
    ]
  },
  { timestamps: true }
);

const advancePaymentTransactionSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  totalAdvance: {
    type: Number,
    required: true
  },
  debitedAmount: {
    type: Number,
    required: true
  },
  remainingBalance: {
    type: Number,
    required: true // snapshot of wallet after this transaction
  },
  paymentMode: {
    type: String,
    enum: ["cash", "qr_code", "swiping_machine", "online"],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["created", "pending", "completed", "failed"],
    default: "created"
  },
  paymentDoneBy: {
    type: String,
    required: true
  },
  shortUrl: String,
  paymentRelationId: String,
  paymentLinkId: String,
  createdOn: {
    type: Date,
    default: Date.now
  }
});

const advancePaymentSummarySchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
    unique: true
  },
  remainingBalance: {
    type: Number,
    default: 0
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});

 
 exports.advancePaymentSummaryModel = mongoose.model("AdvancePaymentSummary", advancePaymentSummarySchema, "advancepaymentsummary");

exports.advancePaymentTransactionModel = mongoose.model("AdvancePaymentTransaction", advancePaymentTransactionSchema, "advancepaymenttransactions");

exports.PerformedEstimationModel = mongoose.model("PerformedEstimationSchema", PerformedEstimationSchema, "PerformedEstimationSchema");

exports.advancePaymentModel = mongoose.model("AdvancePayment", advancePaymentSchema, "advancepayment");
  exports.branchesModel = mongoose.model("Branches", branches, "branches");
  exports.roleModel = mongoose.model("Role", role, "role");
  exports.adminModel = mongoose.model("Admin", admin, "admin");
  exports.patientModel = mongoose.model("Patient", patient, "patient");
  exports.timeModel = mongoose.model("Time", time, "time");
  exports.dayModel = mongoose.model("Day", day, "day");
  exports.slotModel = mongoose.model("Slot", slot, "slot");
  exports.appointmentModel = mongoose.model("Appointment", appointment, "appointment");
  exports.appointmentForEstimationModel = mongoose.model("Appointmentforestimation", appointmentforestimation, "appointmentforestimation");
  exports.paymentModel = mongoose.model("Payment", payment, "payment");
  exports.packageModel = mongoose.model("Package", package, "package");
  exports.prescriptionModel = mongoose.model("Prescription", prescription, "prescription");
  exports.consulatationAmountModel = mongoose.model("ConsulatationAmount", consulatationAmount, "consulatationAmount");
  exports.sourceModel = mongoose.model("Source", source, "source");
  exports.occupationModel = mongoose.model("Occupation", occupation, "occupation");
  exports.statesModel = mongoose.model("States", states, "states");
  exports.symptomsAllegryModel = mongoose.model("SymptomsAllegry", symptomsAllegry, "symptomsAllegry");
  exports.tempAppointmentModel = mongoose.model("TempAppointment", tempAppointment, "tempAppointment");
  exports.promoCodesModel = mongoose.model("promoCodes", promoCodes, "promoCodes");
  exports.estimationModel = mongoose.model("estimation", estimation, "Estimation");
  exports.packageSubscriptionModel = mongoose.model("packageSubscription", packageSubscription, "PackageSubscription");
  exports.caseStudyModel = mongoose.model("CaseStudy", caseStudy, "caseStudy");
  exports.aestheticCaseStudyModel = mongoose.model("CaseStudyAesthetic", caseStudyAesthetic, "caseStudyAesthetic");
   exports.dentalCaseStudyModel = mongoose.model("CaseStudyDental", caseStudyDental, "caseStudyDental");

  exports.suggestionPrescriptionModel = mongoose.model("SuggestionPrescription", suggestionPrescription, "suggestionPrescription");
  exports.bookApptFormModel = mongoose.model("BookApptForm", bookApptForm, "bookApptForm");
  exports.contactUsModel = mongoose.model("ContactUs", contactUs, "contactUs");
  exports.corporateModel = mongoose.model("Corporate", corporate, "corporate");
  exports.offerFormModel = mongoose.model("OfferForm", offerForm, "offerForm");
  exports.homeCountModel = mongoose.model("HomeCount", homeCount, "homeCount");

}.call(this))