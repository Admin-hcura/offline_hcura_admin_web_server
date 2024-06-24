const express = require("express");
const router = express.Router();
const doctorRouter = require("./doctor");
const adminRouter = require("./admin");
const superAdminRouter = require("./super_admin")

router.use("/doctor", doctorRouter);
router.use("/admin", adminRouter);
router.use("/super_admin", superAdminRouter);

module.exports = router;
