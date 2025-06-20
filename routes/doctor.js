const express = require("express");
const router = express.Router();
const sessionValidator = require("../helpers/sessionValidator");
const appointmentController = require("../controller/appointment");

router.get("/", async (req, res) => {
  res.send({ service: "H-cura admin_offline_server", status: "Running" });
});

router.post("/insert/casestudy/data",
  sessionValidator.validateAdminSession,
  appointmentController.insertCaseStudy
);
router.patch("/update/casestudy/data",
  // sessionValidator.validateAdminSession,
  appointmentController.updateCaseStudy
);
router.post("/insert/casestudy/suggestion/prescription",
  sessionValidator.validateAdminSession,
  appointmentController.insertCaseStudySuggestionPrescription
);
router.post("/insert/casestudy/for/aesthetics/data",
  sessionValidator.validateAdminSession,
  appointmentController.insertAestheticCaseStudy
);
router.patch("/update/aesthetic/casestudy/data",
  // sessionValidator.validateAdminSession,
  appointmentController.updateCaseStudyAesthetic
);
router.patch("/update/dental/casestudy/data",
  // sessionValidator.validateAdminSession,
  appointmentController.updateCaseStudyDental
);
 
router.post("/insert/casestudy/for/dental/data",
  // sessionValidator.validateAdminSession,
  appointmentController.insertDentalCaseStudy
);
 
router.post("/insert/prescription",
  sessionValidator.validateAdminSession,
  appointmentController.insertPrescription
);
router.post("/get/patient/details/casestudy",
  sessionValidator.validateAdminSession,
  appointmentController.getPtDetailsCasestudy
);
router.post("/update/suggestion/prescription",
  sessionValidator.validateAdminSession,
  appointmentController.updateSuggestionPrescription
);
router.post("/get/casestudy/details",
  sessionValidator.validateAdminSession,
  appointmentController.getCaseStudyDetails
);
router.post("/get/AestheticCasestudy/details",
  sessionValidator.validateAdminSession,
  appointmentController.getCaseStudyAestheticDetails
);
router.post("/get/DentalCasestudy/details",
  // sessionValidator.validateAdminSession,
  appointmentController.getCaseStudyDentalDetails
);
router.post("/update/prescription",
  sessionValidator.validateAdminSession,
  appointmentController.updatePrescription
);
router.post("/get/prescription/details",
  sessionValidator.validateAdminSession,
  appointmentController.getPrescriptionDetails
);
router.post("/get/package/schedule/details/pateint",
  sessionValidator.validateAdminSession,
  appointmentController.getPackageScheduleDetails
);
router.post(
  "/get/suggestion/prescription/data",
  sessionValidator.validateAdminSession,
  appointmentController.getSuggestionPrescriptionDetails
);
// send email for Duplicate prescription
router.post(
  "/send/d/email/prescription",
  sessionValidator.validateAdminSession,
  appointmentController.sendDuplicatePrescription
);
router.get(
  "/get/appt/details/doc",
  sessionValidator.validateAdminSession,
  appointmentController.getApptDocs
);

module.exports = router;