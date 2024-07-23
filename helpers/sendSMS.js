"use strict";
const axios = require("axios").default;
const moment = require("moment-timezone");
const constants = require("../helpers/constants");

class SendSMS {
    async sendSMSAppointmentBookedToPT(bookedDetails, docDetails) {
        let date = moment(bookedDetails.appointmentDate)
          .tz(constants.defaultTimezone)
          .format("YYYY-MM-DD");
        let startTime = moment(bookedDetails.appointmentDate)
          .tz(constants.defaultTimezone)
          .format("hh:mm A");
        let message =
          "Dear " +
          bookedDetails.firstName +
          " " +
          bookedDetails.lastName +
          ", Your appointment with Dr. " +
          docDetails.firstName +
          " " +
          docDetails.lastName +
          " on " +
          date +
          " at " +
          startTime +
          " has been confirmed. For queries, call us @ +91 8870001377 - H-CURA Pvt Ltd";
        let smsURL =
          "https://cloud.smsindiahub.in/vendorsms/pushsms.aspx?APIKey=856274d0f9364de4876b321558541740&msisdn=" +
          "" +
          "91" +
          "" +
          bookedDetails.phoneNumber +
          "&sid=CHCURA&msg=" +
          "" +
          message +
          "" +
          "&fl=0&gwid=2";
        let messageId = await axios.post(smsURL);
        return messageId.data;
    };

    async sendSMSTempAppointmentBookedToDoc(bookedDetails, docDetails){
        let date = moment(bookedDetails.appointmentDate)
          .tz(constants.defaultTimezone)
          .format("YYYY-MM-DD");
        let startTime = moment(bookedDetails.appointmentDate)
          .tz(constants.defaultTimezone)
          .format("hh:mm A");
        let message =
          "👋🏼 Hi DR. " +
          docDetails.firstName +
          " " +
          docDetails.firstName +
          ",\n You have Temporary Appointment with " +
          bookedDetails.firstName +
          " " +
          bookedDetails.lastName +
          " on " +
          date +
          " at " +
          startTime +
          " has been scheduled with our Patient. \nPlease Followup \n"+
          " Thanks & Regrads \n" +
          " H-CURA TEAM ";
        let smsURL =
          "https://cloud.smsindiahub.in/vendorsms/pushsms.aspx?APIKey=856274d0f9364de4876b321558541740&msisdn=" +
          "" +
          "91" +
          "" +
          docDetails.phoneNumber +
          "&sid=CHCURA&msg=" +
          "" +
          message +
          "" +
          "&fl=0&gwid=2";
        let messageId = await axios.post(smsURL);
        return messageId.data;
    };
}

module.exports = new SendSMS();
