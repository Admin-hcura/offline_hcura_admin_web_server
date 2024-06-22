const express = require("express");
const router = express.Router();
// const sessionValidator = require("../helpers/SessionValidator");
// const appointmentController = require("../controller/appointment");
// const reportController = require("../controller/reportController");
const authenticationController = require("../controller/authentication");

router.get("/", async (req, res) => {
  res.send({ service: "H-cura admin_offline_server", status: "Running" });
});
router.post("/patient/registration",
  authenticationController.patientRegistartion
)

module.exports = router;