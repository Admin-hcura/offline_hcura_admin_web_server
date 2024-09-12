const express = require("express");
const router = express.Router();
const sessionValidator = require("../helpers/sessionValidator");
const appointmentController = require("../controller/appointment");
const authenticationController = require("../controller/authentication");

router.get("/", async (req, res) => {
  res.send({ service: "H-cura admin_offline_server", status: "Running" });
});

router.post("/insert/casestudy/data",
  // sessionValidator.validateAdminSession,
  appointmentController.insertCaseStudy
);
router.post("/insert/casestudy/suggestion/prescription",
  // sessionValidator.validateAdminSession,
  appointmentController.insertCaseStudySuggestionPrescription
);
router.post("/insert/prescription",
  // sessionValidator.validateAdminSession,
  appointmentController.insertPrescription
);
router.post("/get/patient/details/casestudy",
  // sessionValidator.validateAdminSession,
  appointmentController.getPtDetailsCasestudy
);
router.post("/update/suggestion/prescription",
  // sessionValidator.validateAdminSession,
  appointmentController.updateSuggestionPrescription
);

module.exports = router;