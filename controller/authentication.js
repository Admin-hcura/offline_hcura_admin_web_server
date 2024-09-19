const { promisify, isNull } = require("util");
const redisClient = require("../config/redisConfiguration");
const Boom = require("@hapi/boom");
// const multiparty = require("multiparty");
const rule = require("../helpers/autthenticationRule");
const authentationDAObj = require("../layers/dataLayer/authentationDA");
const apiResponse = require("../helpers/apiResponse");
const emailSender = require("../helpers/emailSender");
const ua_parser = require("ua-parser-js");
const invoiceGenerator = require("../helpers/invoiceNoGenerater");
const utilities = require("../helpers/utilities");
const constants = require("../helpers/constants");
const appointmentDA = require("../layers/dataLayer/appointmentDA");
const htmlToPDF = require("../helpers/htmlToPDF");
const sendSMS = require("../helpers/sendSMS");
const moment = require("moment-timezone");
const appointment = require("./appointment");
const scheduler = require("../scheduler/scheduler");
const schedulers = new scheduler();


async function redisGet(key) {
    try {
        const value = await redisClient.get(key);
        return value;
    } catch (err) {
        console.error("Error retrieving from Redis:", err);
        throw err;
    }
};

class authentication {
    async insertBranch(req, res, next){
        try{
            let body = req.body
            const { error } = rule.authRule.validate(body);
              if (error) {
                throw Boom.badData(error.message);
              }
              let insertedBranch = await authentationDAObj.insertBranchDA(body);
              res.send({ success: true, data: insertedBranch});
          } catch (e) {
              next(e);
          }
    };

    async insertRole(req, res, next){
        try{
          let body = req.body
          const { error } = rule.roleRule.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let insertedRole = await authentationDAObj.insertRoleDA(body);
            res.send({ success: true, data: insertedRole});
        } catch (e) {
            next(e);
        }
    };

    async addAdmin(req, res, next){
        try{
            let body = req.body
            const { error } = rule.addAdminRule.validate(body);
                if (error) {
                    throw Boom.badData(error.message);
                }
                let adminExist = await authentationDAObj.adminExistDA(body.emailId, body.username, body.phoneNumber, body.EmpNumber);
                if (adminExist){
                    throw Boom.conflict(apiResponse.ServerErrors.error.admin_already_exist);
                } else {
                    let response = await authentationDAObj.addAdminDA(body);
                    await emailSender.welcomeMail(
                        response.emailId,
                        response.username,
                        response.phoneNumber,
                        response.firstName,
                        response.lastName
                    )
                    res.send({ success: true, data: response});
                }
        } catch(e) {
            next(e);
        }
    };

    async adminLogin(req, res, next){
        try {
            let userAgent = ua_parser(req.headers["user-agent"]);
            let { username, password, fcmToken } = req.body;
            let response = await authentationDAObj.adminIsExistDA(username);
            let roleCode = await authentationDAObj.getroleCodeDA(response.roleId);
            response.roleCode = roleCode.roleCode
            response.roleName = roleCode.roleName
            if (!roleCode){
                apiResponse.ServerErrors.error.role_not_found
            }
            if (!response) {
              throw Boom.conflict(
                apiResponse.ServerErrors.error.user_not_exist_admin
              );
            } else {
              console.log("-------response------", response)
              let checkPassword = await authentationDAObj.adminPasswordDA(
                password,
                response.password
              );
              if (checkPassword) {
                await authentationDAObj.updateAdminFcmTokenDA(response._id, fcmToken);
                let details = await createAdminSession(response, res, userAgent);
                details.roleCode = roleCode.roleCode
                details.roleName = roleCode.roleName
                res.send({ success: true, data: details });
              } else {
                throw Boom.conflict(apiResponse.ServerErrors.error.password);
              }
            }
          } catch (e) {
            next(e);
          }
    };

    async adminLogout(req, res, next){
        try{
            let patientId = req.patientId;
              if (!patientId) {
                throw Boom.badData("Please enter patientId");
              }
            await redisClient.del(patientId + "_offline_admin_web");
            await authentationDAObj.adminLogoutDA(patientId);
            res.send({ success: true, message: 'Logged out successfully'});
        } catch(e){
            next(e);
        }
    };

    async forgetPassword(req, res, next){
        try{
            let body = req.body
            const { error } = rule.forgetPasswordRule.validate(body);
            if(error){
                throw Boom.badData(error.message);
            }
            let result = await authentationDAObj.adminIsExistDA(body.username);
            if(!result) {
                throw Boom.conflict(
                    apiResponse.ServerErrors.error.user_not_exist_admin
                );
            }
            let mailKey = result.emailId;
            let forgetPasswordOtp = utilities.generateAndGetOTP(constants.OTP.otpLength);
            await redisClient.set(
                mailKey,
                JSON.stringify({ forgetPasswordOtp: forgetPasswordOtp }),
                'EX',
                constants.OTP_STORE_TIME_LIMIT
              );
            await emailSender.sendOtp(result.emailId, forgetPasswordOtp, result.firstName);
            res.send({success: true, data: result})
        } catch (e){
            next(e);
        }
    };

    async updatePassword(req, res, next){
        try{
            let body = req.body
            const { error } = rule.updatePasswordRule.validate(body);  
            if (error) {
                    throw Boom.badData(error.message);
                }
                let mailKey = body.emailId;
                let forgetPasswordOtpDetails = await redisGet(mailKey);
                if (forgetPasswordOtpDetails) {
                    forgetPasswordOtpDetails = JSON.parse(forgetPasswordOtpDetails);
                    if(forgetPasswordOtpDetails.forgetPasswordOtp == body.otp){
                        let response = await authentationDAObj.updatePasswordDA(body);
                        res.send({ success: response.acknowledged == 1 ? true : false });
                    } else {
                        throw Boom.badRequest(apiResponse.ServerErrors.error.invalid_Otp);
                    }
                } else {
                    throw Boom.badRequest(apiResponse.ServerErrors.error.otp_expired);
                }
        } catch(e) {
            next(e);
        }
    };

    // async patientRegistartion(req, res, next){
    //     try{
    //         let body = req.body
    //         const { error } = rule.patientRegRule.validate(body);
    //         if (error) {
    //             throw Boom.badData(error.message);
    //         }
    //         // let patientExist = await authentationDAObj.patientExistDA(body.phoneNumber);
    //         let branchCode = await authentationDAObj.getBrachDetailsDA(body.branchId);
    //         if(!branchCode){
    //             throw Boom.conflict(apiResponse.ServerErrors.error.branchCode_not_exist);
    //         }
    //         // if(patientExist){
    //         // throw Boom.conflict(apiResponse.ServerErrors.error.phoneNumber_Exist);
    //         // } else {
    //             const now = new Date();
    //             const month = String(now.getMonth() + 1).padStart(2, '0');
    //             const year = String(now.getFullYear()).slice(-2);
    //             let existingIDss = await authentationDAObj.getHcuraIdDA();
    //             const hcuraIds = existingIDss.map(item => item.hcuraId);
    //             const existingIDsArray = hcuraIds.map(id => ({
    //                 prefix: id.substring(0, 4),  // Extract "H01J" part
    //                 month: id.substring(4, 6),   // Extract "06" part
    //                 year: id.substring(6, 8),    // Extract "24" part
    //                 count: id.substring(8)       // Extract the count part, e.g., "01", "02", etc.
    //             }));
    //                 // Find the maximum count for the current month and year
    //             let maxCount = 0;
    //             existingIDsArray.forEach(id => {
    //                 if (id.month === month && id.year === year) {
    //                     const count = parseInt(id.count, 10);
    //                     if (count > maxCount) {
    //                         maxCount = count;
    //                     }
    //                 }
    //             });
    //                 // Increment the maximum count by one
    //             const countThisMonth = maxCount + 1;
    //             const hcuraId = `${branchCode.branchCode}${month}${year}${String(countThisMonth).padStart(2, '0')}`;
    //             let patientReg = await authentationDAObj.patientRegDA(
    //                 hcuraId, body.branchId, body.firstName.trim(), body.lastName.trim(), body.birthDate,
    //                 body.gender, body.emailId.trim(), body.phoneNumber, body.alternativeNumber,
    //                 body.bloodGroup, body.address, body.registeredBy, body.source, body.occupation);
    //             await emailSender.patientWelcomeEmail(
    //                 patientReg.firstName, 
    //                 patientReg.lastName, 
    //                 hcuraId, 
    //                 patientReg.emailId, 
    //                 patientReg.phoneNumber
    //             );
    //             res.send({success: true, data: patientReg});
    //         // }
    //     } catch(e){
    //     next(e);
    //     }
    // };

    async patientRegistartion(req, res, next) {
        try {
            let body = req.body;
            console.log("......body......", body);
            const { error } = rule.patientRegRule.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            console.log("......error......", error);
            // Check branch code
            let branchDetails = await authentationDAObj.getBrachDetailsDA(body.branchId);
            console.log("......branchDetails......", branchDetails);
            if (!branchDetails) {
                throw Boom.conflict(apiResponse.ServerErrors.error.branchCode_not_exist);
            }
            console.log("......11111111......");
            const branchCode = branchDetails.branchCode;
            console.log("......branchCode......",branchCode);
            // Generate HCURA ID
            const now = new Date();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = String(now.getFullYear()).slice(-2);
            console.log("......11111111......");
            // Get existing HCURA IDs
            let existingIDss = await authentationDAObj.getHcuraIdDA();
            console.log("......existingIDss......",existingIDss);
            const hcuraIds = existingIDss.map(item => item.hcuraId);
            console.log("......hcuraIds......",hcuraIds);
            const existingIDsArray = hcuraIds.map(id => ({
                branchPrefix: id.substring(0, 6),  // Extract "HKA01J" part (or similar branch prefix)
                month: id.substring(6, 8),         // Extract "07" part
                year: id.substring(8, 10),         // Extract "24" part
                count: id.substring(10)            // Extract the count part, e.g., "01", "02", etc.
            }));
            console.log("......existingIDsArray......",existingIDsArray);
            // Find the maximum count for the current branch code, month, and year
            let maxCount = 0;
            existingIDsArray.forEach(id => {
                if (id.branchPrefix === branchCode && id.month === month && id.year === year) {
                    const count = parseInt(id.count, 10);
                    if (count > maxCount) {
                        maxCount = count;
                    }
                }
            });
            // Increment the maximum count by one
            const countThisMonth = maxCount + 1;
            const hcuraId = `${branchCode}${month}${year}${String(countThisMonth).padStart(2, '0')}`;
            console.log("......hcuraId......",hcuraId);
            // Register patient
            let patientReg = await authentationDAObj.patientRegDA(
                hcuraId, body.branchId, body.firstName.trim(), body.lastName.trim(), body.birthDate,
                body.gender, body.emailId.trim(), body.phoneNumber, body.whatsappNumber, body.stateName,
                body.bloodGroup, body.address, body.registeredBy, body.source, body.occupation, body.stateId
            );
    
            // Send welcome email
            // await emailSender.patientWelcomeEmail(
            //     patientReg.firstName,
            //     patientReg.lastName,
            //     hcuraId,
            //     patientReg.emailId,
            //     patientReg.phoneNumber
            // );
    
            res.send({ success: true, data: patientReg });
    
        } catch (e) {
            next(e);
        }
    };
    
    async bookTempAppointment(req, res, next) {
        try {
            let body = req.body;
            console.log("..........", body);
            const { error } = rule.tempAppointmentRule.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let appointmentDate = moment(body.appointmentDate)
            .tz("UTC")
            .format(process.env.format);
            body.appointmentDate = appointmentDate
            const now = new Date();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = String(now.getFullYear()).slice(-2);
            console.log("..........", now, month, year);
            let branchCode = await authentationDAObj.getBrachDetailsDA(body.branchId);
            if(!branchCode){
                throw Boom.conflict(apiResponse.ServerErrors.error.branchCode_not_exist);
            }
            let existingIDss = await authentationDAObj.getHcuraTIdDA();
    
            const hcuraTIds = existingIDss.map(item => item.hcuraTId).filter(id => id);    
            const existingIDsArray = hcuraTIds.map(id => ({
                prefix: id.substring(0, 5),  // Extract "H01J" part
                month: id.substring(5, 7),   // Extract "06" part
                year: id.substring(7, 9),    // Extract "24" part
                count: id.substring(9)       // Extract the count part, e.g., "01", "02", etc.
            }));    
            // Find the maximum count for the current month and year
            let maxCount = 0;
            if (hcuraTIds.length > 0) {
                existingIDsArray.forEach(id => {
                    if (id.month === month && id.year === year) {
                        const count = parseInt(id.count, 10);
                        if (count > maxCount) {
                            maxCount = count;
                        }
                    }
                });
            }
    
            // Increment the maximum count by one
            const countThisMonth = maxCount + 1;
            const hcuraTId = `${branchCode.branchCode}T${month}${year}${String(countThisMonth).padStart(2, '0')}`;
            let booked = await appointmentDA.bookedDetails(body, hcuraTId);
            let docDetails = await appointmentDA.getDoctorDetails(body.doctorId);
            console.log(".....booked...", booked);
            console.log(".....docDetails...", docDetails);
            // let SMSToPatient = await sendSMS.sendSMSAppointmentBookedToPT(booked, docDetails);
            // let SMSToDoctor = await sendSMS.sendSMSTempAppointmentBookedToDoc(booked, docDetails);
            // sms to doctor
            emailSender.sendTempAppointmentBookedEmailToAdmin(booked, docDetails);

            res.send({success: true, data: booked});
        } catch (e) {
            next(e);
        }
    };
    
    async getBranchList(req, res, next){
        try{
            let branchList = await authentationDAObj.branchListDA();
            if (!branchList) {
                throw Boom.conflict(
                  apiResponse.ServerErrors.error.branches_not_found
                );
              } else {
                res.send({ success: true, data: branchList});
              }
        } catch (e){
            next(e);
        }
    };

    async getRoleList(req, res, next){
        try{
            let roleList = await authentationDAObj.roleListDA();
            if (!roleList) {
                throw Boom.conflict(
                  apiResponse.ServerErrors.error.role_not_found
                );
              } else {
                res.send({ success: true, data: roleList});
              }
        } catch (e){
            next(e);
        }
    };

    async insertTime(req, res, next){
        try{
            let body = req.body
            let insertedTime = await authentationDAObj.insertTime(body);
            res.send({ success: true, data: insertedTime});
        } catch(e){
            next(e);
        }
    };

    async insertDay(req, res, next){
        try{
            let body = req.body
            let insertedDay = await authentationDAObj.insertDay(body);
            res.send({ success: true, data: insertedDay})
        } catch(e){
            next(e);
        }
    };

    async insertConsultationAmount(req, res, next){
        try{
            let body = req.body
            let insertedAmount = await authentationDAObj.insertAmountDA(body);
            res.send({success: true, data:insertedAmount});
        } catch(e){
            next(e);
        }
    };

    async insertPackage(req, res, next){
        try{
            let body = req.body
            const { error } = rule.insertPackageRule.validate(body);
                if (error) {
                    throw Boom.badData(error.message);
                }
            let insertedPackageDetails = await authentationDAObj.insertPackage(body);
            res.send({success: true, data: insertedPackageDetails});
        } catch(e){
            next(e);
        }
    };

    async insertPromoCodes(req, res, next){
      try{
        let body = req.body
        console.log(".......body......",body)
        const { error } = rule.insertPromoCodeRule.validate(body);
                if (error) {
                    throw Boom.badData(error.message);
                }
        let insertedPromoCodes = await authentationDAObj.addpromoCodes(body);
        res.send({success: true, data:insertedPromoCodes});
      } catch(e){
        next(e);
      }
    };

    async getPaymentReportByWebHook(req, res, next){
        try {
          if (req.body) {
            let body = req.body;
            let paidOn = moment().format();
            console.log("webhook body......................",body)
            console.log("webhook body.payload......................",body.payload)
            let report = {}
            if (body.payload["payment.downtime"]){
              report = body.payload["payment.downtime"].entity;
            }else{
              report = body.payload.payment.entity;
            }
            console.log("report.....................",report)
            if (report.description === null){   // If we are using extrnal Link we are sending response as 200
              console.log("---------------Payment Done With Link---------------")
              return res.status(200).send(true);
            }else if(report.description === 'QRv2 Payment') { // If we are using extrnal QR Code we are sending response as 200
              console.log("---------------Payment Done With QR Code---------------")
              return res.status(200).send(true);
            } else {
              let relationId = report.description.substring(1);
              console.log("--------relationId-----",relationId)
              let getStatus = await authentationDAObj.offlineGetStatusDA(relationId);
              console.log("........getStatus.......",getStatus);
              let branchDetails = await authentationDAObj.getBrachDetailsDA(getStatus.branchId);
              console.log("........branchDetails.......",branchDetails);
              let userInfo = await appointmentDA.getuserInfoWithpaymentRelationId(relationId);
              console.log("--------userInfo-----",userInfo);
              let invoiceNumber
              if(userInfo[0].paymentFor == constants.value.ASTHETIC){
                invoiceNumber = await invoiceGenerator.generateInvoiceNumberAsthetic(branchDetails.branchCode);
              } else {
                invoiceNumber = await invoiceGenerator.generateInvoiceNumber(branchDetails.branchCode);
              } 
              let updatePaymentDetails = {
                paymentMethod: report.method,
                paymentStatus: report.status,
                paymentId: report.id,
                orderId: report.order_id,
                paymentRelationId: relationId,
                paidOn: paidOn,
                invoiceNumber: invoiceNumber,
                appointmentId: getStatus.appointmentId
              };
              console.log("--------updatePaymentDetails-----",updatePaymentDetails)
              if (
                getStatus.paymentStatus.toUpperCase() !=
                constants.PAYMENT_STATUS.CAPTURE
              ) {
                let updatePaymentReport = await appointmentDA.updatePaymentReport(updatePaymentDetails);
                console.log("--------updatePaymentReport-----",updatePaymentReport)
                if (updatePaymentReport && updatePaymentReport != null) {
                    let appointmentDetails = await appointmentDA.getAppointmentDetails(updatePaymentReport.appointmentId);
                    console.log("------appointmentDetails------",appointmentDetails);

                    // needs to check whether this 2 lines is working or not
                    // let confirmAppt = await appointmentDA.confirmAppointment( updatePaymentReport.appointmentId, updatePaymentReport._id );
                    // console.log("++++++confirm Appt+++++",confirmAppt)

                    // let consultationfee = await appointmentDA.getAmount(appointmentDetails[0].consultationType);
                    // console.log("_________consultationfee________",consultationfee.amount);
                    let branchCode = await appointmentDA.branchCode(userInfo[0].patient.branchId);
                    console.log("@@@@@@@  branchCode  @@@@@",branchCode)
                  if (userInfo && userInfo.length > 0) {
                    console.log("------entered----------1");
                    if (report.status.toUpperCase() == constants.PAYMENT_STATUS.CAPTURE) {
                      console.log("------entered----------2");
                      if (userInfo[0].paymentFor == constants.value.CONSULTATION) {
                        let consultationfee = await appointmentDA.getAmount(appointmentDetails[0].consultationType);
                        console.log("_________consultationfee________",consultationfee.amount);
                        console.log("------entered----------3");
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
                            docQualification: userInfo[0].doctor.qualifaction,
                            docRegstration : userInfo[0].doctor.registerationNumber,
                            hcuraId: userInfo[0].patient.hcuraId,
                            branchPhoneNumber: branchCode.branchPhoneNumber
                        }
                        console.log("+++++++++pdfDetails+++++++",pdfDetails);
                        //INVOICE EMAIL
                        let file = await htmlToPDF.generateInvoiceForConsultation(pdfDetails);
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
                        
                        // res.send({ success: true, data: userInfo});
                      } else if (userInfo[0].paymentFor == constants.value.HOMEOPATHY) {
                        let packageDetails = await authentationDAObj.getPackageDetailsApptId(getStatus.appointmentId);
                        let endDate =  moment(updatePaymentReport.paidOn).add(parseInt(packageDetails[0].months), 'months');
                        console.log("---------------endDate---------",endDate)
                        if (!endDate.isValid()) {
                          endDate = moment(startDate).endOf('month');
                          console.log("End Date:", endDate); 
                        }
                        let packageSchedules = {
                          userId: updatePaymentReport.userId,
                          packageId: updatePaymentReport.packageId,
                          paymentId: updatePaymentReport._id,
                          endDate: endDate,
                          paidOn: updatePaymentReport.paidOn,
                        }
                        let insertPackageSchedules = await appointmentDA.insertPackageSchedules(packageSchedules);
                        let details ={
                          endDate: insertPackageSchedules.endDate,
                          _id: insertPackageSchedules._id
                        }

                        console.log("------packageDetails----------",packageDetails);
                        let pdfDetails = {
                          invoiceNumber: updatePaymentReport.invoiceNumber,
                          firstName: userInfo[0].patient.firstName,
                          lastName: userInfo[0].patient.lastName,
                          paidOn: updatePaymentDetails.paidOn,
                          age: userInfo[0].patient.birthDate,
                          gender: userInfo[0].patient.gender,
                          docFirstName: userInfo[0].doctor.firstName,
                          docLastName: userInfo[0].doctor.lastName,
                          serviceCharges: updatePaymentReport.serviceCharges,
                          discount: updatePaymentReport.discount,
                          GST: "0%", // needs to work on gst
                          payableAmount: updatePaymentReport.payableAmount,
                          paymentMethod: updatePaymentDetails.paymentMethod,
                          docQualification: userInfo[0].doctor.qualification,
                          hcuraId: userInfo[0].patient.hcuraId,
                          packageName: packageDetails[0].packageName,
                          packageAmount: packageDetails[0].packageAmount,
                          docRegstration : userInfo[0].doctor.registrationNumber,
                          branchPhoneNumber: branchCode.branchPhoneNumber
                        }

                        emailSender.sendPackagePaymentSuccess(
                          userInfo[0].patient.firstName,
                          userInfo[0].patient.emailId,
                          updatePaymentReport.payableAmount,
                          "#" + relationId,
                          updatePaymentReport.paymentMethod,
                          packageDetails[0].packageName,
                        );
                        let file = await htmlToPDF.generateInvoiceForPackage(pdfDetails);
                        emailSender.sendPackageInvoiceEmail(userInfo[0].patient.emailId, file);
                        
                        
                        //   schedule package is not working
                        //   await schedulers.changeisActiveStatusPackage(details)

                        //  need to send medicine email to patient 
                      } else if (userInfo[0].paymentFor == constants.value.EXTERNAL_SOURCE){
                        //INVOICE EMAIL
                        console.log("------entered----------10");
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
                        console.log("------pdfDetails----------2",pdfDetails);
                        emailSender.sendExternalSourcePaymentSuccess(
                          userInfo[0].patient.firstName,
                          userInfo[0].patient.emailId,
                          updatePaymentReport.payableAmount,
                          "#" + relationId,
                          updatePaymentReport.paymentMethod,
                          updatePaymentReport.remarks,
                        );
                        console.log("---------entered-------11",);
                        let file = await htmlToPDF.generateInvoiceForExternalSource(pdfDetails);
                        emailSender.sendExternalSourceInvoiceEmail(userInfo[0].patient.emailId, file);
                        console.log("---------last-------100",);
                      } else if (userInfo[0].paymentFor == constants.value.ASTHETIC) {
                        let packageDetails = await authentationDAObj.getPackageDetailsApptId(getStatus.appointmentId);
                        let endDate =  moment(updatePaymentReport.paidOn).add(parseInt(packageDetails[0].months), 'months');
                        console.log("---------------endDate---------",endDate)
                        if (!endDate.isValid()) {
                          endDate = moment(startDate).endOf('month');
                          console.log("End Date:", endDate); 
                        }
                        let packageSchedules = {
                          userId: updatePaymentReport.userId,
                          packageId: updatePaymentReport.packageId,
                          paymentId: updatePaymentReport._id,
                          endDate: endDate,
                          paidOn: updatePaymentReport.paidOn,
                        }
                        let insertPackageSchedules = await appointmentDA.insertPackageSchedules(packageSchedules);
                        let details ={
                          endDate: insertPackageSchedules.endDate,
                          _id: insertPackageSchedules._id
                        }
                        // schedulers
                        await schedulers.changeisActiveStatusPackage(details)
                        console.log("------packageDetails----------",packageDetails);
                        let pdfDetails = {
                          invoiceNumber: updatePaymentReport.invoiceNumber,
                          firstName: userInfo[0].patient.firstName,
                          lastName: userInfo[0].patient.lastName,
                          paidOn: updatePaymentDetails.paidOn,
                          age: userInfo[0].patient.birthDate,
                          gender: userInfo[0].patient.gender,
                          docFirstName: userInfo[0].doctor.firstName,
                          docLastName: userInfo[0].doctor.lastName,
                          serviceCharges: updatePaymentReport.serviceCharges,
                          discount: updatePaymentReport.discount,
                          payableAmount: updatePaymentReport.payableAmount,
                          paymentMethod: updatePaymentDetails.paymentMethod,
                          docQualification: userInfo[0].doctor.qualification,
                          hcuraId: userInfo[0].patient.hcuraId,
                          packageName: packageDetails[0].packageName,
                          packageAmount: packageDetails[0].packageAmount,
                          docRegstration : userInfo[0].doctor.registrationNumber,
                          branchPhoneNumber: branchCode.branchPhoneNumber,
                          SGST: updatePaymentReport.SGST,
                          CGST: updatePaymentReport.CGST,
                          IGST: updatePaymentReport.IGST,
                          UGST: updatePaymentReport.UGST,
                        }
                        console.log("--------pdfDetails-------",pdfDetails)
                        emailSender.sendAstheticPaymentSuccess(
                          userInfo[0].patient.firstName,
                          userInfo[0].patient.emailId,
                          updatePaymentReport.payableAmount,
                          "#" + relationId,
                          updatePaymentReport.paymentMethod,
                          packageDetails[0].packageName,
                        );
                        let file = await htmlToPDF.generateInvoiceForAsthetic(pdfDetails);
                        emailSender.sendAstheticInvoiceEmail(userInfo[0].patient.emailId, file);

                        //  need to send medicine email to patient 
                      }
                    } else if (
                      report.status.toUpperCase() == constants.PAYMENT_STATUS.FAILED
                    ) {
                      if (
                        userInfo[0].paymentFor == constants.value.CONSULTATION ||
                        userInfo[0].paymentFor == constants.value.HOMEOPATHY ||
                        userInfo[0].paymentFor == constants.value.EXTERNAL_SOURCE ||
                        userInfo[0].paymentFor == constants.value.ASTHETIC
                      ) {
                        emailSender.paymentFail(
                          userInfo[0].patient.firstName,
                          userInfo[0].patient.emailId,
                          userInfo[0].currencySymbol + userInfo[0].payableAmount,
                          "#" + relationId,
                          report.method.toUpperCase()
                        ); //notification
                      } else {
                        emailSender.paymentFail(
                          userInfo[0].doctor.firstName,
                          userInfo[0].doctor.emailId,
                          userInfo[0].currencySymbol + userInfo[0].payableAmount,
                          "#" + relationId,
                          report.method.toUpperCase()
                        ); //notification
                      }
                    }
                  }
                } else {
                  // let updateSubscriptionReport =
                  //   await appointmentBAObj.subscriptionUpdateBA(obj);
                  // let doctorInfo = await appointmentBAObj.getDoctorSubscriptionInfoBA(
                  //   relationId
                  // );
                  // if (
                  //   report.status.toUpperCase() == constants.PAYMENT_STATUS.CAPTURE
                  // ) {
                  //   let date = moment(new Date())
                  //     .add(1, "year")
                  //     .endOf("day")
                  //     .format("YYYY-MM-DDTHH:mm:ss.SSSZ");
                  //   doctorInfo = await appointmentBAObj.updateSubscriptionToDoctorBA(
                  //     date,
                  //     doctorInfo[0].doctor._id
                  //   );
                  //   emailSender.sendPaymentSuccess(
                  //     doctorInfo[0].doctor.firstName,
                  //     doctorInfo[0].doctor.emailId,
                  //     doctorInfo[0].currencySymbol + doctorInfo[0].payableAmount,
                  //     "#" + relationId,
                  //     report.method.toUpperCase()
                  //   ); //notification
                  // } else if (
                  //   report.status.toUpperCase() == constants.PAYMENT_STATUS.FAILED
                  // ) {
                  //   emailSender.paymentFail(
                  //     doctorInfo[0].doctor.firstName,
                  //     doctorInfo[0].doctor.emailId,
                  //     doctorInfo[0].currencySymbol + doctorInfo[0].payableAmount,
                  //     "#" + relationId,
                  //     report.method.toUpperCase()
                  //   ); //notification
                  // }
                }
              }
              res.status(200).send(true);
            }
          } else {
            res.status(500).send(false);
          }
        } catch (e) {
          next(e);
        }
    };

    // payment status checking 
    async paymentStatus(req, res, next) {
        try {
        let body = req.body;
        const { error } = rule.offlinePaymentStatusRule.validate(body);
        if (error) {
            throw Boom.badData(error.message);
        }
        let obj = await authentationDAObj.getPaymentStatus(body.paymentId);
        res.status(200).send(obj);
        } catch (e) {
        next(e);
        }
    };

    async getRoleDetails(req, res, next){
      try{
        let body = req.body
        const { error } = rule.roleIdRule.validate(body);
        if (error) {
            throw Boom.badData(error.message);
        }
        let result = await authentationDAObj.getRoleDetils(body.roleId);
        res.send({success: true, data:result});
      } catch(e){
        next(e);
      }
    };

}

// async function createAdminSession(response, res, userAgent) {
//     response = JSON.parse(JSON.stringify(response));
//     console.log("============response========",response);
//     let sessionKey = response._id + "_session@" + Date.now();
//     console.log("--------- sessionKey--------", sessionKey);
//     let sessionId = await utilities.encryptSession(sessionKey);
//     console.log("................sessionId.........",sessionId)
//     response.sessionId = sessionId;
//     sessionId = response._id + "_offline_admin_web@" + sessionId;
//     console.log(";;;;;;;;;sessiodId;;;;;;;",sessionId)
//     if (!redisClient.isReady) {
//         await redisClient.connect();
//     }
//     await redisClient.set(
//       response._id + "_offline_admin_web",
//       JSON.stringify(response)
//     );
//   console.log("'''''''''''response.sessionId'''''''",response.sessionId)
//     response.sessionId = sessionId;
//     res.send({ success: true, data: response });
// }
async function createAdminSession(response, res, userAgent) {
    response = JSON.parse(JSON.stringify(response));
    let sessionKey = response._id + "_session@" + Date.now();    
    let sessionId = await utilities.encryptSession(sessionKey);    
    response.sessionId = sessionId;
    sessionId = response._id + "_offline_admin_web@" + sessionId;
    if (!redisClient.isReady) {
        await redisClient.connect();
    }
    // Invalidate any existing session for this user
    let existingSession = await redisClient.get(response._id + "_offline_admin_web");
    if (existingSession) {
        let existingSessionData = JSON.parse(existingSession);
        existingSessionData.sessionId = null; // Mark the old session as invalid
        await redisClient.set(
            response._id + "_offline_admin_web",
            JSON.stringify(existingSessionData)
        );
    }
    // Store the new session without TTL
    await redisClient.set(
        response._id + "_offline_admin_web",
        JSON.stringify(response)
    );
    await authentationDAObj.updateAdminFcmTokenDA(response._id, sessionId);
    response.sessionId = sessionId;
    return response;
    // res.send({ success: true, data: response });
};


module.exports = new authentication();