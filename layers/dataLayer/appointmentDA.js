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
const authentationDA = require("./authentationDA");
const { branchesModel, slotModel, occupationModel, promoCodesModel, sourceModel,
  symptomsAllegryModel, tempAppointmentModel, statesModel, packageModel, 
  estimationModel, packageSubscriptionModel, caseStudyModel, suggestionPrescriptionModel, 
  prescriptionModel } = require("../../models/schema");
const { startTime } = require("express-pino-logger");
let createdOn = moment().format();

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
        doctorId: slotData.doctorId,
        createdOn: createdOn
      });
      return await blockSlot.save();
    } catch(e){
      throw e;
    }
  };

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
        appointmentNumber: obj.appointmentNumber,
        createdOn: createdOn
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
        createdOn: obj.createdOn
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
      ]);
    } catch(e){
      throw e;
    }
  };

  async getLastInvoiceNo(branchCode){
    try {
      return await paymentModel.aggregate([
        {
          $match: {
            isDeleted: false,
            invoiceNumber: {
              $regex: `^${branchCode}/`
            }
          }
        },
        {
          $project: {
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
      let result = await appointmentModel.aggregate([
        {
          $match: {
            _id: appointmentId,
            isActive: true
          }
        }
      ]); 
      return result;
    } catch(e){
      throw e;
    }
  };

  async getApptDetails(appointmentId){
    try{
      let result = await appointmentModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(appointmentId),
            isActive: true
          }
        }
      ]); 
      return result;
    } catch(e){
      throw e;
    }
  };

  async getAmount(consultationType){
    try{
      return await consulatationAmount.findOne({type: consultationType, isActive: true});
    } catch(e){
      throw e;
    }
  };

  async getLatestAppt(patientId){
    try {
      const result = await appointmentModel.findOne(
        {
          patientId: new mongoose.Types.ObjectId(patientId),
          isActive: true,
        }
      ).sort({ createdOn: -1 });
      return result;
    } catch (e) {
      throw e;
    }
  };

  async updateFollowupId(patientId, appointmentId){
    try{
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

  async getPatientList(type, page, limit, search, roleId, branchId) {
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
        let roleDetails = await authentationDA.getroleCodeDA(roleId);
        if(roleDetails.roleName != "SUPER_ADMIN"){
          pipeline.push({
            $match: {
              branchId: new mongoose.Types.ObjectId(branchId),
            },
          });
        }
        pipeline.push({
          $lookup: {
            from: "appointment",
            let: { uID: "$_id" },
            pipeline: [
              { $match: { $expr: { $and: [{ $eq: ["$patientId", "$$uID"] }] } } },
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
        createdOn: createdOn
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
        createdOn: createdOn
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
        createdOn: createdOn
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
        hcuraTId: hcuraTId,
        createdOn: createdOn
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
      ]);
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
      return await statesModel.findOne({_id: stateId, isActive: true})
    } catch(e){
      throw e;
    }
  };

  async getPromoCodeList(promoCodes){
    try{
      return await promoCodesModel.findOne({_id: promoCodes, isDeleted: false})
    } catch(e){
      throw e;
    }
  };

  async getAppointmentDetailsPaymentDetails(hcuraId, roleId, branchId){
    try{
      const hcuraid = hcuraId.replace(/\s+/g, '').toUpperCase();
      const filter = {
        hcuraId: hcuraid,
        isDeleted: false,
      };
      let roleDetails = await authentationDA.getroleCodeDA(roleId);
      if(roleDetails.roleName != "SUPER_ADMIN"){
        filter.branchId = new mongoose.Types.ObjectId(branchId);
      }
      return await patientModel.aggregate([
        {
          $match: filter
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
      ]);
    } catch(e){
      throw e;
    }
  };

  async getAppointmentPaymentDetails(appointmentId){
    try{
      return await paymentModel.aggregate([
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
            callMode: "$appointmentDetils.consultationMode",
            paymentFor: 1,
            payableAmount: 1,
            discount: 1,
            paymentType: "$paymentMethod",
            paidOn: 1,
            createdOn: 1,
            paymentStatus: 1,
            consultationMode: "$appointmentDetails.consultationType",
            paymentDoneBy: 1,
            invoiceNumber: 1,
            appointmentNumber: "$appointmentDetails.appointmentNumber"
          }
        }
      ]);
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
      // const availableDays = await dayModel.aggregate([
      //     {
      //         $match: {
      //             _id: { $nin: bookedDayIds },
      //             isActive: true,
      //         },
      //     },
      //     {
      //         $project: {
      //             _id: 1,
      //             day: 1,
      //         },
      //     },
      // ]);
      const availableDays = await dayModel.find({isActive: true});

      return { availableTimes, availableDays };
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

  async getAstheticList(){
    try{
      return await packageModel.find({isActive: true, packageFor: "ASTHETIC"});
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
        createdBy: body.createdBy,
        homeopathy: body.homeopathy,
        asthetic: body.asthetic,
        createdOn: createdOn
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
        IGST: paymentDetails.IGST,
        createdOn: paymentDetails.createdOn
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
        createdOn: createdOn
      });
      return await addSchedulesDetails.save();
    } catch(e){
      throw e;
    }
  };

  async getPatientDetailsPackagePayments(hcuraId, roleId, branchId){
    try{
      const hcuraid = hcuraId.replace(/\s+/g, '').toUpperCase();
      const filter = {
        hcuraId: hcuraid,
        isDeleted: false,
      };
      let roleDetails = await authentationDA.getroleCodeDA(roleId);
      if(roleDetails.roleName != "SUPER_ADMIN"){
        filter.branchId = new mongoose.Types.ObjectId(branchId);
      }
      return await patientModel.aggregate([
        {
          $match: filter
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
              $concat: ["$doctorDetails.firstName", " ",  "$doctorDetails.lastName" ]
            },
            appointmentId: "$appointmentDetails._id",
            appointmentNumber: "$appointmentDetails.appointmentNumber",
            appointmentDate: "$appointmentDetails.appointmentDate"
          }
        }
      ]);
    } catch(e){
      throw e;
    }
  };

  async getPaymentDetailsByAppointmentId(appointmentId){
    try{
      return await paymentModel.aggregate([
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
            consultationMode: "$appointmentDetails.consultationMode",
            consultationType: "$appointmentDetails.consultationType",
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
            stateName: "$patientDetails.stateName",
            phoneNumber: "$patientDetails.phoneNumber",
            countryCode: "$patientDetails.countryCode",
            houseNo: {
              $arrayElemAt: [
                "$patientDetails.address.houseNo", 0 ]
            },
            street: {
              $arrayElemAt: [
                "$patientDetails.address.street", 0 ]
            },
            city: {
              $arrayElemAt: [
                "$patientDetails.address.city", 0 ]
            },
            state: {
              $arrayElemAt: [
                "$patientDetails.address.state",  0 ]
            },
            pinCode: {
              $arrayElemAt: [
                "$patientDetails.address.pinCode", 0 ]
            }
          }
        }
      ]);
    } catch(e){
      throw e
    }
  };

  async getPatientAndPaymentDetailsForExternal(hcuraId, roleId, branchId){
    try{
      const hcuraid = hcuraId.replace(/\s+/g, '').toUpperCase();
      const filter = {
        hcuraId: hcuraid,
        isDeleted: false,
      };
      let roleDetails = await authentationDA.getroleCodeDA(roleId);
      if(roleDetails.roleName != "SUPER_ADMIN"){
        filter.branchId = new mongoose.Types.ObjectId(branchId);
      }
      return await patientModel.aggregate([
        {
          $match: filter
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
              $arrayElemAt: ["$appointmentDetails.consultationMode",0]
            },
            "paymentDetails.packageName": {
              $arrayElemAt: ["$packageDetails.name",0]
            },
            "paymentDetails.packageAmount": {
              $arrayElemAt: [
              "$packageDetails.amount",0]
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
      ]);
    } catch(e){
      throw e;
    }
  };

  async addExternalSourcePaymentInfo(obj, paymentObj){
    try{
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
        createdOn: paymentObj.createdOn
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

  async getPromoListAsthetic() {
    try {
      return await promoCodesModel.aggregate([
        {
          $match: {
          isDeleted: false,
          promoCodeFor: "ASTHETIC",
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

  async getAllApptList(obj, page, limit, searchKey, fromDate, toDate, branchId, roleId){
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
      if(roleId){
        let roleDetails = await authentationDA.getroleCodeDA(roleId);
        if(roleDetails.roleName != "SUPER_ADMIN"){
          obj["branchId"] = new mongoose.Types.ObjectId(branchId);
        }
      }
      const apptList = await appointmentModel.aggregate([
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
            appointmentStatus: 1,
            appointmentNumber: 1,
            appointmentId: 1,
            doctorFirstName: "$doctor.firstName",
            doctorLastName: "$doctor.lastName",
            doctorEmailId: "$doctor.emailId",
            doctorProfilePic: "$doctor.profilePic",
            doctorId: "$doctor._id",
            doctorHcuraDoctorId: "$doctor.hcuraDoctorId",
            patientFirstName: "$patient.firstName",
            patientLastName: "$patient.lastName",
            patientHcuraId: "$patient.hcuraId",
            patientId: "$patient._id",
            paymentMethod: "$payment.paymentMethod",
            paymentCreatedDate: "$payment.paidOn",
            paymentPayableAmount: "$payment.payableAmount",
            paymentPaymentStatus: "$payment.paymentStatus",
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
      ]);
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

  async getStateDetails(branchId){
    try{
      let result = await branchesModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(branchId),
            isDeleted: false
          }
        },
        {
          $lookup: {
            from: "states",
            localField: "stateId",
            foreignField: "_id",
            as: "stateDetails"
          }
        },
        {
          $unwind: {
            path: "$stateDetails",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            _id: 0,
            stateDetails: 1
          }
        }
      ]);
      return result;
    } catch(e){
      throw e;
    }
  };

  async getDashboardAptCount(data) {
    try {
      let obj = {
        isActive: true,
        startTime: { $gte: new Date(data.startDate) },
        endTime: { $lte: new Date(data.endDate) }
      };
      if (data.all !== "YES") {
        // let roleDetails = await authentationDA.getroleCodeDA(data.roleId);
        // if (roleDetails.roleName !== "SUPER_ADMIN" && data.branchId) {
          obj["branchId"] = new mongoose.Types.ObjectId(data.branchId);
        // }
      }
      let pipeline = [
        {
          $match: obj
        },
        {
          $project: {
            completed: {
              $cond: [{ $eq: ["$appointmentStatus", "COMPLETED"] }, 1, 0]
            },
            rescheduled: {
              $cond: [{ $eq: ["$appointmentStatus", "RESCHEDULE"] }, 1, 0]
            },
            cancelled: {
              $cond: [{ $eq: ["$appointmentStatus", "CANCELLED"] }, 1, 0]
            },
            confirmed: {
              $cond: [{ $eq: ["$appointmentStatus", "CONFIRMED"] }, 1, 0]
            },
            scheduled: {
              $cond: [{ $eq: ["$appointmentStatus", "SCHEDULED"] }, 1, 0]
            },
            visited: {
              $cond: [{ $eq: ["$appointmentStatus", "VISITED"] }, 1, 0]
            }
          }
        },
        {
          $group: {
            _id: null,
            completed: { $sum: "$completed" },
            rescheduled: { $sum: "$rescheduled" },
            cancelled: { $sum: "$cancelled" },
            confirmed: { $sum: "$confirmed" },
            scheduled: { $sum: "$scheduled" },
            visited: { $sum: "$visited" }
          }
        }
      ];
      return await appointmentModel.aggregate(pipeline);
    } catch (e) {
      throw e;
    }
  };
    
  async getDashboardRevenueCount(data) {
    try {
      let obj = {
        paidOn: {
          $gte: new Date(data.startDate),
          $lte: new Date(data.endDate),
        },
        isDeleted : false
      };
      if (data.all !== "YES") {
        // let roleDetails = await authentationDA.getroleCodeDA(data.roleId);
        // if (roleDetails.roleName !== "SUPER_ADMIN" && data.branchId) {
        obj["branchId"] = new mongoose.Types.ObjectId(data.branchId);
        // }
      }
    
      let pipeline = [
        { $match: obj },
        {
          $facet: {
            debug: [
              {
                $project: {
                  refunded: { $toDouble: "$refundAmount" },
                  total: { $toDouble: "$payableAmount" },
                  completed: {
                    $cond: [
                      { $eq: ["$paymentStatus", "captured"] },
                      { $toDouble: "$payableAmount" },
                      0
                    ],
                  },
                  paymentFor: 1,
                  paymentMethod: 1,
                },
              },
              {
                $addFields: {
                  debugPaymentFor: "$paymentFor",
                  debugPaymentMethod: "$paymentMethod",
                  debugPayableAmount: "$payableAmount"
                }
              }
            ],
            results: [
              {
                $project: {
                  refunded: { $toDouble: "$refundAmount" },
                  total: { $toDouble: "$payableAmount" },
                  completed: {
                    $cond: [
                      { $eq: ["$paymentStatus", "captured"] },
                      { $toDouble: "$payableAmount" },
                      0
                    ],
                  },
                  paymentFor: 1,
                  paymentMethod: 1,
                },
              },
              {
                $group: {
                  _id: null,
                  refunded: { $sum: "$refunded" },
                  total: { $sum: "$total" },
                  completed: { $sum: "$completed" },  
                  astheticTotal: {
                    $sum: {
                      $cond: [{ $eq: ["$paymentFor", "ASTHETIC"] }, "$total", 0]
                    }
                  },
                  consultationTotal: {
                    $sum: {
                      $cond: [{ $eq: ["$paymentFor", "CONSULTATION"] }, "$total", 0]
                    }
                  },
                  homepathyTotal: {
                    $sum: {
                      $cond: [{ $eq: ["$paymentFor", "HOMEOPATHY"] }, "$total", 0]
                    }
                  },
                  externalSourceTotal: {
                    $sum: {
                      $cond: [{ $eq: ["$paymentFor", "EXTERNAL_SOURCE"] }, "$total", 0]
                    }
                  },
                  cashTotal: {
                    $sum: {
                      $cond: [{ $eq: ["$paymentMethod", "cash"] }, "$total", 0]
                    }
                  },
                  qrCodeTotal: {
                    $sum: {
                      $cond: [{ $eq: ["$paymentMethod", "qr_code"] }, "$total", 0]
                    }
                  },
                  swippingMachineTotal: {
                    $sum: {
                      $cond: [{ $eq: ["$paymentMethod", "swipping_machine"] }, "$total", 0]
                    }
                  },
                  otherMethodsTotal: {
                    $sum: {
                      $cond: [
                        { $not: [{ $in: ["$paymentMethod", ["cash", "qr_code", "swipping_machine"]] }] },
                        "$total",
                        0
                      ]
                    }
                  },
                },
              }
            ]
          }
        }
      ];
      let result = await paymentModel.aggregate(pipeline);
      return result[0].results;
    } catch (e) {
      throw e;
    }
  };

  async getPatientListTemp(type, page, limit, search, roleId, branchId) {
    let offset = (page - 1) * limit;
    try {
      let pipeline = [];
      if (type != "ALL") {
        pipeline.push({
          $match: {
            isActive: true,
          },
        });
      }
      let roleDetails = await authentationDA.getroleCodeDA(roleId);
      if(roleDetails.roleName != "SUPER_ADMIN"){
        pipeline.push({
          $match: {
            branchId: new mongoose.Types.ObjectId(branchId),
          },
        });
      }
      if (search != "") {
        let or = [
          {
            hcuraTId: { $regex: search, $options: "i" },
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
            phoneNumberStr: { $toString: "$phoneNumber" }, 
          },
        });
        pipeline.push({
          $match: {
            $or: [
              {
                hcuraTId: { $regex: search, $options: "i" },
              },
              {
                firstName: { $regex: search, $options: "i" },
              },
              {
                lastName: { $regex: search, $options: "i" },
              },
              {
                phoneNumberStr: { $regex: search, $options: "i" }, 
              },
            ],
          },
        });
      }
      pipeline.push({
        $lookup: {
          from: "admin", 
          localField: "doctorId", 
          foreignField: "_id", 
          as: "doctorDetails",
        },
      });
      pipeline.push({
        $unwind: {
          path: "$doctorDetails",
          preserveNullAndEmptyArrays: true,
        },
      });
      pipeline.push({
        $project: {
          hcuraTId: 1,
          firstName: 1,
          lastName: 1,
          phoneNumber: 1,
          doctorfirstName: "$doctorDetails.firstName",
          doctorlastName: "$doctorDetails.lastName",
          createdOn: 1,
          gender: 1,
          complaint: 1,
          appointmentDate: 1,
          isConverted: 1
        },
      });
      pipeline.push({
        $facet: {
          metadata: [{ $count: "total" }, { $addFields: { page: page } }],
          data: [
            { $sort: { createdOn: -1 } },
            { $skip: offset },
            { $limit: limit },
          ],
        },
      });
      let listData = await tempAppointmentModel.aggregate(pipeline);
      return listData;
    } catch (e) {
      throw e;
    }
  };

  async changeisActiveStatusTemp(obj){
    try{
      let result = await tempAppointmentModel.findOneAndUpdate(
        {_id: obj.patientId},
        {
          $set:{
            isConverted: obj.isConverted,
            updatedBy: obj.updatedBy
          },
        },{ new: true}
      );
      return result;
    } catch(e){
      throw e;
    }
  };

  // insert data to case study (PART-1)
  async insertCaseStudyDA(obj){
    try {
      const caseStudyDetails = await caseStudyModel.findOne({ patientId :new mongoose.Types.ObjectId(obj.patientId) });
      if (caseStudyDetails) {
        return {
          message: "Details already exist with this user ID",
          data: caseStudyDetails
      };
      }
      let addCaseStudy = new caseStudyModel({
        patientId: obj.patientId,
        appointmentId: obj.appointmentId,
        doctorId: obj.doctorId,
        createdBy: obj.createdBy,
        branchId:obj.branchId,
        bloodPressure: obj.bloodPressure,
        height: obj.height,
        weight: obj.weight,
        presentComplaint: obj.presentComplaint,
        consultationSummary: obj.consultationSummary,
        presentComplaint: obj.presentComplaint,
        symptoms: obj.symptoms,
        pastHistory: obj.pastHistory,
        anyInjuryOrFracture:obj.anyInjuryOrFracture,
        anyHospitalisation: obj.anyHospitalisation,
        vaccinationsOrBirthHistory: obj.vaccinationsOrBirthHistory,
        anyAllergy: obj.anyAllergy,
        familyHistory: obj.familyHistory,
        ageofMenarche: obj.ageofMenarche,
        Lmp: obj.Lmp,
        daysofFlow: obj.daysofFlow,
        quality: obj.quality,
        pain: obj.pain,
        character: obj.character,
        associatedSymptoms: obj.associatedSymptoms,
        leucorrhoea: obj.leucorrhoea,
        pregnancyHistory: obj.pregnancyHistory,
        appetitte: obj.appetitte,
        stool: obj.stool,
        desire: obj.desire,
        urine: obj.urine,
        aversion: obj.aversion,
        sweat: obj.sweat,
        thirst: obj.thirst,
        sleep: obj.sleep,
        thermal: obj.thermal,
        dreams: obj.dreams,
        addiction: obj.addiction,
        sexualActivity: obj.sexualActivity,
        intermediateRelationship: obj.intermediateRelationship,
        mentalGenerals: obj.mentalGenerals,
        totalityofSymptoms: obj.totalityofSymptoms,
        investigation: obj.investigation,
        diagnosis: obj.diagnosis,
        treatmentAdvice: obj.treatmentAdvice,
        treatmentAdviceAmount: obj.treatmentAdviceAmount,
        dietAdviceAndRegimen: obj.dietAdviceAndRegimen,
        suggestion: obj.suggestion,
        createdOn: createdOn
      });
      return await addCaseStudy.save();
    } catch (e) {
      throw e;
    }
  };

  // async getPatientDetailsCaseStudyDA(data){
  //   try{
  //     const hcuraid = data.hcuraId.replace(/\s+/g, '').toUpperCase();
  //     let obj = {
  //       hcuraId: hcuraid,
  //       isDeleted: false
  //     }
  //     if (data.roleId) {
  //       let roleDetails = await authentationDA.getroleCodeDA(data.roleId);
  //       if (roleDetails.roleName !== "SUPER_ADMIN" && data.branchId) {
  //         obj["branchId"] = new mongoose.Types.ObjectId(data.branchId);
  //       }
  //     }
  //     return await patientModel.aggregate(
  //       [
  //         {
  //           $match: obj
  //         },
  //         {
  //           $lookup: {
  //             from: "appointment",
  //             localField: "_id",
  //             foreignField: "patientId",
  //             as: "appointmentDetails",
  //           },
  //         },
  //         {
  //           $unwind: {
  //             path: "$appointmentDetails",
  //             preserveNullAndEmptyArrays: true,
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: "admin",
  //             localField: "appointmentDetails.doctorId",
  //             foreignField: "_id",
  //             as: "doctorDetails",
  //           },
  //         },
  //         {
  //           $unwind: {
  //             path: "$doctorDetails",
  //             preserveNullAndEmptyArrays: true,
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: "caseStudy",
  //             localField: "_id",
  //             foreignField: "patientId",
  //             as: "caseStudydetails",
  //           },
  //         },
  //         {
  //           $unwind: {
  //             path: "$caseStudydetails",
  //             preserveNullAndEmptyArrays: true,
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: "suggestionPrescription",
  //             localField: "appointmentDetails._id",
  //             foreignField: "appointmentId",
  //             as: "suggestionPrescription",
  //           },
  //         },
  //         {
  //           $unwind: {
  //             path: "$suggestionPrescription",
  //             preserveNullAndEmptyArrays: true,
  //           },
  //         },
  //         {
  //           $project: {
  //             firstName: 1,
  //             lastName: 1,
  //             gender: 1,
  //             emailId: 1,
  //             bloodGroup: 1,
  //             hcuraId: 1,
  //             birthDate: 1,
  //             suggestionPrescription:
  //               { $ifNull: ["$suggestionPrescription.createdOn", null] },
  //             prescriptionCreatedOn:
  //               "$appointmentDetails.prescriptionCreatedOn",
  //             appointmentNumber:
  //               "$appointmentDetails.appointmentNumber",
  //             appointmentId: "$appointmentDetails._id",
  //             appointmentDate:
  //               "$appointmentDetails.appointmentDate",
  //             appointmentState:
  //               "$appointmentDetails.appointmentState",
  //             startTime: "$appointmentDetails.startTime",
  //             doctorFirstName: "$doctorDetails.firstName",
  //             doctorLastName: "$doctorDetails.lastName",
  //             doctorId: "$doctorDetails._id",
  //             caseStudydetails: "$caseStudydetails",
  //             suggestionPrescriptionDetails:
  //               "$suggestionPrescription",
  //           },
  //         },
  //       ]
  //     );
  //   }catch(e) {
  //     throw e;
  //   }
  // };

  async insertCaseStudySuggestionPrescription(data){
    try{
      let casestudySuggestionPrescription = new suggestionPrescriptionModel({
        patientId: data.patientId,
        appointmentId: data.appointmentId,
        doctorId: data.doctorId,
        createdBy: data.createdBy,
        followupSheets: data.followupSheets,
        remarks: data.remarks,
        branchId: data.branchId,
        curedCaseSummary: data.curedCaseSummary,
        createdOn: createdOn
      });
      return await casestudySuggestionPrescription.save();
    } catch(e){
      throw e;
    }
  };

  async insertPrescription(details){
    try{
      let data = new prescriptionModel({
        patientId: details.patientId,
        appointmentId: details.appointmentId,
        doctorId: details.doctorId,
        createdBy: details.createdBy,
        branchId: details.branchId,
        expiryDate: details.expiryDate,
        consultationSummary: details.consultationSummary,
        instructions: details.instructions,
        diagnostics: details.diagnostics,
        diagnosis: details.diagnosis,
        medicines: details.medicines,
        followUpDate: details.followUpDate,
        createdOn: createdOn
      });
      return await data.save();
    } catch(e){
      throw e;
    }
  };

  async getPatientDetailsCaseStudy(hcuraId, roleId, branchId){
    try{
      const hcuraid = hcuraId.replace(/\s+/g, '').toUpperCase();
      const filter = {
        hcuraId: hcuraid,
        isDeleted: false,
      };
      let roleDetails = await authentationDA.getroleCodeDA(roleId);
      if(roleDetails.roleName != "SUPER_ADMIN"){
        filter.branchId = new mongoose.Types.ObjectId(branchId);
      }
      return await patientModel.aggregate([
        {
          $match: filter
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
            from: "caseStudy",
            localField: "_id",
            foreignField: "patientId",
            as: "casestudyDetails"
          }
        },
        {
          $unwind: {
            path: "$casestudyDetails",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "suggestionPrescription",
            localField: "appointmentDetails._id",
            foreignField: "appointmentId",
            as: "suggestionPrescription"
          }
        },
        {
          $unwind: {
            path: "$suggestionPrescription",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "prescription",
            localField: "appointmentDetails._id",
            foreignField: "appointmentId",
            as: "prescriptionDetails"
          }
        },
        {
          $unwind: {
            path: "$prescriptionDetails",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            firstName: 1,
            lastName: 1,
            gender: 1,
            emailId: 1,
            bloodGroup: 1,
            hcuraId: 1,
            birthDate: 1,
            suggestionPrescription: {
              $ifNull: ["$suggestionPrescription.createdOn", null]
            },
            prescriptionCreatedOn: {
            $ifNull: ["$prescriptionDetails.createdOn", null]
            },
            appointmentNumber:
              "$appointmentDetails.appointmentNumber",
            appointmentId: "$appointmentDetails._id",
            appointmentDate:
              "$appointmentDetails.appointmentDate",
            appointmentStatus:
              "$appointmentDetails.appointmentStatus",
            appointmentStartTime:
              "$appointmentDetails.startTime",
            docFirstName: "$doctorDetails.firstName",
            docLastName: "$doctorDetails.lastName",
            doctorId: "$doctorDetails._id",
            casestudyDetails: "$casestudyDetails",
            suggestionPrescription:
              "$suggestionPrescription",
            prescriptionDetails: "$prescriptionDetails"
          }
        }
      ]);
    } catch(e){
      throw (e);
    }
  };

  async updateSuggestionPrescription(obj){
    try{
      let result = await suggestionPrescriptionModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(obj.suggestionPrescriptionId) },
        {
          $set: {
            updatedOn: new Date(),
            updatedBy: obj.updatedBy,
            followupSheets: obj.followupSheets,
            remarks: obj.remarks,
            curedCaseSummary: obj.curedCaseSummary,
          },
        },
        { new: true }
      );
      if (result == null) {
        return { status: false, message: 'No document modified.' };
      } else {
        return { status: true, data: result };
      }
    } catch (e) {
      throw e;
    }
  };

  async getCaseStudyDetails(caseStudyId){
    try {
      return await caseStudyModel.findOne({ _id: new mongoose.Types.ObjectId(caseStudyId)});
    } catch (error) {
      throw error;
    }
  };

  async updatePrescription(obj){
    try{
      let result = await prescriptionModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(obj.prescriptionId) },
        {
          $set: {
            updatedOn: new Date(),
            updatedBy: obj.updatedBy,
            expiryDate: obj.expiryDate,
            consultationSummary: obj.consultationSummary,
            instructions: obj.instructions,
            diagnostics: obj.diagnostics,
            diagnosis: obj.diagnosis,
            followUpDate: obj.followUpDate,
            medicines: obj.medicines
          },
        },
        { new: true }
      );
      if (result == null) {
        return { status: false, message: 'No document modified.' };
      } else {
        return { status: true, data: result };
      }
    } catch(e){
      throw e;
    }
  };

  async getPrescriptionDetails(prescriptionId){
    try {
      return await prescriptionModel.findOne({ _id: new mongoose.Types.ObjectId(prescriptionId)});
    } catch (error) {
      throw error;
    }
  };

  async getDoctorList(branchId, roleId){
    try{
      const filter = {
        isDeleted: false,
      };
      let roleDetails = await authentationDA.getroleCodeDA(roleId);
      if(roleDetails.roleName != "SUPER_ADMIN"){
        filter.branchId = new mongoose.Types.ObjectId(branchId);
      }
      let result = await adminModel.aggregate(
        [
          {
            $match: filter
          },
          {
            $lookup: {
              from: "role",
              localField: "roleId",
              foreignField: "_id",
              as: "roleDetails"
            }
          },
          {
            $unwind: {
              path: "$roleDetails",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $match: {
              "roleDetails.roleName": "DOCTORS"
            }
          },
          {
            $project: {
              _id: 1, 
              firstName: 1,
              lastName: 1,
              gender: 1,
              // roleDetails: 0
            }
          }
        ]
      );
      return result;
    } catch(e){
      throw e;
    }
  };

  async getPackageScheduleDetails(patientId){
    try{
      return packageSubscriptionModel.aggregate([
        {
          $match: {
            patientId: new mongoose.Types.ObjectId(patientId),
            isActive: true,
          },
        },
        {
          $lookup: {
            from: "package",
            localField: "packageId",
            foreignField: "_id",
            as: "packageDetails",
          },
        },
        {
          $unwind: {
            path: "$packageDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            patientId: 1,
            packageId: 1,
            paymentId: 1,
            startDate: 1,
            endDate: 1,
            createdOn: 1,
            paidOn: 1,
            isActive: 1,
            packageName: "$packageDetails.name",
          },
        },
      ]);
    } catch(e){
      throw e;
    }
  };

  async getSuggestionPrescriptionDetails(appointmentId){
    try {
      return await suggestionPrescriptionModel.findOne({ appointmentId: new mongoose.Types.ObjectId(appointmentId) },
      {"followupSheets._id":0 });
    } catch (error) {
      throw error;
    }
  };

  async getPaymentDetails(paymentId){
    try{
      return await paymentModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(paymentId),
            isDeleted: false
          }
        },
        {
          $lookup: {
            from: "patient",
            localField: "patientId",
            foreignField: "_id",
            as: "ptDetails"
          }
        },
        {
          $unwind: {
            path: "$ptDetails",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "admin",
            localField: "doctorId",
            foreignField: "_id",
            as: "docDetails"
          }
        },
        {
          $unwind: {
            path: "$docDetails",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "appointment",
            localField: "appointmentId",
            foreignField: "_id",
            as: "aptDetails"
          }
        },
        {
          $unwind: {
            path: "$aptDetails",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "appointment",
            localField: "aptDetails._id",
            foreignField: "_id",
            as: "consDetails"
          }
        },
        {
          $unwind: {
            path: "$consDetails",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "consulatationAmount",
            localField: "consDetails.consultationType",
            foreignField: "type",
            as: "consAmount"
          }
        },
        {
          $unwind: {
            path: "$consAmount",
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
            from: "branches",
            localField: "branchId",
            foreignField: "_id",
            as: "branchDetails"
          }
        },
        {
          $unwind: {
            path: "$branchDetails",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            _id: 0,
            invoiceNumber: 1,
            createdOn: 1,
            ptFirstName: "$ptDetails.firstName",
            ptLastName: "$ptDetails.lastName",
            hcuraId: "$ptDetails.hcuraId",
            ptAge: "$ptDetails.birthDate",
            docFirstName: "$docDetails.firstName",
            docLastName: "$docDetails.lastName",
            docQualifaction: "$docDetails.qualifaction",
            docRegistartion:
              "$docDetails.registerationNumber",
            aptStartDate: "$aptDetails.startTime",
            aptEndDate: "$aptDetails.endTime",
            consultationFee: "$consAmount.amount",
            discount: 1,
            serviceCharges: 1,
            payableAmount: 1,
            paymentMethod: 1,
            packageName: "$packageDetails.name",
            packageAmount: "$packageDetails.amount",
            branchPhoneNumber:
              "$branchDetails.branchPhoneNumber",
            SGST: 1,
            CGST: 1,
            IGST: 1,
            UGST: 1,
            prescribedBy: 1,
            remarks: 1
          }
        }
      ]);
    } catch(e){
      throw e;
    }
  };

  async getAppointmentDataForPrescriptionDA(appointmentId, patientId) {
    return await appointmentModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(appointmentId),
          patientId: new mongoose.Types.ObjectId(patientId),
          isActive: true
        }
      },
      {
        $lookup: {
          from: "prescription",
          localField: "prescriptionId",
          foreignField: "_id",
          as: "prescriptionDetails"
        }
      },
      {
        $unwind: {
          path: "$prescriptionDetails",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "admin",
          localField: "doctorId",
          foreignField: "_id",
          as: "docDetails"
        }
      },
      {
        $unwind: {
          path: "$docDetails",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "patient",
          localField: "patientId",
          foreignField: "_id",
          as: "ptDetails"
        }
      },
      {
        $unwind: {
          path: "$ptDetails",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          appointmentDate: 1,
          appointmentNumber: 1,
          startTime: 1,
          endTime: 1,
          docFirstName: "$docDetails.firstName",
          docSecondName: "$docDetails.lastName",
          docQualification:
            "$docDetails.qualifaction",
          docRegistration:
            "$docDetails.registerationNumber",
          ptFisrtName: "$ptDetails.firstName",
          ptLastName: "$ptDetails.lastName",
          ptAge: "$ptDetails.birthDate",
          ptGender: "$ptDetails.gender",
          diagnostics:
            "$prescriptionDetails.diagnostics",
          diagnosis: "$prescriptionDetails.diagnosis",
          instructions:
            "$prescriptionDetails.instructions",
          consultationSummary: "$prescriptionDetails.consultationSummary",
          expiryDate:
            "$prescriptionDetails.expiryDate",
          medicine: {
            $map: {
              input: "$prescriptionDetails.medicines",
              as: "med",
              in: {
                originalName: "$$med.originalName",
                medicinesName: "$$med.medicinesName",
                dosage: "$$med.dosage",
                days: "$$med.days",
                time: "$$med.time"
              }
            }
          }
        }
      }
    ])
  };

  async getTransactionReport(data) {
    let offset = (data.page - 1) * 20;
    try {
      let pipeline = [
        {
          $match: {
            paidOn: {
              $gte: new Date(data.startDate),
              $lte: new Date(data.endDate),
            },
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: "patient",
            as: "ptData",
            let: { pId: "$patientId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$pId"],
                  },
                },
              },
              // {
              //   $project: {
              //     firstName: 1,
              //     lastName: 1,
              //     hcuraId: 1,
              //   },
              // },
            ],
          },
        },
        {
          $unwind: {
            path: "$ptData",
            preserveNullAndEmptyArrays: true,
          },
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
          $lookup: {
            from: "admin",
            localField: "doctorId",
            foreignField: "_id",
            as: "docDetails"
          }
        },
        {
          $unwind: {
            path: "$docDetails",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $addFields: {
            ptFirstName: { $toLower: "$ptData.firstName" },
            ptLastName: { $toLower: "$ptData.lastName" },
            amount: { $toDouble: "$payableAmount" },
            hcuraId: "$ptData.hcuraId",
            paymentDoneDetails: "$paymentDoneDetails",
            docDetails: "$docDetails"
          },
        },
        {
          $match: {
            ...(data.status !== null && { paymentStatus: data.status }),
            ...(data.type !== null && { paymentFor: data.type }),
            ...(data.branchId !== null && { branchId: data.branchId }),
            ...(data.search && data.search.trim() !== ""
              ? {
                  $or: [
                    { ptFirstName: { $regex: data.search, $options: "i" } },
                    { ptLastName: { $regex: data.search, $options: "i" } },
                    { 
                      $expr: {
                        $eq: [{ $toUpper: "$hcuraId" }, data.search.toUpperCase()]
                      }
                    },
                    { "ptData.phoneNumber": { $regex: data.search, $options: "i" } }
                  ],
                }
              : {}),
          },
        },
        {
          $sort: data.sorting,
        },
        {
          $facet: {
            metadata: [{ $count: "total" }, { $addFields: { page: data.page } }],
            data: [
              { $skip: offset },
              { $limit: 20 },
              {
                $project: {
                  _id: 1,
                  patientId: 1,
                  hcuraId: 1,
                  ptFirstName: 1,
                  ptLastName: 1,
                  paidOn: 1,
                  paymentStatus: 1,
                  paymentFor:1,
                  paymentDoneBy: 1,
                  amount: 1,
                  paymentMethod: 1,
                  prescribedBy:1,
                  payableAmount: 1,
                  invoiceNumber: 1,
                  remarks: 1,
                  createdOn: 1,
                  GSTAmount: 1,
                  afterRemovingGST: 1,
                  paymentDoneFirstName: "$paymentDoneDetails.firstName",
                  paymentDoneLastName: "$paymentDoneDetails.lastName",
                  docFirstName: "$docDetails.firstName",
                  docSecondName: "$docDetails.lastName"
                },
              },
            ],
          },
        },
      ];
      return await paymentModel.aggregate(pipeline);
    } catch (e) {
      throw e;
    }
  };

  async transactionReportDownload(data) {
    try {
      let pipeline = [
        {
          $match: {
            paidOn: {
              $gte: new Date(data.startDate),
              $lte: new Date(data.endDate),
            },
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: "patient",
            as: "ptData",
            let: { pId: "$patientId" },
            pipeline: [
              { $match: { $expr: { $and: [{ $eq: ["$_id", "$$pId"] }] } } },
              // { $project: { firstName: "$firstName", lastName: "$lastName", hcuraId: "$hcuraId", consultationType:"$consultationType" } },
            ],
          },
        },
        {
          $unwind: {
            path: "$ptData",
            preserveNullAndEmptyArrays: true,
          },
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
          $lookup: {
            from: "admin",
            localField: "doctorId",
            foreignField: "_id",
            as: "docDetails"
          }
        },
        {
          $unwind: {
            path: "$docDetails",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $addFields: {
            ptFirstName: { $toLower: "$ptData.firstName" },
            ptLastName: { $toLower: "$ptData.lastName" },
            amount: { $toDouble: "$payableAmount" },
            hcuraId: "$ptData.hcuraId",
            paymentDoneDetails: "$paymentDoneDetails",
            docDetails: "$docDetails"
          },
        },
        {
          $match: {
            ...(data.status !== null && { paymentStatus: data.status }),
            ...(data.type !== null && { paymentFor: data.type }),
            ...(data.branchId !== null && { branchId: data.branchId }),
            ...(data.search && data.search.trim() !== ""
              ? {
                  $or: [
                    { ptFirstName: { $regex: data.search, $options: "i" } },
                    { ptLastName: { $regex: data.search, $options: "i" } },
                    { 
                      $expr: {
                        $eq: [{ $toUpper: "$hcuraId" }, data.search.toUpperCase()]
                      }
                    },
                    { "ptData.phoneNumber": { $regex: data.search, $options: "i" } }
                  ],
                }
              : {}),
          },
        },
        {
          $sort: data.sorting,
        },
        {
          $facet: {
            metadata: [{ $count: "total" }],
            data: [
              {
                $project: {
                  _id: 1,
                  patientId: 1,
                  hcuraId: 1,
                  ptFirstName: 1,
                  ptLastName: 1,
                  paidOn: 1,
                  paymentStatus: 1,
                  paymentFor:1,
                  paymentDoneBy: 1,
                  amount: 1,
                  paymentMethod: 1,
                  prescribedBy:1,
                  payableAmount: 1,
                  invoiceNumber: 1,
                  remarks: 1,
                  createdOn: 1,
                  paymentDoneFirstName: "$paymentDoneDetails.firstName",
                  paymentDoneLastName: "$paymentDoneDetails.lastName",
                  docFirstName: "$docDetails.firstName",
                  docLastName: "$docDetails.lastName"
                },
              },
            ],
          },
        },
      ];
      return await paymentModel.aggregate(pipeline);
    } catch (e) {
      throw e;
    }
  };

  async masterReport(data) {
    let offset = (data.page - 1) * 20;
    try {
      let pipeline = [
        {
          $match: {
            createdOn: {
              $gte: new Date(data.startDate),
              $lte: new Date(data.endDate),
            },
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: "patient",
            as: "ptData",
            let: { pId: "$patientId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$pId"],
                  },
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: "$ptData",
            preserveNullAndEmptyArrays: true,
          },
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
          $lookup: {
            from: "appointment",
            localField: "appointmentId",
            foreignField: "_id",
            as: "apptDetails"
          }
        },
        {
          $unwind: {
            path: "$apptDetails",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "admin",
            localField: "doctorId",
            foreignField: "_id",
            as: "docDetails"
          }
        },
        {
          $unwind: {
            path: "$docDetails",
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
          $addFields: {
            ptFirstName: { $toLower: "$ptData.firstName" },
            ptLastName: { $toLower: "$ptData.lastName" },
            amount: { $toDouble: "$payableAmount" },
            hcuraId: "$ptData.hcuraId",
            ptData: "$ptData",
            paymentDoneDetails: "$paymentDoneDetails",
            apptDetails: "$apptDetails",
            docDetails: "$docDetails",
            packageDetails: "$packageDetails"
          },
        },
        {
          $match: {
            ...(data.status !== null && { paymentStatus: data.status }),
            ...(data.type !== null && { paymentFor: data.type }),
            ...(data.search && data.search.trim() !== ""
              ? {
                  $or: [
                    { ptFirstName: { $regex: data.search, $options: "i" } },
                    { ptLastName: { $regex: data.search, $options: "i" } },
                    { 
                      $expr: {
                        $eq: [{ $toUpper: "$hcuraId" }, data.search.toUpperCase()]
                      }
                    },
                    { "ptData.phoneNumber": { $regex: data.search, $options: "i" } }
                  ],
                }
              : {}),
          },
        },
        {
          $sort: data.sorting,
        },
        {
          $facet: {
            metadata: [{ $count: "total" }, { $addFields: { page: data.page } }],
            data: [
              { $skip: offset },
              { $limit: 20 },
              {
                $project: {
                  _id: 1,
                  patientId: 1,
                  hcuraId: 1,
                  ptFirstName: 1,
                  ptLastName: 1,
                  paidOn: 1,
                  paymentStatus: 1,
                  paymentFor:1,
                  paymentDoneBy: 1,
                  paidAmount: 1,
                  GSTAmount: 1,
                  afterRemovingGST: 1,
                  paymentMethod: 1,
                  payableAmount: 1,
                  invoiceNumber: 1,
                  remarks: 1,
                  createdOn: 1,
                  ptEmail: "$ptData.emailId",
                  ptAddress: "$ptData.address",
                  paymentDoneFirstName: "$paymentDoneDetails.firstName",
                  paymentDoneLastName: "$paymentDoneDetails.lastName",
                  consultationType: "$apptDetails.consultationType",
                  apptDate: "apptDetails.startTime",
                  docFirstName: "$docDetails.firstName",
                  docLastName: "$docDetails.lastName",
                  packageAmount: "$packageDetails.amount",
                  packageName: "$packageDetails.name"
                },
              },
            ],
          },
        },
      ];
      return await paymentModel.aggregate(pipeline);
    } catch (e) {
      throw e;
    }
  };

  async statusCaseStudy(data){
    try{
      const filter = {
        isDeleted: false,
        paidOn: {
          $gte: new Date(data.startDate),
          $lte: new Date(data.endDate),
        },
      };
      if(data.doctorId != null ){
        filter.doctorId = new mongoose.Types.ObjectId(data.doctorId);
      }
      if(data.branchId != null ){
        filter.branchId = new mongoose.Types.ObjectId(data.branchId);
      }
      let result = await paymentModel.aggregate(
        [
          {
            $match: filter
          },
          {
            $addFields: {
              caseStudyStatus: {
                $cond: {
                  if: {
                    $and: [
                      {
                        $ifNull: ["$caseStudyId", false]
                      },
                      {
                        $ne: ["$caseStudyId", null]
                      }
                    ]
                  },
                  then: "Available",
                  else: "Not Available"
                }
              },
              prescriptionStatus: {
                $cond: {
                  if: {
                    $and: [
                      {
                        $ifNull: [
                          "$prescriptionId",
                          false
                        ]
                      },
                      {
                        $ne: ["$prescriptionId", null]
                      }
                    ]
                  },
                  then: "Available",
                  else: "Not Available"
                }
              }
            }
          },
          {
            $lookup: {
              from: "admin",
              localField: "doctorId",
              foreignField: "_id",
              as: "docDetails"
            }
          },
          {
            $unwind: {
              path: "$docDetails",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: {
              from: "patient",
              localField: "patientId",
              foreignField: "_id",
              as: "ptDetails"
            }
          },
          {
            $unwind: {
              path: "$ptDetails",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $project: {
              caseStudyStatus: 1,
              caseStudyId: 1,
              prescriptionId: 1,
              startTime: 1,
              appointmentNumber: 1,
              prescriptionStatus: 1,
              hcuraId: "$ptDetails.hcuraId",
              ptFirstName: "$ptDetails.firstName",
              ptLastName: "$ptDetails.lastName",
              docFirstName: "$docDetails.firstName",
              docLastName: "$docDetails.lastName",
              paidOn: 1
            }
          },
          {
            $sort: {
              paidOn: -1
            }
          }
        ]
      );
      return result;
    } catch(e){

    }
  };

  async getApptListDocs(page, limit, searchKey, fromDate, toDate, docId, roleId){
    try{
      const obj = { isActive : true };
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
      if(roleId){
        let roleDetails = await authentationDA.getroleCodeDA(roleId);
        if(roleDetails.roleName == "DOCTORS"){
          obj["doctorId"] = new mongoose.Types.ObjectId(docId);
        }
      }
      const apptList = await appointmentModel.aggregate([
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
            appointmentStatus: 1,
            appointmentNumber: 1,
            appointmentId: 1,
            doctorFirstName: "$doctor.firstName",
            doctorLastName: "$doctor.lastName",
            doctorEmailId: "$doctor.emailId",
            doctorProfilePic: "$doctor.profilePic",
            doctorId: "$doctor._id",
            doctorHcuraDoctorId: "$doctor.hcuraDoctorId",
            patientFirstName: "$patient.firstName",
            patientLastName: "$patient.lastName",
            patientHcuraId: "$patient.hcuraId",
            patientId: "$patient._id",
            paymentMethod: "$payment.paymentMethod",
            paymentCreatedDate: "$payment.paidOn",
            payableAmount: "$payment.payableAmount",
            paymentStatus: "$payment.paymentStatus",
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
      ]);
      const appCount = await appointmentModel.find(obj).countDocuments();
      const pageCount = Math.ceil(parseInt(appCount) / parseInt(limit));
      return { apptList, appCount, pageCount };
    } catch(e){
      throw e
    }
  };

  async patientReport(data) {
    let offset = (data.page - 1) * 20;
    try {
      let pipeline = [
        {
          $match: {
            registeredOn: {
              $gte: new Date(data.startDate),
              $lte: new Date(data.endDate),
            },
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: "admin",
            localField: "registeredBy",
            foreignField: "_id",
            as: "registeredDetails"
          }
        },
        {
          $unwind: {
            path: "$registeredDetails",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "appointment",
            localField: "_id",
            foreignField: "patientId",
            as: "apptDetails",
          },
        },
        {
          $addFields: {
            noofAppts: { $size: "$apptDetails" }, 
            lastAppointmentDate: {
              $max: "$apptDetails.startTime",
            },
          },
        },
        {
          $lookup: {
            from: "branches",
            localField: "branchId",
            foreignField: "_id",
            as: "branchDetails"
          }
        },
        {
          $unwind: {
            path: "$branchDetails",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "states",
            localField: "stateId",
            foreignField: "_id",
            as: "stateDetails"
          }
        },
        {
          $unwind: {
            path: "$stateDetails",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $addFields: {
            hcuraId: "$hcuraId",
            branchDetails: "$branchDetails",
            apptDetails: "$apptDetails",
            registeredDetails: "$registeredDetails",
            stateDetails: "$stateDetails"
          },
        },
        {
          $match: {
            ...(data.source !== null && { source: data.source }),
            ...(data.occupation !== null && { occupation: data.occupation }),
            ...(data.branchId !== null && { branchId: new mongoose.Types.ObjectId(data.branchId) }),
            ...(data.gender !== null && { gender: data.gender }),
            ...(data.stateId !== null && { stateId: new mongoose.Types.ObjectId(data.stateId) }),
            ...(data.search && data.search.trim() !== ""
              ? {
                  $or: [
                    { firstName: { $regex: data.search, $options: "i" } },
                    { lastName: { $regex: data.search, $options: "i" } },
                    { $expr: {
                        $eq: [{ $toUpper: "$hcuraId" }, data.search.toUpperCase()]
                      } },
                    { phoneNumber: { $regex: data.search, $options: "i" } },
                    { 
                      $expr: {
                        $regexMatch: {
                          input: { $toString: "$phoneNumber" },
                          regex: data.search,
                          options: "i"
                        }
                      }
                    }
                  ],
                }
              : {}),
          },
        },
        {
          $sort: data.sorting,
        },
        {
          $facet: {
            metadata: [{ $count: "total" }, { $addFields: { page: data.page } }],
            data: [
              { $skip: offset },
              { $limit: 20 },
              {
                $project: {
                  _id: 1,
                  hcuraId: 1,
                  firstName: 1,
                  lastName: 1,
                  birthDate: 1,
                  gender: 1,
                  emailId: 1,
                  phoneNumber: 1,
                  whatsappNumber: 1,
                  registeredOn: 1,
                  source: 1,
                  occupation: 1,
                  address: 1,
                  registeredByFirstName: "$registeredDetails.firstName" ,
                  registeredBySecondName: "$registeredDetails.lastName",
                  branchCode: "$branchDetails.branchCode",
                  branchName: "$branchDetails.branchName",
                  branchPhoneNumber: "$branchDetails.branchPhoneNumber",
                  branchId: "$branchDetails._id",
                  branchState: "$stateDetails.name",
                  lastAppointmentDate: 1, 
                  noofAppts: 1,
                },
              },
            ],
          },
        },
      ];
      return await patientModel.aggregate(pipeline);
    } catch (e) {
      throw e;
    }
  };

  async appointmentReport(data) {
    let offset = (data.page - 1) * 20;
    try {
      let pipeline = [
        {
          $match: {
            createdOn: {
              $gte: new Date(data.startDate),
              $lte: new Date(data.endDate),
            },
            isActive: true,
          },
        },
        {
          $lookup: {
            from: "admin",
            localField: "doctorId",
            foreignField: "_id",
            as: "docDetails"
          }
        },
        {
          $unwind: {
            path: "$docDetails",
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
            from: "patient",
            localField: "patientId",
            foreignField: "_id",
            as: "ptData"
          }
        },
        {
          $unwind: {
            path: "$ptData",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $addFields: {
            ptFirstName: { $toLower: "$ptData.firstName" },
            ptLastName: { $toLower: "$ptData.lastName" },
            hcuraId: "$ptData.hcuraId",
            ptData: "$ptData",
            paymentDoneDetails: "$paymentDoneDetails",
            docDetails: "$docDetails",
            packageDetails: "$packageDetails",
            packageFor: "$packageDetails.packageFor"
          },
        },
        {
          $match: {
            ...(data.consultationType !== null && { consultationType: data.consultationType }),
            ...(data.appointmentStatus !== null && { appointmentStatus : data.appointmentStatus }),
            ...(data.branchId !== null && { branchId : new mongoose.Types.ObjectId(data.branchId) }),
            ...(data.doctorId !== null && { doctorId: new mongoose.Types.ObjectId(data.doctorId) }),
            ...(data.type !== null && { packageFor: data.type }),
            ...(data.search && data.search.trim() !== ""
            ? {
              $or: [
                  { ptFirstName: { $regex: data.search, $options: "i" } },
                  { ptLastName: { $regex: data.search, $options: "i" } },
                  { $expr: {
                      $eq: [{ $toUpper: "$hcuraId" }, data.search.toUpperCase()]
                    } },
                  { phoneNumber: { $regex: data.search, $options: "i" } },
                  { 
                    $expr: {
                      $regexMatch: {
                        input: { $toString: "$phoneNumber" },
                        regex: data.search,
                        options: "i"
                      }
                    }
                  }
                ],
              }
            : {}),
          },
        },
        {
          $sort: data.sorting,
        },
        {
          $facet: {
            metadata: [{ $count: "total" }, { $addFields: { page: data.page } }],
            data: [
              { $skip: offset },
              { $limit: 20 },
              {
                $project: {
                  _id: 1,
                  hcuraId: 1,
                  ptFirstName: 1,
                  ptLastName: 1,
                  appointmentNumber: 1,
                  startTime: 1,
                  docFirstName: "$docDetails.firstName",
                  docLastName: "$docDetails.lastName",
                  appointmentStatus: 1,
                  consultationType: 1,
                  consultationMode: 1,
                  packageTaken: "$packageDetails.name",
                  symptoms: 1,
                  allegires: 1
                },
              },
            ],
          },
        },
      ];
      return await appointmentModel.aggregate(pipeline);
    } catch (e) {
      throw e;
    }
  };
  
}
module.exports = new appointmentDA();
