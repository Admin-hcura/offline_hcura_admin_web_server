const AWS = require("aws-sdk");
class Constants {}

// Constants.MAIL_CONFIG = {
//     host: "mail.gmail.com",
//     auth: {
//       user: "support@h-cura.com",
//       pass: "Support@2021!",
//     },
//     email: "support@h-cura.com",
//     invoiceEmail: "admin@h-cura.com",
//   };
  Constants.MAIL_CONFIG = {
    host: "mail.gmail.com",
    auth: {
      user: "connect@h-cura.com",
      pass: "Connect@2024#H",
    },
    email: "connect@h-cura.com",
    invoiceEmail: "admin@h-cura.com",
  };
Constants.OTP_STORE_TIME_LIMIT = 60 * 15; //15 Minutes
Constants.OTP = {
    otpLength: 6,
    defaultOtp: 132204,
    countryCode: 91,
    demoDoctorPhoneNumber: 9676097350,
    demoPatientPhoneNumber: 9676097350,
    demoDoctorEmail: "techsupport@h-cura.com",
    demoPatientEmail: "techsupport@h-cura.com",
  };
Constants.value = {
    CREATED: "created",
    CONSULTATION: "CONSULTATION",
    PACKAGE: "PACKAGE",
    UPCOMING: "UPCOMING",
    RECOMMENDED: "RECOMMENDED",
    ATTENDED: "ATTENDED",
    EXTERNAL_SOURCE: "EXTERNAL_SOURCE",
    HOMEOPATHY: "HOMEOPATHY",
    ASTHETIC: "ASTHETIC"
  };
Constants.PAYMENT_STATUS = {
    CAPTURE: "CAPTURED",
    FAILED: "FAILED",
  };
Constants.pageConstants = {
    pageLength: 20,
    defaultPage: 1,
  };

  Constants.defaultTimezone = "Asia/Calcutta";

  module.exports = Constants;