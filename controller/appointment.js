const Boom = require("@hapi/boom");
// const multiparty = require("multiparty");
const moment = require("moment-timezone");
const rule = require("../helpers/appointmentRule");
const doctorRule = require("../helpers/doctorRule");
const constants = require("../helpers/constants");
const appointmentDA = require("../layers/dataLayer/appointmentDA");
const invoiceGenerator = require("../helpers/invoiceNoGenerater");
const { startTime } = require("express-pino-logger");
const htmlToPDF = require("../helpers/htmlToPDF");
const emailSender = require("../helpers/emailSender");
const paymentGateway = require("../helpers/paymentGateway");
const { sourceModel, occupationModel } = require("../models/schema");
const scheduler = require("../scheduler/scheduler");
const schedulers = new scheduler();
const apiResponse = require("../helpers/apiResponse");
const authentationDA = require("../layers/dataLayer/authentationDA");
const { ObjectId } = require('mongodb');
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
            let existingApptNumber = await appointmentDA.getAppointmentNumber();
            console.log(".......existingApptNumber.........",existingApptNumber)
            let newAppointmentNumber = "HCA01" ;
            if (existingApptNumber.length > 0) {
                const appointmentNumber = existingApptNumber.map(item => item.appointmentNumber);
                const existingApptNumbers = appointmentNumber.map(id => ({
                    prefix: id.substring(0, 3),  // Extract the prefix part
                    count: parseInt(id.substring(3), 10)  // Extract and convert the count part to an integer
                }));
                // Find the maximum count
                const maxCount = Math.max(...existingApptNumbers.map(item => item.count));
                // Increment the count
                const newCount = maxCount + 1;
                // Format the new count to match the original format (assuming 2 digits)
                const newCountFormatted = newCount.toString().padStart(2, '0');
                // Use the prefix from the first item (assuming all prefixes are the same)
                newAppointmentNumber = `${existingApptNumbers[0].prefix}${newCountFormatted}`;
                console.log('New Appointment Number:', newAppointmentNumber);
            }
            let userInfo = await appointmentDA.patientDetaiils(body.patientId);
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
                consultationType: body.consultationType,
                appointmentStatus: "SCHEDULED",
                appointmentNumber: newAppointmentNumber,
                bookedBy: body.bookedBy
            }
            let createAppointment = await appointmentDA.createAppointment(obj);
            let docDetails = await appointmentDA.getDoctorDetails(body.doctorId);
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
            // email to patient appointment details
                emailSender.sendAppointmentConformedEmailToPT(details);
            // email to docors 
                emailSender.sendAppointmentBookedEmailToDoctor(details);

            res.status(200).send({ status: true, data: createAppointment});
        } catch(e){
            next(e);
        }
    };

    async paymentConsultation(req, res, next){
        try{
            let body = req.body
            const {error} = rule.paymentConsultationRule.validate(body);
            if(error){
                throw Boom.badData(error.message);
            }
            let ptDetails = await appointmentDA.patientDetaiils(body.patientId);
            console.log(".....body.appointmentId.......",body.appointmentId);
            let appointmentData = await appointmentDA.getApptDetails(body.appointmentId)
            console.log(".....appointmentData.......",appointmentData);
            let branchDetails = await appointmentDA.branchCode(ptDetails.branchId)
            let info = await appointmentDA.getConsultationGST(branchDetails.stateId);
            console.log("-----info-----",info)
            let discountPercent = 0
            if(body.promoCodes.length > 0){
                let promoCodeResult = await appointmentDA.getPromoCodeList(body.promoCodes);
                console.log("+++++promoCodeResult+++++++",promoCodeResult)
                discountPercent = promoCodeResult.discount
            }
            let consultationfee = await appointmentDA.getAmount(appointmentData[0].consultationType);
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

            if((body.paymentMode === "cash" || body.paymentMode === "qr_code" || body.paymentMode === "swiping_machine") && payable == body.payableAmount && payable > 0){
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
                    // GSTID: obj.GSTID,
                };
                if(body.consultationType === "FOLLOW-UP"){
                    let updateFollowupId = await appointmentDA.updateFollowupId(body.patientId, paymentObj.appointmentId);
                }
                let addPaymentInfo = await appointmentDA.addPaymentInfo(paymentObj);
                console.log("----addPaymentInfo----",addPaymentInfo);
                let PAYMENT_ID = addPaymentInfo._id;
                let confirmAppt = await appointmentDA.confirmAppointment(appointmentData[0]._id, addPaymentInfo._id );
                console.log("++++++confirm Appt+++++",confirmAppt)
                let paidOn = moment().format();
                let branchCode = await appointmentDA.branchCode(ptDetails.branchId);
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
                let updatePaymentReport = await appointmentDA.updatePaymentReportDA(updatePaymentDetails);
                console.log("....updatePaymentReport......",updatePaymentReport)
                if(updatePaymentReport != null){
                    let userInfo = await appointmentDA.getuserInfoWithpaymentRelationId(relationId);
                    console.log("-------userInfo------",userInfo);
                    let appointmentDetails = await appointmentDA.getAppointmentDetails(updatePaymentReport.appointmentId);
                    console.log("------appointmentDetails------",appointmentDetails);
                    let consultationfee = await appointmentDA.getAmount(appointmentDetails[0].consultationType);
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
                    // email to patient payment success
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
                if(body.consultationType === "FOLLOW-UP"){
                    let updateFollowupId = await appointmentDA.updateFollowupId(body.patientId, appointmentData[0]._id);
                } 
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
                    // GSTID: obj.GSTID,
                };
                let addPaymentInfo = await appointmentDA.addPaymentInfo(paymentObj);
                
                await appointmentDA.updatePaymentDetailsAppointment(body.appointmentId, addPaymentInfo._id,); //appointment table
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
                    // GSTID: obj.GSTID,
                };
                if(body.consultationType === "FOLLOW-UP"){
                    let updateFollowupId = await appointmentDA.updateFollowupId(body.patientId, paymentObj.appointmentId);
                }
                let addPaymentInfo = await appointmentDA.addPaymentInfo(paymentObj);
                console.log("----addPaymentInfo----",addPaymentInfo);
                let PAYMENT_ID = addPaymentInfo._id;
                let confirmAppt = await appointmentDA.confirmAppointment(
                    appointmentData[0]._id, addPaymentInfo._id );
                console.log("++++++confirm Appt+++++",confirmAppt)
                let paidOn = moment().format();
                let branchCode = await appointmentDA.branchCode(ptDetails.branchId);
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
                let updatePaymentReport = await appointmentDA.updatePaymentReportDA(updatePaymentDetails);
                console.log("....updatePaymentReport......",updatePaymentReport)
                if(updatePaymentReport != null){
                    let userInfo = await appointmentDA.getuserInfoWithpaymentRelationId(relationId);
                    console.log("-------userInfo------",userInfo);
                    let appointmentDetails = await appointmentDA.getAppointmentDetails(updatePaymentReport.appointmentId);
                    console.log("------appointmentDetails------",appointmentDetails);
                    let consultationfee = await appointmentDA.getAmount(appointmentDetails[0].consultationType);
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
                    // email to patient payment success
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
        } catch(e){
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
          const patientList = await appointmentDA.getPatientList(
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

    async getPatientDetails(req, res, next){
        try{
            let body = req.body
            const {error} = rule.hcuraIdRule.validate(body);
            if(error){
                throw Boom.badData(error.message);
            }
            let patientDetails = await appointmentDA.getpatientDetailsDA(body.hcuraId);
            res.status(200).send({ status: true, data: patientDetails});
        } catch(e){
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
    };

    async getConsultationPromocodes(req, res, next){
        try{
          let result = await appointmentDA.getPromoListConsultation();
          res.send({success: true, data: result});
        } catch(e){
          next(e);
        }
    };

    async getPatientDetailsConsultationPayment(req, res, next){
        try{
            let body = req.body
            const { error } = rule.searchHcuraIdRule.validate(body);
            if (error){
              throw Boom.badData(error.message);
            }
            let obj = await appointmentDA.getAppointmentDetailsPaymentDetails(body.hcuraId, body.roleId, body.branchId);
            res.status(200).send({ status: true, data: obj});
        } catch(e){
            next(e);
        }
    };

    async getPaymentDetailsAppointment(req, res, next){
        try{
            let body = req.body
            const { error } = rule.appointmentIdRule.validate(body);
            if (error){
              throw Boom.badData(error.message);
            }
            let obj = await appointmentDA.getAppointmentPaymentDetails(body.appointmentId);
            res.status(200).send({ status: true, data: obj });
        } catch(e){
            next(e);
        }
    };

    async getConsultationAmount(req, res, next){
        try{
            let body = req.body
            const { error } = rule.consultationTypeRule.validate(body);
            if (error){
              throw Boom.badData(error.message);
            }
            let obj = await appointmentDA.getAmount(body.consultationType);
            res.status(200).send({ status: true, data: obj });
        } catch(e){
            next(e);
        }
    };

    async validatePromoCode(req, res, next){
        try{
            let body = req.body;
            const { error } = rule.promoCodeRule.validate(body);
            if (error) {
              throw Boom.badData(error.message);
            }
            let promoCode = body.promoCode.toUpperCase();
            let result = await appointmentDA.validatePromoCode(promoCode);
            if(result){
                res.send({ success: true, data: result});
            } else{
                res.send({ success: false, data: "No Promo codes avaliable"});
            }
            
        } catch(e){
            next(e);
        }
    };

    async avaliableSlots(req, res, next){
        try{
            let body = req.body;
            const { error } = rule.avaliableSlotsRule.validate(body);
            if (error) {
              throw Boom.badData(error.message);
            }
            let result = await appointmentDA.getRemainingSlotsAndTimings(body.doctorId ,body.selectedDate);
            res.send({ success: true, data: result});
        } catch(e){
            next(e);
        }
    };

    async getPackageList(req, res, next){
        try{
            let result = await appointmentDA.getpackageList()
            res.send({ success: true, data: result});
        } catch(e){
            next(e);
        }
    };

    async getAstheticList(req, res, next){
        try{
            let result = await appointmentDA.getAstheticList()
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
            if (error){
              throw Boom.badData(error.message);
            }
            let ptDetails = await appointmentDA.patientDetaiils(body.patientId);
            console.log(".....ptDetails.......",ptDetails);

            let branchDetails = await appointmentDA.branchCode(ptDetails.branchId);
            let info = await appointmentDA.getConsultationGST(branchDetails.stateId);
            console.log("-----info-----",info)

            let appointmentData = await appointmentDA.getApptDetails(body.appointmentId);
            console.log(".....appointmentData.......",appointmentData);

            let packageDetails = await appointmentDA.getPackageDetails(body.packageId);
            console.log(".....packageDetails.......",packageDetails);

            let discountPercent = 0
            if(body.promoCodes.length > 0){
            console.log("+++++body.promoCodes.length+++++++",body.promoCodes.length);
            let promoCodeResult = await appointmentDA.getPromoCodeList(body.promoCodes);
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
            if(payable == payableAmount){
                if(body.paymentMode === "online"){
                    let payment = await paymentGateway.generatePaymentLinkPackage(
                        ptDetails.firstName, 
                        body.phoneNumber,
                        ptDetails.emailId,
                        payableAmount
                    );
                    if (payment && payment.data.status == constants.value.CREATED){
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
                            // GSTID: obj.GSTID,
                        };
                        let addPaymentInfo = await appointmentDA.addPaymentInfo(paymentObj);
                        console.log("------------addPaymentInfo------",addPaymentInfo)
                        let updatePackageDetailsInAppt = await appointmentDA.updatePackageDetailsInAppt(
                            body.appointmentId, addPaymentInfo._id, body.packageId);
                            console.log("------------updatePackageDetailsInAppt------",updatePackageDetailsInAppt)
                        res.send({ success: true, data: addPaymentInfo});
                    } else{
                        throw Boom.badData(
                            apiResponse.ServerErrors.error.payment_not_created
                        );
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
                        packageId: body.packageId
                        // GSTID: obj.GSTID,
                    };
                    let addPaymentInfo = await appointmentDA.addPackagePaymentInfo(paymentObj);
                    console.log("=========  addPaymentInfo  =========",addPaymentInfo)
                    console.log("=========   body.packageId  =========",body.packageId)
                    let updatePackageDetailsInAppt = await appointmentDA.updatePackageDetailsInAppt(
                        body.appointmentId, addPaymentInfo._id, body.packageId);
                    console.log("=========  updatePackageDetailsInAppt  =========",updatePackageDetailsInAppt)
                    let PAYMENT_ID = addPaymentInfo._id
                    let paidOn = moment().format();
                    let branchCode = await appointmentDA.branchCode(ptDetails.branchId);
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
                    let updatePaymentReport = await appointmentDA.updatePaymentByPaymentIdBA(obj);
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
                    let insertPackageSchedules = await appointmentDA.insertPackageSchedules(packageSchedules);
                    console.log("=========  insertPackageSchedules  =========",insertPackageSchedules)
                    let details ={
                        endDate: insertPackageSchedules.endDate,
                        _id: insertPackageSchedules._id
                    }
                    //   schedule package is not working
                    await schedulers.changeisActiveStatusPackage(details)
                    let userInfo = await appointmentDA.getuserInfoWithpaymentRelationId(relationId);
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
        } catch(e){
            next(e);
        }
    };

    async paymentAsthetic(req, res, next){
        try{
            let body = req.body
            const { error } = rule.paymenPackageRule.validate(body);
            if (error){
              throw Boom.badData(error.message);
            }
            console.log(".....body.......",body);
            let ptDetails = await appointmentDA.patientDetaiils(body.patientId);
            console.log(".....ptDetails.......",ptDetails);

            let branchDetails = await appointmentDA.branchCode(ptDetails.branchId)

            let info = await appointmentDA.getConsultationGST(branchDetails.stateId);
            console.log("-----info-----",info)

            let appointmentData = await appointmentDA.getApptDetails(body.appointmentId);
            console.log(".....appointmentData.......",appointmentData);

            let packageDetails = await appointmentDA.getPackageDetails(body.packageId);
            console.log(".....packageDetails.......",packageDetails);

            let discountPercent = 0
            if(body.promoCodes.length > 0){
            console.log("+++++body.promoCodes.length+++++++",body.promoCodes.length);
            let promoCodeResult = await appointmentDA.getPromoCodeList(body.promoCodes);
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

            let gstAmount = 0
            let CGST = 0
            let SGST = 0
            let IGST = 0
            if(info.stateCode == "KA"){
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
            if(roundedDownPayable == roundedDownPayableAmount){
                if(body.paymentMode === "online"){
                    let payment = await paymentGateway.generatePaymentLinkPackage(
                        ptDetails.firstName, 
                        body.phoneNumber,
                        ptDetails.emailId,
                        roundedDownPayable
                    );
                    if (payment && payment.data.status == constants.value.CREATED){
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
                            IGST: IGST
                            // GSTID: obj.GSTID,
                        };
                        let addPaymentInfo = await appointmentDA.addPaymentInfo(paymentObj);
                        console.log("------------addPaymentInfo------",addPaymentInfo)
                        let updateAstheticPackageDetailsInAppt = await appointmentDA.updateAstheticPackageDetailsInAppt(
                            body.appointmentId, addPaymentInfo._id, body.packageId);
                            console.log("------------updateAstheticPackageDetailsInAppt------",updateAstheticPackageDetailsInAppt)
                        res.send({ success: true, data: addPaymentInfo});
                    } else{
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
                        IGST: IGST
                        // GSTID: obj.GSTID,
                    };
                    let addPaymentInfo = await appointmentDA.addPackagePaymentInfo(paymentObj);
                    console.log("=========  addPaymentInfo  =========",addPaymentInfo)
                    console.log("=========   body.packageId  =========",body.packageId)
                    let updateAstheticPackageDetailsInAppt = await appointmentDA.updateAstheticPackageDetailsInAppt(
                        body.appointmentId, addPaymentInfo._id, body.packageId);
                    console.log("=========  updateAstheticPackageDetailsInAppt  =========",updateAstheticPackageDetailsInAppt)
                    let PAYMENT_ID = addPaymentInfo._id
                    let paidOn = moment().format();
                    let branchCode = await appointmentDA.branchCode(ptDetails.branchId);
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
                    let updatePaymentReport = await appointmentDA.updatePaymentByPaymentIdBA(obj);
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
                    let insertPackageSchedules = await appointmentDA.insertPackageSchedules(packageSchedules);
                    console.log("=========  insertPackageSchedules  =========",insertPackageSchedules)
                    let details ={
                        endDate: insertPackageSchedules.endDate,
                        _id: insertPackageSchedules._id
                    }
                    // adding schedulers
                    await schedulers.changeisActiveStatusPackage(details)
                    let userInfo = await appointmentDA.getuserInfoWithpaymentRelationId(relationId);
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
                        branchPhoneNumber: branchCode.branchPhoneNumber
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
        } catch(e){
            next(e);
        }
    };

    async insertEstimation(req, res, next){
        try{
            let body = req.body
            const { error } = rule.createEstimationRule.validate(body);
            if (error){
              throw Boom.badData(error.message);
            }
            let result = await appointmentDA.createEstimation(body);
            res.send({ success: true, data: result});
        } catch(e){
            next(e);
        }
    };

    async getPatientDetilsPackage(req, res, next){
        try{
            let body = req.body
            const { error } = rule.searchHcuraIdRule.validate(body);
            if (error){
              throw Boom.badData(error.message);
            }
            let result = await appointmentDA.getPatientDetailsPackagePayments(body.hcuraId, body.roleId, body.branchId);
            res.status(200).send({ status: true, data: result });
        } catch(e){
            next(e);
        }
    };

    async getPaymentDetailsByApptId(req, res, next){
        try{
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

    async getPatientAndPaymentDetailsForExternal(req, res, next){
        try{
            let body = req.body
            const { error } = rule.searchHcuraIdRule.validate(body);
            if (error){
              throw Boom.badData(error.message);
            }
            let result = await appointmentDA.getPatientAndPaymentDetailsForExternal(body.hcuraId, body.roleId, body.branchId);
            res.status(200).send({ status: true, data: result });
        } catch(e){
            next(e);
        }
    };

    async paymentExternalSource(req, res, next){
        try{
            let body = req.body
            const { error } = rule.paymentExtrnalSourceRule.validate(body);
            if (error){
              throw Boom.badData(error.message);
            }
            let ptDetails = await appointmentDA.patientDetaiils(body.patientId);
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
                    };
                    let addPaymentInfo = await appointmentDA.addExternalSourcePaymentInfo(
                      obj,
                      paymentObj
                    );
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
                  };
                let addPaymentInfo = await appointmentDA.addExternalSourcePaymentInfo(obj, paymentObj);
                let PAYMENT_ID = addPaymentInfo._id;
                let paidOn = moment().format();
                let branchCode = await appointmentDA.branchCode(ptDetails.branchId);
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
                let updatePaymentReport = await appointmentDA.updatePaymentByPaymentId(updatePaymentDetails);
                if (updatePaymentReport && updatePaymentReport != null) {
                    let userInfo = await appointmentDA.getuserInfoWithpaymentRelationId(relationId);
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
                        //INVOICE EMAIL
                        let file = await htmlToPDF.generateInvoiceForExternalSource( pdfDetails );
                        emailSender.sendExternalSourceInvoiceEmail(userInfo[0].patient.emailId, file);
                        res.send({ success: true, data: addPaymentInfo });
                    } 
                }
            }
        } catch(e){
            next(e);
        }
    };

    async getPackagePromocodes(req, res, next){
        try{
          let result = await appointmentDA.getPromoListPackage();
          res.send({success: true, data: result});
        } catch(e){
          next(e);
        }
    };

    async getAstheticPromocodes(req, res, next){
        try{
          let result = await appointmentDA.getPromoListAsthetic();
          res.send({success: true, data: result});
        } catch(e){
          next(e);
        }
    };

    async getDashboardPTDetails(req, res, next){
        try{
            let body = req.body
            const { error } = rule.dashboardPtDetailsRule.validate(body);
            if (error){
              throw Boom.badData(error.message);
            }
            let result 
            if(body.all == "YES"){
                // let roleDetails = await authentationDA.getroleCodeDA(body.roleId);
                // if(roleDetails.roleName == "SUPER_ADMIN"){
                    result = await appointmentDA.dashboardAllPtDetailsDA(body)
                // }
            }else{
                result = await appointmentDA.dashboardPtDetailsDA(body);
            }
            res.send({ success: true, data: result });
        } catch(e){
            next(e);
        }
    };

    async getAllAppt(req, res, next){
        try{
            // const { appointmentState } = req.params;
            const { page, limit, searchKey, fromDate, toDate, branchId, roleId} = req.query;
            const obj = { isActive : true };
            const getAllAppointment = await appointmentDA.getAllApptList(
                obj,
                page,
                limit,
                searchKey,
                fromDate,
                toDate,
                branchId,
                roleId
            );
            res.status(200).send({ status: true, data: getAllAppointment });
        } catch(e){
            next(e);
        }
    };

    async updateAppointmentStatus(req, res, next){
        try{
            let body = req.body
            const { error } = rule.apptStatusRule.validate(body);
            if (error){
              throw Boom.badData(error.message);
            }
            let result = await appointmentDA.updateAppointmentStatus(body);
            res.status(200).send({ status: true, data: result });
        } catch(e){
            next(e);
        }
    };

    async getAllAppointments(req, res, next){
        try{
            // const { appointmentState } = req.params;
            const { appointmentStatus, page, limit, searchKey, fromDate, toDate, branchId, roleId } = req.query;
            const obj = { appointmentStatus, isActive : true };
            const getAllAppointment = await appointmentDA.getAllApptList(
                obj,
                page,
                limit,
                searchKey,
                fromDate,
                toDate,
                branchId,
                roleId
            );
            res.status(200).send({ status: true, data: getAllAppointment });
        } catch(e){
            next(e);
        }
    };

    async calculateGst(req, res, next){
        try{
            const { branchId, amount } = req.query;
            let result = await appointmentDA.getStateDetails(branchId);
            let stateDetails = result[0].stateDetails
            let gstAmount = 0
            let CGST = 0
            let SGST = 0
            let IGST = 0
            let UGST = 0
            if(stateDetails.stateCode == "KA"){
                let CGSTSGST = parseFloat(stateDetails.CGST) + parseFloat(stateDetails.SGST)
                gstAmount = parseFloat(((amount * parseFloat(CGSTSGST)) /100).toFixed(2));
                CGST = parseFloat((gstAmount/2));
                SGST = parseFloat((gstAmount/2));
            } else {
                gstAmount = parseFloat(((amount * parseFloat(stateDetails.IGST)) /100).toFixed(2));
                IGST = parseFloat((gstAmount));
            }
            let data = {
                totalAmount: parseFloat(amount) + parseFloat(gstAmount),
                gstAmount: gstAmount,
                CGST: CGST,
                SGST: SGST,
                IGST: IGST,
                UGST: UGST
            }
            res.status(200).send({ status: true, data: data });
        } catch(e){
            next(e);
        }
    };

    async getDashboardDataAptCount(req, res, next) {
        try {
            let body = req.body;
            const { error } = rule.dashboard.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            
            let aptCount = await appointmentDA.getDashboardAptCount(body);
            
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
            let revenueCount = await appointmentDA.getDashboardRevenueCount(body);
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
          console.log("------payload-------",payload)
          const patientList = await appointmentDA.getPatientListTemp(
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
          console.log("------patientList-------",patientList);
          res.status(200).send({ status: true, data: sendObj });
        } catch (e) {
          next(e);
        }
    };

    async changeisActiveStatusTemp(req, res, next){
        try{
            let body = req.body;
            const { error } = rule.changeStatusisCompletedTemp.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let result = await appointmentDA.changeisActiveStatusTemp(body);
            res.status(200).send({ status: true, data: result });
        } catch(e){
            next(e);
        }
    };

    // insert case study (PART - 1 )
    async insertCaseStudy(req, res, next){
        try{
        let body = req.body;
        const { error } = doctorRule.insertCaseStudyRule.validate(body);
        if (error){
            throw Boom.badData(error.message);
        }
        console.log("body--------",body)
        let caseStudyDetails = await appointmentDA.insertCaseStudyDA(body);
        res.status(200).send({ status: true, data: caseStudyDetails });
        } catch(e) {
        next(e);
        }
    };

    // insert case study (PART - 2 )
    async insertCaseStudySuggestionPrescription(req, res, next){
        try{
        let body = req.body;
        const { error } = doctorRule.insertCaseStudySuggestionPrescriptionRule.validate(body);
        if (error){
            throw Boom.badData(error.message);
        }
        let caseStudyDetails = await appointmentDA.insertCaseStudySuggestionPrescription(body);
        res.status(200).send({ status: true, data: caseStudyDetails });
        } catch(e) {
        next(e);
        }
    };

    async insertPrescription(req, res, next){
        try{
            let body = req.body;
            const { error } = doctorRule.insertPrescriptionRule.validate(body);
            if (error){
                throw Boom.badData(error.message);
            }
            let prescriptionDetails = await appointmentDA.insertPrescription(body)
            res.status(200).send({ status: true, data: prescriptionDetails });
        } catch(e){
            next(e);
        }
    };

    async getPtDetailsCasestudy(req, res, next){
        try{
            let body = req.body;
            const { error } = doctorRule.searchHcuraIdRule.validate(body);
            if (error){
                throw Boom.badData(error.message);
            }
            console.log("-----body-----",body)
            let details = await appointmentDA.getPatientDetailsCaseStudy(body.hcuraId, body.roleId, body.branchId)
            res.status(200).send({ status: true, data: details });
        } catch(e){
            next(e);
        }
    };

    async updateSuggestionPrescription(req, res, next){
        try{
          let body = req.body;
          const { error } = doctorRule.updateSuggestionPrescriptionRule.validate(body);
          if (error){
            throw Boom.badData(error.message);
          }
          let obj = await appointmentDA.updateSuggestionPrescription(body);
          res.status(200).send({ status: true, data: obj });
        } catch(e) {
          next(e);
        }
    };

    async getCaseStudyDetails(req, res, next){
        try{
            let body = req.body;
            let obj = await appointmentDA.getCaseStudyDetails(body.caseStudyId);
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
            let prescriptionDetails = await appointmentDA.updatePrescription(body)
            res.status(200).send({ status: true, data: prescriptionDetails });
        } catch(e){
            next(e);
        }
    };

    async getPrescriptionDetails(req, res, next){
        try{
            let body = req.body;
            let obj = await appointmentDA.getPrescriptionDetails(body.prescriptionId);
            res.status(200).send({ status: true, data: obj });
        } catch(e) {
          next(e);
        }
    };

    async getDoctorList(req, res, next){
        try{
            const { branchId, roleId } = req.query;
            let obj = await appointmentDA.getDoctorList(branchId, roleId);
            res.status(200).send({ status: true, data: obj });
        } catch(e){
            next(e);
        }
    };

    async getPackageScheduleDetails(req, res, next){
        try{
          let body = req.body
          const { error } = doctorRule.getPackageScheduleDetailsRule.validate(body);
          if (error){
            throw Boom.badData(error.message);
          }
          let details = await appointmentDA.getPackageScheduleDetails(body.patientId)
          if (details && details.length === 0) {
            return res.status(404).json({ message: "Package Schdule Details Not Avaliable" });
        } else {
            return res.status(200).json({status: true, data: details });
        }
        } catch(e){
          next(e);
        }
    };

    async getSuggestionPrescriptionDetails(req, res, next){
        try{
            let body = req.body
            const { error } = doctorRule.appointmentIdRule.validate(body);
            if (error){
              throw Boom.badData(error.message);
            }
            let result = await appointmentDA.getSuggestionPrescriptionDetails(body.appointmentId);
            return res.status(200).json({status: true, data: result });
        } catch(e){
            next(e);
        }
    };

    async getpaymentDetailsForPdf(req, res, next){
        try{
            const { paymentId } = req.query;
            if (!ObjectId.isValid(paymentId)) {
                return res.status(400).json({
                  error: "Invalid paymentId format. Must be a 24 character hex string."
                });
            }
            let obj = await appointmentDA.getPaymentDetails(paymentId);
            return res.status(200).send({ status: true, data: obj });
        } catch(e){
            next(e);
        }
    };

    async sendDuplicatePrescription(req, res, next){
        try{
            let body = req.body
            const { error } = doctorRule.sendemailPrescription.validate(body);
            if (error){
                throw Boom.badData(error.message);
            }
            let appointmentDetails = 
            await appointmentDA.getAppointmentDataForPrescriptionDA(body.appointmentId, body.patientId);
            let file = await htmlToPDF.generatePrescription(appointmentDetails);
            emailSender.prescription(body.emailId, file);
            res.status(200).send({ status: true, meassage: "EMAIL SENT SUCCESSFULLY"});
        } catch(e) {
          next(e);
        }
    };

    async sendOriginalPrescription(req, res, next){
        try{
            let body = req.body
            const { error } = doctorRule.sendemailPrescription.validate(body);
            if (error){
                throw Boom.badData(error.message);
            }
            let appointmentDetails = 
            await appointmentDA.getAppointmentDataForPrescriptionDA(body.appointmentId, body.patientId);
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
          let result = await appointmentDA.getTransactionReport(body);
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

};

module.exports = new appointment();
