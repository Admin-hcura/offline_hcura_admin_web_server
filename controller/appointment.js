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
const scheduler = require("../scheduler/scheduler");
const schedulers = new scheduler();

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
            let obj = {
                patientId: body.patientId,
                doctorId: body.doctorId,
                slotId: blockSlot._id,
                dayId: body.dayId,
                branchId: body.branchId,
                appointmentDate: appointmentDate,
                startTime: body.startTime,
                endTime: body.endTime,
                symptoms: body.symptoms,
                allegires: body.allegires,
                consultationMode: body.consultationMode,
                consultationType: body.consultationType,
                appointmentStatus: "CREATED",
                appointmentNumber: newAppointmentNumber
            }
            let createAppointment = await appointmentDA.createAppointment(obj);
            let userInfo = await appointmentDA.patientDetaiils(body.patientId);
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
            let info = await appointmentDA.getConsultationGST(ptDetails.stateId);
            console.log("-----info-----",info)
            let promoCodeResult = await appointmentDA.getPromoCodeList(body.promoCodes);
            console.log("+++++promoCodeResult+++++++",promoCodeResult)
            let consultationfee = await appointmentDA.getAmount(appointmentData[0].consultationType);
            console.log("+++++consultationfee+++++++", consultationfee.amount)
            // const reducer = (accumulator, currentValue) =>
            //     accumulator + currentValue.discount;
            let discountPercent = promoCodeResult.discount
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
                  let confirmAppt = await appointmentDA.confirmAppointment(
                    appointmentData[0]._id, addPaymentInfo._id );
                  console.log("++++++confirm Appt+++++",confirmAppt)
                  let paidOn = moment().format();
                  let branchCode = await appointmentDA.branchCode(ptDetails.branchId);
                  console.log("@@@@@@@  branchCode  @@@@@",branchCode)
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
                    appointmentId: appointmentData[0]._id,
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
                        docQualification : userInfo[0].doctor.qualification,
                        docRegstration : userInfo[0].doctor.registrationNumber
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
                       // // email to patient appointment details
                        // emailSender.appointmentBookedMail(
                        //     userInfo[0].patient.firstName,
                        //     userInfo[0].patient.lastName,
                        //     userInfo[0].doctor.firstName,
                        //     userInfo[0].doctor.lastName,
                        //     userInfo[0].patient.emailId,
                        //     pdfDetails
                        //   );
                        
                        res.send({ success: true, data: userInfo});
                  }
            } 
            else if (payable == body.payableAmount && payable > 0) {
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
                let addPaymentInfo = await appointmentDA.addPaymentInfo(
                    paymentObj,
                    );
                
                    await appointmentDA.updatePaymentDetailsAppointment(
                        body.appointmentId, addPaymentInfo._id,); //appointment table
                    res.send({ success: true, data: addPaymentInfo });
                
                } else {
                    throw Boom.badData(
                        apiResponse.ServerErrors.error.payment_not_created
                    );
                }
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
            const { error } = rule.hcuraIdRule.validate(body);
            if (error){
              throw Boom.badData(error.message);
            }
            let obj = await appointmentDA.getAppointmentDetailsPaymentDetails(body.hcuraId);
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

    async packagePayment(req, res, next){
        try{
            let body = req.body
            const { error } = rule.PaymenPackageRule.validate(body);
            if (error){
              throw Boom.badData(error.message);
            }
            console.log(".....body.......",body);
            let ptDetails = await appointmentDA.patientDetaiils(body.patientId);
            console.log(".....ptDetails.......",ptDetails);

            let info = await appointmentDA.getConsultationGST(ptDetails.stateId);
            console.log("-----info-----",info)

            let appointmentData = await appointmentDA.getApptDetails(body.appointmentId);
            console.log(".....appointmentData.......",appointmentData);

            let packageDetails = await appointmentDA.getPackageDetails(body.packageId);
            console.log(".....packageDetails.......",packageDetails);

            let promoCodeResult = await appointmentDA.getPromoCodeList(body.promoCodes);
            console.log("+++++promoCodeResult+++++++",promoCodeResult);

            let discountPercent = promoCodeResult.discount
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





            res.send({ success: true, data: ptDetails});
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

};

module.exports = new appointment();
