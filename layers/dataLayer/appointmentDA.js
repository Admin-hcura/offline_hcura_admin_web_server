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
    sourceModel, symptomsAllegryModel, tempAppointmentModel,
    statesModel} = require("../../models/schema");
const { startTime } = require("express-pino-logger");

class appointmentDA{

    async blockSlot(slotData){
        try{
            let blockSlot = new slotModel({
                date: slotData.date,
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
                paymentFor: obj.paymentFor,
                promoCodes: obj.promoCodes,
                payableAmount: obj.payableAmount,
                shortUrl: obj.shortUrl,
                paymentRelationId: obj.paymentRelationId,
                paymentLinkId: obj.paymentLinkId,
                paymentDoneBy: obj.paymentDoneBy,
                discount: obj.discount,
                GSTAmount: obj.GSTAmount,
                // GSTID: obj.GSTID,
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
                {appointmentId: obj.appointmentId},
                {
                    $set: {
                        paymentMethod: obj.paymentMethod,
                        paymentStatus: obj.paymentStatus,
                        paymentId: obj.paymentId,
                        orderId: obj.orderId,
                        paidOn: obj.paidOn,
                        invoiceNumber: obj.invoiceNumber,
                        paymentRelationId: obj.paymentRelationId,
                        paymentLinkId: obj.paymentLinkId
                    },
                },{ new: true}
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
                        appointmentStatus: "CONFIRMED"
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
                        isDeleted: false,
                        roleName: "DOCTORS"
                      }
                    },
                    {
                      $lookup: {
                        from: "admin",
                        localField: "_id",
                        foreignField: "roleId",
                        as: "doctors"
                      }
                    },
                    {
                      $unwind: {
                        path: "$doctors",
                        preserveNullAndEmptyArrays: true
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
            console.log("........entered");
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
    
}
module.exports = new appointmentDA();
