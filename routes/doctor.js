const express = require("express");
const router = express.Router();
// const sessionValidator = require("../helpers/SessionValidator");
// const doctorController = require("../controller/doctorController");
// const appointmentController = require("../controller/appointment");
// const dashBoardController = require("../controller/dashBoard");
// const liveConsultationController = require("../controller/liveConsultation");
// const notificationsController = require("../controller/notificationsController");

router.get("/", async (req, res) => {
  res.send({ service: "H-cura admin_offline_server", status: "Running" });
});

module.exports = router;