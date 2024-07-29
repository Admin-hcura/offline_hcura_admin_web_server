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
router.post("/admin/logout",
    authenticationController.adminLogout
)
router.post("/forget/password",
    authenticationController.forgetPassword
);
router.post("/update/password",
    authenticationController.updatePassword
);
router.get("/branch/list",
    sessionValidator.validateAdminSession,
    authenticationController.getBranchList
);
router.get("/role/list",
    authenticationController.getRoleList
);
// To insert timings
router.post("/insert/time",
    authenticationController.insertTime
);
// To insert Day
router.post("/insert/day",
    authenticationController.insertDay
);
// to insert promocodes
router.post("/insert/promocodes",
    authenticationController.insertPromoCodes
);
// to insert consultation Amount
router.post("/insert/consultation/amount",
    authenticationController.insertConsultationAmount
);
// to insert package 
router.post("/insert/package",
    authenticationController.insertPackage
);
// WEBHOOK
router.post("/payment/clinic/web_hook",
    authenticationController.getPaymentReportByWebHook
);
// offline patment status checking
router.post("/offline/payment/status", 
    authenticationController.offlinPaymentStatus
);


module.exports = router;