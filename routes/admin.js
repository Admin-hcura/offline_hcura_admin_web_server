const express = require("express");
const router = express.Router();
// const sessionValidator = require("../helpers/SessionValidator");
const appointmentController = require("../controller/appointment");
const authenticationController = require("../controller/authentication");

router.get("/", async (req, res) => {
  res.send({ service: "H-cura admin_offline_server", status: "Running" });
});

router.post("/patient/registration",
  authenticationController.patientRegistartion
);
router.post("/book/appointment",
  appointmentController.bookAppointment
);
router.post("/patient/search/list",
  appointmentController.getPatientList
);
router.post("/patient/details",
  appointmentController.getPatientDetails
);
router.post("/payment/consultation",
  appointmentController.paymentConsultation
);
router.post("/insert/occupation",
  appointmentController.insertOccupation
);
router.post("/insert/source",
  appointmentController.insertSource
);
router.post("/insert/states",
  appointmentController.insertStates
)
router.get("/source/occuption/list",
  appointmentController.getSourceOccuptionList
);
router.get("/state/list",
  appointmentController.getStateList
);
router.post("/insert/symptoms/allegires",
  appointmentController.insertSymptomsAllergies
);
router.get("/symptoms/allegires/list",
  appointmentController.getSymptomsAllegiresList
);
router.post("/book/temperory/appointment",
  authenticationController.bookTempAppointment
);
router.get("/doctors/list",
  appointmentController.getDoctorsList
);
router.get("/consultation/promo/list",
  appointmentController.getConsultationPromocodes
);
router.post("/get/patient/details/consultation/payment",
  appointmentController.getPatientDetailsConsultationPayment
);
router.post("/get/payemnt/details/appointment",
  appointmentController.getPaymentDetailsAppointment
);
router.post("/get/consultation/amount",
  appointmentController.getConsultationAmount
);
router.post("/validate/promo/code",
  appointmentController.validatePromoCode
);
router.post("/get/avaliable/slots",
  appointmentController.avaliableSlots
);
router.get("/get/package/homeopathy",
  appointmentController.getPackageList
);
router.post("/payment/package",
  appointmentController.packagePayment
);
router.post("/create/estimation",
  appointmentController.insertEstimation
);

module.exports = router;