const Boom = require("@hapi/boom");
const moment = require("moment-timezone");
const rule = require("../helpers/appointmentRule");
const doctorRule = require("../helpers/doctorRule");
const constants = require("../helpers/constants");
const appointmentBAObj = require("../layers/bussinessLayer/appointmentBA");
const appointmentDA = require("../layers/dataLayer/appointmentDA");
const invoiceGenerator = require("../helpers/invoiceNoGenerater");
const htmlToPDF = require("../helpers/htmlToPDF");
const emailSender = require("../helpers/emailSender");
const paymentGateway = require("../helpers/paymentGateway");
const scheduler = require("../scheduler/scheduler");
const schedulers = new scheduler();
const apiResponse = require("../helpers/apiResponse");
const { ObjectId } = require('mongodb');
const whatsApp = require("../helpers/sendWhatsAppMsg");
const whatsapptoken = "EAARheJ4rHpUBOwKkzCdxPMZAwxgHpZCtmnfWZAt3lntXatTaBRCdxwPhGn23FJLhLmWLFmj15Ecvj1gKqahB2OemZBTPFXflTSHwegasszbNap5MYZCZCOqjqiKKjJzP1yEVHCciwDNI64RdUwbCmFlSAMsVjp5fmx3kMNL22OkLZA6Tnw5J72foDsKmtYraKXvJ3w0AGyR1Ijqb9Js6Sxc95fO67MT"
const axios = require('axios');
const mongoose = require("mongoose");  // ✅ Add this at the top
 
class appointment{
    async bookAppointment(req, res, next) {
        try {
            console.log(".......entered.........",req.body)
            let body = req.body
            const {error} = rule.appointmentRule.validate(body);
            if(error) {
                throw Boom.badData(error.message);
            }
            let createdOn = moment().format();
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
                createdOn: createdOn
            }
            console.log(",,,,,,,,,,slotdate,,,,,,,",slotdata);
            let blockSlot = await appointmentBAObj.blockSlotBA(slotdata);
            console.log("=======blockSlot=======",blockSlot);
            let existingApptNumber = await appointmentBAObj.getAppointmentNumberBA();
            console.log(".......existingApptNumber.........",existingApptNumber)
            let newAppointmentNumber = "HCA01" ;
            if (existingApptNumber.length > 0) {
                const appointmentNumber = existingApptNumber.map(item => item.appointmentNumber);
                const existingApptNumbers = appointmentNumber.map(id => ({
                    prefix: id.substring(0, 3), 
                    count: parseInt(id.substring(3), 10)
                }));

                const maxCount = Math.max(...existingApptNumbers.map(item => item.count));
                const newCount = maxCount + 1;
                const newCountFormatted = newCount.toString().padStart(2, '0');
                newAppointmentNumber = `${existingApptNumbers[0].prefix}${newCountFormatted}`;
                console.log('New Appointment Number:', newAppointmentNumber);
            }
            let userInfo = await appointmentBAObj.patientDetaiilsBA(body.patientId);
            let obj = {
                patientId: body.patientId,
                doctorId: body.doctorId,
                slotId: blockSlot._id,
                dayId: body.dayId,
                branchId: userInfo.branchId,
                appointmentDate: appointmentDate,
                startTime: body.startTime,
                endTime: body.endTime,
                appointmentFor :body.appointmentFor,
                // symptoms: body.symptoms,
                // allegires: body.allegires,
                // consultationMode: body.consultationMode,
                consultationType: body.consultationType,
                appointmentStatus: "SCHEDULED",
                appointmentNumber: newAppointmentNumber,
                bookedBy: body.bookedBy,
                createdOn: createdOn
            }
            let createAppointment = await appointmentBAObj.createAppointmentBA(obj);
            let docDetails = await appointmentBAObj.getDoctorDetailsBA(body.doctorId);
            console.log("......userInfo.......",userInfo);
            console.log("......docDetails.......",docDetails);
            let details = {
                appointmentDate : createAppointment.appointmentDate,
                firstName : userInfo.firstName,
                lastName : userInfo.lastName,
                emailId : userInfo.emailId,
                docFirstName : docDetails.firstName,
                docEmail : docDetails.emailId,
                endTime : createAppointment.endTime,
                startTime : createAppointment.startTime
            }
            if(body.consultationType === "FOLLOW-UP"){
                let lastAppt = await appointmentBAObj.getLatestApptBA(body.patientId);
                console.log("-------result------",lastAppt._id)
                let updateFollowupId = await appointmentBAObj.updateFollowupIdBA(body.patientId, lastAppt._id);
                console.log("-----FOLLOW-UP----",updateFollowupId)
            }
            emailSender.sendAppointmentConformedEmailToPT(details);
            emailSender.sendAppointmentBookedEmailToDoctor(details);

            res.status(200).send({ status: true, data: createAppointment});
        } catch(e){
            next(e);
        }
    };

    async rescheduleAppointment(req, res, next) {
        try {
            console.log(".......entered.........",req.body)
            let body = req.body
            const {error} = rule.rescheduleApptRule.validate(body);
            if(error) {
                throw Boom.badData(error.message);
            }
            let createdOn = moment().format();
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
                createdOn: createdOn
            }
            console.log(",,,,,,,,,,slotdate,,,,,,,",slotdata);
            let blockSlot = await appointmentBAObj.blockSlotBA(slotdata);
            console.log("=======blockSlot=======",blockSlot);
            let existingApptNumber = await appointmentBAObj.getAppointmentNumberBA();
            console.log(".......existingApptNumber.........",existingApptNumber)
            let newAppointmentNumber = "HCA01" ;
            if (existingApptNumber.length > 0) {
                const appointmentNumber = existingApptNumber.map(item => item.appointmentNumber);
                const existingApptNumbers = appointmentNumber.map(id => ({
                    prefix: id.substring(0, 3),  
                    count: parseInt(id.substring(3), 10)  
                }));
                const maxCount = Math.max(...existingApptNumbers.map(item => item.count));
                const newCount = maxCount + 1;
                const newCountFormatted = newCount.toString().padStart(2, '0');
                newAppointmentNumber = `${existingApptNumbers[0].prefix}${newCountFormatted}`;
                console.log('New Appointment Number:', newAppointmentNumber);
            }

            let updateOldAppt = await appointmentBAObj.updateOldApptBA(body.oldApptId,body.bookedBy)
            console.log("----updateOldAppt----",updateOldAppt);
            
            let userInfo = await appointmentBAObj.patientDetaiilsBA(body.patientId);
            let obj = {
                patientId: body.patientId,
                doctorId: body.doctorId,
                slotId: blockSlot._id,
                dayId: body.dayId,
                branchId: userInfo.branchId,
                appointmentDate: appointmentDate,
                startTime: body.startTime,
                endTime: body.endTime,
                symptoms: body.symptoms,
                allegires: body.allegires,
                consultationMode: body.consultationMode,
                consultationType: updateOldAppt.consultationType,
                appointmentStatus: "SCHEDULED",
                appointmentNumber: newAppointmentNumber,
                bookedBy: body.rescheduledBy,
                rescheduledApptId: updateOldAppt._id,
                followupId: updateOldAppt.followupId,
                createdOn: createdOn
            }
            let rescheduleAppointment = await appointmentBAObj.rescheduleAppointmentBA(obj);
            let docDetails = await appointmentBAObj.getDoctorDetailsBA(body.doctorId);
            console.log("......userInfo.......",userInfo);
            let details = {
                appointmentDate : rescheduleAppointment.appointmentDate,
                firstName : userInfo.firstName,
                lastName : userInfo.lastName,
                emailId : userInfo.emailId,
                docFirstName : docDetails.firstName,
                docEmail : docDetails.emailId,
                endTime : rescheduleAppointment.endTime,
                startTime : rescheduleAppointment.startTime
            }
            emailSender.sendAppointmentConformedEmailToPT(details);
            emailSender.sendAppointmentBookedEmailToDoctor(details);
            res.status(200).send({ status: true, data: rescheduleAppointment});
        } catch(e) {
            next(e);
        }
    };

    async paymentConsultation(req, res, next) {
        try {
            let body = req.body
            const {error} = rule.paymentConsultationRule.validate(body);
            if(error) {
                throw Boom.badData(error.message);
            }
            let ptDetails = await appointmentBAObj.patientDetaiilsBA(body.patientId);
            console.log(".....body.appointmentId.......",body);
            let appointmentData = await appointmentBAObj.getApptDetailsBA(body.appointmentId)
            console.log(".....appointmentData.......",appointmentData);
            let branchDetails = await appointmentBAObj.branchCodeBA(ptDetails.branchId)
            let info = await appointmentBAObj.getConsultationGSTBA(branchDetails.stateId);
            console.log("-----info-----",info)
            let discountPercent = 0
            if(body.promoCodes.length > 0) {
                let promoCodeResult = await appointmentBAObj.getPromoCodeListBA(body.promoCodes);
                console.log("+++++promoCodeResult+++++++",promoCodeResult)
                discountPercent = promoCodeResult.discount
            }
            let consultationfee = await appointmentBAObj.getAmountBA(appointmentData[0].consultationType);
            console.log("+++++consultationfee+++++++", consultationfee.amount)
            console.log("=====discountPercent======",discountPercent);
            let discount = ((consultationfee.amount * discountPercent)).toFixed(2);
            let Discount = discount/100
            console.log("*****discount*****",discount/100);

            // let serviceCharge = (
            //     (parseFloat(body.payableAmount) *
            //       parseFloat(info[0].medicineServiceCharge)) /
            //     100
            //   ).toFixed(2);

            let afterRemovingDiscount = (
                consultationfee.amount - parseFloat(Discount)
              ).toFixed(2);
              console.log(",,,,,,,afterRemovingDiscount,,,,,,,",afterRemovingDiscount)

            //   let afterAddingServiceCharge = (
            //     parseFloat(afterRemovingDiscount) + parseFloat(serviceCharge)
            //   ).toFixed(2);

            let gstAmount = parseFloat(((afterRemovingDiscount * parseFloat(info.consultationGST)) /100).toFixed(2));
            console.log("......gstAmount.......",gstAmount)

            let payable = (
                parseFloat(afterRemovingDiscount) +
                parseFloat(gstAmount) ).toFixed(2);

            console.log("----payable------",payable)
            let createdOn = moment().format();
            if((body.paymentMode === "cash" || body.paymentMode === "qr_code" || body.paymentMode === "swiping_machine") && payable == body.payableAmount && payable > 0) {
                let paymentObj = {
                    patientId: body.patientId,
                    doctorId: appointmentData[0].doctorId,
                    branchId: ptDetails.branchId,
                    appointmentId: body.appointmentId,
                    paymentDoneBy: body.paymentDoneBy,
                    slotId: appointmentData[0].slotId,
                    dayId: appointmentData[0].dayId,
                    paymentFor: body.paymentFor,
                    promoCodes: body.promoCodes,
                    payableAmount: payable,
                    shortUrl: null,
                    paymentRelationId: null,
                    paymentLinkId: null,
                    paymentStatus: constants.value.CREATED,
                    paymentMethod: body.paymentMode,
                    afterRemovingGST: afterRemovingDiscount,
                    GSTAmount: gstAmount,
                    discount: Discount,
                    createdOn: createdOn
                    // GSTID: obj.GSTID,
                };
                // if(body.consultationType === "FOLLOW-UP"){
                //     let updateFollowupId = await appointmentDA.updateFollowupId(body.patientId, paymentObj.appointmentId);
                // }
                let addPaymentInfo = await appointmentBAObj.addPaymentInfoBA(paymentObj);
                console.log("----addPaymentInfo----",addPaymentInfo);
                let PAYMENT_ID = addPaymentInfo._id;
                let confirmAppt = await appointmentBAObj.confirmAppointmentBA(appointmentData[0]._id, addPaymentInfo._id );
                console.log("++++++confirm Appt+++++",confirmAppt)
                let paidOn = moment().format();
                let branchCode = await appointmentBAObj.branchCodeBA(ptDetails.branchId);
                console.log("@@@@@@@  branchCode  @@@@@",branchCode)
                let invoiceNumber =  await invoiceGenerator.generateInvoiceNumber(branchCode.branchCode);
                console.log("*****invoiceNumber*****",invoiceNumber)
                let updatePaymentDetails = {
                    paymentMethod: body.paymentMode,
                    paymentStatus: "captured",
                    paymentId: PAYMENT_ID,
                    orderId: PAYMENT_ID,
                    paymentRelationId: PAYMENT_ID,
                    paidOn: paidOn,
                    appointmentId: appointmentData[0]._id,
                    paymentLinkId: PAYMENT_ID,
                    invoiceNumber: invoiceNumber
                };
                let relationId = updatePaymentDetails.paymentRelationId;
                console.log("paymentObj.paymentRelationId......",updatePaymentDetails.paymentRelationId)
                console.log("relationId,,,,,,,",relationId)
                let updatePaymentReport = await appointmentBAObj.updatePaymentReportDABA(updatePaymentDetails);
                console.log("....updatePaymentReport......",updatePaymentReport)
                if(updatePaymentReport != null) {
                    let userInfo = await appointmentBAObj.getuserInfoWithpaymentRelationIdBA(relationId);
                    console.log("-------userInfo------",userInfo);
                    let appointmentDetails = await appointmentBAObj.getAppointmentDetailsBA(updatePaymentReport.appointmentId);
                    console.log("------appointmentDetails------",appointmentDetails);
                    let consultationfee = await appointmentBAObj.getAmountBA(appointmentDetails[0].consultationType);
                    console.log("_________consultationfee________",consultationfee);
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
                    paymentMethod: updatePaymentDetails.paymentMethod,
                    hcuraId: userInfo[0].patient.hcuraId,
                    branchPhoneNumber : branchCode.branchPhoneNumber,
                    docQualification : userInfo[0].doctor.qualifaction,
                    docRegstration : userInfo[0].doctor.registerationNumber
                } 
                console.log(",,,,,,,,,,pdfDetails,,,,,,,,",pdfDetails)
                let file = await htmlToPDF.generateInvoiceForConsultation(pdfDetails);
                    // email to patient consultation invoice
                    emailSender.sendConsultationInvoiceEmail(
                        userInfo[0].patient.emailId,
                        file
                    );
                    
                    emailSender.sendPaymentSuccess(
                        userInfo[0].patient.firstName,
                        userInfo[0].patient.emailId,
                        consultationfee.amount,
                        "#" + relationId,
                        updatePaymentDetails.paymentMethod.toUpperCase()
                    );
                        
                    res.send({ success: true, data: userInfo});
                }
            } else if (payable == body.payableAmount && payable > 0) {
                // if(body.consultationType === "FOLLOW-UP"){
                //     let updateFollowupId = await appointmentDA.updateFollowupId(body.patientId, appointmentData[0]._id);
                // } 
                let payment = await paymentGateway.generatePaymentLinkConsultation(
                    ptDetails.firstName, 
                    body.phoneNumber,
                    ptDetails.emailId,
                    body.payableAmount
                );
                if (payment && payment.data.status == constants.value.CREATED) {
                let paymentObj = {
                    patientId: body.patientId,
                    doctorId: appointmentData[0].doctorId,
                    branchId:  ptDetails.branchId,
                    appointmentId: body.appointmentId,
                    paymentDoneBy: body.paymentDoneBy,
                    slotId: appointmentData[0].slotId,
                    dayId: appointmentData[0].dayId,
                    paymentFor: body.paymentFor,
                    promoCodes: body.promoCodes,
                    payableAmount: payable,
                    shortUrl: payment.data.short_url,
                    paymentRelationId: payment.data.id.substring(6),
                    paymentLinkId: payment.data.id,
                    paymentStatus: payment.data.status,
                    afterRemovingGst: afterRemovingDiscount,
                    GSTAmount: gstAmount,
                    discount: Discount,
                    createdOn: createdOn
                    // GSTID: obj.GSTID,
                };
                let addPaymentInfo = await appointmentBAObj.addPaymentInfoBA(paymentObj);
                
                await appointmentBAObj.updatePaymentDetailsAppointmentBA(body.appointmentId, addPaymentInfo._id,); 
                res.send({ success: true, data: addPaymentInfo });
                
                } else {
                    throw Boom.badData(apiResponse.ServerErrors.error.payment_not_created);
                }
            } else if(payable == body.payableAmount && payable == 0) {
                let paymentObj = {
                    patientId: body.patientId,
                    doctorId: appointmentData[0].doctorId,
                    branchId: ptDetails.branchId,
                    appointmentId: body.appointmentId,
                    paymentDoneBy: body.paymentDoneBy,
                    slotId: appointmentData[0].slotId,
                    dayId: appointmentData[0].dayId,
                    paymentFor: body.paymentFor,
                    promoCodes: body.promoCodes,
                    payableAmount: payable,
                    shortUrl: null,
                    paymentRelationId: null,
                    paymentLinkId: null,
                    paymentStatus: constants.value.CREATED,
                    paymentMethod: "zero_payment",
                    afterRemovingGST: afterRemovingDiscount,
                    GSTAmount: gstAmount,
                    discount: Discount,
                    createdOn: createdOn
                    // GSTID: obj.GSTID,
                };
                // if(body.consultationType === "FOLLOW-UP"){
                //     let updateFollowupId = await appointmentDA.updateFollowupId(body.patientId, paymentObj.appointmentId);
                // }
                let addPaymentInfo = await appointmentBAObj.addPaymentInfoBA(paymentObj);
                console.log("----addPaymentInfo----",addPaymentInfo);
                let PAYMENT_ID = addPaymentInfo._id;
                let confirmAppt = await appointmentBAObj.confirmAppointmentBA(
                    appointmentData[0]._id, addPaymentInfo._id );
                console.log("++++++confirm Appt+++++",confirmAppt)
                let paidOn = moment().format();
                let branchCode = await appointmentBAObj.branchCodeBA(ptDetails.branchId);
                console.log("@@@@@@@  branchCode  @@@@@",branchCode)
                let invoiceNumber = await invoiceGenerator.generateInvoiceNumber(branchCode.branchCode);
                console.log("*****invoiceNumber*****",invoiceNumber)
                let updatePaymentDetails = {
                    paymentMethod: "zero_payment",
                    paymentStatus: "captured",
                    paymentId: PAYMENT_ID,
                    orderId: PAYMENT_ID,
                    paymentRelationId: PAYMENT_ID,
                    paidOn: paidOn,
                    appointmentId: appointmentData[0]._id,
                    paymentLinkId: PAYMENT_ID,
                    invoiceNumber: invoiceNumber
                };
                let relationId = updatePaymentDetails.paymentRelationId;
                console.log("paymentObj.paymentRelationId......",updatePaymentDetails.paymentRelationId)
                console.log("relationId,,,,,,,",relationId)
                let updatePaymentReport = await appointmentBAObj.updatePaymentReportDABA(updatePaymentDetails);
                console.log("....updatePaymentReport......",updatePaymentReport)
                if(updatePaymentReport != null) {
                    let userInfo = await appointmentBAObj.getuserInfoWithpaymentRelationIdBA(relationId);
                    console.log("-------userInfo------",userInfo);
                    let appointmentDetails = await appointmentBAObj.getAppointmentDetailsBA(updatePaymentReport.appointmentId);
                    console.log("------appointmentDetails------",appointmentDetails);
                    let consultationfee = await appointmentBAObj.getAmountBA(appointmentDetails[0].consultationType);
                    console.log("_________consultationfee________",consultationfee);
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
                        paymentMethod: updatePaymentDetails.paymentMethod,
                        hcuraId: userInfo[0].patient.hcuraId,
                        branchPhoneNumber : branchCode.branchPhoneNumber,
                        docQualification : userInfo[0].doctor.qualifaction,
                        docRegstration : userInfo[0].doctor.registerationNumber
                    }
                    console.log(",,,,,,,,,,pdfDetails,,,,,,,,",pdfDetails)
                    let file = await htmlToPDF.generateInvoiceForConsultation(pdfDetails);
                        
                    emailSender.sendConsultationInvoiceEmail(
                        userInfo[0].patient.emailId,
                        file
                    );
                        
                    emailSender.sendPaymentSuccess(
                        userInfo[0].patient.firstName,
                        userInfo[0].patient.emailId,
                        consultationfee.amount,
                        "#" + relationId,
                        updatePaymentDetails.paymentMethod.toUpperCase()
                    );
                    res.send({ success: true, data: userInfo});
                }
            } else {
                res.status(500).send({ status: false, data: "Payment Method is Wrong Please Contact Tech-Team"});
            }
            // res.status(200).send({ status: true, data: {ptDetails,appointmentData}});
        } catch(e) {
            next(e);
        }
    };

    async getPatientList(req, res, next) {
        try {
          const payload = req.body;
          let page = payload.page;
          let limit = constants.pageConstants.pageLength;
          let roleId = payload.roleId
          let branchId = payload.branchId
          const patientList = await appointmentBAObj.getPatientListBA(
            payload.type,
            page,
            limit,
            payload.search,
            roleId,
            branchId
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

    async getPatientDetails(req, res, next) {
        try {
            let body = req.body
            const {error} = rule.hcuraIdRule.validate(body);
            if(error){
                throw Boom.badData(error.message);
            }
            let patientDetails = await appointmentBAObj.getpatientDetailsBA(body.hcuraId);
            res.status(200).send({ status: true, data: patientDetails});
        } catch(e) {
            next(e);
        }
    };

    async insertOccupation(req, res, next) {
        try {
            let body = req.body
            let result = await appointmentBAObj.insertOccuptionBA(body);
            res.send({ success: true, data: result});
        } catch(e) {
            next(e);
        }
    };

    async insertSource(req, res, next) {
        try {
            let body = req.body
            let result = await appointmentBAObj.insertSourceBA(body);
            res.send({ success: true, data: result});
        } catch(e) {
            next(e);
        }
    };

    async insertStates(req, res, next) {
        try {
            let body = req.body
            let result = await appointmentBAObj.insertStatesBA(body);
            res.send({ success: true, data: result});
        } catch(e) {
            next(e);
        }
    }

    async getSourceOccuptionList(req, res, next) {
        try {
            let result = await appointmentBAObj.getSourceOccuptionListBA();
            res.send({ success: true, data: result});
        } catch(e) {
            next(e);
        }
    };

    async getStateList(req, res, next) {
        try {
            let result = await appointmentBAObj.getStateListBA();
            res.send({ success: true, data: result});
        } catch(e) {
            next(e);
        }
    };

    async insertSymptomsAllergies(req, res, next) {
        try {
            let body = req.body
            let result = await appointmentBAObj.insertSymptomsAllergiesBA(body);
            res.send({ success: true, data: result});
        } catch(e) {
            next(e);
        }
    };

    async getSymptomsAllegiresList(req, res, next) {
        try {
            let result = await appointmentBAObj.getSymptomsAllegiresListBA();
            res.send({ success: true, data: result});
        } catch(e) {
            next(e);
        }
    };

    async getDoctorsList(req, res, next) {
        try {
            let result = await appointmentBAObj.getDoctorsListBA();
            res.send({ success: true, data: result});
        } catch(e) {
            next(e);
        }
    };

    async getConsultationPromocodes(req, res, next) {
        try {
          let result = await appointmentBAObj.getPromoListConsultationBA();
          res.send({success: true, data: result});
        } catch(e) {
          next(e);
        }
    };

    async getPatientDetailsConsultationPayment(req, res, next) {
        try {
            let body = req.body
            const { error } = rule.searchHcuraIdRule.validate(body);
            if (error) {
              throw Boom.badData(error.message);
            }
            let obj = await appointmentBAObj.getAppointmentDetailsPaymentDetailsBA(body.hcuraId, body.roleId, body.branchId);
            res.status(200).send({ status: true, data: obj});
        } catch(e) {
            next(e);
        }
    };

    async getPaymentDetailsAppointment(req, res, next) {
        try {
            let body = req.body
            const { error } = rule.appointmentIdRule.validate(body);
            if (error){
              throw Boom.badData(error.message);
            }
            let obj = await appointmentBAObj.getAppointmentPaymentDetailsBA(body.appointmentId);
            res.status(200).send({ status: true, data: obj });
        } catch(e) {
            next(e);
        }
    };

    async getConsultationAmount(req, res, next) {
        try {
            let body = req.body
            const { error } = rule.consultationTypeRule.validate(body);
            if (error){
              throw Boom.badData(error.message);
            }
            let obj = await appointmentBAObj.getAmountBA(body.consultationType);
            res.status(200).send({ status: true, data: obj });
        } catch(e) {
            next(e);
        }
    };

    async validatePromoCode(req, res, next) {
        try {
            let body = req.body;
            console.log("+++++body+++++++",body);
            const { error } = rule.promoCodeRule.validate(body);
            if (error) {
              throw Boom.badData(error.message);
            }
            let promoCode = body.promoCode.toUpperCase();
            let result = await appointmentBAObj.validatePromoCodeBA(promoCode);
            console.log("+++++result+++++++",result);
            if(result){
                res.send({ success: true, data: result});
            } else{
                res.send({ success: false, data: "No Promo codes avaliable"});
            }
            
        } catch(e) {
            next(e);
        }
    };

    async avaliableSlots(req, res, next) {
        try {
            let body = req.body;
            const { error } = rule.avaliableSlotsRule.validate(body);
            if (error) {
              throw Boom.badData(error.message);
            }
            let result = await appointmentBAObj.getRemainingSlotsAndTimingsBA(body.doctorId ,body.selectedDate);
            res.send({ success: true, data: result});
        } catch(e) {
            next(e);
        }
    };

    async getPackageList(req, res, next) {
        try {
            let result = await appointmentBAObj.getpackageListBA()
            res.send({ success: true, data: result});
        } catch(e) {
            next(e);
        }
    };

    async getAstheticList(req, res, next) {
        try {
            let result = await appointmentBAObj.getAstheticListBA()
            res.send({ success: true, data: result});
        } catch(e) {
            next(e);
        }
    };
    async getHairpackageList(req, res, next){
        try{
            let result = await appointmentDA.getHairpackageList()
            res.send({ success: true, data: result});
        } catch(e){
            next(e);
        }
    };
     async getDentalpackageList(req, res, next){
        try{
            let result = await appointmentDA.getDentalpackageList()
            res.send({ success: true, data: result});
        } catch(e){
            next(e);
        }
    };
    async packagePayment(req, res, next){
        try{
            let body = req.body
            console.log(".....body.......",body);
            const { error } = rule.paymenPackageRule.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let ptDetails = await appointmentBAObj.patientDetaiilsBA(body.patientId);
            console.log(".....ptDetails.......",ptDetails);

            let branchDetails = await appointmentBAObj.branchCodeBA(ptDetails.branchId);
            let info = await appointmentBAObj.getConsultationGSTBA(branchDetails.stateId);
            console.log("-----info-----",info)

            let appointmentData = await appointmentBAObj.getApptDetailsBA(body.appointmentId);
            console.log(".....appointmentData.......",appointmentData);

            let packageDetails = await appointmentBAObj.getPackageDetailsBA(body.packageId);
            console.log(".....packageDetails.......",packageDetails);
            let createdOn = moment().format();
            let discountPercent = 0
            if(body.promoCodes.length > 0) {
            console.log("+++++body.promoCodes.length+++++++",body.promoCodes.length);
            let promoCodeResult = await appointmentBAObj.getPromoCodeListBA(body.promoCodes);
            console.log("+++++promoCodeResult+++++++",promoCodeResult);
            discountPercent = promoCodeResult.discount
            }
            console.log("=====discountPercent======",discountPercent);

            let discount = ((packageDetails.amount * discountPercent)).toFixed(2);
            let Discount = discount/100
            console.log("*****discount*****",Discount);

            let afterRemovingDiscount = (
                packageDetails.amount - parseFloat(Discount)
            ).toFixed(2);
            console.log(",,,,,,,afterRemovingDiscount,,,,,,,",afterRemovingDiscount)
            
            let gstAmount = parseFloat(((afterRemovingDiscount * parseFloat(info.consultationGST)) /100).toFixed(2));
            console.log("......gstAmount.......",gstAmount)

            let payable = (
                parseFloat(afterRemovingDiscount) +
                parseFloat(gstAmount)).toFixed(2);

            console.log("----payable------",payable);
            let roundedDownPayable = Math.floor(payable);
            console.log("----payable------",roundedDownPayable);
            let payableAmount = body.payableAmount
            if(payable == payableAmount) {
                if(body.paymentMode === "online") {
                    let payment = await paymentGateway.generatePaymentLinkPackage(
                        ptDetails.firstName, 
                        body.phoneNumber,
                        ptDetails.emailId,
                        payableAmount
                    );
                    if (payment && payment.data.status == constants.value.CREATED) {
                        let paymentObj = {
                            patientId: body.patientId,
                            doctorId: appointmentData[0].doctorId,
                            branchId:  ptDetails.branchId,
                            appointmentId: body.appointmentId,
                            paymentDoneBy: body.paymentDoneBy,
                            paymentFor: "HOMEOPATHY",
                            promoCodes: body.promoCodes,
                            payableAmount: payable,
                            packageId: body.packageId,
                            shortUrl: payment.data.short_url,
                            paymentRelationId: payment.data.id.substring(6),
                            paymentLinkId: payment.data.id,
                            paymentStatus: payment.data.status,
                            afterRemovingGst: afterRemovingDiscount,
                            GSTAmount: gstAmount,
                            discount: Discount,
                            createdOn: createdOn
                            // GSTID: obj.GSTID,
                        };
                        let addPaymentInfo = await appointmentBAObj.addPaymentInfoBA(paymentObj);
                        console.log("------------addPaymentInfo------",addPaymentInfo)
                        let updatePackageDetailsInAppt = await appointmentBAObj.updatePackageDetailsInApptBA(
                            body.appointmentId, addPaymentInfo._id, body.packageId);
                            console.log("------------updatePackageDetailsInAppt------",updatePackageDetailsInAppt)
                        res.send({ success: true, data: addPaymentInfo});
                    } else {
                        throw Boom.badData(apiResponse.ServerErrors.error.payment_not_created);
                    }
                } else {
                    console.log("-------entered------")
                    let paymentObj = {
                        afterRemovingGST: afterRemovingDiscount,
                        GSTAmount: gstAmount,
                        discount: Discount,
                        payableAmount: payable,
                        paymentDoneBy: body.paymentDoneBy,
                        remarks: body.remarks,
                        promoCodes: body.promoCodes,
                        paymentStatus: constants.value.CREATED,
                        paymentFor: 'HOMEOPATHY',
                        shortUrl: null,
                        packageId: body.packageId,
                        paymentRelationId: null,
                        paymentLinkId: null,
                        patientId: body.patientId,
                        doctorId: appointmentData[0].doctorId,
                        branchId:  ptDetails.branchId,
                        appointmentId: body.appointmentId,
                        packageId: body.packageId,
                        createdOn: createdOn
                        // GSTID: obj.GSTID,
                    };
                    let addPaymentInfo = await appointmentBAObj.addPackagePaymentInfoBA(paymentObj);
                    console.log("=========  addPaymentInfo  =========",addPaymentInfo)
                    console.log("=========   body.packageId  =========",body.packageId)
                    let updatePackageDetailsInAppt = await appointmentBAObj.updatePackageDetailsInApptBA(
                        body.appointmentId, addPaymentInfo._id, body.packageId);
                    console.log("=========  updatePackageDetailsInAppt  =========",updatePackageDetailsInAppt)
                    let PAYMENT_ID = addPaymentInfo._id
                    let paidOn = moment().format();
                    let branchCode = await appointmentBAObj.branchCodeBA(ptDetails.branchId);
                    console.log("@@@@@@@  branchCode  @@@@@",branchCode)
                    let invoiceNumber = await invoiceGenerator.generateInvoiceNumber(branchCode.branchCode);
                    let obj = {
                        paymentMethod: body.paymentMode,
                        paymentStatus: "captured",
                        paymentId: PAYMENT_ID,
                        paymentRelationId: PAYMENT_ID,
                        paidOn: paidOn,
                        appointmentId: body.appointmentId,
                        paymentLinkId: PAYMENT_ID,
                        invoiceNumber: invoiceNumber
                    };
                    let relationId = obj.paymentRelationId;
                    let updatePaymentReport = await appointmentBAObj.updatePaymentByPaymentIdBA(obj);
                    console.log("=========  updatePaymentReport  =========",updatePaymentReport)
                    let endDate =  moment(updatePaymentReport.paidOn).add(parseInt(packageDetails.months), 'months');
                    if (!endDate.isValid()) {
                        endDate = moment(startDate).endOf('month');
                    }
                    let packageSchedules = {
                        patientId: updatePaymentReport.patientId,
                        packageId: updatePaymentReport.packageId,
                        paymentId: updatePaymentReport._id,
                        endDate: endDate,
                        paidOn: updatePaymentReport.paidOn,
                    }
                    let insertPackageSchedules = await appointmentBAObj.insertPackageSchedulesBA(packageSchedules);
                    console.log("=========  insertPackageSchedules  =========",insertPackageSchedules)
                    let details ={
                        endDate: insertPackageSchedules.endDate,
                        _id: insertPackageSchedules._id
                    }
                    //   schedule package is not working
                    await schedulers.changeisActiveStatusPackage(details)
                    let userInfo = await appointmentBAObj.getuserInfoWithpaymentRelationIdBA(relationId);
                    console.log("-------userInfo------",userInfo);
                    let pdfDetails = {
                        invoiceNumber: updatePaymentReport.invoiceNumber,
                        firstName: userInfo[0].patient.firstName,
                        lastName: userInfo[0].patient.lastName,
                        paidOn: updatePaymentReport.paidOn,
                        age: userInfo[0].patient.birthDate,
                        gender: userInfo[0].patient.gender,
                        docFirstName: userInfo[0].doctor.firstName,
                        docLastName: userInfo[0].doctor.lastName,
                        serviceCharges: updatePaymentReport.serviceCharges,
                        discount: updatePaymentReport.discount,
                        GST: "0%", // needs to work on gst
                        payableAmount: updatePaymentReport.payableAmount,
                        paymentMethod: updatePaymentReport.paymentMethod,
                        docQualification: userInfo[0].doctor.qualifaction,
                        hcuraId: userInfo[0].patient.hcuraId,
                        packageName: packageDetails.name,
                        packageAmount: packageDetails.amount,
                        docRegstration : userInfo[0].doctor.registerationNumber,
                        branchPhoneNumber: branchCode.branchPhoneNumber
                    }
                    console.log("--------pdfDetails-------", pdfDetails)
                    emailSender.sendPackagePaymentSuccess(
                        userInfo[0].patient.firstName,
                        userInfo[0].patient.emailId,
                        updatePaymentReport.payableAmount,
                        "#" + relationId,
                        updatePaymentReport.paymentMethod,
                        packageDetails.name,
                    );

                    let file = await htmlToPDF.generateInvoiceForPackage(pdfDetails);
                    console.log("111111111111     ",userInfo[0].patient)
                    emailSender.sendPackageInvoiceEmail(userInfo[0].patient.emailId, file);
                    console.log("2222222222222")
                    res.send({ success: true, data: userInfo});
                }
            } else {
                throw Boom.internal(apiResponse.ServerErrors.error.illegial);
            }
        } catch(e) {
            next(e);
        }
    };

    async addAdvancePayment(req, res, next) {
        try {
            let body = req.body;
            console.log("Received advance payment request:", body);
    
            // Validate request body using Joi
            const { error } = rule.advancePaymentRule.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
    
            let paymentDetails = {
                patientId: body.patientId,
                totalAdvance: body.payableAmount,
                paymentMode: body.paymentMode,
                paymentDoneBy: body.paymentDoneBy,
                shortUrl: body.shortUrl || null,
                paymentRelationId: body.paymentRelationId || null,
                paymentLinkId: body.paymentLinkId || null,
                debitedAmount : 0
            };
    
            let result = await appointmentDA.addAdvancePackagePaymentInfo(paymentDetails);
            res.send(result);
    
        } catch (e) {
            next(e);
        }
    }
async   getBranchPatientSummary(req, res, next) {
  try {
    const { startDate, endDate, branchId, patientId } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({ success: false, message: "Start and end date required" });
    }

    const result = await appointmentDA.getBranchAndPatientAdvanceSummary(startDate, endDate, branchId, patientId);
    res.send(result);
  } catch (err) {
    next(err);
  }
}
// async  getBranchPatientSummary(req, res, next) {
//   try {
//     const { startDate, endDate, branchId } = req.body;

//     if (!startDate || !endDate) {
//       return res.status(400).json({ success: false, message: "Start and end date required" });
//     }

//     const result = await appointmentDA.getBranchAndPatientAdvanceSummary(startDate, endDate, branchId);
//     res.send(result);
//   } catch (err) {
//     next(err);
//   }
// }

    async paymentAsthetic(req, res, next){
        try{
            let body = req.body
            const { error } = rule.paymenPackageRule.validate(body);
            if (error) {
              throw Boom.badData(error.message);
            }
            console.log(".....body.......",body);
            let ptDetails = await appointmentBAObj.patientDetaiilsBA(body.patientId);
            console.log(".....ptDetails.......",ptDetails);

            let branchDetails = await appointmentBAObj.branchCodeBA(ptDetails.branchId)

            let info = await appointmentBAObj.getConsultationGSTBA(branchDetails.stateId);
            console.log("-----info-----",info)

            let appointmentData = await appointmentBAObj.getApptDetailsBA(body.appointmentId);
            console.log(".....appointmentData.......",appointmentData);

            let packageDetails = await appointmentBAObj.getPackageDetailsBA(body.packageId);
            console.log(".....packageDetails.......",packageDetails);
            let createdOn = moment().format();
            let discountPercent = 0
            if(body.promoCodes.length > 0){
            let promoCodeResult = await appointmentBAObj.getPromoCodeListBA(body.promoCodes);
            console.log("+++++promoCodeResult+++++++",promoCodeResult);
            discountPercent = promoCodeResult.discount
            }
            let discount = ((packageDetails.amount * discountPercent)).toFixed(2);
            let Discount = discount/100
            console.log("*****discount*****",Discount);

            let afterRemovingDiscount = (
                packageDetails.amount - parseFloat(Discount)
            ).toFixed(2);
            console.log(",,,,,,,afterRemovingDiscount,,,,,,,",afterRemovingDiscount)

            let gstAmount = 0
            let CGST = 0
            let SGST = 0
            let IGST = 0
            if(info.stateCode == "KA") {
                let CGSTSGST = parseFloat(info.CGST) + parseFloat(info.SGST)
                gstAmount = parseFloat(((afterRemovingDiscount * parseFloat(CGSTSGST)) /100).toFixed(2));
                CGST = parseFloat((gstAmount/2));
                SGST = parseFloat((gstAmount/2));
            } else {
                gstAmount = parseFloat(((afterRemovingDiscount * parseFloat(info.IGST)) /100).toFixed(2));
                console.log("......gstAmount.......",gstAmount)
                IGST = parseFloat((gstAmount));
            }

            let payable = (
                parseFloat(afterRemovingDiscount) +
                parseFloat(gstAmount)).toFixed(2);

            console.log("----payable------",payable);
            let roundedDownPayable = Math.floor(payable);
            console.log("----payable------",roundedDownPayable);
            
            let payableAmount = body.payableAmount
            let roundedDownPayableAmount = Math.floor(payableAmount);
            console.log("----payableAmount------",payableAmount);
            if(roundedDownPayable == roundedDownPayableAmount) {
                if(body.paymentMode === "online") {
                    let payment = await paymentGateway.generatePaymentLinkPackage(
                        ptDetails.firstName, 
                        body.phoneNumber,
                        ptDetails.emailId,
                        roundedDownPayable
                    );
                    if (payment && payment.data.status == constants.value.CREATED) {
                        let paymentObj = {
                            patientId: body.patientId,
                            doctorId: appointmentData[0].doctorId,
                            branchId:  ptDetails.branchId,
                            appointmentId: body.appointmentId,
                            paymentDoneBy: body.paymentDoneBy,
                            paymentFor: "ASTHETIC",
                            promoCodes: body.promoCodes,
                            payableAmount: payable,
                            packageId: body.packageId,
                            shortUrl: payment.data.short_url,
                            paymentRelationId: payment.data.id.substring(6),
                            paymentLinkId: payment.data.id,
                            paymentStatus: payment.data.status,
                            afterRemovingGst: afterRemovingDiscount,
                            GSTAmount: gstAmount,
                            discount: Discount,
                            SGST: SGST,
                            CGST: CGST,
                            IGST: IGST,
                            createdOn: createdOn
                            // GSTID: obj.GSTID,
                        };
                        let addPaymentInfo = await appointmentBAObj.addPaymentInfoBA(paymentObj);
                        console.log("------------addPaymentInfo------",addPaymentInfo)
                        let updateAstheticPackageDetailsInAppt = await appointmentBAObj.updateAstheticPackageDetailsInApptBA(
                            body.appointmentId, addPaymentInfo._id, body.packageId);
                            console.log("------------updateAstheticPackageDetailsInAppt------",updateAstheticPackageDetailsInAppt)
                        res.send({ success: true, data: addPaymentInfo});
                    } else {
                        throw Boom.badData(apiResponse.ServerErrors.error.payment_not_created);
                    }
                } else {
                    console.log("-------entered------")
                    let paymentObj = {
                        afterRemovingGST: afterRemovingDiscount,
                        GSTAmount: gstAmount,
                        discount: Discount,
                        payableAmount: payable,
                        paymentDoneBy: body.paymentDoneBy,
                        remarks: body.remarks,
                        promoCodes: body.promoCodes,
                        paymentStatus: constants.value.CREATED,
                        paymentFor: 'ASTHETIC',
                        shortUrl: null,
                        packageId: body.packageId,
                        paymentRelationId: null,
                        paymentLinkId: null,
                        patientId: body.patientId,
                        doctorId: appointmentData[0].doctorId,
                        branchId:  ptDetails.branchId,
                        appointmentId: body.appointmentId,
                        SGST: SGST,
                        CGST: CGST,
                        IGST: IGST,
                        createdOn: createdOn
                        // GSTID: obj.GSTID,
                    };
                    let addPaymentInfo = await appointmentBAObj.addPackagePaymentInfoBA(paymentObj);
                    console.log("=========  addPaymentInfo  =========",addPaymentInfo)
                    console.log("=========   body.packageId  =========",body.packageId)
                    let updateAstheticPackageDetailsInAppt = await appointmentBAObj.updateAstheticPackageDetailsInApptBA(
                        body.appointmentId, addPaymentInfo._id, body.packageId);
                    console.log("=========  updateAstheticPackageDetailsInAppt  =========",updateAstheticPackageDetailsInAppt)
                    let PAYMENT_ID = addPaymentInfo._id
                    let paidOn = moment().format();
                    let branchCode = await appointmentBAObj.branchCodeBA(ptDetails.branchId);
                    console.log("@@@@@@@  branchCode  @@@@@",branchCode)
                    let invoiceNumber = await invoiceGenerator.generateInvoiceNumberAsthetic(branchCode.branchCode);
                    let obj = {
                        paymentMethod: body.paymentMode,
                        paymentStatus: "captured",
                        paymentId: PAYMENT_ID,
                        paymentRelationId: PAYMENT_ID,
                        paidOn: paidOn,
                        appointmentId: body.appointmentId,
                        paymentLinkId: PAYMENT_ID,
                        invoiceNumber: invoiceNumber
                    };
                    let relationId = obj.paymentRelationId;
                    let updatePaymentReport = await appointmentBAObj.updatePaymentByPaymentIdBA(obj);
                    console.log("=========  updatePaymentReport  =========",updatePaymentReport)
                    let endDate =  moment(updatePaymentReport.paidOn).add(parseInt(packageDetails.months), 'months');
                    if (!endDate.isValid()) {
                      endDate = moment(startDate).endOf('month');
                    }
                    let packageSchedules = {
                        userId: updatePaymentReport.userId,
                        packageId: updatePaymentReport.packageId,
                        paymentId: updatePaymentReport._id,
                        endDate: endDate,
                        paidOn: updatePaymentReport.paidOn,
                    }
                    let insertPackageSchedules = await appointmentBAObj.insertPackageSchedulesBA(packageSchedules);
                    console.log("=========  insertPackageSchedules  =========",insertPackageSchedules)
                    let details ={
                        endDate: insertPackageSchedules.endDate,
                        _id: insertPackageSchedules._id
                    }
                    
                    await schedulers.changeisActiveStatusPackage(details)
                    let userInfo = await appointmentBAObj.getuserInfoWithpaymentRelationIdBA(relationId);
                    console.log("-------userInfo------",userInfo);
                    let pdfDetails = {
                        invoiceNumber: updatePaymentReport.invoiceNumber,
                        firstName: userInfo[0].patient.firstName,
                        lastName: userInfo[0].patient.lastName,
                        paidOn: updatePaymentReport.paidOn,
                        age: userInfo[0].patient.birthDate,
                        gender: userInfo[0].patient.gender,
                        docFirstName: userInfo[0].doctor.firstName,
                        docLastName: userInfo[0].doctor.lastName,
                        serviceCharges: updatePaymentReport.serviceCharges,
                        discount: updatePaymentReport.discount,
                        SGST: updatePaymentReport.SGST,
                        CGST: updatePaymentReport.CGST,
                        IGST: updatePaymentReport.IGST,
                        UGST: updatePaymentReport.UGST,
                        payableAmount: updatePaymentReport.payableAmount,
                        paymentMethod: updatePaymentReport.paymentMethod,
                        docQualification: userInfo[0].doctor.qualifaction,
                        hcuraId: userInfo[0].patient.hcuraId,
                        packageName: packageDetails.name,
                        packageAmount: packageDetails.amount,
                        docRegstration : userInfo[0].doctor.registerationNumber,
                        branchPhoneNumber: branchCode.branchPhoneNumber,
                        remarks: updatePaymentReport.remarks
                    }
                    console.log("--------pdfDetails-------", pdfDetails)
                    emailSender.sendAstheticPaymentSuccess(
                        userInfo[0].patient.firstName,
                        userInfo[0].patient.emailId,
                        updatePaymentReport.payableAmount,
                        "#" + relationId,
                        updatePaymentReport.paymentMethod,
                        packageDetails.name,
                    );

                    let file = await htmlToPDF.generateInvoiceForAsthetic(pdfDetails);
                    console.log("111111111111     ",userInfo[0].patient)
                    emailSender.sendAstheticInvoiceEmail(userInfo[0].patient.emailId, file);
                    console.log("2222222222222")

                    res.send({ success: true, data: userInfo});
                }
            } else {
                throw Boom.internal(apiResponse.ServerErrors.error.illegial);
            } 
        } catch(e) {
            next(e);
        }
    };

 
  async settledPayment(req, res, next) {
    try {
      const body = req.body;
//   let file;
      // Step 1: Create payment record (like in old flow, but no appointmentId)
      const paymentData = {
        patientId: body.patientId,
        doctorId: body.doctorId,
        branchId: body.branchId,
        packageId: body.packageId,
        paymentDoneBy: body.paymentDoneBy,
        paymentFor: body.paymentFor,
        // remarks: body.remarks,
        promoCodes: body.promoCodes || "",
        payableAmount: body.payableAmount,
        discount: body.discount || 0,
        SGST: body.SGST || 0,
        CGST: body.CGST || 0,
        IGST: body.IGST || 0,
        UGST: body.UGST || 0,
        GSTAmount: body.GSTAmount || 0,
        paymentMethod: body.paymentMethod || "cash",
        paymentStatus: "PAID",
        paidOn: body.paidOn || new Date(),
        createdOn: body.createdOn || new Date(),
        afterRemovingGST: body.afterRemovingGST,
        phoneNumber: body.phoneNumber,
        sessions: body.sessions || [] , // ✅ Add this line,
        isGstApplicable: body.isGstApplicable || false, // ✅ Add this line
      };
  
      console.log(paymentData,"paymentdataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      // Add payment info (similar to the old flow)
      const addPaymentInfo = await appointmentDA.addSettledPaymentInfo(paymentData);
      console.log(addPaymentInfo._id,"@@@@@@@@@@@@@@@@@@@@")
      const paymentId = addPaymentInfo._id;
  
      // Step 2: Generate invoice number and update payment record (same as old flow)
      const branchDetails = await appointmentDA.branchCode(body.branchId);
    //   const invoiceNumber = await invoiceGenerator.generateInvoiceNumber(branchDetails.branchCode);
    let invoiceNumber;
    if (
      body.paymentFor &&
      ["SKIN", "HAIR" ].includes(body.paymentFor.toUpperCase())
    ) {
      invoiceNumber = await invoiceGenerator.generateInvoiceNumberAsthetic(branchDetails.branchCode);
    } else {
      invoiceNumber = await invoiceGenerator.generateInvoiceNumber(branchDetails.branchCode);
    }
    
 
       const paymentUpdateObj = {
        paymentId,
        paymentRelationId: paymentId,
        paymentStatus: "captured",
        paidOn: body.paidOn || new Date(),
        paymentMethod: body.paymentMethod,
        paymentLinkId: paymentId,
        invoiceNumber,
      };
  
      
      const updatedPayment = await appointmentDA.updatePaymentByPaymentId(paymentUpdateObj);
      //updatePaymentByPaymentIdBA
 
      // Step 3: Generate and email invoice (same as old flow)
      const userInfo = await appointmentDA.getUserInfo(paymentId);
       const packageDetails = await appointmentDA.getPackageDetails(body.packageId);
  
      // Prepare PDF details (same as in the old flow)
      const months = body.sessions.map(session => session.month).join(', ');
      const amount = body.sessions.map(session => session.amount).join(', ');

      const pdfDetails = {
        // invoiceNumber : addPaymentInfo.invoiceNumber,
        invoiceNumber: updatedPayment.invoiceNumber,
        firstName: userInfo[0].patient.firstName,
        lastName: userInfo[0].patient.lastName,
        paidOn: paymentUpdateObj.paidOn,
        age: userInfo[0].patient.birthDate,
        gender: userInfo[0].patient.gender,
        docFirstName: userInfo[0].doctor.firstName,
        docLastName: userInfo[0].doctor.lastName,
        serviceCharges: updatedPayment.serviceCharges,
        discount: body.discount,
        SGST: body.SGST,
        CGST: body.CGST,
        IGST: body.IGST,
        UGST: body.UGST,
        payableAmount: body.payableAmount,
        paymentMethod: body.paymentMethod,
        docQualification: userInfo[0].doctor.qualifaction,
        hcuraId: userInfo[0].patient.hcuraId,
        packageName: packageDetails.name,
        packageAmount: packageDetails.amount,
        docRegstration: userInfo[0].doctor.registerationNumber,
        branchPhoneNumber: branchDetails.branchPhoneNumber,
        remarks: body.remarks,
        months: months,
        sessionAmount: amount,
        paidAmount : body.afterRemovingGST,
        GSTNumber: "29AAIFL8357M1ZG"
        
      };
  console.log(pdfDetails,"pdfdetailsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  
    let file;
        try {
        if (["SKIN", "HAIR"].includes(body.paymentFor?.toUpperCase())) {
            file = await htmlToPDF.generateInvoiceForAsthetic(pdfDetails);
            console.log(file,"fileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeAsthetics")
        } else if(["DENTAL"].includes(body.paymentFor?.toUpperCase())) {
            file = await htmlToPDF.generateInvoiceForDental(pdfDetails);
        }else{
            file = await htmlToPDF.generateInvoiceForPackage(pdfDetails);

        }
         } catch (err) {
         // Optional: You can still proceed or return here
        return res.status(500).json({ success: false, message: "PDF generation failed" });
        }
 
        try {
             if (["SKIN", "HAIR"].includes(body.paymentFor?.toUpperCase())) {
      let emailsender = await emailSender.sendAstheticInvoiceEmail(userInfo[0].patient.emailId, file);
            console.log(emailsender,"emailsenderrrrrrrrrrrrrrrrrrrrrrrAsthetics")
             } else if (body.paymentFor === "DENTAL")
              {
      let emailsender = await emailSender.sendDentalInvoiceEmail(userInfo[0].patient.emailId, file);
           //sendInvoiceEmail
              }else{
        let emailsender = await emailSender.sendPackageInvoiceEmail(userInfo[0].patient.emailId, file);
              }

        await emailSender.sendPaymentSuccessEmail(
            userInfo[0].patient.firstName,
            userInfo[0].patient.emailId,
            body.payableAmount,
            "#" + paymentId,
            body.paymentMethod,
            packageDetails.name
        );
        } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // You may return warning, but don't throw error unless it's critical
        }

      res.send({ success: true, data: userInfo });
    } catch (e) {
      next(e);
    }
  }
  
 
      

    async insertEstimation(req, res, next){
        try{
            let body = req.body
            const { error } = rule.createEstimationRule.validate(body);
            if (error) {
              throw Boom.badData(error.message);
            }
            let result = await appointmentBAObj.createEstimationBA(body);
            res.send({ success: true, data: result});
        } catch(e) {
            next(e);
        }
    };

    async getPatientDetilsPackage(req, res, next) {
        try {
            let body = req.body
            const { error } = rule.searchHcuraIdRule.validate(body);
            if (error) {
              throw Boom.badData(error.message);
            }
            let result = await appointmentBAObj.getPatientDetailsPackagePaymentsBA(body.hcuraId, body.roleId, body.branchId);
            res.status(200).send({ status: true, data: result });
        } catch(e) {
            next(e);
        }
    };

    async getPaymentDetailsByApptId(req, res, next) {
        try {
            let body = req.body
            const { error } = rule.appointmentIdRule.validate(body);
            if (error){
              throw Boom.badData(error.message);
            }
            
            let result =  await appointmentDA.getPaymentDetailsByAppointmentId(body.appointmentId);
             res.status(200).send({ status: true, data: result });
        } catch(e){
            next(e);
        }
    };

    async getPatientAndPaymentDetailsForExternal(req, res, next) {
        try {
            let body = req.body
            const { error } = rule.searchHcuraIdRule.validate(body);
            if (error) {
              throw Boom.badData(error.message);
            }
            let result = await appointmentBAObj.getPatientAndPaymentDetailsForExternalBA(body.hcuraId, body.roleId, body.branchId);
            res.status(200).send({ status: true, data: result });
        } catch(e) {
            next(e);
        }
    };

    async paymentExternalSource(req, res, next) {
        try {
            let body = req.body
            const { error } = rule.paymentExtrnalSourceRule.validate(body);
            if (error) {
              throw Boom.badData(error.message);
            }
            let ptDetails = await appointmentBAObj.patientDetaiilsBA(body.patientId);
            let obj = {
                emailId: ptDetails.emailId,
                phoneNumber: body.phoneNumber,
                patientId: body.patientId,
                payableAmount: parseFloat(body.payableAmount),
                countryCode: ptDetails.countryCode,
                prescribedBy : body.prescribedBy,
                remarks : body.remarks,
                branchId: ptDetails.branchId,
                firstName : ptDetails.firstName
            };
            // GST NOT CALCULATING FOR EXTERNAL PAYMENTS
            let amount = parseFloat(body.payableAmount)
            let createdOn = moment().format();
            if(body.paymentMode == 'online'){
                let paymentLink = await paymentGateway.externalSourcePayment(obj, amount);
                if (paymentLink && paymentLink.data.status == constants.value.CREATED) {
                    let paymentObj = {
                        paymentDoneBy: body.paymentDoneBy,
                        paymentFor: "EXTERNAL_SOURCE",
                        payableAmount: amount,
                        GST: 0,
                        afterRemovingGst: amount,
                        paymentStatus: paymentLink.data.status,
                        shortUrl: paymentLink.data.short_url,
                        paymentLinkId: paymentLink.data.id,
                        paymentRelationId: paymentLink.data.id.substring(6),
                        createdOn: createdOn 
                    };
                    let addPaymentInfo = await appointmentBAObj.addExternalSourcePaymentInfoBA(obj, paymentObj);
                    console.log("++++++++addPaymentInfo++++++",addPaymentInfo)
                    res.send({ success: true, data: addPaymentInfo });
                } else {
                    throw Boom.badData(
                        apiResponse.ServerErrors.error.payment_not_created
                    );
                }
            } else {
                let paymentObj = {
                    afterRemovingGst: amount,
                    GST: 0,
                    payableAmount: amount,
                    paymentDoneBy: body.paymentDoneBy,
                    paymentStatus: constants.value.CREATED,
                    paymentFor: "EXTERNAL_SOURCE",
                    shortUrl: null,
                    paymentRelationId: null,
                    paymentLinkId: null,
                    createdOn: createdOn
                };
                let addPaymentInfo = await appointmentBAObj.addExternalSourcePaymentInfoBA(obj, paymentObj);
                let PAYMENT_ID = addPaymentInfo._id;
                let paidOn = moment().format();
                let branchCode = await appointmentBAObj.branchCodeBA(ptDetails.branchId);
                let invoiceNumber = await invoiceGenerator.generateInvoiceNumber(branchCode.branchCode);
                let updatePaymentDetails = {
                    paymentMethod: body.paymentMode,
                    paymentStatus: "captured",
                    paymentId: PAYMENT_ID,
                    orderId: PAYMENT_ID,
                    paymentRelationId: PAYMENT_ID,
                    paidOn: paidOn,
                    orderedOn: paidOn,
                    paymentLinkId: PAYMENT_ID,
                    invoiceNumber: invoiceNumber
                };
                let relationId = updatePaymentDetails.paymentRelationId;
                let updatePaymentReport = await appointmentBAObj.updatePaymentByPaymentIdBA(updatePaymentDetails);
                if (updatePaymentReport && updatePaymentReport != null) {
                    let userInfo = await appointmentBAObj.getuserInfoWithpaymentRelationIdBA(relationId);
                    if (userInfo && userInfo.length > 0) {
                        let pdfDetails = {
                            payableAmount: updatePaymentReport.payableAmount,
                            firstName: userInfo[0].patient.firstName,
                            lastName: userInfo[0].patient.lastName,
                            paidOn: updatePaymentDetails.paidOn,
                            birthDate: userInfo[0].patient.birthDate,
                            gender: userInfo[0].patient.gender,
                            remarks: updatePaymentReport.remarks,
                            invoiceNumber: updatePaymentReport.invoiceNumber,
                            hcuraId:userInfo[0].patient.hcuraId,
                            prescribedBy: updatePaymentReport.prescribedBy,
                            serviceCharge: updatePaymentReport.serviceCharges,
                            discount: updatePaymentReport.discount,
                            GST: 0,
                            courierCharges: updatePaymentReport.courierCharges,
                            paymentMethod: updatePaymentDetails.paymentMethod,
                            branchPhoneNumber: branchCode.branchPhoneNumber
                        }
                        emailSender.sendExternalSourcePaymentSuccess(
                            userInfo[0].patient.firstName,
                            userInfo[0].patient.emailId,
                            updatePaymentReport.payableAmount,
                            "#" + relationId,
                            updatePaymentReport.paymentMethod,
                            updatePaymentReport.remarks,
                        );
                        
                        let file = await htmlToPDF.generateInvoiceForExternalSource( pdfDetails );
                        emailSender.sendExternalSourceInvoiceEmail(userInfo[0].patient.emailId, file);
                        res.send({ success: true, data: addPaymentInfo });
                    } 
                }
            }
        } catch(e) {
            next(e);
        }
    };

    async getPackagePromocodes(req, res, next) {
        try {
          let result = await appointmentBAObj.getPromoListPackageBA();
          res.send({success: true, data: result});
        } catch(e) {
          next(e);
        }
    };

    async getAstheticPromocodes(req, res, next) {
        try {
          let result = await appointmentBAObj.getPromoListAstheticBA();
          res.send({success: true, data: result});
        } catch(e) {
          next(e);
        }
    };

    async getDashboardPTDetails(req, res, next) {
        try {
            let body = req.body
            const { error } = rule.dashboardPtDetailsRule.validate(body);
            if (error){
              throw Boom.badData(error.message);
            }
            let result 
            if(body.all == "YES") {
                // let roleDetails = await authentationDA.getroleCodeDA(body.roleId);
                // if(roleDetails.roleName == "SUPER_ADMIN"){
                    result = await appointmentBAObj.dashboardAllPtDetailsBA(body)
                // }
            } else {
                result = await appointmentBAObj.dashboardPtDetailsBA(body);
            }
            res.send({ success: true, data: result });
        } catch(e) {
            next(e);
        }
    };

    async getAllAppt(req, res, next) {
        try {
            // const { appointmentState } = req.params;
            const { page, limit, searchKey, fromDate, toDate, branchId, roleId} = req.query;
            const obj = { isActive : true };
            const getAllAppointment = await appointmentBAObj.getAllApptListBA(
                obj, page, limit, searchKey, fromDate, toDate, branchId, roleId
            );
            res.status(200).send({ status: true, data: getAllAppointment });
        } catch(e) {
            next(e);
        }
    };
    async getAllEstimations(req, res, next){
        try{
            // const { appointmentState } = req.params;
            const { page,  branchId, roleId} = req.query;
              const getAllAppointment = await appointmentDA.getAllEstimations(
                 page, branchId, roleId 
            );
            res.status(200).send({ status: true, data: getAllAppointment });
        } catch(e){
            next(e);
        }
    };
    async getAllApptForEstimation(req, res, next){
        try{
            // const { appointmentState } = req.params;
            const { page,   searchKey, branchId, roleId, doctorId} = req.query;
            const obj = { isActive : true };
             const getAllAppointment = await appointmentDA.getAllApptListForEstimation(
                obj, page,  searchKey,  branchId, roleId, doctorId
            );
            res.status(200).send({ status: true, data: getAllAppointment });
        } catch(e){
            next(e);
        }
    };
    async getdetailsForEstimation(req, res, next) {
        try {
     
            const { estimationId } = req.query;
            // const obj = { isActive : true };
     
            if (!estimationId || !mongoose.Types.ObjectId.isValid(estimationId)) {
                console.log("Invalid estimationId");
                return res.status(400).json({ status: false, message: "Invalid or missing estimationId" });
            }
    
            console.log("Calling appointmentDA.getDetailsForEstimation...");
            const getEstimation = await appointmentDA.getDetailsForEstimation(estimationId);
    
            console.log("Response from Data Access Layer:", getEstimation);
    
            if (!getEstimation || getEstimation.length === 0) {
                return res.status(200).json({ status: true, data: null });
            }
            res.status(200).json({ status: true, data: getEstimation });
        } catch (e) {
            console.error("Error in getdetailsForEstimation:", e);
            next(e);
        }
    }
   
    async changeEstimationStatus(req, res, next) {
        try {
          const { estimationId } = req.body;
      
          if (!estimationId || !mongoose.Types.ObjectId.isValid(estimationId)) {
            return res.status(400).json({ status: false, message: "Invalid or missing estimationId" });
          }
      
          // 👉 Step 3: call the Data Access Layer
          const updatedEstimation = await appointmentDA.updateEstimationStatus(estimationId);
      
          if (!updatedEstimation) {
            return res.status(404).json({ status: false, message: "Estimation not found" });
          }
      
          res.status(200).json({
            status: true,
            message: "Estimation confirmed successfully",
            data: updatedEstimation
          });
      
        } catch (error) {
          console.error("Error in changeEstimationStatus:", error);
          next(error);
        }
      }

      
    async getEstimationData(req, res, next) {
        try {
            const { hcuraId, branchId, roleId, doctorId } = req.query; // Get hcuraId from request query
 
            if (!hcuraId) {
                return res.status(400).json({ status: false, message: "hcuraId is required" });
            }
    
            console.log("Received hcuraId:", hcuraId);
    
            // Fetch estimation data using hcuraId
            const getEstimation = await appointmentDA.getEstimationData(hcuraId, branchId, roleId, doctorId);
    
            if (!getEstimation || getEstimation.length === 0) {
                return res.status(200).json({ status: true, data: null });
            }
    
            res.status(200).json({ status: true, data: getEstimation });
    
        } catch (error) {
            console.error("Error fetching estimation data:", error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
    async getPerformanceData(req, res, next) {
        try {
            const { hcuraId, branchId, roleId } = req.query; // Get hcuraId from request query
 
            if (!hcuraId) {
                return res.status(400).json({ status: false, message: "hcuraId is required" });
            }
    
            console.log("Received hcuraId:", hcuraId);
    
            // Fetch estimation data using hcuraId
            const getPerformance = await appointmentDA.getPerformanceData(hcuraId, branchId, roleId );
    
            if (!getPerformance || getPerformance.length === 0) {
                return res.status(200).json({ status: true, data: null });
            }
    
            res.status(200).json({ status: true, data: getPerformance });
    
        } catch (error) {
            console.error("Error fetching getPerformanceData:", error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
    async getParticularPerformedData(req, res, next) {
        try {
            const { performedId } = req.query; // Get hcuraId from request query
 
            if (!performedId) {
                return res.status(400).json({ status: false, message: "performedId is required" });
            }
    
            console.log("Received hcuraId:", performedId);
    
            // Fetch estimation data using hcuraId
            const getPerformance = await appointmentDA.getParticularPerformanceData(performedId );
    
            if (!getPerformance || getPerformance.length === 0) {
                return res.status(200).json({ status: true, data: null });
            }
            res.status(200).json({ status: true, data: getPerformance });
    
        } catch (error) {
            console.error("Error fetching getPerformanceData:", error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
    async performedEstimationData(req, res, next){
        try{
            let body = req.body
            const { error } = rule.performedEstimationRule.validate(body);
            if (error){
              throw Boom.badData(error.message);
            }
            let result = await appointmentDA.performedEstimations(body);
            res.status(200).send({ status: true, data: result });
        } catch(e){
            next(e);
        }
    };
    
    async updatePaidMonths(req, res, next) {
        try {
          const { performedEstimationId, selectedMonths } = req.body;
      
          if (!performedEstimationId || !selectedMonths || !Array.isArray(selectedMonths)) {
            return res.status(400).send({ status: false, message: "Invalid request body" });
          }
      
          const result = await appointmentDA.markMonthsAsPaid(performedEstimationId, selectedMonths);
      
          res.status(200).send({ status: true, data: result });
        } catch (e) {
          next(e);
        }
      }
      
    async updateperformedEstimationData(req, res, next) {
        try {
            // let { patientId, roleId, doctorId, estimationId, updates } = req.body;
    let { patientId, roleId, estimationId, updates } = req.body;

            console.log("Received payload:", req.body); // Check incoming data
            console.log("Updates array:", updates); // Ensure `updates` is an array
    
            // if (!patientId || !roleId || !doctorId || !estimationId || !Array.isArray(updates)) {
            //     throw new Error("Invalid input: patientId, roleId, doctorId, estimationId, and updates array are required.");
            // }
           if (!patientId || !roleId || !estimationId || !Array.isArray(updates)) {
                throw new Error("Invalid input: patientId, roleId, estimationId, and updates array are required.");
            }

            let result = await appointmentDA.updateperformedEstimations(patientId, roleId,  estimationId, updates);
            res.status(200).send({ status: true, message: "Updated successfully", data: result });
        } catch (e) {
            console.error("Error in updateperformedEstimationData:", e);
            next(e);
        }
    }
    
    async getperformedEstimationData(req, res, next){
        try{
            const { performedId } = req.query;
            let result = await appointmentDA.getperformedEstimations(performedId);
            res.status(200).send({ status: true, data: result });
        } catch(e){
            next(e);
        }
    };
    
    async debitAdvanceAmount(req, res, next){
        try{
            let body = req.body
            
            let result = await appointmentDA.debitAdvanceBalance(body);
            res.status(200).send({ status: true, data: result });
        } catch(e){
            next(e);
        }
    };
    async updateAppointmentStatus(req, res, next){
        try{
            let body = req.body
            const { error } = rule.apptStatusRule.validate(body);
            if (error) {
              throw Boom.badData(error.message);
            }
            let result = await appointmentBAObj.updateAppointmentStatusBA(body);
            res.status(200).send({ status: true, data: result });
        } catch(e) {
            next(e);
        }
    };

    async getAllAppointments(req, res, next) {
        try {
            // const { appointmentState } = req.params;
            const { appointmentStatus, page, limit, searchKey, fromDate, toDate, branchId, roleId } = req.query;
            const obj = { appointmentStatus, isActive : true };
            const getAllAppointment = await appointmentBAObj.getAllApptListBA(
                obj, page, limit, searchKey, fromDate, toDate, branchId, roleId 
            );
            res.status(200).send({ status: true, data: getAllAppointment });
        } catch(e) {
            next(e);
        }
    };

    // async calculateGst(req, res, next) {
    //     try {
    //         const { branchId, amount } = req.query;
    //         let result = await appointmentBAObj.getStateDetailsBA(branchId);
    //         console.log("resulttttttttttttttttttttttttttttttttttt", result);
    //         let stateDetails = result[0].stateDetails
    //         console.log("stateDetails", stateDetails);
    //         let gstAmount = 0
    //         let CGST = 0
    //         let SGST = 0
    //         let IGST = 0
    //         let UGST = 0
    //         if(stateDetails.stateCode == "KA") {
    //             console.log("Inside KA state");
    //             let CGSTSGST = parseFloat(stateDetails.CGST) + parseFloat(stateDetails.SGST)
    //             gstAmount = parseFloat(((amount * parseFloat(CGSTSGST)) /100).toFixed(2));
    //             CGST = parseFloat((gstAmount/2));
    //             SGST = parseFloat((gstAmount/2));
    //         } else {
    //             console.log("Inside other state");
    //             gstAmount = parseFloat(((amount * parseFloat(stateDetails.IGST)) /100).toFixed(2));
    //             IGST = parseFloat((gstAmount));
    //         }
    //         let data = {
    //             totalAmount: parseFloat(amount) + parseFloat(gstAmount),
    //             gstAmount: gstAmount,
    //             CGST: CGST,
    //             SGST: SGST,
    //             IGST: IGST,
    //             UGST: UGST
    //         }
    //         res.status(200).send({ status: true, data: data });
    //     } catch(e) {
    //         next(e);
    //     }
    // };

async  calculateGst(req, res, next) {
  try {
    const { branchId, amount, patientId } = req.query;

    if (!branchId || !amount || !patientId) {
      return res.status(400).send({ status: false, message: "Missing required parameters" });
    }

    // Step 1: Get Branch State Details
    const branchResult = await appointmentBAObj.getStateDetailsBA(branchId);
    const branchState = branchResult?.[0]?.stateDetails;

    if (!branchState) {
      return res.status(404).send({ status: false, message: "Branch state not found" });
    }

    // Step 2: Get Patient State Details
    const patientData = await appointmentBAObj.getPatientStateDetailsBA(patientId);
    const patientStateCode = patientData?.stateId?.stateCode;

    if (!patientStateCode) {
      return res.status(404).send({ status: false, message: "Patient state not found" });
    }

    // Step 3: GST Calculation
    const branchStateCode = branchState.stateCode;
    const isUnionTerritory = ["CH", "DD", "DN", "LD", "AN", "DL", "JK", "LA", "PY"].includes(branchStateCode);

    let gstAmount = 0, CGST = 0, SGST = 0, IGST = 0, UGST = 0;

    if (branchStateCode === patientStateCode) {
      if (isUnionTerritory) {
        const totalRate = parseFloat(branchState.CGST) + parseFloat(branchState.UGST);
        gstAmount = parseFloat(((amount * totalRate) / 100).toFixed(2));
        CGST = gstAmount / 2;
        UGST = gstAmount / 2;
      } else {
        const totalRate = parseFloat(branchState.CGST) + parseFloat(branchState.SGST);
        gstAmount = parseFloat(((amount * totalRate) / 100).toFixed(2));
        CGST = gstAmount / 2;
        SGST = gstAmount / 2;
      }
    } else {
      gstAmount = parseFloat(((amount * parseFloat(branchState.IGST)) / 100).toFixed(2));
      IGST = gstAmount;
    }

    const totalAmount = parseFloat(amount) + gstAmount;

    const data = {
      totalAmount: +totalAmount.toFixed(2),
      gstAmount: +gstAmount.toFixed(2),
      CGST: +CGST.toFixed(2),
      SGST: +SGST.toFixed(2),
      IGST: +IGST.toFixed(2),
      UGST: +UGST.toFixed(2)
    };

    return res.status(200).send({ status: true, data });
  } catch (e) {
    next(e);
  }
}

    async getDashboardDataAptCount(req, res, next) {
        try {
            let body = req.body;
            const { error } = rule.dashboard.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let aptCount = await appointmentBAObj.getDashboardAptCountBA(body);
            res.status(200).send({ status: true, data: aptCount });
        } catch (e) {
          next(e);
        }
    };

    async getDashboardDataRevenueCount(req, res, next) {
        try {
            let body = req.body;
            const { error } = rule.dashboard.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let revenueCount = await appointmentBAObj.getDashboardRevenueCountBA(body);
            res.status(200).send({ status: true, data: revenueCount });
        } catch (e) {
          next(e);
        }
    };

    async getPatientListTempAppointment(req, res, next) {
        try {
            const payload = req.body;
            let page = payload.page;
            let limit = constants.pageConstants.pageLength;
            let roleId = payload.roleId
            let branchId = payload.branchId
            const patientList = await appointmentBAObj.getPatientListTempBA(
                payload.type, page, limit, payload.search, roleId, branchId);
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

    async changeisActiveStatusTemp(req, res, next) {
        try {
            let body = req.body;
            const { error } = rule.changeStatusisCompletedTemp.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let result = await appointmentBAObj.changeisActiveStatusTempBA(body);
            res.status(200).send({ status: true, data: result });
        } catch(e) {
            next(e);
        }
    };

    // insert case study (PART - 1 )
    async insertCaseStudy(req, res, next) {
        try {
            let body = req.body;
            const { error } = doctorRule.insertCaseStudyRule.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let caseStudyDetails = await appointmentBAObj.insertCaseStudyBA(body);
            res.status(200).send({ status: true, data: caseStudyDetails });
        } catch(e) {
            next(e);
        }
    };

    // insert case study (PART - 2 )
    async insertCaseStudySuggestionPrescription(req, res, next) {
        try {
            let body = req.body;
            const { error } = doctorRule.insertCaseStudySuggestionPrescriptionRule.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let caseStudyDetails = await appointmentBAObj.insertCaseStudySuggestionPrescriptionBA(body);
            res.status(200).send({ status: true, data: caseStudyDetails });
        } catch(e) {
            next(e);
        }
    };

        // Update case study (PART - 1 )
        async updateCaseStudy(req, res, next){
            try{
            let body = req.body;
            const { error } = doctorRule.updateCaseStudyRule.validate(body);
            if (error){
                throw Boom.badData(error.message);
            }
            let caseStudyDetails = await appointmentDA.updateCaseStudyDA(body);
            res.status(200).send({ status: true, data: caseStudyDetails });
            } catch(e) {
            next(e);
            }
        };
        
    // insert Aesthetic case study (PART - 1 )
    async insertAestheticCaseStudy(req, res, next){
        try{
        let body = req.body;
        const { error } = doctorRule.insertAestheticCaseStudyRule.validate(body);
        if (error){
            throw Boom.badData(error.message);
        }
        let caseStudyDetails = await appointmentDA.insertAestheticCaseStudyDA(body);
        res.status(200).send({ status: true, data: caseStudyDetails });
        } catch(e) {
        next(e);
        }
    };
   

        // Update Aesthetic case study (PART - 1 )
        async updateCaseStudyAesthetic(req, res, next){
            try{
            let body = req.body;
            const { error } = doctorRule.updateAestheticCaseStudyRule.validate(body);
            if (error){
                throw Boom.badData(error.message);
            }
            let caseStudyDetails = await appointmentDA.updateAestheticCaseStudyDA(body);
            res.status(200).send({ status: true, data: caseStudyDetails });
            } catch(e) {
            next(e);
            }
        };

    // Update Dental case study (PART - 1 )
    async updateCaseStudyDental(req, res, next){
        try{
        let body = req.body;
        const { error } = doctorRule.updateDentalCaseStudyRule.validate(body);
        if (error){
            throw Boom.badData(error.message);
        }
        let caseStudyDetails = await appointmentDA.updateDentalCaseStudyDA(body);
        res.status(200).send({ status: true, data: caseStudyDetails });
        } catch(e) {
        next(e);
        }
    };

 
async insertDentalCaseStudy(req, res, next){
    try{
    let body = req.body;
    const { error } = doctorRule.insertDentalCaseStudyRule.validate(body);
    if (error){
        throw Boom.badData(error.message);
    }
    let caseStudyDetails = await appointmentDA.insertDentalCaseStudyDA(body);
    res.status(200).send({ status: true, data: caseStudyDetails });
    } catch(e) {
    next(e);
    }
};

// insert Dental case study (PART - 2 )
async insertDentalCaseStudySuggestionPrescription(req, res, next){
    try{
    let body = req.body;
    const { error } = doctorRule.insertDentalCaseStudySuggestionPrescriptionRule.validate(body);
    if (error){
        throw Boom.badData(error.message);
    }
    let caseStudyDetails = await appointmentDA.insertDentalCaseStudySuggestionPrescription(body);
    res.status(200).send({ status: true, data: caseStudyDetails });
    } catch(e) {
    next(e);
    }
};
    async insertPrescription(req, res, next){
        try{
            let body = req.body;
            const { error } = doctorRule.insertPrescriptionRule.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let prescriptionDetails = await appointmentBAObj.insertPrescriptionBA(body)
            res.status(200).send({ status: true, data: prescriptionDetails });
        } catch(e) {
            next(e);
        }
    };

    async getPtDetailsCasestudy(req, res, next) {
        try {
            let body = req.body;
            const { error } = doctorRule.searchHcuraIdRule.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let details = await appointmentBAObj.getPatientDetailsCaseStudyBA(body.hcuraId, body.roleId, body.branchId)
            res.status(200).send({ status: true, data: details });
        } catch(e) {
            next(e);
        }
    };

    async updateSuggestionPrescription(req, res, next) {
        try {
            let body = req.body;
            const { error } = doctorRule.updateSuggestionPrescriptionRule.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let obj = await appointmentBAObj.updateSuggestionPrescriptionBA(body);
          res.status(200).send({ status: true, data: obj });
        } catch(e) {
            next(e);
        }
    };

    async getCaseStudyDetails(req, res, next) {
        try {
            let body = req.body;
            let obj = await appointmentBAObj.getCaseStudyDetailsBA(body.caseStudyId);
            res.status(200).send({ status: true, data: obj });
        } catch(e) {
          next(e);
        }
    };

    async getCaseStudyAestheticDetails(req, res, next){
        try{
            let body = req.body;
            let obj = await appointmentDA.getCaseStudyAestheticDetails(body.caseStudyId);
            res.status(200).send({ status: true, data: obj });
        } catch(e) {
          next(e);
        }
    };
    async getCaseStudyDentalDetails(req, res, next){
        try{
            let body = req.body;
            let obj = await appointmentDA.getCaseStudyDentalDetails(body.caseStudyId);
            res.status(200).send({ status: true, data: obj });
        } catch(e) {
          next(e);
        }
    };
    async updatePrescription(req, res, next){
        try{
            let body = req.body;
            const { error } = doctorRule.updatePrescriptionRule.validate(body);
            if (error){
                throw Boom.badData(error.message);
            }
            let prescriptionDetails = await appointmentBAObj.updatePrescriptionBA(body)
            res.status(200).send({ status: true, data: prescriptionDetails });
        } catch(e) {
            next(e);
        }
    };

    async getPrescriptionDetails(req, res, next) {
        try {
            let body = req.body;
            let obj = await appointmentBAObj.getPrescriptionDetailsBA(body.prescriptionId);
            res.status(200).send({ status: true, data: obj });
        } catch(e) {
          next(e);
        }
    };

    async getDoctorList(req, res, next) {
        try {
            const { branchId, roleId } = req.query;
            let obj = await appointmentBAObj.getDoctorListBA(branchId, roleId);
            res.status(200).send({ status: true, data: obj });
        } catch(e) {
            next(e);
        }
    };

    async getPackageScheduleDetails(req, res, next) {
        try {
          let body = req.body
          const { error } = doctorRule.getPackageScheduleDetailsRule.validate(body);
          if (error) {
            throw Boom.badData(error.message);
          }
          let details = await appointmentBAObj.getPackageScheduleDetailsBA(body.patientId)
          if (details && details.length === 0) {
            return res.status(404).json({ message: "Package Schdule Details Not Avaliable" });
        } else {
            return res.status(200).json({status: true, data: details });
        }
        } catch(e) {
          next(e);
        }
    };

    async getSuggestionPrescriptionDetails(req, res, next) {
        try {
            let body = req.body
            const { error } = doctorRule.appointmentIdRule.validate(body);
            if (error) {
              throw Boom.badData(error.message);
            }
            let result = await appointmentBAObj.getSuggestionPrescriptionDetailsBA(body.appointmentId);
            return res.status(200).json({status: true, data: result });
        } catch(e) {
            next(e);
        }
    };

    async getpaymentDetailsForPdf(req, res, next) {
        try {
            const { paymentId } = req.query;
            if (!ObjectId.isValid(paymentId)) {
                return res.status(400).json({
                  error: "Invalid paymentId format. Must be a 24 character hex string."
                });
            }
            let obj = await appointmentBAObj.getPaymentDetailsBA(paymentId);
            return res.status(200).send({ status: true, data: obj });
        } catch(e) {
            next(e);
        }
    };

    async sendDuplicatePrescription(req, res, next) {
        try {
            let body = req.body
            const { error } = doctorRule.sendemailPrescription.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let appointmentDetails = 
            await appointmentBAObj.getAppointmentDataForPrescriptionBA(body.appointmentId, body.patientId);
            let file = await htmlToPDF.generatePrescription(appointmentDetails);
            emailSender.prescription(body.emailId, file);
            res.status(200).send({ status: true, meassage: "EMAIL SENT SUCCESSFULLY"});
        } catch(e) {
          next(e);
        }
    };

    async sendOriginalPrescription(req, res, next) {
        try {
            let body = req.body
            const { error } = doctorRule.sendemailPrescription.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let appointmentDetails = 
            await appointmentBAObj.getAppointmentDataForPrescriptionBA(body.appointmentId, body.patientId);
            let file = await htmlToPDF.generateOriginalPrescription(appointmentDetails);
            emailSender.prescription(body.emailId, file);
            res.status(200).send({ status: true, meassage: "EMAIL SENT SUCCESSFULLY"});
        } catch(e) {
          next(e);
        }
    };

    async getTransactionReport(req, res, next) {
        try {
            let body = req.body;
            const { error } = rule.transactionReport.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let result = await appointmentBAObj.getTransactionReportBA(body);
            let sendObj = {
                metaData: {
                page: result[0].metadata.length > 0 ? result[0].metadata[0].page : 1,
                total:
                    result[0].metadata.length > 0 ? result[0].metadata[0].total : 0,
                },
                transactionList: result[0].data,
            };
            res.status(200).send({ status: true, data: sendObj });
        } catch (e) {
            next(e);
        }
    };

    async transactionReportDownload(req, res, next) {
        try {
            let body = req.body;
            const { error } = rule.transactionReportDown.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let result = await appointmentBAObj.transactionReportDownloadBA(body);
            let sendObj = {
                metaData: {
                    total: result[0].metadata.length > 0 ? result[0].metadata[0].total : 0,
                },
                transactionList: result[0].data, 
            };            
            res.status(200).send({ status: true, data: sendObj });
        } catch (e) {
            next(e);
        }
    };

    async getMasterReport(req, res, next) {
        try {
            let body = req.body;
            const { error } = rule.masterReport.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let result = await appointmentBAObj.masterReportBA(body);
            let sendObj = {
                metaData: {
                page: result[0].metadata.length > 0 ? result[0].metadata[0].page : 1,
                total:
                    result[0].metadata.length > 0 ? result[0].metadata[0].total : 0,
                },
                masterList: result[0].data,
            };
            res.status(200).send({ status: true, data: sendObj });
        } catch (e) {
            next(e);
        }
    };

    async getMasterReportDownload(req, res, next) {
        try {
            let body = req.body;
            const { error } = rule.masterReportDown.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let result = await appointmentBAObj.masterReportDownloadBA(body);
            let sendObj = {
                metaData: {
                total:
                    result[0].metadata.length > 0 ? result[0].metadata[0].total : 0,
                },
                masterList: result[0].data,
            };
            res.status(200).send({ status: true, data: sendObj });
        } catch (e) {
            next(e);
        }
    };

    async statusCaseStudy(req, res, next) {
        try {
            let body = req.body;
            const { error } = rule.statusCaseStudy.validate(body);
            if( error ) {
                throw Boom.badData(error.message);
            }
            let result = await appointmentBAObj.statusCaseStudyBA(body);
            res.status(200).send({ status: true, data: result });
        } catch(e) {
            next(e);
        }
    };

    async getApptDocs(req, res, next) {
        try {
            const { page, limit, searchKey, fromDate, toDate, docId, roleId} = req.query;
            const getApptsDocs = await appointmentBAObj.getApptListDocsBA(
                page, limit, searchKey, fromDate, toDate, docId, roleId
            );
            res.status(200).send({ status: true, data: getApptsDocs });
        } catch(e) {
            next(e);
        }
    };

    async getPatientReport(req, res, next) {
        try {
            let body = req.body;
            const { error } = rule.patientReport.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let result = await appointmentBAObj.patientReportBA(body);
            let sendObj = {
                metaData: {
                page: result[0].metadata.length > 0 ? result[0].metadata[0].page : 1,
                total:
                    result[0].metadata.length > 0 ? result[0].metadata[0].total : 0,
                },
                patientList: result[0].data,
            };
            res.status(200).send({ status: true, data: sendObj });
        } catch (e) {
            next(e);
        }
    };

    async getPatientReportDownload(req, res, next) {
        try {
            let body = req.body;
            const { error } = rule.patientReportDown.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let result = await appointmentBAObj.patientReportDownloadBA(body);
            let sendObj = {
                metaData: {
                total:
                    result[0].metadata.length > 0 ? result[0].metadata[0].total : 0,
                },
                patientList: result[0].data,
            };
            res.status(200).send({ status: true, data: sendObj });
        } catch (e) {
            next(e);
        }
    };

    async getApptReport(req, res, next) {
        try {
            let body = req.body;
            const { error } = rule.apptReport.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let result = await appointmentBAObj.appointmentReportBA(body);
            let sendObj = {
                metaData: {
                page: result[0].metadata.length > 0 ? result[0].metadata[0].page : 1,
                total:
                    result[0].metadata.length > 0 ? result[0].metadata[0].total : 0,
                },
                appointmentList: result[0].data,
            };
            res.status(200).send({ status: true, data: sendObj });
        } catch (e) {
            next(e);
        }
    };

    async getApptReportDownload(req, res, next) {
        try {
            let body = req.body;
            const { error } = rule.apptReportDown.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let result = await appointmentBAObj.appointmentReportDowanloadBA(body);
            let sendObj = {
                metaData: {
                total:
                    result[0].metadata.length > 0 ? result[0].metadata[0].total : 0,
                },
                appointmentList: result[0].data,
            };
            res.status(200).send({ status: true, data: sendObj });
        } catch (e) {
            next(e);
        }
    };

    async whatsappapi(req, res, next){
        try{
            let body = req.body;
            let name = "manoj"
            let emailId = "dandumanojkumarreddy@gmail.com"
            let phonenumber = 9676097350
            const response = await axios({
                url: 'https://graph.facebook.com/v21.0/428296813705977/messages',
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${whatsapptoken}`,
                    'Content-Type': 'application/json'
                },

                // to send custom templete
                data: JSON.stringify({
                    messaging_product: 'whatsapp',
                    to: '917411845658',
                    type: 'template',
                    template: {
                        name: 'pt_appointment_booked',
                        language: {
                            code: 'en_US'
                        },
                    components: [
                        {
                            type: 'body',
                            parameters: [
                                {
                                    type: 'text',
                                    text: name  
                                },
                                {
                                    type: 'text',
                                    text: phonenumber  
                                },
                                {
                                    type: 'text',
                                    text: emailId
                                },
                                {
                                    type: 'text',
                                    text: emailId
                                },
                            ]
                        }
                    ]
                }
            })
        })
        console.log("------------",response.data)
        res.status(200).send({ status: true, data: response.data });
        } catch(e) {
            next(e);
        }
    };
    
    async apptFormPtDetails(req, res, next) {
        try {
            let body = req.body
            let existingApptId = await appointmentBAObj.getApptIdBA();
            let newApptId = "HAF01";

            if (existingApptId.length > 0) {
                const apptId = existingApptId.map(item => item.formId).filter(Boolean);
                const existingApptIds = apptId.map(id => {
                    const match = id.match(/^([A-Z]+)(\d+)$/);
                    if (match) {
                        return {
                            prefix: match[1],
                            count: parseInt(match[2], 10)
                        };
                    }
                    return null;
                }).filter(Boolean);
                if (existingApptIds.length > 0) {
                    const maxCount = Math.max(...existingApptIds.map(item => item.count));
                    const newCount = maxCount + 1;
                    const newCountFormatted = newCount.toString().padStart(2, '0');
                    const prefix = existingApptIds[0].prefix;
                    newApptId = `${prefix}${newCountFormatted}`;
                }
            }

            console.log('New Appointment Number:', newApptId);

            let createdOn = moment().format();
            let insertDetails = await appointmentBAObj.apptFormPtDetailsBA(body, newApptId, createdOn)

            emailSender.sendApptFormPtDetailsToAdmin( insertDetails.name,
                insertDetails.age, insertDetails.phoneNo, insertDetails.whatsAppNo,
                insertDetails.emailId, insertDetails.gender, insertDetails.state, 
                insertDetails.consultationType, insertDetails.message, 
                insertDetails.branch, insertDetails.formId, insertDetails.concern );
            
            if (insertDetails.emailId !== null) {
                emailSender.sendMailToFormPatient(insertDetails.name, 
                    insertDetails.emailId, insertDetails.formId)
            }

            let whatsAppMsg = await whatsApp.appointmentForm( insertDetails.name, insertDetails.age, 
                insertDetails.phoneNo, insertDetails.whatsAppNo, insertDetails.emailId, insertDetails.gender,
                insertDetails.state, insertDetails.consultationType, insertDetails.concern,
                insertDetails.branch, insertDetails.message, insertDetails.formId 
            );
            console.log("-----whatsAppMsg----",whatsAppMsg);

            if (insertDetails.whatsAppNo || insertDetails.phoneNo) {
                let greetingMsg = await whatsApp.greetings( insertDetails.name, insertDetails.phoneNo);
                console.log("-----whatsAppMsg----",greetingMsg);
            }

            res.status(200).send({ status: true, message: "Successfully Submited"});
        } catch(e) {
            next(e);
        }
    };

    async webContactUsForm(req, res, next) {
        try {
            let body = req.body

            let existingId = await appointmentBAObj.getContactUsIdBA();
            let newId = "HCU01" ;

            if (existingId.length > 0) {
                const conId = existingId.map(item => item.contactId).filter(Boolean);
                const existingApptIds = conId.map(id => {
                    const match = id.match(/^([A-Z]+)(\d+)$/);
                    if (match) {
                        return {
                            prefix: match[1],
                            count: parseInt(match[2], 10)
                        };
                    }
                    return null;
                }).filter(Boolean);
                if (existingApptIds.length > 0) {
                    const maxCount = Math.max(...existingApptIds.map(item => item.count));
                    const newCount = maxCount + 1;
                    const newCountFormatted = newCount.toString().padStart(2, '0');
                    const prefix = existingApptIds[0].prefix;
                    newId = `${prefix}${newCountFormatted}`;
                }
            }

            console.log('New Appointment Number:', newId);
            let createdOn = moment().format();
            let insertDetails = await appointmentBAObj.webContactUsFormBA(body, newId, createdOn);

            emailSender.sendContactUsInfoToAdmin( insertDetails.name, insertDetails.emailId,
                insertDetails.phoneNo, insertDetails.city, insertDetails.comment, insertDetails.contactId )
            
            if (insertDetails.emailId !== null) {
                emailSender.sendMailToContactUs(insertDetails.name, insertDetails.emailId, insertDetails.contactId)
            }

            let whatsAppMsg = await whatsApp.contactUsForm( insertDetails.name, insertDetails.phoneNo,
                insertDetails.emailId, insertDetails.city, insertDetails.comment, insertDetails.contactId
            );
            console.log("-----whatsAppMsg----",whatsAppMsg);

            if (insertDetails.phoneNo) {
                let greetingMsg = await whatsApp.greetings( insertDetails.name, insertDetails.phoneNo);
                console.log("-----whatsAppMsg----",greetingMsg);
            }

            res.status(200).send({ status: true, message: "Successfully Submited"});
        } catch(e) {
            next(e);
        }
    };

    async webCorporateForm(req, res, next) {
        try {
            let body = req.body
            let existingId = await appointmentBAObj.getCorporateIdBA();
            let newId = "HCO01" ;

            if (existingId.length > 0) {
                const copId = existingId.map(item => item.corporateId).filter(Boolean);
                const existingApptIds = copId.map(id => {
                    const match = id.match(/^([A-Z]+)(\d+)$/);
                    if (match) {
                        return {
                            prefix: match[1],
                            count: parseInt(match[2], 10)
                        };
                    }
                    return null;
                }).filter(Boolean);
                if (existingApptIds.length > 0) {
                    const maxCount = Math.max(...existingApptIds.map(item => item.count));
                    const newCount = maxCount + 1;
                    const newCountFormatted = newCount.toString().padStart(2, '0');
                    const prefix = existingApptIds[0].prefix;
                    newId = `${prefix}${newCountFormatted}`;
                }
            }

            console.log('New Appointment Number:', newId);
            let createdOn = moment().format();

            let insertDetails = await appointmentBAObj.webCorporateFormBA(body, newId, createdOn);

            emailSender.sendCorporateInfoToAdmin( insertDetails.name, insertDetails.workEmail,
                insertDetails.phoneNo, insertDetails.companyName, insertDetails.companySize,
                insertDetails.prefferedDate, insertDetails.street, insertDetails.city,
                insertDetails.state, insertDetails.zipcode, insertDetails.corporateId )

            if (insertDetails.emailId !== null) {
                emailSender.sendMailToCorporate(insertDetails.name, insertDetails.workEmail, 
                insertDetails.companyName, insertDetails.corporateId);
            }
            
            let whatsAppMsg = await whatsApp.corporateForm( insertDetails.name,insertDetails.phoneNo,
                insertDetails.workEmail, insertDetails.companyName, insertDetails.companySize,
                insertDetails.prefferedDate, insertDetails.street, insertDetails.city,
                insertDetails.state, insertDetails.zipcode, insertDetails.corporateId
            );
            console.log("-----whatsAppMsg----",whatsAppMsg);

            if (insertDetails.phoneNo) {
                let greetingMsg = await whatsApp.greetings( insertDetails.name, insertDetails.phoneNo);
                console.log("-----whatsAppMsg----",greetingMsg);
            }

            res.status(200).send({ status: true, message: "Successfully Submited"});
        } catch(e) {
            next(e);
        }
    };

    async webOfferForm(req, res, next) {
        try {
            let body = req.body

            let existingId = await appointmentBAObj.getOfferIdBA();
            let newId = "HOF01" ;

            if (existingId.length > 0) {
                const wofId = existingId.map(item => item.offerId).filter(Boolean);
                const existingApptIds = wofId.map(id => {
                    const match = id.match(/^([A-Z]+)(\d+)$/);
                    if (match) {
                        return {
                            prefix: match[1],
                            count: parseInt(match[2], 10)
                        };
                    }
                    return null;
                }).filter(Boolean);
                if (existingApptIds.length > 0) {
                    const maxCount = Math.max(...existingApptIds.map(item => item.count));
                    const newCount = maxCount + 1;
                    const newCountFormatted = newCount.toString().padStart(2, '0');
                    const prefix = existingApptIds[0].prefix;
                    newId = `${prefix}${newCountFormatted}`;
                }
            }

            console.log('New Appointment Number:', newId);
            let createdOn = moment().format();
            let insertDetails = await appointmentBAObj.webOfferFormBA(body, newId, createdOn);
            
            emailSender.sendOfferFormPtDetailsToAdmin( insertDetails.name, insertDetails.emailId,
                insertDetails.phoneNo, insertDetails.state, insertDetails.couponCode,
                insertDetails.offerId)

            if (insertDetails.emailId !== null) {
                emailSender.sendMailToFormPatient(insertDetails.name, insertDetails.emailId, insertDetails.offerId)
            }

            let whatsAppMsg = await whatsApp.webOfferForm( insertDetails.name,insertDetails.emailId,
                insertDetails.phoneNo, insertDetails.state, insertDetails.couponCode, insertDetails.offerId
            );
            console.log("-----whatsAppMsg----",whatsAppMsg);

            if (insertDetails.phoneNo) {
                let greetingMsg = await whatsApp.greetings( insertDetails.name, insertDetails.phoneNo);
                console.log("-----whatsAppMsg----",greetingMsg);
            }

            res.status(200).send({ status: true, message: "Successfully Submited"});
        } catch(e) {
            next(e);
        }
    };

    async addHomeCountData(req, res, next) {
        try {
            let body = req.body
            const {error} = rule.homeCountRule.validate(body);
            if(error) {
                throw Boom.badData(error.message);
            }
            let data = await appointmentBAObj.homeCountDataBA(body);
            res.status(200).send({ status: true, message: "Successfully Recieved Data"});
        } catch(e) {
            next(e);
        }
    };

    async getHomeCountData(req, res, next) {
        try {
            let data = await appointmentBAObj.getHomeCountDataBA();
            res.status(200).send({ status: true, data: data });
        } catch(e) {
            next(e);
        }
    };

};

module.exports = new appointment();
