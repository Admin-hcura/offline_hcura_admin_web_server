const appointmentModel = require("../../models/schema").appointmentModel;
const roleModel = require("../../models/schema").roleModel;
const adminModel = require("../../models/schema").adminModel;
const patientModel = require("../../models/schema").patientModel;
const timeModel = require("../../models/schema").timeModel;
const dayModel = require("../../models/schema").dayModel;
const consulatationAmount = require("../../models/schema").consulatationAmountModel;
const paymentModel = require("../../models/schema").paymentModel;
const mongoose = require("mongoose");
const moment = require("moment-timezone");
const { branchesModel, slotModel, occupationModel, promoCodesModel,
    sourceModel, symptomsAllegryModel, tempAppointmentModel, statesModel,
    packageModel, estimationModel, packageSubscriptionModel} = require("../../models/schema");
const { startTime } = require("express-pino-logger");

class appointmentDA{

    async blockSlot(slotData){
        try{
            let blockSlot = new slotModel({
                appointmentDate: slotData.date,
                dayId: slotData.dayId,
                timeId: slotData.timeId,
                day: slotData.day,
                startTime: slotData.startTime,
                endTime: slotData.endTime,
                doctorId: slotData.doctorId
            });
            return await blockSlot.save();
        } catch(e){
            throw e;
        }
    }

    async createAppointment(obj){
        try{
            let result = new appointmentModel({
                patientId: obj.patientId,
                doctorId: obj.doctorId,
                slotId: obj.slotId,
                dayId: obj.dayId,
                branchId: obj.branchId,
                appointmentDate: obj.appointmentDate,
                startTime: obj.startTime,
                endTime: obj.endTime,
                symptoms: obj.symptoms,
                allegires: obj.allegires,
                consultationMode: obj.consultationMode,
                consultationType: obj.consultationType,
                appointmentStatus: obj.appointmentStatus,
                bookedBy: obj.bookedBy,
                appointmentNumber: obj.appointmentNumber
            });
            return await result.save();
        } catch(e){
            throw e;
        }
    };

    async addPaymentInfo(obj){
        try{
            let addPaymentInfo = new paymentModel({
                patientId: obj.patientId,
                doctorId: obj.doctorId,
                branchId: obj.branchId,
                appointmentId: obj.appointmentId,
                paymentDoneBy: obj.paymentDoneBy,
                dayId: obj.dayId,
                slotId: obj.slotId,
                packageId: obj.packageId,
                paymentFor: obj.paymentFor,
                promoCodes: obj.promoCodes,
                payableAmount: obj.payableAmount,
                shortUrl: obj.shortUrl,
                paymentRelationId: obj.paymentRelationId,
                paymentLinkId: obj.paymentLinkId,
                paymentDoneBy: obj.paymentDoneBy,
                discount: obj.discount,
                GSTAmount: obj.GSTAmount,
                SGST: obj.SGST,
                CGST: obj.CGST,
                IGST: obj.IGST,
                afterRemovingGST: obj.afterRemovingGST,
                paymentMethod: obj.paymentMethod,
                paymentStatus: obj.paymentStatus,
            });
            return await addPaymentInfo.save();
        } catch(e){
            throw e;
        }
    };

    async branchCode(branchId){
        try{
            return await branchesModel.findOne({_id: branchId, isDeleted: false});
        } catch(e){
            throw e;
        }
    };

    async updatePaymentReport(obj){
        try{
            let result = await paymentModel.findOneAndUpdate(
                { paymentRelationId: obj.paymentRelationId },
                {
                    $set: {
                      paymentMethod: obj.paymentMethod,
                      paymentStatus: obj.paymentStatus,
                      paymentId: obj.paymentId,
                      orderId: obj.orderId,
                      paidOn: obj.paidOn,
                      invoiceNumber: obj.invoiceNumber,
                      paymentRelationId: obj.paymentRelationId
                    },
                },
                { new: true}
            );
            return result;
        } catch(e){
            throw e;
        }
    };

    async confirmAppointment(appointmentId, paymentInfoId){
        console.log("!!!!!!!!!!!!!!!!!!!",appointmentId)
        try{
            let result = await appointmentModel.findOneAndUpdate(
                {_id: appointmentId},
                {
                    $set:{
                        paymentId: paymentInfoId,
                        appointmentStatus: "SCHEDULED"
                    },
                },{ new: true}
            );
            return result;
        } catch(e){
            throw e;
        }
    };

    async getuserInfoWithpaymentRelationId(relationId, isPaymentId){
        try{
            if (relationId instanceof mongoose.Types.ObjectId) {
                relationId = relationId.toString();
            }
            console.log(";;;;;;ispaymentid;;;;;",isPaymentId);
            console.log(";;;;;;paymentrelation id....",relationId)
            return await paymentModel.aggregate(
                [
                  {
                    $match: isPaymentId
                      ? {
                          _id: mongoose.Types.ObjectId(relationId),
                        }
                      : {
                          paymentRelationId: relationId,
                        },
                  },
                  {
                    $lookup: {
                      from: "patient",
                      localField: "patientId",
                      foreignField: "_id",
                      as: "patient"
                    }
                  },
                  {
                    $unwind: {
                      path: "$patient",
                      preserveNullAndEmptyArrays: true
                    }
                  },
                  {
                    $lookup: {
                      from: "admin",
                      localField: "doctorId",
                      foreignField: "_id",
                      as: "doctor"
                    }
                  },
                  {
                    $unwind: {
                      path: "$doctor",
                      preserveNullAndEmptyArrays: true
                    }
                  }
                ]
            );
        } catch(e){
            throw e;
        }
    };

    async getLastInvoiceNo(branchCode){
        try {
            console.log("-------branchCode----------", branchCode)
            return await paymentModel.aggregate([
                {
                    $match: {
                        isDeleted: false,
                        // Match the branch code dynamically
                        invoiceNumber: {
                            $regex: `^${branchCode}/`
                        }
                    }
                },
                {
                    $project: {
                        // Extract the part after the branch code
                        invoiceNumberPart: {
                            $arrayElemAt: [
                                {
                                    $split: [
                                        {
                                            $arrayElemAt: [
                                                {
                                                    $split: ["$invoiceNumber", "/"]
                                                },
                                                1
                                            ]
                                        },
                                        "/"
                                    ]
                                },
                                0
                            ]
                        }
                    }
                },
                {
                    $project: {
                        invoiceNumber: {
                            $toInt: "$invoiceNumberPart"
                        },
                        _id: 0
                    }
                },
                {
                    $sort: {
                        invoiceNumber: -1
                    }
                },
                // {
                //     $limit: 1
                // }
            ]);
        } catch (e) {
            throw e;
        }
        
    };

    async getAppointmentDetails(appointmentId){
        try{
            let result = await appointmentModel.aggregate(
                [
                    {
                      $match: {
                        _id: appointmentId,
                        isActive: true
                      }
                    }
                  ]
            ); 
            return result;
        } catch(e){
            throw e;
        }
    };

    async getApptDetails(appointmentId){
        try{
            let result = await appointmentModel.aggregate(
                [
                    {
                      $match: {
                        _id: new mongoose.Types.ObjectId(appointmentId),
                        isActive: true
                      }
                    }
                  ]
            ); 
            return result;
        } catch(e){
            throw e;
        }
    };

    async getAmount(consultationType){
        try{
            console.log("-----consultationType-----",consultationType)
            return await consulatationAmount.findOne({type: consultationType, isActive: true});
        } catch(e){
            throw e;
        }
    };

    async updateFollowupId(patientId, appointmentId){
        try{
            console.log("----patientId, appointmentId-----",patientId, appointmentId)
            const result = await appointmentModel.findOneAndUpdate(
                {
                  patientId: new mongoose.Types.ObjectId(patientId),
                  isActive: true,
                },
                {
                  $set: { followupId: appointmentId}
                },
                {
                  sort: { createdOn: -1 },
                  returnDocument: 'after' // This will return the document after the update
                }
              );
              return result;
        } catch(e){
            throw e;
        }
    };

    async patientDetaiils(patientId){
        try{
            return await patientModel.findOne({ _id: patientId, isDeleted: false});
        } catch(e){
            throw e;
        }
    };

    async updatePaymentDetailsAppointment(appointmentId, paymentId){
        try{
            const result = await appointmentModel.findOneAndUpdate(
                {_id: appointmentId},
                { $set: {
                    paymentId: paymentId,
                    appointmentStatus: "CONFIRMED"
                }
            });
            return result;
        } catch(e){
            throw e;
        }
    };

    async getPatientList(type, page, limit, search) {
        let offset = (page - 1) * limit;
        try {
          let pipeline = [];
          if (type != "ALL") {
            pipeline.push({
              $match: {
                isDeleted: false,
              },
            });
          }
          pipeline.push({
            $lookup: {
              from: "appointments",
              let: { uID: "$_id" },
              pipeline: [
                { $match: { $expr: { $and: [{ $eq: ["$userId", "$$uID"] }] } } },
                { $sort: { appointmentDate: -1 } },
                { $limit: 1 },
                { $project: { lastDate: "$appointmentDate" } },
              ],
              as: "lastAppointment",
            },
          });
          if (search != "") {
            let or = [
              {
                hcuraId: { $regex: search, $options: "i" },
              },
              {
                firstName: { $regex: search, $options: "i" },
              },
              {
                lastName: { $regex: search, $options: "i" },
              },
              {
                phoneNumber: { $regex: search, $options: "i" },
              },
            ];
            pipeline.push({
                $addFields: {
                  phoneNumberStr: { $toString: "$phoneNumber" }, // Convert phoneNumber to string
                },
              });
              pipeline.push({
                $match: {
                  $or: [
                    {
                      hcuraId: { $regex: search, $options: "i" },
                    },
                    {
                      firstName: { $regex: search, $options: "i" },
                    },
                    {
                      lastName: { $regex: search, $options: "i" },
                    },
                    {
                      phoneNumberStr: { $regex: search, $options: "i" }, // Use phoneNumberStr for search
                    },
                  ],
                },
              });
            // pipeline.push({
            //   $match: {
            //     $or: or,
            //   },
            // });
          }
          pipeline.push({
            $facet: {
              metadata: [{ $count: "total" }, { $addFields: { page: page } }],
              data: [
                { $sort: { registeredOn: -1 } },
                { $skip: offset },
                { $limit: limit },
              ],
            },
          });
          let listData = await patientModel.aggregate(pipeline);
          return listData;
        } catch (e) {
          throw e;
        }
    };

    async insertOccuption(body){
        try{
            let result = new occupationModel({
                name: body.name,
            });
            return await result.save();
        } catch(e){
            throw e;
        }
    };

    async insertSource(body){
        try{
            let result = new sourceModel({
                name: body.name,
            });
            return await result.save();
        } catch(e){
            throw e;
        }
    };

    async getSourceOccuptionList(){
        try{
            let source = await sourceModel.find({isActive: true},{_id: 0, name: 1});
            let occupation = await occupationModel.find({isActive: true},{_id: 0, name: 1});
            return {source, occupation};
        } catch(e){
            throw e;
        }
    };
    
    async insertStates(body){
        try{
            let result = new statesModel({
                name : body.name,
                stateCode: body.stateCode,
                stateId: body.stateId,
                consultationGST: body.consultationGST,
                packageGST: body.packageGST,
                CGST: body.CGST,
                SGST: body.SGST,
                UGST: body.UGST,
                IGST: body.IGST,
            });
            return await result.save();
        } catch(e){
            throw e;        
        }
    };

    async getStateList(){
        try{
            return await statesModel.find({isActive: true});
        } catch(e){
            throw e
        }
    };

    async insertSymptomsAllergiesDA(body){
        try{
            let result = new symptomsAllegryModel({
                symptoms: body.symptoms,
                allegires: body.allegires
            });
            return await result.save();
        } catch(e){
            throw e;
        }
    };

    async getSymptomsAllegiresList(){
        try{
            return await symptomsAllegryModel.find({isActive: true});
        } catch(e){
            throw e;
        }
    };

    async bookedDetails(details, hcuraTId){
        try{
            let result = new tempAppointmentModel({
                firstName: details.firstName,
                lastName: details.lastName,
                gender: details.gender,
                phoneNumber: details.phoneNumber,
                complaint: details.complaint,
                appointmentDate: details.appointmentDate,
                doctorId: details.doctorId,
                branchId: details.branchId,
                bookedBy: details.bookedBy,
                hcuraTId: hcuraTId
            });
            return await result.save();
        } catch(e){
            throw e;
        }
    };

    async getDoctorDetails(docId){
        try{
            return await adminModel.findOne({_id: docId, isDeleted: false});
        } catch(e){
            throw e;
        }
    };

    async getDoctorsList(){
        try{
            return await roleModel.aggregate(
              [
                {
                  $match: {
                    roleName: "DOCTORS",
                    isDeleted: false
                  }
                },
                {
                  $lookup: {
                    from: "admin",
                    localField: "_id",
                    foreignField: "roleId",
                    as: "doctorDetails"
                  }
                },
                // {
                //   $unwind: {
                //     path: "$doctorDetails",
                //     preserveNullAndEmptyArrays: true,
                //   },
                // },
                {
                  $project: {
                    doctorDetails: 1,
                    _id: 0
                  }
                }
              ]    
            );
        } catch(e){
            throw e;
        }
    };

    async getpatientDetailsDA(hcuraId){
        try{
            return await patientModel.find({hcuraId: hcuraId, isDeleted: false});
        } catch(e){
            throw e;
        }
    };
    
    async getAppointmentNumber(){
        try{
            let result = await appointmentModel.aggregate([
                {
                  '$project': {
                    '_id': 0, 
                    'appointmentNumber': 1
                  }
                }
              ]
            );
            return result;
        } catch(e){
            throw e;
        }
    };

    async getPromoListConsultation() {
        try {
            return await promoCodesModel.aggregate([
                {
                    $match: {
                        isDeleted: false,
                        promoCodeFor: "CONSULTATION",
                        $expr: {
                            $and: [
                                { $gte: ["$expiredOn", new Date()] },
                                { $lte: ["$startsOn", new Date()] }
                            ]
                        }
                    },
                },
                {
                    $project: {
                      promoCodeName: 1,
                      discount: 1,
                      promoCodeFor: 1,
                    },
                },
            ]);
        } catch (e) {
            throw e;
        }
    };

    async getConsultationGST(stateId){
        try{
            console.log("------stateId-----",stateId)
            return await statesModel.findOne({_id: stateId, isActive: true})
        } catch(e){
            throw e;
        }
    };

    async getPromoCodeList(promoCodes){
        try{
            console.log("------promoCodes-----",promoCodes)
            return await promoCodesModel.findOne({_id: promoCodes, isDeleted: false})
        } catch(e){
            throw e;
        }
    };

    async getAppointmentDetailsPaymentDetails(hcuraId){
        try{
            const hcuraid = hcuraId.replace(/\s+/g, '').toUpperCase();
            return await patientModel.aggregate(
                [
                    {
                      $match: {
                        hcuraId: hcuraid,
                        isDeleted: false
                      }
                    },
                    {
                      $lookup: {
                        from: "appointment",
                        localField: "_id",
                        foreignField: "patientId",
                        as: "appointmentDetails"
                      }
                    },
                    {
                      $unwind: {
                        path: "$appointmentDetails",
                        preserveNullAndEmptyArrays: true
                      }
                    },
                    {
                      $lookup: {
                        from: "admin",
                        localField: "appointmentDetails.doctorId",
                        foreignField: "_id",
                        as: "doctorDetails"
                      }
                    },
                    {
                      $unwind: {
                        path: "$doctorDetails",
                        preserveNullAndEmptyArrays: true
                      }
                    },
                    {
                      $lookup: {
                        from: "consulatationAmount",
                        localField:
                          "appointmentDetails.consultationType",
                        foreignField: "type",
                        as: "consultationAmount"
                      }
                    },
                    {
                      $unwind: {
                        path: "$consultationAmount",
                        preserveNullAndEmptyArrays: true
                      }
                    },
                    {
                      $project: {
                        fullName: {
                          $concat: ["$firstName", " ", "$lastName"]
                        },
                        emailId: 1,
                        hcuraId: 1,
                        gender: 1,
                        birthDate: 1,
                        phoneNumber: 1,
                        consultationAmount:
                          "$consultationAmount.amount",
                        consultationType:
                          "$appointmentDetails.consultationType",
                        doctorId: "$doctorDetails._id",
                        doctorFullName: {
                          $concat: [
                            "$doctorDetails.firstName",
                            " ",
                            "$doctorDetails.lastName"
                          ]
                        },
                        appointmentId: "$appointmentDetails._id",
                        appointmentNumber:
                          "$appointmentDetails.appointmentNumber",
                        appointmentdate:
                          "$appointmentDetails.appointmentDate"
                      }
                    }
                  ]
                );
        } catch(e){
            throw e;
        }
    };

    async getAppointmentPaymentDetails(appointmentId){
        try{
            return await paymentModel.aggregate(
                [
                    {
                      $match: {
                        appointmentId: new mongoose.Types.ObjectId(appointmentId),
                        isDeleted: false
                      }
                    },
                    {
                      $lookup: {
                        from: "patient",
                        localField: "patientId",
                        foreignField: "_id",
                        as: "patientDetails"
                      }
                    },
                    {
                      $unwind: {
                        path: "$patientDetails",
                        preserveNullAndEmptyArrays: true
                      }
                    },
                    {
                      $lookup: {
                        from: "appointment",
                        localField: "appointmentId",
                        foreignField: "_id",
                        as: "appointmentDetails"
                      }
                    },
                    {
                      $unwind: {
                        path: "$appointmentDetails",
                        preserveNullAndEmptyArrays: true
                      }
                    },
                    {
                      $project: {
                        callMode:
                          "$appointmentDetils.consultationMode",
                        paymentFor: 1,
                        payableAmount: 1,
                        discount: 1,
                        paymentType: "$paymentMethod",
                        paidOn: 1,
                        createdOn: 1,
                        paymentStatus: 1,
                        consultationMode:
                          "$appointmentDetails.consultationType",
                        paymentDoneBy: 1,
                        invoiceNumber: 1,
                        appointmentNumber:
                          "$appointmentDetails.appointmentNumber"
                      }
                    }
                ]
            );
        } catch(e){
            throw e;
        }
    };

    async validatePromoCode(code) {
        try {
          let currentDate = moment().tz("UTC").format(process.env.dateformat);
          return await promoCodesModel.findOne({
            promoCodeName: code,
            isDeleted: false,
            startsOn: { $lte: new Date(currentDate) },
            expiredOn: { $gte: new Date(currentDate) },
          });
        } catch (e) {
          throw e;
        }
    };

    async getRemainingSlotsAndTimings(doctorId, selectedDate) {
        try {
            // Step 1: Get all booked slots for the given doctor on the selected date
            const bookedSlots = await slotModel.aggregate([
                {
                    $match: {
                        doctorId: new mongoose.Types.ObjectId(doctorId),
                        date: new Date(selectedDate),
                        isBooked: true,
                        isActive: true,
                    },
                },
                {
                    $project: {
                        timeId: 1,
                        dayId: 1,
                    },
                },
            ]);

            // Extract booked timeIds and dayIds
            const bookedTimeIds = bookedSlots.map(slot => slot.timeId);
            const bookedDayIds = bookedSlots.map(slot => slot.dayId);

            // Step 2: Get all times that are not booked
            const availableTimes = await timeModel.aggregate([
                {
                    $match: {
                        isActive: true,
                    },
                },
                {
                    $project: {
                        slots: {
                            $filter: {
                                input: "$slots",
                                as: "slot",
                                cond: { $not: [{ $in: ["$$slot._id", bookedTimeIds] }] }
                            }
                        }
                    },
                }
            ]);

            // Step 3: Get all days that are not booked
            const availableDays = await dayModel.aggregate([
                {
                    $match: {
                        _id: { $nin: bookedDayIds },
                        isActive: true,
                    },
                },
                {
                    $project: {
                        _id: 1,
                        day: 1,
                    },
                },
            ]);

            return {
                availableTimes,
                availableDays,
            };
        } catch (error) {
            console.error("Error fetching remaining slots and timings:", error);
            throw error;
        }
    };

    async getpackageList(){
        try{
            return await packageModel.find({isActive: true, packageFor: "HOMEOPATHY"});
        } catch(e){
            throw e;
        }
    };

    async createEstimation(body){
        try{
            let result = new estimationModel({
                patientId: body.patientId,
                doctorId: body.doctorId,
                branchId: body.branchId,
                packageId: body.packageId,
                createdBy: body.createdBy,
                treatmentPlan: body.treatmentPlan,
                estimationAmount: body.estimationAmount
            });
            return await result.save();
        } catch(e){
            throw e;
        }
    };

    async changeisActivePackage(_id){
        try {
          let result = await packageSubscriptionModel.findOneAndUpdate(
            {_id: mongoose.Types.ObjectId(_id)},
            {
              $set: {
                isActive: false
            },
          },
          { new: true }
        );
         return result;
        } catch(error) {
          throw error;
        }
    };

    async getPackageDetails(packageId){
        try{
            return await packageModel.findOne({isActive: true, _id: packageId});
        } catch(e){
            throw e;
        }
    };

    async updatePackageDetailsInAppt(appointmentId, packagePaymentId, packageId){
        try{
            let result = await appointmentModel.findOneAndUpdate(
                {_id: appointmentId},
                { $set: {
                    packagePaymentId: packagePaymentId,
                    packageId: packageId
                }
            });
            return result;
        } catch(e){
            throw e;
        }
    };

    async updateAstheticPackageDetailsInAppt(appointmentId, astheticPaymentId, packageId){
      try{
          let result = await appointmentModel.findOneAndUpdate(
              {_id: appointmentId},
              { $set: {
                astheticPaymentId: astheticPaymentId,
                  packageId: packageId
              }
          });
          return result;
      } catch(e){
          throw e;
      }
  };

    async addPackagePaymentInfo(paymentDetails){
        try{
            console.log(".........paymentDetails.paymentFor.........",paymentDetails.paymentFor)
            let addPaymentInfo = new paymentModel({
                afterRemovingGST: paymentDetails.afterRemovingGST,
                GSTAmount: paymentDetails.GSTAmount,
                discount: paymentDetails.discount,
                payableAmount: paymentDetails.payableAmount,
                paymentDoneBy: paymentDetails.paymentDoneBy,
                remarks: paymentDetails.remarks,
                packageId: paymentDetails.packageId,
                promoCodes: paymentDetails.promoCodes,
                paymentStatus: paymentDetails.paymentStatus,
                paymentFor: paymentDetails.paymentFor,
                shortUrl: paymentDetails.shortUrl,
                paymentRelationId: paymentDetails.paymentRelationId,
                paymentLinkId: paymentDetails.paymentLinkId,
                patientId: paymentDetails.patientId,
                doctorId: paymentDetails.doctorId,
                branchId: paymentDetails.branchId,
                appointmentId: paymentDetails.appointmentId,
                packageId: paymentDetails.packageId,
                SGST: paymentDetails.SGST,
                CGST: paymentDetails.CGST,
                IGST: paymentDetails.IGST
            });
            return await addPaymentInfo.save();
        } catch(e){
            throw e;
        }
    };

    async updatePaymentByPaymentIdBA(obj){
        try{
            let result = await paymentModel.findOneAndUpdate(
                {_id: obj.paymentId },
                { $set:{
                    paymentMethod: obj.paymentMethod,
                    paymentStatus: obj.paymentStatus,
                    paymentId: obj.paymentId,
                    paymentRelationId: obj.paymentRelationId,
                    paidOn: obj.paidOn,
                    appointmentId: obj.appointmentId,
                    paymentLinkId: obj.paymentLinkId,
                    invoiceNumber: obj.invoiceNumber
                }},
                { new: true}
            );
            return result;
        } catch(e){
            throw e;
        }
    };

    async insertPackageSchedules(packageSchedules){
        try{
            let addSchedulesDetails = new packageSubscriptionModel({
                patientId: packageSchedules.patientId,
                packageId: packageSchedules.packageId,
                paymentId: packageSchedules.paymentId,
                startDate: new Date(),
                endDate: packageSchedules.endDate,
                paidOn: packageSchedules.paidOn,
              });
            return await addSchedulesDetails.save();
        } catch(e){
            throw e;
        }
    };

    async getPatientDetailsPackagePayments(hcuraId){
        try{
            const hcuraid = hcuraId.replace(/\s+/g, '').toUpperCase();
            return await patientModel.aggregate(
                [
                    {
                      $match: {
                        hcuraId: hcuraid,
                        isDeleted: false
                      }
                    },
                    {
                      $lookup: {
                        from: "appointment",
                        localField: "_id",
                        foreignField: "patientId",
                        as: "appointmentDetails"
                      }
                    },
                    {
                      $unwind: {
                        path: "$appointmentDetails",
                        preserveNullAndEmptyArrays: true
                      }
                    },
                    {
                      $lookup: {
                        from: "admin",
                        localField: "appointmentDetails.doctorId",
                        foreignField: "_id",
                        as: "doctorDetails"
                      }
                    },
                    {
                      $unwind: {
                        path: "$doctorDetails",
                        preserveNullAndEmptyArrays: true
                      }
                    },
                    {
                      $project: {
                        fullName: {
                          $concat: ["$firstName", " ", "$lastName"]
                        },
                        gender: 1,
                        emailId: 1,
                        bloodGroup: 1,
                        birthDate: 1,
                        hcuraId: 1,
                        phoneNumber: 1,
                        doctorId: "$doctorDetails._id",
                        docFullName: {
                          $concat: [
                            "$doctorDetails.firstName",
                            " ",
                            "$doctorDetails.lastName"
                          ]
                        },
                        appointmentId: "$appointmentDetails._id",
                        appointmentNumber:
                          "$appointmentDetails.appointmentNumber",
                        appointmentDate:
                          "$appointmentDetails.appointmentDate"
                      }
                    }
                  ]
            )

        } catch(e){
            throw e;
        }
    };

    async getPaymentDetailsByAppointmentId(appointmentId){
        try{
            return await paymentModel.aggregate(
                [
                    {
                      $match: {
                        appointmentId: new mongoose.Types.ObjectId(appointmentId),
                        isDeleted: false
                      }
                    },
                    {
                      $lookup: {
                        from: "patient",
                        localField: "patientId",
                        foreignField: "_id",
                        as: "patientDetails"
                      }
                    },
                    {
                      $unwind: {
                        path: "$patientDetails",
                        preserveNullAndEmptyArrays: true
                      }
                    },
                    {
                      $lookup: {
                        from: "appointment",
                        localField: "appointmentId",
                        foreignField: "_id",
                        as: "appointmentDetails"
                      }
                    },
                    {
                      $unwind: {
                        path: "$appointmentDetails",
                        preserveNullAndEmptyArrays: true
                      }
                    },
                    {
                      $lookup: {
                        from: "package",
                        localField: "packageId",
                        foreignField: "_id",
                        as: "packageDetails"
                      }
                    },
                    {
                      $unwind: {
                        path: "$packageDetails",
                        preserveNullAndEmptyArrays: true
                      }
                    },
                    {
                      $lookup: {
                        from: "admin",
                        localField: "paymentDoneBy",
                        foreignField: "_id",
                        as: "paymentDoneDetails"
                      }
                    },
                    {
                      $unwind: {
                        path: "$paymentDoneDetails",
                        preserveNullAndEmptyArrays: true
                      }
                    },
                    {
                      $project: {
                        consultationMode:
                          "$appointmentDetails.consultationMode",
                        consultationType:
                          "$appointmentDetails.consultationType",
                        paymentFor: 1,
                        payableAmount: 1,
                        paymentType: "$paymentMethod",
                        packageName: "$packageDetails.name",
                        discount: 1,
                        paidOn: 1,
                        createdOn: 1,
                        packageId: 1,
                        paymentStatus: 1,
                        paymentDoneBy: {
                          $concat: [
                            "$paymentDoneDetails.firstName",
                            " ",
                            "$paymentDoneDetails.lastName"
                          ]
                        },
                        userAddress: {
                          $concat: [
                            "$patientDetails.firstName",
                            " ",
                            "$patientDetails.lastName"
                          ]
                        },
                        phoneNumber: "$patientDetails.phoneNumber",
                        countryCode: "$patientDetails.countryCode",
                        houseNo: "$patientDetails.address.houseNo",
                        street: "$patientDetails.address.street",
                        city: "$patientDetails.address.city",
                        state: "$patientDetails.address.state",
                        pinCode: "$patientDetails.address.pinCode"
                      }
                    }
                ]
            );
        } catch(e){
            throw e
        }
    };

    async getPatientAndPaymentDetailsForExternal(hcuraId){
        try{
            const hcuraid = hcuraId.replace(/\s+/g, '').toUpperCase();
            return await patientModel.aggregate(
                [
                    {
                      $match: {
                        hcuraId: hcuraid,
                        isDeleted: false
                      }
                    },
                    {
                      $lookup: {
                        from: "payment",
                        localField: "_id",
                        foreignField: "patientId",
                        as: "paymentDetails"
                      }
                    },
                    {
                      $unwind: {
                        path: "$paymentDetails",
                        preserveNullAndEmptyArrays: true
                      }
                    },
                    {
                      $lookup: {
                        from: "appointment",
                        localField: "paymentDetails._id",
                        foreignField: "paymentId",
                        as: "appointmentDetails"
                      }
                    },
                    {
                      $lookup: {
                        from: "package",
                        localField: "paymentDetails.packageId",
                        foreignField: "_id",
                        as: "packageDetails"
                      }
                    },
                    {
                      $addFields: {
                        "paymentDetails.consultationMode": {
                          $arrayElemAt: [
                            "$appointmentDetails.consultationMode",
                            0
                          ]
                        },
                        "paymentDetails.packageName": {
                          $arrayElemAt: [
                            "$packageDetails.name",
                            0
                          ]
                        },
                        "paymentDetails.packageAmount": {
                          $arrayElemAt: [
                            "$packageDetails.amount",
                            0
                          ]
                        }
                      }
                    },
                    {
                      $group: {
                        _id: "$_id",
                        patientDetails: {
                          $first: "$$ROOT"
                        },
                        paymentDetails: {
                          $push: "$paymentDetails"
                        }
                      }
                    },
                    {
                      $project: {
                        patientDetails: 1,
                        paymentDetails: 1
                      }
                    }
                ]
            );
        } catch(e){
            throw e;
        }
    };

    async addExternalSourcePaymentInfo(obj, paymentObj){
        try{
          console.log("-----    paymentObj      ------",paymentObj)
          console.log("-----    obj      ------",obj)
            let addPayment = new paymentModel({
                patientId: obj.patientId,
                branchId: obj.branchId,
                paymentDoneBy: paymentObj.paymentDoneBy,
                paymentFor: paymentObj.paymentFor,
                prescribedBy: obj.prescribedBy,
                remarks: obj.remarks,
                payableAmount: paymentObj.payableAmount,
                GSTAmount: paymentObj.GST,
                afterRemovingGst: paymentObj.afterRemovingGst,                
                paymentStatus: paymentObj.paymentStatus,
                shortUrl: paymentObj.shortUrl,
                paymentLinkId: paymentObj.paymentLinkId,
                paymentRelationId: paymentObj.paymentRelationId,
              });
              return await addPayment.save();
        } catch(e){
            throw e;
        }
    };

    async updatePaymentByPaymentId(obj) {
      try {
        let result = await paymentModel.findOneAndUpdate(
          { _id: obj.paymentId },
          {
            $set: {
              paymentMethod: obj.paymentMethod,
              paymentStatus: obj.paymentStatus,
              paymentId: obj.paymentId,
              paidOn: obj.paidOn,
              invoiceNumber: obj.invoiceNumber,
              paymentRelationId: obj.paymentRelationId,
              paymentLinkId: obj.paymentLinkId,
            },
          },
          { new: true }
        );
        return result;
      } catch (e) {
        throw e;
      }
    };

    async updatePaymentReportDA(obj){
      try{
          let result = await paymentModel.findOneAndUpdate(
              { appointmentId: obj.appointmentId },
              {
                  $set: {
                    paymentMethod: obj.paymentMethod,
                    paymentStatus: obj.paymentStatus,
                    paymentId: obj.paymentId,
                    orderId: obj.orderId,
                    paidOn: obj.paidOn,
                    invoiceNumber: obj.invoiceNumber,
                    paymentRelationId: obj.paymentRelationId
                  },
              },
              { new: true}
          );
          return result;
      } catch(e){
          throw e;
      }
    };

    async getPromoListPackage() {
      try {
          return await promoCodesModel.aggregate([
              {
                  $match: {
                      isDeleted: false,
                      promoCodeFor: "HOMEOPATHY",
                      $expr: {
                          $and: [
                              { $gte: ["$expiredOn", new Date()] },
                              { $lte: ["$startsOn", new Date()] }
                          ]
                      }
                  },
              },
              {
                  $project: {
                    promoCodeName: 1,
                    discount: 1,
                    promoCodeFor: 1,
                  },
              },
          ]);
      } catch (e) {
          throw e;
      }
    };

    async dashboardPtDetailsDA(body){
      try{
        console.log("-----body------",body)
        return await patientModel.aggregate(
          [
            {
              $facet: {
                todayCount: [
                  {
                    $match: {
                      branchId: new mongoose.Types.ObjectId(body.branchId),
                      registeredOn: {
                        $gte: new Date(body.startDate),
                        $lt: new Date(body.endDate),
                      },
                    },
                  },
                  {
                    $count: "count",
                  },
                ],
                tillYesterdayCount: [
                  {
                    $match: {
                      branchId: new mongoose.Types.ObjectId(body.branchId),
                      registeredOn: {
                        $gte: new Date(body.monthStartDate),
                        $lt: new Date(body.startDate),
                      },
                    },
                  },
                  {
                    $count: "count",
                  },
                ],
              },
            },
            {
              $project: {
                todayCount: {
                  $ifNull: [
                    {
                      $arrayElemAt: [
                        "$todayCount.count",
                        0,
                      ],
                    },
                    0,
                  ],
                },
                tillYesterdayCount: {
                  $ifNull: [
                    {
                      $arrayElemAt: [
                        "$tillYesterdayCount.count",
                        0,
                      ],
                    },
                    0,
                  ],
                },
              },
            },
          ]
        );
      } catch(e){
        throw e;
      }
    };

    async dashboardAllPtDetailsDA(body){
      try{
        return await patientModel.aggregate(
          [
            {
              $facet: {
                todayCount: [
                  {
                    $match: {
                      registeredOn: {
                        $gte: new Date(body.startDate),
                        $lt: new Date(body.endDate)
                      }
                    }
                  },
                  {
                    $count: "count"
                  }
                ],
                tillYesterdayCount: [
                  {
                    $match: {
                      registeredOn: {
                        $lt: new Date(body.startDate)
                      }
                    }
                  },
                  {
                    $count: "count"
                  }
                ]
              }
            },
            {
              $project: {
                todayCount: {
                  $ifNull: [
                    {
                      $arrayElemAt: ["$todayCount.count", 0]
                    },
                    0
                  ]
                },
                tillYesterdayCount: {
                  $ifNull: [
                    {
                      $arrayElemAt: [
                        "$tillYesterdayCount.count",
                        0
                      ]
                    },
                    0
                  ]
                }
              }
            }
          ]
        );
      } catch(e){
        throw e;
      }
    };

    async getAllApptList(obj, page, limit, searchKey, fromDate, toDate){
      try{
        let match = { $regex: searchKey, $options: "i" };
        let offset = page * limit;
        if (fromDate && toDate) {
          const stDate = new Date(fromDate);
          const edDate = new Date(toDate);
          if (stDate != "Invalid Date" && edDate != "Invalid Date") {
            obj["appointmentDate"] = {
              $gte: stDate,
              $lte: edDate,
            };
          }
        }
        const apptList = await appointmentModel.aggregate(
          [
            {
              $sort: {
                appointmentDate: -1
              }
            },
            {
              $match: obj
            },
            {
              $lookup: {
                from: "admin",
                localField: "doctorId",
                foreignField: "_id",
                as: "doctor"
              }
            },
            {
              $unwind: {
                path: "$doctor",
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $lookup: {
                from: "patient",
                localField: "patientId",
                foreignField: "_id",
                as: "patient"
              }
            },
            {
              $unwind: {
                path: "$patient",
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $lookup: {
                from: "payment",
                localField: "paymentId",
                foreignField: "_id",
                as: "payment"
              }
            },
            {
              $unwind: {
                path: "$payment",
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $skip: parseInt(offset),
            },
            {
              $limit: parseInt(limit),
            },
            {
              $project: {
                appointmentDate: 1,
                startTime: 1,
                createdOn: 1,
                appointmentState: 1,
                appointmentNumber: 1,
                appointmentId: 1,
                doctorFirstName: "$doctor.firstName",
                doctorLastName: "$doctor.lastName",
                doctorEmailId: "$doctor.emailId",
                doctorProfilePic: "$doctor.profilePic",
                doctorId: "$doctor._id",
                doctorHcuraDoctorId:
                  "$doctor.hcuraDoctorId",
                patientFirstName: "$patient.firstName",
                patientLastName: "$patient.lastName",
                patientHcuraId: "$patient.hcuraId",
                patientId: "$patient._id",
                paymentMethod: "$payment.paymentMethod",
                paymentCreatedDate: "$payment.paidOn",
                paymentPayableAmount:
                  "$payment.payableAmount",
                paymentPaymentStatus:
                  "$payment.paymentStatus",
                _id: "$_id"
              }
            },
            {
              $match: {
                $or: [
                  { appointmentNumber: match },
                  { doctorFirstName: match },
                  { doctorLastName: match },
                  { patientFirstName: match },
                  { patientLastName: match },
                  { patientHcuraId: match }
                ],
              },
            },
          ]
        );
      const appCount = await appointmentModel.find(obj).countDocuments();
      const pageCount = Math.ceil(parseInt(appCount) / parseInt(limit));
      return { apptList, appCount, pageCount };
      } catch(e){
        throw e
      }
    };

    async updateAppointmentStatus(body){
      try{
        if(body.appointmentStatus == "CONFIRMED"){
          let result = await appointmentModel.findOneAndUpdate(
            {_id: body.appointmentId},
            {
                $set:{
                    appointmentStatus: "CONFIRMED",
                    confirmedUpdatedBy: body.updatedBy
                },
            },{ new: true}
          );
        return result;
        } else if(body.appointmentStatus == "CANCELLED"){
          let result = await appointmentModel.findOneAndUpdate(
            {_id: body.appointmentId},
            {
                $set:{
                    appointmentStatus: "CANCELLED",
                    canceledUpdatedBy: body.updatedBy
                },
            },{ new: true}
          );
          return result;
        } else if(body.appointmentStatus == "VISITED"){
          let result = await appointmentModel.findOneAndUpdate(
            {_id: body.appointmentId},
            {
                $set:{
                    appointmentStatus: "VISITED",
                    visitedUpdatedBy: body.updatedBy
                },
            },{ new: true}
          );
          return result;
        }
      } catch(e){
        throw e;
      }
    };
    
}
module.exports = new appointmentDA();
