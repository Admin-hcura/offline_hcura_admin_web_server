const express = require("express");
const router = express.Router();
const sessionValidator = require("../helpers/sessionValidator");
const appointmentController = require("../controller/appointment");
const authenticationController = require("../controller/authentication");

router.get("/", async (req, res) => {
  res.send({ service: "H-cura admin_offline_server", status: "Running" });
});

router.post("/insert/branch",
    sessionValidator.validateAdminSession,
    authenticationController.insertBranch
);
router.post("/insert/roles",
    sessionValidator.validateAdminSession,
    authenticationController.insertRole
);
router.post("/add/admin",
    sessionValidator.validateAdminSession,
    authenticationController.addAdmin
);
router.post("/admin/login",
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
    sessionValidator.validateAdminSession,
    authenticationController.getRoleList
);
// To insert timings
router.post("/insert/time",
    sessionValidator.validateAdminSession,
    authenticationController.insertTime
);
// To insert Day
router.post("/insert/day",
    sessionValidator.validateAdminSession,
    authenticationController.insertDay
);
// to insert promocodes
router.post("/insert/promocodes",
    // sessionValidator.validateAdminSession,
    authenticationController.insertPromoCodes
);
// to insert consultation Amount
router.post("/insert/consultation/amount",
    sessionValidator.validateAdminSession,
    authenticationController.insertConsultationAmount
);
// to insert package 
router.post("/insert/package",
    // sessionValidator.validateAdminSession,
    authenticationController.insertPackage
);
// WEBHOOK
router.post("/payment/clinic/web_hook",
    authenticationController.getPaymentReportByWebHook
);
// offline patment status checking
router.post("/payment/status", 
    sessionValidator.validateAdminSession,
    authenticationController.paymentStatus
);
router.post("/get/role/details",
    sessionValidator.validateAdminSession,
    authenticationController.getRoleDetails
);
router.post(
    "/report/transaction",
    sessionValidator.validateAdminSession,
    appointmentController.getTransactionReport
);
  router.post(
    "/report/master",
    // sessionValidator.validateAdminSession,
    appointmentController.getMasterReport
);


module.exports = router;