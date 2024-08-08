const axios = require("axios").default;
// const btoa = require("btoa");
const moment = require("moment-timezone");

class PaymentGateway {
    async generatePaymentLinkConsultation(firstName, phoneNumber, emailId, amount) {
        try {
          let razorPayUrl = process.env.PAYMENT_LINK_URL,
            username = process.env.USER_NAME,
            password = process.env.PASSWORD,
            callbackUrl = process.env.OFFLINE_CALLBACK_URL;
    
          let obj = {
            amount: parseFloat(amount) * 100,
            currency: "INR",
            expire_by: moment().add(20, "minutes").unix(),
            customer: {
              name: firstName,
              contact: "+" + "91" + phoneNumber,
              email: emailId,
            },
            notify: {
              email: true,
              sms: true,
            },
            callback_url: callbackUrl,
            callback_method: "get",
          };
          let pay = await axios.post(razorPayUrl, obj, {
            auth: {
              username: username,
              password: password,
            },
          });
          return { success: true, data: pay.data };
        } catch (e) {
          console.error("=======error ========>", e);
          throw e;
        }
    };

    async generatePaymentLinkPackage(firstName, phoneNumber, emailId, amount) {
        try {
          let razorPayUrl = process.env.PAYMENT_LINK_URL,
            username = process.env.USER_NAME,
            password = process.env.PASSWORD,
            callbackUrl = process.env.OFFLINE_CALLBACK_URL;
    
          let obj = {
            amount: parseFloat(amount) * 100,
            currency: "INR",
            expire_by: moment().add(2, "days").unix(),
            customer: {
              name: firstName,
              contact: "+" + "91" + phoneNumber,
              email: emailId,
            },
            notify: {
              email: true,
              sms: true,
            },
            callback_url: callbackUrl,
            callback_method: "get",
          };
          let pay = await axios.post(razorPayUrl, obj, {
            auth: {
              username: username,
              password: password,
            },
          });
          return { success: true, data: pay.data };
        } catch (e) {
          console.error("=======error ========>", e);
          throw e;
        }
    };

    async externalSourcePayment(userObj, amount) {
        try {
          let razorPayUrl = process.env.PAYMENT_LINK_URL,
            username = process.env.USER_NAME,
            password = process.env.PASSWORD,
            callbackUrl = process.env.OFFLINE_CALLBACK_URL;
    
          let obj = {
            amount: parseFloat(amount) * 100,
            currency: "INR",
            expire_by: moment().add(1, "days").unix(),
            customer: {
              name: userObj.firstName,
              contact: "+" + userObj.countryCode + userObj.phoneNumber,
              email: userObj.emailId,
            },
            notify: {
              email: true,
              sms: true,
            },
            callback_url: callbackUrl,
            callback_method: "get",
          };
          let pay = await axios.post(razorPayUrl, obj, {
            auth: {
              username: username,
              password: password,
            },
          });
          return { success: true, data: pay.data };
        } catch (e) {
          console.error("=======error ========>", e);
          throw e;
        }
    };
}
module.exports = new PaymentGateway();