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
router.post("/insert/time",
    sessionValidator.validateAdminSession,
    authenticationController.insertTime
);
router.post("/insert/day",
    sessionValidator.validateAdminSession,
    authenticationController.insertDay
);
router.post("/insert/promocodes",
    // sessionValidator.validateAdminSession,
    authenticationController.insertPromoCodes
);
router.post("/insert/consultation/amount",
    sessionValidator.validateAdminSession,
    authenticationController.insertConsultationAmount
);
router.post("/insert/package",
    // sessionValidator.validateAdminSession,
    authenticationController.insertPackage
);
router.post("/payment/clinic/web_hook",
    authenticationController.getPaymentReportByWebHook
);
router.post("/payment/status", 
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
    "/report/transaction/download",
    sessionValidator.validateAdminSession,
    appointmentController.transactionReportDownload
);
router.post(
    "/report/master",
    sessionValidator.validateAdminSession,
    appointmentController.getMasterReport
);
router.post(
    "/report/master/download",
    sessionValidator.validateAdminSession,
    appointmentController.getMasterReportDownload
);
router.post(
    "/staus/casestudy",
    // sessionValidator.validateAdminSession,
    appointmentController.statusCaseStudy
);
router.post(
    "/report/patient",
    sessionValidator.validateAdminSession,
    appointmentController.getPatientReport
);
router.post(
    "/report/patient/download",
    sessionValidator.validateAdminSession,
    appointmentController.getPatientReportDownload
);
router.post(
    "/report/appointment",
    sessionValidator.validateAdminSession,
    appointmentController.getApptReport
);
router.post(
    "/report/appointment/download",
    sessionValidator.validateAdminSession,
    appointmentController.getApptReportDownload
);
router.post(
    "/whatsapp",
    appointmentController.whatsappapi
);
router.post(
    "/patient/form/website",
    appointmentController.apptFormPtDetails
);
router.post(
    "/contact/us/form/website",
    appointmentController.webContactUsForm
);
router.post(
    "/corporate/form/website",
    appointmentController.webCorporateForm
);
router.post(
    "/appt/offer/form",
    appointmentController.webOfferForm
);
router.post(
    "/insert/data/home/count",
    appointmentController.addHomeCountData
);
router.get(
    "/get/home/count",
    appointmentController.getHomeCountData
);

module.exports = router;