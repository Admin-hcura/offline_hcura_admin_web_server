const Boom = require("@hapi/boom");
// const multiparty = require("multiparty");
const moment = require("moment-timezone");
const rule = require("../helpers/appointmentRule");
// const schedulerObj = new scheduler();
const constants = require("../helpers/constants");
const appointmentDA = require("../layers/dataLayer/appointmentDA");
const invoiceGenerator = require("../helpers/invoiceNoGenerater");
const { startTime } = require("express-pino-logger");
const htmlToPDF = require("../helpers/htmlToPDF");
const emailSender = require("../helpers/emailSender");
const paymentGateway = require("../helpers/paymentGateway");
const { sourceModel, occupationModel } = require("../models/schema");

class appointment{
    async bookAppointment(req, res, next){
        try{
            console.log(".......entered.........",req.body)
            let body = req.body
            const {error} = rule.appointmentRule.validate(body);
            if(error){
                throw Boom.badData(error.message);
            }
            let appointmentDate = moment(body.appointmentDate)
            .tz("UTC")
            .format(process.env.format);
            let slotdata = {
                date: appointmentDate,
                dayId: body.dayId,
                timeId: body.timeId,
                day: body.day,
                startTime: body.startTime,
                endTime: body.endTime,
                doctorId: body.doctorId,
            }
            console.log(",,,,,,,,,,slotdate,,,,,,,",slotdata);
            let blockSlot = await appointmentDA.blockSlot(slotdata);
            console.log("=======blockSlot=======",blockSlot);
            let obj = {
                patientId: body.patientId,
                doctorId: body.doctorId,
                slotId: blockSlot._id,
                dayId: body.dayId,
                packageId: body.packageId,
                branchId: body.branchId,
                appointmentDate: appointmentDate,
                startTime: body.startTime,
                endTime: body.endTime,
                symptoms: body.symptoms,
                allegires: body.allegires,
                consultationMode: body.consultationMode,
                consultationType: body.consultationType,
                appointmentStatus: "CREATED",
            }
            let createAppointment = await appointmentDA.createAppointment(obj);
            console.log("........createAppointment.......",createAppointment);
            let ptDetails = await appointmentDA.patientDetaiils(body.patientId);
            // let PromoCodeResult = await appointmentBAObj.getPromoCodeBA(
            //     body.promoCodes
            //   );
            if((body.paymentMode === "cash" || body.paymentMode === "qr_code" || body.paymentMode === "swiping_machine") && body.payableAmount > 0){
                let paymentObj = {
                    patientId: body.patientId,
                    doctorId: body.doctorId,
                    branchId: obj.branchId,
                    packageId: obj.packageId,
                    appointmentId: createAppointment._id,
                    paymentDoneBy: body.paymentDoneBy,
                    slotId: blockSlot._id,
                    dayId: body.dayId,
                    paymentFor: body.paymentFor,
                    promoCodes: body.promoCodes,
                    payableAmount: body.payableAmount,
                    shortUrl: null,
                    paymentRelationId: null,
                    paymentLinkId: null,
                    paymentStatus: constants.value.CREATED,
                    paymentMethod: body.paymentMode,
                    // afterRemovingGST: obj.afterRemovingGST,
                    // GST: obj.GST,
                    // GSTID: obj.GSTID,
                  };
                  if(body.consultationType === "FOLLOW-UP"){
                    let updateFollowupId = await appointmentDA.updateFollowupId(body.patientId, paymentObj.appointmentId);
    
                    }
                  let addPaymentInfo = await appointmentDA.addPaymentInfo(paymentObj);
                  console.log("----addPaymentInfo----",addPaymentInfo);
                  let PAYMENT_ID = addPaymentInfo._id;
                  let confirmAppt = await appointmentDA.confirmAppointment(
                                                        createAppointment._id,
                                                        addPaymentInfo._id );
                  console.log("++++++confirm Appt+++++",confirmAppt)
                  let paidOn = moment().format();
                  let branchCode = await appointmentDA.branchCode(body.branchId);
                  console.log("@@@@@@@  branchCode  @@@@@",branchCode.branchCode)
                  let invoiceNumber =
                      await invoiceGenerator.generateInvoiceNumber(branchCode.branchCode);
                  console.log("*****invoiceNumber*****",invoiceNumber)
                  let updatePaymentDetails = {
                    paymentMethod: body.paymentMode,
                    paymentStatus: "captured",
                    paymentId: PAYMENT_ID,
                    orderId: PAYMENT_ID,
                    paymentRelationId: PAYMENT_ID,
                    paidOn: paidOn,
                    appointmentId: createAppointment._id,
                    paymentLinkId: PAYMENT_ID,
                    invoiceNumber: invoiceNumber
                  };
                  let relationId = updatePaymentDetails.paymentRelationId;
                  console.log("paymentObj.paymentRelationId......",paymentObj.paymentRelationId)
                  console.log("relationId,,,,,,,",relationId)
                  let updatePaymentReport = await appointmentDA.updatePaymentReport(updatePaymentDetails);
                  console.log("....updatePaymentReport......",updatePaymentReport)
                  if(updatePaymentReport != null){
                    let userInfo = await appointmentDA.getuserInfoWithpaymentRelationId(relationId);
                    console.log("-------userInfo------",userInfo);
                    let appointmentDetails = await appointmentDA.getAppointmentDetails(updatePaymentReport.appointmentId);
                    console.log("------appointmentDetails------",appointmentDetails);
                    let consultationfee = await appointmentDA.getAmount(body.consultationType);
                    console.log("_________consultationfee________",consultationfee,consultationfee.amount);
                    console.log("****************",userInfo[0].patient)
                    let pdfDetails = {
                        invoiceNumber: updatePaymentReport.invoiceNumber,
                        firstName: userInfo[0].patient.firstName,
                        lastName: userInfo[0].patient.lastName,
                        paidOn: updatePaymentDetails.paidOn,
                        age: userInfo[0].patient.birthDate,
                        gender: userInfo[0].patient.gender,
                        docFirstName: userInfo[0].doctor.firstName,
                        docLastName: userInfo[0].doctor.lastName,
                        appointmentDate: appointmentDetails[0].appointmentDate,
                        startTime: appointmentDetails[0].startTime,
                        endTime: appointmentDetails[0].endTime,
                        consultationfee: consultationfee.amount,
                        serviceCharges: updatePaymentReport.serviceCharges,
                        discount: updatePaymentReport.discount,
                        GST: "0%", // needs to work on gst
                        payableAmount: updatePaymentReport.payableAmount,
                        paymentMethod: updatePaymentDetails.paymentMethod
                    }
                    console.log(",,,,,,,,,,pdfDetails,,,,,,,,",pdfDetails)
                    let file = await htmlToPDF.generateInvoiceForConsultation(pdfDetails);
                        // email to patient consultation invoice
                        emailSender.sendConsultationInvoiceEmail(
                            userInfo[0].patient.emailId,
                            file
                        );
                        // email to patient payment success
                        emailSender.sendPaymentSuccess(
                            userInfo[0].patient.firstName,
                            userInfo[0].patient.emailId,
                            consultationfee.amount,
                            "#" + relationId,
                            updatePaymentDetails.paymentMethod.toUpperCase()
                          );
                        // email to patient appointment details
                        emailSender.appointmentBookedMail(
                            userInfo[0].patient.firstName,
                            userInfo[0].patient.lastName,
                            userInfo[0].doctor.firstName,
                            userInfo[0].doctor.lastName,
                            userInfo[0].patient.emailId,
                            pdfDetails
                          );
                        // email to docors 
                        emailSender.sendAppointmentBookedEmailToDoctor(
                            userInfo[0].doctor.emailId,
                            pdfDetails
                          );
                        
                        res.send({ success: true, data: userInfo});
                  }
            } else if (body.payableAmount > 0) {
                    if(body.consultationType === "FOLLOW-UP"){
                        let updateFollowupId = await appointmentDA.updateFollowupId(body.patientId, createAppointment._id);
                    } 
                let payment = await paymentGateway.generatePaymentLinkConsultation(
                    ptDetails.firstName, 
                    ptDetails.phoneNumber,
                    ptDetails.emailId,
                    body.payableAmount
                );
                if (payment && payment.data.status == constants.value.CREATED) {
                let paymentObj = {
                    patientId: body.patientId,
                    doctorId: body.doctorId,
                    branchId: body.branchId,
                    packageId: body.packageId,
                    appointmentId: createAppointment._id,
                    paymentDoneBy: body.paymentDoneBy,
                    slotId: body.slotId,
                    dayId: body.dayId,
                    paymentFor: body.paymentFor,
                    promoCodes: body.promoCodes,
                    payableAmount: body.payableAmount,
                    shortUrl: payment.data.short_url,
                    paymentRelationId: payment.data.id.substring(6),
                    paymentLinkId: payment.data.id,
                    paymentStatus: payment.data.status,
                    // afterRemovingGst: parseFloat(payable) - gstAmount,
                    // GST: gstAmount,
                    // discountAmount: discount,
                };
                let addPaymentInfo = await appointmentDA.addPaymentInfo(
                    paymentObj,
                    // serviceCharge
                    ); //payment table
                // if (
                //   files &&
                //   files.length > 0 &&
                //   files[0].originalFilename
                // ) {
                //   medicalFile = await fileUploader.uploadMultipleFile(
                //     files,
                //     body?.userId || req._id,
                //     process.env.medical_record
                //   );
                //   if (body.consultFor == constants.message.DEPENDENT) {
                //     await appointmentBAObj.addMedicalFileToMainBA(
                //       body.relativeId,
                //       body?.userId || req._id,
                //       medicalFile
                //     );
                //   } else {
                //     await appointmentBAObj.addMedicalFileToMainUserBA(
                //       body?.userId || req._id,
                //       medicalFile
                //     );
                //   }
                // }
                // let combined = medicalFile.concat(body.selectedFile);
                
                    await appointmentDA.updatePaymentDetailsAppointment(
                    createAppointment._id,
                    addPaymentInfo._id,
                    ); //appointment table
                    res.send({ success: true, data: addPaymentInfo });
                
                } else {
                await zoomBAObj.removeAppointmentFromZoomCredentialBA(
                    createAppointment._id
                );
                await appointmentBAObj.deleteAppointmentBA(
                    createAppointment._id
                );
                throw Boom.badData(
                    apiResponse.ServerErrors.error.payment_not_created
                );
                }
            }
        } catch(e){
            next(e);
        }
    };

    async getPatientList(req, res, next) {
        try {
          const payload = req.body;
          let page = payload.page;
          let limit = constants.pageConstants.pageLength;
          const patientList = await appointmentDA.getPatientList(
            payload.type,
            page,
            limit,
            payload.search
          );
          let sendObj = {
            metaData: {
              page:
                patientList[0].metadata.length > 0
                  ? patientList[0].metadata[0].page
                  : 1,
              total:
                patientList[0].metadata.length > 0
                  ? patientList[0].metadata[0].total
                  : 0,
            },
            patientList: patientList[0].data,
          };
          res.status(200).send({ status: true, data: sendObj });
        } catch (e) {
          next(e);
        }
    };

    async insertOccupation(req, res, next){
        try{
            let body = req.body
            let result = await appointmentDA.insertOccuption(body);
            res.send({ success: true, data: result});
        } catch(e){
            next(e);
        }
    };

    async insertSource(req, res, next){
        try{
            let body = req.body
            let result = await appointmentDA.insertSource(body);
            res.send({ success: true, data: result});
        } catch(e){
            next(e);
        }
    };

    async insertStates(req, res, next){
        try{
            let body = req.body
            let result = await appointmentDA.insertStates(body);
            res.send({ success: true, data: result});
        } catch(e){
            next(e);
        }
    }

    async getSourceOccuptionList(req, res, next){
        try{
            let result = await appointmentDA.getSourceOccuptionList();
            res.send({ success: true, data: result});
        } catch(e){
            next(e);
        }
    };

    async getStateList(req, res, next){
        try{
            let result = await appointmentDA.getStateList();
            res.send({ success: true, data: result});
        } catch(e){
            next(e);
        }
    };

    async insertSymptomsAllergies(req, res, next){
        try{
            let body = req.body
            let result = await appointmentDA.insertSymptomsAllergiesDA(body);
            res.send({ success: true, data: result});
        } catch(e){
            next(e);
        }
    };

    async getSymptomsAllegiresList(req, res, next){
        try{
            let result = await appointmentDA.getSymptomsAllegiresList();
            res.send({ success: true, data: result});
        } catch(e){
            next(e);
        }
    };

    async getDoctorsList(req, res, next){
        try{
            let result = await appointmentDA.getDoctorsList();
            res.send({ success: true, data: result});
        } catch(e){
            next(e);
        }
    }

}

module.exports = new appointment();
