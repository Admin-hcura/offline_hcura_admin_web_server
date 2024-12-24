"use strict";
const constants = require("./constants");
const nodemailer = require("nodemailer");
const emailTemplates = require("./emailTemplets");
const moment = require("moment-timezone");

class Mail{
    async welcomeMail(emailId, username, phoneNumber, firstName, lastName,) {
        try {
          let info = await this.setUpSmtp();
          info
            .sendMail({
              from: constants.MAIL_CONFIG.auth.user,
              to: emailId,
              subject: "Welcome to H-Cura Family!!! 🤝 ",
              text: "Hi Dear "+firstName+" "+lastName+",\n ",
              html: (
                await emailTemplates.welcomeMail(
                  emailId,
                  username,
                  phoneNumber,
                  firstName,
                  lastName,
                )
              ).toString(),
            })
            .then(() => {
              console.log("Email sent");
            })
            .catch((error) => {
              console.error(error);
            });
        } catch (e) {
          console.error("Internal error ", e);
        }
    };

    async setUpSmtp() {
        var transporter = nodemailer.createTransport({
          service: "gmail",
          port: 587,
          secure: true,
          dkim: {
            domainName: "h-cura.com",
            keySelector: "google",
            privateKey:
              "-----BEGIN RSA PRIVATE KEY----- \nMIIEpAIBAAKCAQEAo9WPrQMx+RF161aJLFDgds9qvSD42ocXNBlo/ih2hNP6MhKOlH/n66zehPc6KpNXiTu8XMzjvabGz8fsZaY3QZoQAZbbXVWM2w3EdoPsfiSxjIqy+D+DafSsBAFJX5S7+4NYkoldbbErpBp1IkL/rA2BGTSrDIviwZjppfVM131AIjBh" +
              "HV7bRxA+iQUBQLdv5p5LeaQWFXYS06iFMWE7IRU+7kVc8L8dStdTTPQdT+xWJ7eZ" +
              "OoL/Gt/MMUAM0Jk7g1U/QFSN/y48gxBSamcxYLndQMrxj1cVzqJvEBSGgbjBrh/T" +
              "EDIeOsZtJZzHeVIIj/i91hZVgA8cu1LfrSMuywIDAQABAoIBAAX/7CMJ2uqkGQ1l" +
              "PeDBlXbEYcRLUNGv4MmnpJCqKqzyllb/FvmZNYUL75ou85JbkvkTlvJPDogDc4Ro" +
              "bd/LFnrwiWWFgMMKPv5Goss0SZTVAyuCaMtuiAF5VFNROL6nU7sCNFwpa6J4uoBn" +
              "96IpkfNbCz9BDoKHHOa6EtRhB09c18QTcFtJdL4Vq1TVMf4WMK79jb6fqFCNwa8C" +
              "HEZbzJxInroka8nH4KOoQbv4+tvNJhrHoJ1ZVPwElLOCoFqQFv8P5f54t9g9vS1W" +
              "8Z3uW4dAhAnS69Hcg1gJocZM4Y7DeZVs8rv/BMvX2skv4uIxEZH4P5rvAEkFUlKU" +
              "7SNbWQECgYEA5TjXL0k6BY3O7T3sRW23I/Osw1u1y+MS6PMAwwWPMc/cWpT2lwOK" +
              "JYieN+2WObbp0Nx2WczcFXYaQ964ps2BITsipaVKLO4A0OZFN5K5YdyUViGLm9dY" +
              "cfzTPC5ZqvhRypGDoi1nmDpuIMkEioauo3152N3sYUvxjWS72VGqx18CgYEAtvk4" +
              "S5CJhmmjTMKB0akrGDJHNprLapnYr1e3nyJtBr+Y/1xint10tazLTh8TxhMJJN/6" +
              "DxxgsMDDv8eB3cdQQaA1eVpTF5P+wy1rpJAAbaNJ3sQNPVC0srG0jVeiIESZRmAu" +
              "GAnbgW3txyFt/ZRZm1yKrE9aQCXdNAq5MCPzrBUCgYBofoT6NXOR3JecZ0IyVFXM" +
              "ueTkGgbCL34LW9vZC8u/dXaKhKX1KdPsUF9wN4roPI5SfG4nedBKqFBI6FtdDwny" +
              "0DZ3NOafnNAaax7aurRv/FJTAW/XV1Amho71PFv8KL+AjN1pLTGwn9Jcd8buL3+l" +
              "YCoPxvtfT3OKdYV9CFHGGQKBgQCllHSwVTVO8Mv5i8+FFyzLcbxmGsDYUC75xkyB" +
              "8tptD/f5pvYMQ+X4/kzg/libl+BfgVy+TfTmHxtFstrAAz2KlduuXOHy5VfX8oOF" +
              "4Vax4OHZeNtuUFmlmBEHE3XA87MtL56m3EzLHNrfqE3r+1L3uFA5zHmksV8zWDzr" +
              "5qz9XQKBgQCckOoTW+HTXOWUPCD32ETGBcQij3hD9Z9moM6FgKpKNa9kL3R/erEF" +
              "p8J8ACLYcLpJmimldnnEFXitP1TgX3LqHmBAOWqW7YEuKkvfiptNrwg39Ua1oQXO" +
              "jUSMmY3MmaK1qFlN5/ATwI+iSP2Fl0/56n4s3aWcmSdSSiScQdjPsg==" +
              "-----END RSA PRIVATE KEY-----",
          },
          auth: {
            user: constants.MAIL_CONFIG.auth.user,
            pass: constants.MAIL_CONFIG.auth.pass,
          },
        });
        return transporter;
    };

    async sendOtp(emailId, otp, username) {
        try {
          let info = await this.setUpSmtp();
          info
            .sendMail({
              from: constants.MAIL_CONFIG.auth.user,
              to: emailId,
              subject: "H-Cura Forget Password (OTP)",
              text: "Hi Dear "+username+",\n \nYour one time password(otp) is: "+otp+"\n \n  Thank you",
              html: (await emailTemplates.forgetPasswordOtp(otp)).toString(),
            })
            .then(() => {
              console.log("Email sent");
            })
            .catch((error) => {
              console.error(error);
            });
        } catch (e) {
          console.error("Internal error ", e);
        }
    };

    async patientWelcomeEmail(firstName, lastName, hcuraId, emailId, phoneNumber){
      try {
        let info = await this.setUpSmtp();
        info
          .sendMail({
            from: constants.MAIL_CONFIG.auth.user,
            to: emailId,
            subject: "Welcome to H-Cura",
            //text: "Hi Dear "+userName+",\n \nYour one time password(otp) is: "+otp+"\n \n  Thank you",
            html: (
              await emailTemplates.patientWelcomeEmail(
                firstName,
                lastName,
                hcuraId,
                emailId,
                phoneNumber
              )
            ).toString(),
          })
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (e) {
        console.error("Internal error ", e);
      }
    };

  async sendConsultationInvoiceEmail(emailId, file) {
    try {
      let info = await this.setUpSmtp();
      info.sendMail({
        from: constants.MAIL_CONFIG.auth.user,
        to: [constants.MAIL_CONFIG.invoiceEmail, emailId],
        subject: "H-Cura Consultation_invoice received successfully!",
        text: "Hi Dear H-Cura consumer Please find the attached file for your reference \n \nThank you.",
          attachments: [
            {
              filename: "Consultation_invoice.pdf",
              content: file,
              contentType: "application/pdf",
            },
          ],
        })
        .then(() => {
          console.log("INVOICE___Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.error("Internal error ", e);
    }
  };

    async sendPaymentSuccess(
      userName,
      emailId,
      amount,
      translationId,
      paymentMethod
    ) {
      try {
        let info = await this.setUpSmtp();
        info
          .sendMail({
            from: constants.MAIL_CONFIG.auth.user,
            to: emailId,
            subject: "H-Cura Payment received successfully!",
            html: (
              await emailTemplates.sendPaymentSuccess(
                userName,
                emailId,
                amount,
                translationId,
                paymentMethod
              )
            ).toString(),
          })
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (e) {
        console.error("Internal error ", e);
      }
    };

    async sendPackagePaymentSuccess(
      userName,
      emailId,
      amount,
      translationId,
      paymentMethod,
      packageName
    ) {
      try {
        let info = await this.setUpSmtp();
        info
          .sendMail({
            from: constants.MAIL_CONFIG.auth.user,
            to: emailId,
            subject: "H-Cura Package Payment received successfully!",
            html: (
              await emailTemplates.sendPackagePaymentSuccess(
                userName,
                emailId,
                amount,
                translationId,
                paymentMethod,
                packageName
              )
            ).toString(),
          })
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (e) {
        console.error("Internal error ", e);
      }
    };

    async sendAstheticPaymentSuccess(
      userName,
      emailId,
      amount,
      translationId,
      paymentMethod,
      packageName
    ) {
      try {
        let info = await this.setUpSmtp();
        info
          .sendMail({
            from: constants.MAIL_CONFIG.auth.user,
            to: emailId,
            subject: "H-Cura Asthetic Payment received successfully!",
            html: (
              await emailTemplates.sendPackagePaymentSuccess(
                userName,
                emailId,
                amount,
                translationId,
                paymentMethod,
                packageName
              )
            ).toString(),
          })
          .then(() => {
            console.log("Asthetic Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (e) {
        console.error("Internal error ", e);
      }
    };

    async appointmentBookedMail(
      userFirstName,
      userLastName,
      doctorFirstName,
      doctorLastName,
      emailId,
      pdfDetails
    ) {
      try {
        let appointmentDate = pdfDetails.startTime
        ? moment(pdfDetails.appointmentDate)
            .tz(constants.defaultTimezone)
            .format("DD/MM/YYYY")
        : "NA";
      let startTime = pdfDetails.startTime
        ? moment(pdfDetails.startTime)
            .tz(constants.defaultTimezone)
            .format("HH:mm A")
        : "NA";
      let endTime = pdfDetails.endTime
        ? moment(pdfDetails.endTime)
            .tz(constants.defaultTimezone)
            .format("HH:mm A")
        : "NA";
        let info = await this.setUpSmtp();
        info
          .sendMail({
            from: constants.MAIL_CONFIG.auth.user,
            to: emailId,
            subject: "Your appointment has been scheduled",
            html: (
              await emailTemplates.appointmentBookedMail(
                userFirstName, userLastName, doctorFirstName,
                doctorLastName, appointmentDate, startTime, endTime
              )
            ).toString(),
          })
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (e) {
        console.error("Internal error ", e);
      }
    };

    async sendAppointmentBookedEmailToDoctor(details) {
      try {
        let appointmentDate = details.startTime
        ? moment(details.appointmentDate)
            .tz(constants.defaultTimezone)
            .format("DD/MM/YYYY")
        : "NA";
      let startTime = details.startTime
        ? moment(details.startTime)
            .tz(constants.defaultTimezone)
            .format("HH:mm A")
        : "NA";
      let endTime = details.endTime
        ? moment(details.endTime)
            .tz(constants.defaultTimezone)
            .format("HH:mm A")
        : "NA";
        let info = await this.setUpSmtp();
        info.sendMail({
            from: constants.MAIL_CONFIG.auth.user,
            to: [constants.MAIL_CONFIG.invoiceEmail, details.docEmail],
            subject: "A new appointment has been scheduled !",
            html: (
              await emailTemplates.appointmentBookedEmailToDoctor(
                details.docFirstName,
                details.firstName,
                appointmentDate,
                startTime,
                endTime,
              )
            ).toString(),
          })
          .then(() => {
            console.log("INVOICE___Email sent To Doctor");
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (e) {
        console.error("Internal error ", e);
      }
    };

    async sendTempAppointmentBookedEmailToAdmin(booked, docDetails) {
      try {
        let info = await this.setUpSmtp();
        info.sendMail({
            from: constants.MAIL_CONFIG.auth.user,
            to: [constants.MAIL_CONFIG.invoiceEmail],
            subject: "A new Temperory appointment has been scheduled !",
            html: (
              await emailTemplates.tempAppointmentBookedEmailToAdmin(
                booked, docDetails)).toString(),
          })
          .then(() => {
            console.log("TempAppt__Email sent To Admin");
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (e) {
        console.error("Internal error ", e);
      }
    };

    async sendAppointmentConformedEmailToPT(details) {
      try {
        let info = await this.setUpSmtp();
        info.sendMail({
            from: constants.MAIL_CONFIG.auth.user,
            to: [details.emailId],                               // [constants.MAIL_CONFIG.invoiceEmail],
            subject: "Your appointment has been scheduled !",
            html: (
              await emailTemplates.appointmentConformedEmailToPT(
                details)).toString(),
          })
          .then(() => {
            console.log("TempAppt__Email sent To PT");
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (e) {
        console.error("Internal error ", e);
      }
    };

  async sendPackageInvoiceEmail(emailId, file) {
    try {
      let info = await this.setUpSmtp();
      info
        .sendMail({
          from: constants.MAIL_CONFIG.auth.user,
          to: [constants.MAIL_CONFIG.invoiceEmail, emailId],
          subject: "H-Cura Package invoice received successfully!",
          text: "Hi Dear H-Cura consumer Please find the attached file for your reference \n \nThank you.",
          attachments: [
            {
              filename: "Package_Invoice.pdf",
              content: file,
              contentType: "application/pdf",
            },
          ],
        })
        .then(() => {
          console.log("PACKAGE_INVOICE___Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.error("Internal error ", e);
    }
  };

  async sendAstheticInvoiceEmail(emailId, file) {
    try {
      let info = await this.setUpSmtp();
      info.sendMail({
        from: constants.MAIL_CONFIG.auth.user,
        to: [constants.MAIL_CONFIG.invoiceEmail, emailId],
        subject: "H-Cura Asthetic invoice received successfully!",
        text: "Hi Dear H-Cura consumer Please find the attached file for your reference \n \nThank you.",
        attachments: [
          {
            filename: "Asthetic_Invoice.pdf",
            content: file,
            contentType: "application/pdf",
          },
        ],
      })
      .then(() => {
        console.log("ASTHETIC_INVOICE___Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
    } catch (e) {
      console.error("Internal error ", e);
    }
  };

  async sendExternalSourceInvoiceEmail(emailId, file) {
    try {
      let info = await this.setUpSmtp();
      info.sendMail({
        from: constants.MAIL_CONFIG.auth.user,
        to: [constants.MAIL_CONFIG.invoiceEmail, emailId],
        subject: "H-Cura Homeo invoice received successfully!",
        text: "Hi Dear H-Cura consumer Please find the attached file for your reference \n \nThank you.",
        attachments: [
          {
            filename: "Homeo_Invoice.pdf",
            content: file,
            contentType: "application/pdf",
          },
        ],
      })
      .then(() => {
        console.log("EXTERNAL_SOURCE_INVOICE___Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
    } catch (e) {
      console.error("Internal error ", e);
    }
  };

  async sendExternalSourcePaymentSuccess(userName, emailId, amount, translationId, paymentMethod, items) {
    try {
      let info = await this.setUpSmtp();
      info.sendMail({
        from: constants.MAIL_CONFIG.auth.user,
        to: emailId,
        subject: "H-Cura Homeo Payment received successfully!",
        html: (await emailTemplates.sendHomeoPaymentSuccess(
          userName,
          emailId,
          amount,
          translationId,
          paymentMethod,
          items)).toString(),
      })
      .then(() => {
        console.log("Homeo payment success Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
    } catch (e) {
      console.error("Internal error ", e);
    }
  };

  async prescription(emailId, file) {
    try {      
      let info = await this.setUpSmtp();      
      await info.sendMail({
        from: constants.MAIL_CONFIG.auth.user,
        to: emailId,
        subject: "H-Cura prescription received successfully!",
        text: "Hi Dear H-Cura consumer, Please find the attached file for your reference. \n \nThank you.",
        attachments: [
          {
            filename: "prescription.pdf",
            content: file,
            contentType: "application/pdf",
          },
        ],
      });
    } catch (error) {
      console.error("Internal error ", error);
    }
  };

  async sendApptFormPtDetailsToAdmin(
    name, age, phoneNo, whatsAppNo,
    emailId, gender, state,
    consultationType, message, branch, formId ) {
      try {
        let info = await this.setUpSmtp();
        info
          .sendMail({
            from: constants.MAIL_CONFIG.auth.user,
            to: "admin@h-cura.com",
            // to : "mani1998kavala@gmail.com",
            subject: "New Patient Details Recieved 🔔",
            html: (
              await emailTemplates.sendApptFormPtDetailsRequest(
                name, age, phoneNo, whatsAppNo, emailId, 
                gender, state, consultationType, message,
                branch, formId )).toString(),
          })
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (e) {
        console.error("Internal error ", e);
      }
  };

  async sendMailToFormPatient( name, emailId, formId ) {
    try {
      let info = await this.setUpSmtp();
      info
        .sendMail({
          from: constants.MAIL_CONFIG.auth.user,
          to: emailId,
          subject: "Thanks For submitting Details 🤝",
          html: (
            await emailTemplates.sendMailToPtFormFilled(name, formId)).toString(),
        })
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.error("Internal error ", e);
    }
  };

  async sendContactUsInfoToAdmin(
    name, emailId, phoneNo, city, comment, contactId) {
      try {
        let info = await this.setUpSmtp();
        info
          .sendMail({
            from: constants.MAIL_CONFIG.auth.user,
            to: "admin@h-cura.com",
            // to : "mani1998kavala@gmail.com",
            subject: "Contact Us Form Submited ⚠️",
            html: (
              await emailTemplates.sendContactUsInfoRequest(
                name, emailId, phoneNo, city, comment, contactId)).toString(),})
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (e) {
        console.error("Internal error ", e);
      }
  };

  async sendMailToContactUs( name, emailId, contactId ) {
    try {
      let info = await this.setUpSmtp();
      info
        .sendMail({
          from: constants.MAIL_CONFIG.auth.user,
          to: emailId,
          subject: "Thanks For submitting Form 🤝",
          html: (
            await emailTemplates.sendMailToContactUsFormFilled(name, contactId)).toString(),
        })
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.error("Internal error ", e);
    }
  };

  async sendCorporateInfoToAdmin( 
    name, workEmail, phoneNo, companyName, companySize, 
    prefferedDate, street, city, state, zipcode, corporateId ) {
      try {
        let info = await this.setUpSmtp();
        info
          .sendMail({
            from: constants.MAIL_CONFIG.auth.user,
            to: "admin@h-cura.com",
            // to: "mani1998kavala@gmail.com",
            subject: "Corporate Form Submited 🏢",
            html: (
              await emailTemplates.sendCorporateInfoRequest(
                name, workEmail, phoneNo, companyName, companySize, 
                prefferedDate, street, city, state, zipcode, corporateId
              )).toString(),
          })
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (e) {
        console.error("Internal error ", e);
      }
  };

  async sendMailToCorporate( name, workEmail, companyName, corporateId ) {
    try {
      let info = await this.setUpSmtp();
      info
        .sendMail({
          from: constants.MAIL_CONFIG.auth.user,
          to: workEmail,
          subject: "Thanks For submitting Details 🤝",
          html: (
            await emailTemplates.sendMailToCorporateFormFilled(name, companyName, corporateId)).toString(),
        })
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.error("Internal error ", e);
    }
  };

  async sendOfferFormPtDetailsToAdmin(
    name, emailId, phoneNo, state, couponCode, offerId ) {
      try {
        let info = await this.setUpSmtp();
        info
          .sendMail({
            from: constants.MAIL_CONFIG.auth.user,
            to: "admin@h-cura.com",
            // to : "mani1998kavala@gmail.com",
            subject: "New Patient Details Recieved 🔔",
            html: (
              await emailTemplates.sendOfferFormPtDetailsRequest(
                name, emailId, phoneNo, state, couponCode, offerId)).toString(),
          })
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (e) {
        console.error("Internal error ", e);
      }
  };

}

module.exports = new Mail();