const express = require("express");
const router = express.Router();
const sessionValidator = require("../helpers/sessionValidator");
const appointmentController = require("../controller/appointment");
const authenticationController = require("../controller/authentication");

router.get("/", async (req, res) => {
  res.send({ service: "H-cura admin_offline_server", status: "Running" });
});

router.post("/patient/registration",
  sessionValidator.validateAdminSession,
  authenticationController.patientRegistartion
);
router.post("/book/appointment",
  sessionValidator.validateAdminSession,
  appointmentController.bookAppointment
);
router.post("/reschedule/appointment",
  sessionValidator.validateAdminSession,
  appointmentController.rescheduleAppointment
);
router.post("/patient/search/list",
  sessionValidator.validateAdminSession,
  appointmentController.getPatientList
);
router.post("/patient/details",
  sessionValidator.validateAdminSession,
  appointmentController.getPatientDetails
);
router.post("/payment/consultation",
  sessionValidator.validateAdminSession,
  appointmentController.paymentConsultation
);
router.post("/insert/occupation",
  sessionValidator.validateAdminSession,
  appointmentController.insertOccupation
);
router.post("/insert/source",
  sessionValidator.validateAdminSession,
  appointmentController.insertSource
);
router.post("/insert/states",
  sessionValidator.validateAdminSession,
  appointmentController.insertStates
)
router.get("/source/occuption/list",
  sessionValidator.validateAdminSession,
  appointmentController.getSourceOccuptionList
);
router.get("/state/list",
  sessionValidator.validateAdminSession,
  appointmentController.getStateList
);
router.post("/insert/symptoms/allegires",
  sessionValidator.validateAdminSession,
  appointmentController.insertSymptomsAllergies
);
router.get("/symptoms/allegires/list",
  sessionValidator.validateAdminSession,
  appointmentController.getSymptomsAllegiresList
);
router.post("/book/temperory/appointment",
  sessionValidator.validateAdminSession,
  authenticationController.bookTempAppointment
);
router.get("/doctors/list",
  sessionValidator.validateAdminSession,
  appointmentController.getDoctorsList
);
router.get("/consultation/promo/list",
  sessionValidator.validateAdminSession,
  appointmentController.getConsultationPromocodes
);
router.post("/get/patient/details/consultation/payment",
  sessionValidator.validateAdminSession,
  appointmentController.getPatientDetailsConsultationPayment
);
router.post("/get/payemnt/details/appointment",
  sessionValidator.validateAdminSession,
  appointmentController.getPaymentDetailsAppointment
);
router.post("/get/consultation/amount",
  sessionValidator.validateAdminSession,
  appointmentController.getConsultationAmount
);
router.post("/validate/promo/code",
  sessionValidator.validateAdminSession,
  appointmentController.validatePromoCode
);
router.post("/get/avaliable/slots",
  sessionValidator.validateAdminSession,
  appointmentController.avaliableSlots
);
router.get("/get/package/homeopathy",
  sessionValidator.validateAdminSession,
  appointmentController.getPackageList
);
router.get("/get/package/skin",
  sessionValidator.validateAdminSession,
  appointmentController.getAstheticList
);
router.get("/get/package/hair",
  sessionValidator.validateAdminSession,
  appointmentController.getHairpackageList
);
router.get("/get/package/dental",
  // sessionValidator.validateAdminSession,
  appointmentController.getDentalpackageList
);
router.post("/payment/package",
  sessionValidator.validateAdminSession,
  appointmentController.packagePayment
);
router.post("/advance/payment",
  // sessionValidator.validateAdminSession,
  appointmentController.addAdvancePayment
);
router.post(
  "/branch-wise-patient-balances",
    // sessionValidator.validateAdminSession,
  appointmentController.getBranchPatientSummary
);

router.post("/payment/asthetic",
  sessionValidator.validateAdminSession,
  appointmentController.paymentAsthetic
);
router.post("/payment/settled",
  // sessionValidator.validateAdminSession,
  appointmentController.settledPayment
);
router.post("/create/estimation",
  sessionValidator.validateAdminSession,
  appointmentController.insertEstimation
);
router.post("/get/patient/detils/package/payments",
  sessionValidator.validateAdminSession,
  appointmentController.getPatientDetilsPackage
);
router.post("/get/patient/detils/asthetic/payments",
  sessionValidator.validateAdminSession,
  appointmentController.getPatientDetilsPackage
);
router.post("/get/payment/details/for/particular/appt",
  sessionValidator.validateAdminSession,
  appointmentController.getPaymentDetailsByApptId
);
router.post("/get/patient/payment/details/for/external",
  sessionValidator.validateAdminSession,
  appointmentController.getPatientAndPaymentDetailsForExternal
);
router.post("/payment/external/source",
  // sessionValidator.validateAdminSession,
  appointmentController.paymentExternalSource
);
router.get("/get/package/promo/list",
  sessionValidator.validateAdminSession,
  appointmentController.getPackagePromocodes
);
router.get("/get/asthetic/promo/list",
  sessionValidator.validateAdminSession,
  appointmentController.getAstheticPromocodes
);
router.post("/get/dashboard/patient/details",
  sessionValidator.validateAdminSession,
  appointmentController.getDashboardPTDetails
);
router.get("/get/all/appointments",
  sessionValidator.validateAdminSession,
  appointmentController.getAllAppt
);
router.get("/get/all/appointments/for/estimation",
  // sessionValidator.validateAdminSession,
  appointmentController.getAllApptForEstimation
);
router.get("/get/all/estimation/details",
  // sessionValidator.validateAdminSession,
  appointmentController.getAllEstimations
);
router.get("/get/details/for/estimation",
  // sessionValidator.validateAdminSession,
  appointmentController.getdetailsForEstimation
);
router.post("/change/Status/of/estimation",
  // sessionValidator.validateAdminSession,
  appointmentController.changeEstimationStatus
);
router.get("/get/estimation/data",
  // sessionValidator.validateAdminSession,
  appointmentController.getEstimationData
);
router.get("/get/performance/data",
  // sessionValidator.validateAdminSession,
  appointmentController.getPerformanceData
);
router.get("/get/particular/performed/data",
  // sessionValidator.validateAdminSession,
  appointmentController.getParticularPerformedData
);
router.post("/performed/estimation/data",
  // sessionValidator.validateAdminSession,
  appointmentController.performedEstimationData
);
router.post("/update/paid/months",
  // sessionValidator.validateAdminSession, // Uncomment if needed
  appointmentController.updatePaidMonths
);

router.put("/update/performed/estimation/data",
  // sessionValidator.validateAdminSession,
  appointmentController.updateperformedEstimationData
);
router.get("/get/performedEstimatio/data",
  // sessionValidator.validateAdminSession,
  appointmentController.getperformedEstimationData
);
router.post("/debit/advance/amount",
  // sessionValidator.validateAdminSession,
  appointmentController.debitAdvanceAmount
);
router.post("/update/appointment/status",
  sessionValidator.validateAdminSession,
  appointmentController.updateAppointmentStatus
);
router.get("/get/all/appointments/appointmentStatus",
  sessionValidator.validateAdminSession,
  appointmentController.getAllAppointments
);
router.get("/calculate/gst",
  sessionValidator.validateAdminSession,
  appointmentController.calculateGst
);
router.post("/get/dashboard/data/apt/count",
  sessionValidator.validateAdminSession,
  appointmentController.getDashboardDataAptCount
);
router.post("/get/dashboard/data/revenue/count",
  sessionValidator.validateAdminSession,
  appointmentController.getDashboardDataRevenueCount
);
router.post("/temp/patient/search/list",
  sessionValidator.validateAdminSession,
  appointmentController.getPatientListTempAppointment
);
router.post("/change/temp/appt/status",
  sessionValidator.validateAdminSession,
  appointmentController.changeisActiveStatusTemp
);
router.get("/get/doctor/list",
  // sessionValidator.validateAdminSession,
  appointmentController.getDoctorList
);
router.get("/get/payment/details",
  // sessionValidator.validateAdminSession,
  appointmentController.getpaymentDetailsForPdf
);
router.post(
  "/send/o/email/prescription",
  // sessionValidator.validateDoctorSession,
  appointmentController.sendOriginalPrescription
);

module.exports = router;