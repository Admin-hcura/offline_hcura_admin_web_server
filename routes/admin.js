const express = require("express");
const router = express.Router();
// const sessionValidator = require("../helpers/SessionValidator");
const appointmentController = require("../controller/appointment");
// const reportController = require("../controller/reportController");
const authenticationController = require("../controller/authentication");

router.get("/", async (req, res) => {
  res.send({ service: "H-cura admin_offline_server", status: "Running" });
});

router.post("/patient/registration",
  authenticationController.patientRegistartion
);
router.post("/appointment/book",
  appointmentController.bookAppointment
);
router.post("/patient/search/list",
  appointmentController.getPatientList
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
)


module.exports = router;