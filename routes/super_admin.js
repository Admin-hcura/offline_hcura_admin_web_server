const express = require("express");
const router = express.Router();
const sessionValidator = require("../helpers/sessionValidator");
// const appointmentController = require("../controller/appointment");
const authenticationController = require("../controller/authentication");

router.get("/", async (req, res) => {
  res.send({ service: "H-cura admin_offline_server", status: "Running" });
});

router.post("/insert/branch",
    authenticationController.insertBranch
);
router.post("/insert/roles",
    authenticationController.insertRole
);
router.post("/add/admin",
    authenticationController.addAdmin
);
router.post("/admin/login",
    // sessionValidator.validateAdminSession,
    authenticationController.adminLogin
);
router.post("/forget/password",
    authenticationController.forgetPassword
);
router.post("/update/password",
    authenticationController.updatePassword
);

module.exports = router;