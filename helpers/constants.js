const AWS = require("aws-sdk");
class Constants {}

Constants.MAIL_CONFIG = {
    host: "mail.gmail.com",
    auth: {
      user: "support@h-cura.com",
      pass: "Support@2021!",
    },
    email: "support@h-cura.com",
  };
Constants.OTP_STORE_TIME_LIMIT = 60 * 15; //15 Minutes
Constants.OTP = {
    otpLength: 6,
    defaultOtp: 132204,
    countryCode: 91,
    demoDoctorPhoneNumber: 9676097350,
    demoPatientPhoneNumber: 9676097350, //9080588448
    demoDoctorEmail: "techsupport@h-cura.com",
    demoPatientEmail: "techsupport@h-cura.com",
  };


  module.exports = Constants;