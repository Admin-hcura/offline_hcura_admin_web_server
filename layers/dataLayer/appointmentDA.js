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
  estimationModel, packageSubscriptionModel, caseStudyModel, suggestionPrescriptionModel, aestheticCaseStudyModel,dentalCaseStudyModel,
  prescriptionModel, bookApptFormModel, contactUsModel, corporateModel, advancePaymentTransactionModel,advancePaymentSummaryModel,
  offerFormModel, homeCountModel,advancePaymentModel,PerformedEstimationModel } = require("../../models/schema");
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
        createdOn: slotData.createdOn
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
        appointmentFor:obj.appointmentFor,
        consultationType: obj.consultationType,
        appointmentStatus: obj.appointmentStatus,
        bookedBy: obj.bookedBy,
        appointmentNumber: obj.appointmentNumber,
        createdOn: obj.createdOn
      });
      return await result.save();
    } catch(e){
      throw e;
    }
  };

  async rescheduleAppointment(obj){
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
        appointmentStatus: obj.appointmentStatus,
        consultationType: obj.consultationType,
        bookedBy: obj.rescheduledBy,
        appointmentNumber: obj.appointmentNumber,
        createdOn: obj.createdOn,
        rescheduledApptId: obj.rescheduledApptId,
        followupId: obj.followupId
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
            // isDeleted: false,
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

  async updateOldAppt(oldApptId, bookedBy){
    try{
      const result = await appointmentModel.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(oldApptId),
          isActive: true,
        },
        {
          $set: { 
            appointmentStatus : "RESCHEDULE",
            rescheduleUpdatedBy : bookedBy,
            isRescheduled : true
          }
        },
        {
          returnDocument: 'after'
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
 
async   markMonthsAsPaid(performedEstimationId, selectedMonths) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const updateOps = selectedMonths.map(({ category, packageName, monthId }) => ({
      updateOne: {
        filter: {
          _id: performedEstimationId,
          categories: {
            $elemMatch: {
              category,
              packageName,
              "months._id": monthId
            }
          }
        },
        update: {
          $set: {
            "categories.$[cat].months.$[month].paid": true
          }
        },
        arrayFilters: [
          { "cat.category": category, "cat.packageName": packageName },
          { "month._id": new mongoose.Types.ObjectId(monthId) }
        ]
      }
    }));

    const result = await PerformedEstimationModel.bulkWrite(updateOps, { session });

    // ✅ Fetch updated document after changes
    const updatedDoc = await PerformedEstimationModel.findById(performedEstimationId).lean();

    await session.commitTransaction();
    session.endSession();

    return {
      message: "Months marked as paid",
      result,
      updatedData: updatedDoc // ✅ include full updated data here
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("❌ Error in markMonthsAsPaid:", error);
    throw error;
  }
}

 
  async performedEstimations(body){
    try {
      const { patientId, roleId, doctorId, estimationId, categories } = body;

      const newEntry = new PerformedEstimationModel({
          patientId,
          roleId,
          doctorId,
          estimationId,
          categories,
      });

      return await newEntry.save();
  } catch (e) {
      throw e;
  }
  };
  async updateperformedEstimations(patientId, roleId,  estimationId, updates) {
    try {
        if (!Array.isArray(updates) || updates.length === 0) {
            throw new Error("Invalid data: 'updates' must be a non-empty array.");
        }

        for (const update of updates) {
            console.log(`Updating monthId: ${update.monthId}, performed: ${update.performed}`);

    
         await PerformedEstimationModel.updateOne(
            {
              patientId,
              estimationId,
              "categories.months._id": update.monthId
            },
            {
              $set: {
                "categories.$[cat].months.$[month].performed": update.performed,
                "categories.$[cat].months.$[month].doctorId": update.doctorId
              }
            },
            {
              arrayFilters: [
                { "cat.months._id": update.monthId },
                { "month._id": update.monthId }
              ]
            }
          );


          }

        return { success: true, message: "Performed status updated" };
    } catch (e) {
        console.error("Error in updateperformedEstimations:", e);
        throw e;
    }
}

 
async getperformedEstimations(performedId) {
  try {
    // Step 1: Fetch performed estimation
    const performedEstimation = await PerformedEstimationModel.findOne({ _id: performedId });

    if (!performedEstimation) {
      throw new Error("Performed Estimation not found");
    }

    // Step 2: Fetch advance payment summary using patientId
    const advanceSummary = await advancePaymentSummaryModel.findOne(
      { patientId: performedEstimation.patientId },
      { remainingBalance: 1 } // Only fetch remainingBalance field
    );

    // Step 3: Add advanceMoney to response
    const advanceMoney = advanceSummary ? advanceSummary.remainingBalance : null;

    // Step 4: Combine and return
    return {
      ...performedEstimation.toObject(),
      advanceMoney
    };

  } catch (e) {
    console.error("Error in getperformedEstimations:", e);
    throw e;
  }
}

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
              "$appointmentDetails.appointmentDate",
              appointmentFor: { $ifNull: ["$appointmentDetails.appointmentFor", null] }

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
      return await packageModel.find({isActive: true, packageFor: "SKIN"});
    } catch(e){
      throw e;
    }
  };

  async getHairpackageList(){
    try{
      return await packageModel.find({isActive: true, packageFor: "HAIR"});
    } catch(e){
      throw e;
    }
  };
    async getDentalpackageList(){
    try{
      return await packageModel.find({isActive: true, packageFor: "DENTAL"});
    } catch(e){
      throw e;
    }
  };
   
 
  async   createEstimation(body) {
    try {
        // Step 1: Save the estimation
        let newEstimation = new estimationModel({
            patientId: body.patientId,
            doctorId: body.doctorId,
            branchId: body.branchId,
            createdBy: body.createdBy,
            appointmentId: body.appointmentId,
            homeopathy: body.homeopathy,
            skin: body.skin,
            hair:body.hair,
            dental: body.dental,
         });

        let savedEstimation = await newEstimation.save();

        // Step 2: Fetch doctor details from Admin collection
        let doctorDetails = await adminModel.findById({ _id: body.doctorId }).select("firstName lastName  registerationNumber phoneNumber");
        let patientdetails = await patientModel.findById({_id: body.patientId}).select("phoneNumber firstName lastName hcuraId")

        let branchdetails = await branchesModel.findById({_id: body.branchId}).select("branchName")
        // Step 3: Return response with doctor details
        return {
            success: true,
            data: {
                ...savedEstimation.toObject(),
                doctorName: doctorDetails ? `${doctorDetails.firstName} ${doctorDetails.lastName}` : null,
                regNo : doctorDetails? doctorDetails.registerationNumber : null,
                patientPhonenumber: patientdetails ? patientdetails.phoneNumber : null,
                patientId : patientdetails ?patientdetails.hcuraId : null,
                patientName : patientdetails ?  `${patientdetails.firstName} ${patientdetails.lastName}` : null,
                branchName : branchdetails ? branchdetails.branchName : null ,
            }
        };
    } catch (error) {
        throw error;
    }
}
 
async updateEstimationStatus(estimationId) {
  try {
    // Step 1: Update isActive
    await estimationModel.findByIdAndUpdate(
      estimationId,
      { isActive: true },
      { new: true }
    );

    // Step 2: Fetch enriched estimation details
    const estimationDetails = await estimationModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(estimationId)
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
          from: "branches", // double-check your actual collection name
          localField: "patient.branchId",
          foreignField: "_id",
          as: "branch"
        }
      },
      {
        $unwind: {
          path: "$branch",
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
      },
      {
        $addFields: {
          doctorName: {
            $concat: ["$doctor.firstName", " ", "$doctor.lastName"]
          },
          patientName: {
            $concat: ["$patient.firstName", " ", "$patient.lastName"]
          },
          hcuraId: "$patient.hcuraId",
          phoneNumber: "$patient.phoneNumber",
          DoctorRegNo: "$doctor.registerationNumber",
          branchName: "$branch.branchName"
        }
      },
      {
        $project: {
          doctor: 0,
          patient: 0,
          branch: 0
        }
      }
    ]);

    // ✅ Return the enriched document
    return estimationDetails[0] || null;

  } catch (error) {
    console.error("Error in appointmentDA.updateEstimationStatus:", error);
    throw error;
  }
}


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
 
  async getPackageDetails(packageId) {
    try {
      const packageData = await packageModel.findOne({ _id: packageId, isActive: true });
  
      if (!packageData) {
        console.warn(`Package not found or inactive: ${packageId}`);
      }
  
      return packageData;
    } catch (error) {
      console.error("Error fetching package details:", error);
      throw error;
    }
  }

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
  async addSettledPaymentInfo(paymentDetails) {
    try {
      // Create a new payment record using the details provided in the `paymentDetails` parameter
      let addPaymentInfo = new paymentModel({
 
        patientId: paymentDetails.patientId, // The patient's ID
        doctorId: paymentDetails.doctorId, // The doctor's ID
        branchId: paymentDetails.branchId, // The branch's ID
        packageId: paymentDetails.packageId, // The ID of the package
        paymentDoneBy: paymentDetails.paymentDoneBy, // The admin/employee who processed the payment
        paymentFor: paymentDetails.paymentFor, // Type of payment (e.g., consultation, package)
        remarks: paymentDetails.remarks, // Any remarks or notes for the payment
        promoCodes: paymentDetails.promoCodes, // Any promo codes used (can be an array)
        payableAmount: paymentDetails.payableAmount, // The total payable amount
        discount: paymentDetails.discount, // Discount amount applied
        SGST: paymentDetails.SGST, // State GST amount
        CGST: paymentDetails.CGST, // Central GST amount
        IGST: paymentDetails.IGST, // Integrated GST amount
        UGST: paymentDetails.UGST, // Unilateral GST, if any (or else defaults to 0)
        GSTAmount: paymentDetails.GSTAmount, // Total GST amount
        paymentMethod: paymentDetails.paymentMethod, // Payment method (e.g., cash, card)
        paymentStatus: paymentDetails.paymentStatus, // Status of payment (e.g., paid, pending)
        paidOn: paymentDetails.paidOn, // Date of payment
        createdOn: paymentDetails.createdOn, // Date when payment record was created
        afterRemovingGST: paymentDetails.afterRemovingGST, // Amount after GST is removed
        phoneNumber: paymentDetails.phoneNumber, // Phone number of the patient (for contact purposes)
        invoiceNumber: paymentDetails.invoiceNumber, // Generated invoice number
        sessions: paymentDetails.sessions || []
      });
  
      // Save the payment record to the database
      return await addPaymentInfo.save();
    } catch (e) {
      // If an error occurs, throw the error for proper handling
      throw e;
    }
  }
  // appointmentDA.js
async getUserInfo  (paymentId) {
  try {
    return await paymentModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(paymentId) } },
      {
        $lookup: {
          from: "patient",
          localField: "patientId",
          foreignField: "_id",
          as: "patient"
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
      { $unwind: "$patient" },
      { $unwind: "$doctor" }
    ]);
  } catch (error) {
    throw error;
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
        // appointmentId: paymentDetails.appointmentId,
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
 
async addAdvancePackagePaymentInfo(paymentDetails) {
  try {
    if (!paymentDetails.patientId || !paymentDetails.totalAdvance || !paymentDetails.paymentMode) {
      throw new Error("Missing required fields");
    }

    // ✅ 1. Get patient details
    const patient = await patientModel.findById(paymentDetails.patientId);
    // if (!patient) throw new Error("Patient not found");

    const patientName = `${patient.firstName} ${patient.lastName}`;

    // ✅ 2. Get branch name from branchId in patient
    let branchName = null;
    if (patient.branchId) {
      const branch = await branchesModel.findById(patient.branchId);
      if (branch) {
        branchName = branch.branchName;
      }
    }

    // ✅ 3. Update summary balance
    const summary = await advancePaymentSummaryModel.findOneAndUpdate(
      { patientId: paymentDetails.patientId },
      {
        $inc: { remainingBalance: paymentDetails.totalAdvance },
        $set: { updatedOn: new Date() }
      },
      { new: true, upsert: true }
    );

    // ✅ 4. Create transaction
    const transaction = new advancePaymentTransactionModel({
      patientId: paymentDetails.patientId,
      patientName,
      totalAdvance: paymentDetails.totalAdvance,
      debitedAmount : 0,
      remainingBalance: summary.remainingBalance,
      paymentMode: paymentDetails.paymentMode,
      paymentStatus: "created",
      paymentDoneBy: paymentDetails.paymentDoneBy,
      shortUrl: paymentDetails.shortUrl || null,
      paymentRelationId: paymentDetails.paymentRelationId || null,
      paymentLinkId: paymentDetails.paymentLinkId || null
    });

    const saved = await transaction.save();

    // ✅ 5. Build response with patient + branch info
    return {
      success: true,
      data: saved,
      patient: {
        patientName: patient.patientName,
        hcuraId: patient.hcuraId,
        phoneNumber: patient.phoneNumber,
        branchName: branchName
      }
    };

  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
}
 
async debitAdvanceBalance({ patientId, patientName, amountToDebit, paymentDoneBy, paymentMode }) {
  try {
    const advancePayment = await advancePaymentSummaryModel.findOne({ patientId });

    if (!advancePayment) {
      throw new Error("Advance payment record not found");
    }

    if (advancePayment.remainingBalance < amountToDebit) {
      throw new Error("Insufficient remaining balance");
    }

    // Deduct balance
    advancePayment.remainingBalance -= amountToDebit;
    const updatedSummary = await advancePayment.save();

    // Save transaction
    const transaction = new advancePaymentTransactionModel({
      patientId,
      patientName, // ✅ Use the passed value
      totalAdvance : 0,
      debitedAmount: -amountToDebit, // negative to indicate debit
      remainingBalance: updatedSummary.remainingBalance,
      paymentMode: paymentMode || "cash",
      paymentStatus: "completed",
      paymentDoneBy
    });

    await transaction.save();

    return { success: true, data: updatedSummary };
  } catch (e) {
    return { success: false, message: e.message };
  }
}
 
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
            from: "advancepaymenttransactions",
            localField: "_id",
            foreignField: "patientId",
            as: "advancepaymentDetails"
          }
        },
        {
          $unwind: {
            path: "$advancepaymentDetails",
            preserveNullAndEmptyArrays: true
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
              $concat: ["$doctorDetails.firstName", " ",  "$doctorDetails.lastName" ]
            },
            appointmentId: "$appointmentDetails._id",
            appointmentNumber: "$appointmentDetails.appointmentNumber",
            appointmentDate: "$appointmentDetails.appointmentDate",         
            patientId : "$appointmentDetails.patientId",
            advancepaymentId : "$advancepaymentDetails._id",
            remainingBalance : "$advancepaymentDetails.remainingBalance",
            advancepaymentDetails:"$advancepaymentDetails"
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
              from: "Estimation",
              localField: "appointmentId",
              foreignField: "appointmentId",
              as: "est"
            }
          },
          {
            $unwind: {
              path: "$est",
              includeArrayIndex: "string",
              preserveNullAndEmptyArrays: true
            }
          },
        {
          $lookup: {
            from: "caseStudy",
            let: { appId: "$appointmentId" },
            pipeline: [
              { $match: { $expr: { $eq: ["$appointmentId", "$$appId"] } } },
              { $limit: 1 }
            ],
            as: "homeopathyCS"
          }
        },
        {
          $lookup: {
            from: "caseStudyAesthetic",
            let: { appId: "$appointmentId" },
            pipeline: [
              { $match: { $expr: { $eq: ["$appointmentId", "$$appId"] } } },
              { $limit: 1 }
            ],
            as: "aestheticCS"
          }
        },
        {
          $lookup: {
            from: "caseStudyDental",
            let: { appId: "$appointmentId" },
            pipeline: [
              { $match: { $expr: { $eq: ["$appointmentId", "$$appId"] } } },
              { $limit: 1 }
            ],
            as: "dentalCS"
          }
        },
        {
          $addFields: {
            casestudyID: {
              $ifNull: [
                { $arrayElemAt: ["$homeopathyCS._id", 0] },
                {
                  $ifNull: [
                    { $arrayElemAt: ["$aestheticCS._id", 0] },
                    { $arrayElemAt: ["$dentalCS._id", 0] }
                  ]
                }
              ]
            }
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
            casestudyID: "$casestudyID",
            appointmentFor: {
              $ifNull: ["$appointmentDetails.appointmentFor", null]
            },
            paymentFor: 1,
            payableAmount: 1,
            paymentType: "$paymentMethod",
            packageName: "$packageDetails.name",
            estimationId : { $ifNull: ["$est._id", null] },
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
 
async getDetailsForEstimation(estimationId) {
  try {
      console.log("Inside appointmentDA.getDetailsForEstimation, received estimationId:", estimationId);
  
      const estimationDetails = await estimationModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(estimationId)
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
            from: "advancepaymentsummary",
            localField: "patientId",
            foreignField: "patientId",
            as: "advancemoney"
          }
        },
        {
          $unwind: {
            path: "$advancemoney",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "branches", // or "branch" if that's your actual collection name
            localField: "patient.branchId",
            foreignField: "_id",
            as: "branch"
          }
        },
        {
          $unwind: {
            path: "$branch",
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
        },
        {
          $addFields: {
            doctorName: {
              $concat: ["$doctor.firstName", " ", "$doctor.lastName"]
            },
            patientName: {
              $concat: ["$patient.firstName", " ", "$patient.lastName"]
            },
            advanceMoney: "$advancemoney.remainingBalance",
            hcuraId:"$patient.hcuraId",
            phoneNumber:"$patient.phoneNumber",
             DoctorRegNo: "$doctor.registerationNumber",
             branchName: "$branch.branchName" 
          }
        },
        {
          $project: {
            doctor: 0,
            patient: 0,
            branch:0,
            advancemoney: 0
          }
        }
      ]);

      if (!estimationDetails.length) {
          throw new Error("Estimation not found or inactive.");
      }
      // Find the _id of PerformedEstimationSchema document
      const performedEstimation = await PerformedEstimationModel.findOne(
          { estimationId: new mongoose.Types.ObjectId(estimationId) },
          { _id: 1 } // Fetch only _id field
      );

      const performedEstimationId = performedEstimation ? performedEstimation._id : null;

      console.log("PerformedEstimation _id:", performedEstimationId);

      return { estimationDetails, performedEstimationId };

  } catch (error) {
      console.error("Error in appointmentDA.getDetailsForEstimation:", error);
      throw error;
  }
}
 
async getEstimationData(hcuraId, branchId, roleId, doctorId) {
  try {
      if (!roleId) {
          throw new Error("Role ID is required");
      }

      let roleDetails = await authentationDA.getroleCodeDA(roleId);
      if (!roleDetails) {
          throw new Error("Role details not found");
      }

      let estimationFilter = { isActive: true }; // Base filter for active estimations

      // 🔍 Step 1: Fetch Patient Data if hcuraId is provided
      let patientData = null;
      if (hcuraId) {
          patientData = await patientModel.findOne({ hcuraId });

          if (!patientData) {
              return { status: false, message: "Patient not found", data: null };
          }
      }

      // 🔍 Step 2: SUPER_ADMIN Case
      if (roleDetails.roleName === "SUPER_ADMIN") {
          console.log("Fetching estimations for SUPER_ADMIN");

          // If patient exists, filter by patientId
          if (patientData) {
              estimationFilter["patientId"] = patientData._id;
          }
      } else {
          // 🔍 Step 3: Non-SUPER_ADMIN Case
          console.log(`Fetching estimations for role: ${roleDetails.roleName}`);

          estimationFilter["branchId"] = new mongoose.Types.ObjectId(branchId);
          estimationFilter["doctorId"] = new mongoose.Types.ObjectId(doctorId);

          if (patientData) {
              estimationFilter["patientId"] = patientData._id;
          }
      }

      // 🔍 Step 4: Fetch Estimations
      const estimations = await estimationModel.find(estimationFilter);

      if (!estimations.length) {
          return { status: false, message: "No estimations found", data: null };
      }

      // 🔍 Step 5: Fetch latest payment details for patient (if exists)
      let latestPayment = null;
      if (patientData) {
          latestPayment = await advancePaymentModel
              .findOne({ patientId: patientData._id })
              .sort({ createdAt: -1 });
      }

      // 🔍 Step 6: Fetch doctor details for each estimation
      const estimationsWithDoctor = await Promise.all(
          estimations.map(async (estimation) => {
              const doctorDetails = await adminModel.findOne({ _id: estimation.doctorId });

              return {
                  ...estimation.toObject(),
                  doctorName: doctorDetails
                      ? `${doctorDetails.firstName} ${doctorDetails.lastName}`
                      : "Unknown"
              };
          })
      );

      return {
          status: true,
          message: "Estimation data retrieved successfully",
          data: {
              patient: patientData
                  ? {
                        name: `${patientData.firstName} ${patientData.lastName}`,
                        gender: patientData.gender,
                        dob: patientData.birthDate,
                        phone: patientData.phoneNumber,
                        email: patientData.emailId,
                        hcuraid: patientData.hcuraId
                    }
                  : null,
              doctorName:
                  estimationsWithDoctor.length > 0
                      ? estimationsWithDoctor[0].doctorName
                      : "Unknown",
              remainingBalance: latestPayment
                  ? latestPayment.remainingBalance
                  : null,
              estimationData: estimationsWithDoctor
          }
      };
  } catch (error) {
      console.error("Error in getEstimationData:", error);
      return { status: false, message: "Internal Server Error", error: error.message };
  }
}

async getPerformanceData(hcuraId, branchId, roleId) {
  try {
      if (!roleId) {
          throw new Error("Role ID is required");
      }

      let roleDetails = await authentationDA.getroleCodeDA(roleId);
      if (!roleDetails) {
          throw new Error("Role details not found");
      }

      // Step 1: Find patient by hcuraId
      let patientData = await patientModel.findOne({ hcuraId });

      if (!patientData) {
          return { status: false, message: "Patient not found", data: null };
      }

      // Step 2: Get _id of the patient
      let patientId = patientData._id;
      let performanceData = await PerformedEstimationModel.find({ patientId });
      // Step 3: Fetch performance data where patientId matches
      let doctorIds = performanceData.map((item) => item.doctorId);
 
      // Step 5: Fetch doctor details using doctorIds
      let doctorDetails = await adminModel.find({ _id: { $in: doctorIds } });

      // Step 6: Map doctor names to performance data
      let performanceWithDoctor = performanceData.map((item) => {
          let doctor = doctorDetails.find((doc) => doc._id.equals(item.doctorId));
          return {
              ...item.toObject(),
              doctorName: doctor ? `${doctor.firstName} ${doctor.lastName}` : "Unknown"
          };
      });
console.log("Performance Data:", performanceWithDoctor);
      if (!performanceData.length) {
          return { status: false, message: "No performance data found", data: null };
      }

      return {
          status: true,
          message: "Performance data retrieved successfully",
          data: performanceWithDoctor,
          patientName: `${patientData.firstName} ${patientData.lastName}`,
                        gender: patientData.gender,
                        dob: patientData.birthDate,
                        phone: patientData.phoneNumber,
                        email: patientData.emailId,
                        hcuraid: patientData.hcuraId,
      };
  } catch (error) {
      console.error("Error in getPerformanceData:", error);
      return { status: false, message: "Internal Server Error", error: error.message };
  }
}

async getParticularPerformanceData(performedId) {
  try {
      if (!performedId) {
          throw new Error("Performed ID is required");
      }

      // Fetch the performance record by _id (performedId)
      const performanceData = await PerformedEstimationModel.findById(performedId);
      let patientId = performanceData.patientId
      console.log("----------------------------------",patientId)

 
      const revenueData = await advancePaymentSummaryModel.findOne({ patientId: new mongoose.Types.ObjectId(patientId) });
      console.log(revenueData,"...................................................")
      if (!performanceData) {
          return { status: false, message: "No performance data found", data: null };
      }

      // Filter the months where performed = true and paid = false
      const filteredCategories = performanceData.categories.map(category => ({
          category: category.category,
          packageName: category.packageName,
          packageId: category.packageId,
          isGstApplicable: category.isGstApplicable,
          months: category.months.filter(month => month.performed === true && month.paid === false)
      })).filter(category => category.months.length > 0); // Remove categories with no valid months

      return {
          status: true,
          message: "Filtered performance data retrieved successfully",
          remainingBalance : revenueData ?revenueData.remainingBalance : null,
          doctorId: performanceData.doctorId,
          estimationId :performanceData.estimationId,
          performanceId : performanceData._id,
          patientId : performanceData.patientId,
          data: filteredCategories
        
      };

  } catch (error) {
      console.error("Error fetching getParticularPerformanceData:", error);
      return { status: false, message: "Internal Server Error", error: error.message };
  }
}
 
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

  // async getPromoListAsthetic() {
  //   try {
  //     return await promoCodesModel.aggregate([
  //       {
  //         $match: {
  //         isDeleted: false,
  //         promoCodeFor: "ASTHETIC",
  //           $expr: {
  //             $and: [
  //               { $gte: ["$expiredOn", new Date()] },
  //               { $lte: ["$startsOn", new Date()] }
  //             ]
  //           }
  //         },
  //       },
  //       {
  //         $project: {
  //           promoCodeName: 1,
  //           discount: 1,
  //           promoCodeFor: 1,
  //         },
  //       },
  //     ]);
  //   } catch (e) {
  //     throw e;
  //   }
  // };
async getPromoListAsthetic() {
  try {
    return await promoCodesModel.aggregate([
      {
        $match: {
          isDeleted: false,
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
}

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
  async getAllEstimations(page, branchId) {
    try {
      let matchStage = {};
      if (branchId) {
        matchStage.branchId = new mongoose.Types.ObjectId(branchId);
      }
  
      const apptList = await estimationModel.aggregate([
        {
          $match: matchStage
        },
        {
          $sort: { createdOn: -1 }
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
        },
        {
          $lookup: {
            from: "appointment",
            localField: "appointmentId",
            foreignField: "_id",
            as: "appointment"
          }
        },
        {
          $unwind: {
            path: "$appointment",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            _id: 1,
            appointmentFor: "$appointment.appointmentFor",
            appointmentDate: "$appointment.appointmentDate",
            appointmentNumber : "$appointment.appointmentNumber",
            estimationCreatedOn: "$createdOn",
            isActive: 1,
            patientId: "$patient._id",
            patientName: {
              $concat: ["$patient.firstName", " ", "$patient.lastName"]
            },
            patientHcuraId: "$patient.hcuraId",
            doctorId: "$doctor._id",
            doctorName: {
              $concat: ["$doctor.firstName", " ", "$doctor.lastName"]
            },
            doctorEmailId: "$doctor.emailId",
            doctorProfilePic: "$doctor.profilePic",
            branchId: 1,
            appointmentId: 1,
            createdBy: 1,
            homeopathy: 1,
            skin: 1,
            hair: 1,
            dental: 1,
          }
        }
      ]);
  
      const appCount = await estimationModel.countDocuments(matchStage);
  
      return { apptList, appCount };
    } catch (error) {
      throw error;
    }
  }
  
  
  // async getAllApptListForEstimation(obj, page,  searchKey,  branchId, roleId, doctorId){
  //   try{
  //     let match = { $regex: searchKey, $options: "i" };
 
  //     if (roleId) {
  //       let roleDetails = await authentationDA.getroleCodeDA(roleId);
  //     let estimationDetails = await authentationDA.getdoctorIdCodeDA(doctorId);
 
  //       if (roleDetails.roleName !== "SUPER_ADMIN") {
  //         obj["branchId"] = new mongoose.Types.ObjectId(branchId);
      
  //         if (roleDetails.roleName === "DOCTOR" && estimationDetails.doctorId == doctorId) {
  //           console.log("DoctorId from frontend:", doctorId);
           
  //           try {
  //               obj["doctorId"] = new mongoose.Types.ObjectId(doctorId); // Ensure correct format
  //               return { estimationDetails}
  //           } catch (error) {
  //               console.error("Invalid doctorId format:", error);
  //               return res.status(400).json({ message: "Invalid doctorId format" });
  //           }
  //       }
  //       }
  //     }
  //      // Fetch estimation details before aggregation
  //     //  let getEstimationdetails = await estimationModel.findOne({ doctorId }).select("_id");
  //     const apptList = await appointmentModel.aggregate([
  //       {
  //         $match: {
  //             ...obj, 
  //             ...(doctorId ? { doctorId: new mongoose.Types.ObjectId(doctorId) } : {}) // Convert to ObjectId
  //         }
  //     },
  //       {
  //           $sort: { appointmentDate: -1 }
  //       },
  //       {
  //           $lookup: {
  //               from: "admin",
  //               localField: "doctorId",
  //               foreignField: "_id",
  //               as: "doctor"
  //           }
  //       },
  //       {
  //           $unwind: {
  //               path: "$doctor",
  //               preserveNullAndEmptyArrays: true
  //           }
  //       },
  //       {
  //           $lookup: {
  //               from: "patient",
  //               localField: "patientId",
  //               foreignField: "_id",
  //               as: "patient"
  //           }
  //       },
  //       {
  //           $unwind: {
  //               path: "$patient",
  //               preserveNullAndEmptyArrays: true
  //           }
  //       },
  //       {
  //           $lookup: {
  //               from: "payment",
  //               localField: "paymentId",
  //               foreignField: "_id",
  //               as: "payment"
  //           }
  //       },
  //       {
  //           $unwind: {
  //               path: "$payment",
  //               preserveNullAndEmptyArrays: true
  //           }
  //       },
  //       // {
  //       //     $skip: parseInt(offset)
  //       // },
  //       // {
  //       //     $limit: parseInt(limit)
  //       // },
  //       {
  //           $project: {
  //               appointmentDate: 1,
  //               startTime: 1,
  //               createdOn: 1,
  //               appointmentStatus: 1,
  //               appointmentNumber: 1,
  //               appointmentId: 1,
  //               appointmentFor: { $ifNull: ["$appointmentFor", null] },
  //               doctorFirstName: "$doctor.firstName",
  //               doctorLastName: "$doctor.lastName",
  //               doctorEmailId: "$doctor.emailId",
  //               doctorProfilePic: "$doctor.profilePic",
  //               doctorId: "$doctor._id",
  //               doctorHcuraDoctorId: "$doctor.hcuraDoctorId",
  //               patientFirstName: "$patient.firstName",
  //               patientLastName: "$patient.lastName",
  //               patientHcuraId: "$patient.hcuraId",
  //               patientId: "$patient._id",
  //               paymentMethod: "$payment.paymentMethod",
  //               paymentCreatedDate: "$payment.paidOn",
  //               paymentPayableAmount: "$payment.payableAmount",
  //               paymentPaymentStatus: "$payment.paymentStatus",
  //               // estimationId : getEstimationdetails ? getEstimationdetails._id : null ,
  //               _id: "$_id"
  //           }
  //       },
  //       {
  //           $match: {
  //               $or: [
  //                   { appointmentNumber: match },
  //                   { doctorFirstName: match },
  //                   { doctorLastName: match },
  //                   { patientFirstName: match },
  //                   { patientLastName: match },
  //                   { patientHcuraId: match }
  //               ]
  //           }
  //       }
  //   ]);

  //     const appCount = await appointmentModel.find(obj).countDocuments();

  //     // const pageCount = Math.ceil(parseInt(appCount) / parseInt(limit));
  //     return { apptList, appCount };
  //   } catch(e){
  //     throw e
  //   }
  // };
 
async getAllApptListForEstimation(obj, page, searchKey, branchId, roleId, doctorId) {
  try {
    const match = { $regex: searchKey, $options: "i" };

    if (roleId) {
      const roleDetails = await authentationDA.getroleCodeDA(roleId);
      console.log("User Role:", roleDetails.roleName);

      if (roleDetails.roleName !== "SUPER_ADMIN") {
        if (branchId) {
          obj["branchId"] = new mongoose.Types.ObjectId(branchId);
          console.log("Branch ID filter applied:", obj["branchId"]);
        }

        // FIX: Use "DOCTORS" (plural) as per your role naming
        if (roleDetails.roleName === "DOCTORS") {
          if (doctorId) {
            try {
              const docObjectId = new mongoose.Types.ObjectId(doctorId);
              obj["doctorId"] = docObjectId;
              console.log("Doctor ID filter applied:", docObjectId);
            } catch (err) {
              console.error("Invalid doctorId provided:", doctorId);
              return { apptList: [], appCount: 0 };
            }
          } else {
            console.warn("Doctor role but no doctorId provided");
            return { apptList: [], appCount: 0 };
          }
        }
      } else {
        console.log("SUPER_ADMIN detected – skipping branch/doctor filtering");
      }
    }

    console.log("Final filter object for appointments:", JSON.stringify(obj));

    const apptList = await appointmentModel.aggregate([
      { $match: obj },
      { $sort: { appointmentDate: -1 } },
      {
        $lookup: {
          from: "admin",
          localField: "doctorId",
          foreignField: "_id",
          as: "doctor"
        }
      },
      { $unwind: { path: "$doctor", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "patient",
          localField: "patientId",
          foreignField: "_id",
          as: "patient"
        }
      },
      { $unwind: { path: "$patient", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "payment",
          localField: "paymentId",
          foreignField: "_id",
          as: "payment"
        }
      },
      { $unwind: { path: "$payment", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          appointmentDate: 1,
          startTime: 1,
          createdOn: 1,
          appointmentStatus: 1,
          appointmentNumber: 1,
          appointmentFor: { $ifNull: ["$appointmentFor", null] },
          doctorFirstName: "$doctor.firstName",
          doctorLastName: "$doctor.lastName",
          doctorEmailId: "$doctor.emailId",
          doctorId: "$doctor._id",
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
          ]
        }
      }
    ]);

    const appCount = await appointmentModel.countDocuments(obj);

    console.log("Total appointments returned:", apptList.length);
    return { apptList, appCount };

  } catch (error) {
    console.error("Error in getAllApptListForEstimation:", error);
    throw error;
  }
}


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
                   skinTotal: {
                    $sum: {
                      $cond: [{ $eq: ["$paymentFor", "SKIN"] }, "$total", 0]
                    }
                  },
                  hairTotal: {
                    $sum: {
                      $cond: [{ $eq: ["$paymentFor", "HAIR"] }, "$total", 0]
                    }
                  },
                   dentalTotal: {
                    $sum: {
                      $cond: [{ $eq: ["$paymentFor", "DENTAL"] }, "$total", 0]
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
      // const caseStudyDetails = await caseStudyModel.findOne({ appointmentId: new mongoose.Types.ObjectId(obj.appointmentId) });
      // if (caseStudyDetails) {
      //   return {
      //     message: "Details already exist with this user ID",
      //     data: caseStudyDetails
      // };
      // }
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
        // symptoms: obj.symptoms,
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
        // diagnosis: obj.diagnosis,
        // treatmentAdvice: obj.treatmentAdvice,
        // treatmentAdviceAmount: obj.treatmentAdviceAmount,
        // dietAdviceAndRegimen: obj.dietAdviceAndRegimen,
        // suggestion: obj.suggestion,
        followupSheets: obj.followupSheets,
        estimation : obj.estimation,
        
        curedCaseSummary: obj.curedCaseSummary,
        createdOn: createdOn
      });
      return await addCaseStudy.save();
    } catch (e) {
      throw e;
    }
  };
  // // update data to case study (PART-1)
 
  async updateCaseStudyDA(obj) {
    try {
      const updateFields = {
              updatedOn: new Date(),
              updatedBy: obj.updatedBy,
              bloodPressure: obj.bloodPressure,
              height: obj.height,
              weight: obj.weight,
              presentComplaint: obj.presentComplaint,
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
              
              // followupSheets: obj.followupSheets,
              estimation : obj.estimation,
              
              curedCaseSummary: obj.curedCaseSummary,
      };
  
       
    const updatedCaseStudy = await caseStudyModel.findByIdAndUpdate(
      obj.caseStudyId,
      { $set: updateFields },
      { new: true } // return the updated document
    );

      return updatedCaseStudy;
    } catch (e) {
      throw e;
    }
  }
  
 //Update Aesthetic casestudy

async updateAestheticCaseStudyDA(obj) {
  try {
    const updateFields = {
            updatedOn: new Date(),
            updatedBy: obj.updatedBy,
            bloodPressure: obj.bloodPressure,
            height: obj.height,
            weight: obj.weight,
            presentComplaint: obj.presentComplaint,
            pastHistory: obj.pastHistory,
            
            appetitte: obj.appetitte,
            stool: obj.stool,
            desire: obj.desire,
            urine: obj.urine,
            menstrualHistory : obj.menstrualHistory,
            thirst: obj.thirst,
            sleep: obj.sleep,
            thermal: obj.thermal,
             
            addiction: obj.addiction,
             
            
             suggestion: obj.suggestion,
            
            curedCaseSummary: obj.curedCaseSummary,
    };

     
  const updatedCaseStudy = await aestheticCaseStudyModel.findByIdAndUpdate(
    obj.caseStudyId,
    { $set: updateFields },
    { new: true } // return the updated document
  );

    return updatedCaseStudy;
  } catch (e) {
    throw e;
  }
}

// Update dental casestudy
    async updateDentalCaseStudyDA(obj) {
  try {
    const updateFields = {
            updatedOn: new Date(),
            updatedBy: obj.updatedBy,
            bloodDisorder:obj.bloodDisorder,
            heartDisease : obj.heartDisease,
            bloodPressure: obj.bloodPressure,
            diabetes: obj.diabetes,
            pregnancy: obj.pregnancy,
            presentComplaint: obj.presentComplaint,
            
            pastHistory: obj.pastHistory,
    
            anyAllergy : obj.anyAllergy,
            oralExamination: obj.oralExamination,
            radiologicalinvestigation: obj.radiologicalinvestigation,
            investigation: obj.investigation,
            diagnosis: obj.diagnosis,
            treatmentplan: obj.treatmentplan,
            poi: obj.poi,
            prescription: obj.prescription,
            treatmentSheet: obj.treatmentSheet,
    };
      const updatedCaseStudy = await dentalCaseStudyModel.findByIdAndUpdate(
        obj.caseStudyId,
        { $set: updateFields },
        { new: true } // return the updated document
      );

        return updatedCaseStudy;
      } catch (e) {
        throw e;
      }
    }
 
  // insert  Aesthetic data to case study (PART-1)
  async insertAestheticCaseStudyDA(obj){
    try {
      // const caseStudyDetails = await caseStudyModel.findOne({ patientId :new mongoose.Types.ObjectId(obj.patientId) });
      // const caseStudyDetails = await caseStudyModel.findOne({ appointmentId: new mongoose.Types.ObjectId(obj.appointmentId) });

      // if (caseStudyDetails) {
      //   return {
      //     message: "Details already exist with this user ID",
      //     data: caseStudyDetails
      // };
      // }
      let addCaseStudy = new aestheticCaseStudyModel({
        patientId: obj.patientId,
        appointmentId: obj.appointmentId,
        doctorId: obj.doctorId,
        createdBy: obj.createdBy,
        branchId:obj.branchId,
        bloodPressure: obj.bloodPressure,
        height: obj.height,
        weight: obj.weight,
        presentComplaint: obj.presentComplaint,
        
        pastHistory: obj.pastHistory,
        menstrualHistory : obj.menstrualHistory,
        appetitte: obj.appetitte,
        stool: obj.stool,
        desire: obj.desire,
        urine: obj.urine,
        aversion: obj.aversion,
        sweat: obj.sweat,
        thirst: obj.thirst,
        sleep: obj.sleep,
        thermal: obj.thermal,
         addiction: obj.addiction,
      
        suggestion : obj.suggestion,
        curedCaseSummary: obj.curedCaseSummary,
        createdOn: createdOn
      });
      return await addCaseStudy.save();
    } catch (e) {
      throw e;
    }
  };

  // insert  Aesthetic data to case study part--2
  async insertAestheticCaseStudySuggestionPrescription(data){
    try{
      let casestudySuggestionPrescription = new suggestionPrescriptionModel({
        patientId: data.patientId,
        appointmentId: data.appointmentId,
        doctorId: data.doctorId,
        createdBy: data.createdBy,
        branchId: data.branchId,
        remarks : data.remarks,
        curedCaseSummary: data.curedCaseSummary,
        createdOn: createdOn
      });
      return await casestudySuggestionPrescription.save();
    } catch(e){
      throw e;
    }
  };

    // insert  Dental data to case study  
    async insertDentalCaseStudyDA(obj){
      try {
        const caseStudyDetails = await caseStudyModel.findOne({ appointmentId: new mongoose.Types.ObjectId(obj.appointmentId) });
        if (caseStudyDetails) {
          return {
            message: "Details already exist with this user ID",
            data: caseStudyDetails
        };
        }
        let addCaseStudy = new dentalCaseStudyModel({
          patientId: obj.patientId,
          appointmentId: obj.appointmentId,
          doctorId: obj.doctorId,
          createdBy: obj.createdBy,
          branchId:obj.branchId,
          bloodPressure: obj.bloodPressure,
          diabetes: obj.diabetes,
          bloodDisorder:obj.bloodDisorder,
          heartDisease : obj.heartDisease,
          pregnancy: obj.pregnancy,
          presentComplaint: obj.presentComplaint,
          
          pastHistory: obj.pastHistory,
  
          anyAllergy : obj.anyAllergy,
          oralExamination: obj.oralExamination,
          radiologicalinvestigation: obj.radiologicalinvestigation,
          investigation: obj.investigation,
          diagnosis: obj.diagnosis,
          treatmentplan: obj.treatmentplan,
          poi: obj.poi,
          prescription: obj.prescription,
          treatmentSheet: obj.treatmentSheet,
          createdOn: createdOn
        });
        return await addCaseStudy.save();
      } catch (e) {
        throw e;
      }
    };
  
    // insert  Dental data to case study part--2
    async insertDentalCaseStudySuggestionPrescription(data){
      try{
        let casestudySuggestionPrescription = new suggestionPrescriptionModel({
          patientId: data.patientId,
          appointmentId: data.appointmentId,
          doctorId: data.doctorId,
          createdBy: data.createdBy,
          branchId: data.branchId,
          remarks : data.remarks,
          curedCaseSummary: data.curedCaseSummary,
          createdOn: createdOn
        });
        return await casestudySuggestionPrescription.save();
      } catch(e){
        throw e;
      }
    };
   
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
    try {
      const hcuraid = hcuraId.replace(/\s+/g, '').toUpperCase();
      const filter = {
        hcuraId: hcuraid,
        isDeleted: false,
      };
      let roleDetails = await authentationDA.getroleCodeDA(roleId);
      if (roleDetails.roleName !== "SUPER_ADMIN") {
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
         
        // 1. Lookup Homeopathy CaseStudy
        {
          $lookup: {
            from: "caseStudy",
            let: { pid: "$appointmentDetails.patientId", appId: "$appointmentDetails._id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$patientId", "$$pid"] },
                      { $eq: ["$appointmentId", "$$appId"] }
                    ]
                  }
                }
              },
              { $sort: { createdOn: -1 } },
              { $limit: 1 }
            ],
            as: "homeopathyCS"
          }
        },
        {
          $unwind: {
            path: "$homeopathyCS",
            preserveNullAndEmptyArrays: true
          }
        },
        // 2. Lookup Aesthetic CaseStudy
      {
        $lookup: {
          from: "caseStudyAesthetic",
          let: { pid: "$appointmentDetails.patientId", appId: "$appointmentDetails._id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$patientId", "$$pid"] },
                    { $eq: ["$appointmentId", "$$appId"] }
                  ]
                }
              }
            },
            { $sort: { createdOn: -1 } },
            { $limit: 1 }
          ],
          as: "aestheticCS"
        }
        },
        {
          $unwind: {
            path: "$aestheticCS",
            preserveNullAndEmptyArrays: true
          }
        },
        //3. Lookup Dental Casestudy
        {
          $lookup: {
            from: "caseStudyDental",
            let: { pid: "$appointmentDetails.patientId", appId: "$appointmentDetails._id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$patientId", "$$pid"] },
                      { $eq: ["$appointmentId", "$$appId"] }
                    ]
                  }
                }
              },
              { $sort: { createdOn: -1 } },
              { $limit: 1 }
            ],
            as: "dentalCS"
          }
        },
        {
          $unwind: {
            path: "$dentalCS",
            preserveNullAndEmptyArrays: true
          }
        },
        // 3. Use whichever is available as `casestudyDetails`
        {
          $addFields: {
            casestudyDetails: {
              $switch: {
                branches: [
                  {
                    case: { $gt: [{ $type: "$homeopathyCS" }, "missing"] },
                    then: "$homeopathyCS"
                  },
                  {
                    case: { $gt: [{ $type: "$aestheticCS" }, "missing"] },
                    then: "$aestheticCS"
                  },
                  {
                    case: { $gt: [{ $type: "$dentalCS" }, "missing"] },
                    then: "$dentalCS"
                  }
                ],
                default: null
              }
            }
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
            appointmentNumber: "$appointmentDetails.appointmentNumber",
            appointmentId: "$appointmentDetails._id",
            appointmentDate: "$appointmentDetails.appointmentDate",
            appointmentStatus: "$appointmentDetails.appointmentStatus",
            appointmentStartTime: "$appointmentDetails.startTime",
            docFirstName: "$doctorDetails.firstName",
            docLastName: "$doctorDetails.lastName",
            doctorId: "$doctorDetails._id",
             casestudyDetails: "$casestudyDetails",
            suggestionPrescription: "$suggestionPrescription",
            prescriptionDetails: "$prescriptionDetails",
            appointmentFor: { $ifNull: ["$appointmentDetails.appointmentFor", null] },
            patientId: "$appointmentDetails.patientId"
          }
        }
      ]);
    } catch (e) {
      throw e;
    }
  }
  
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

  async getCaseStudyAestheticDetails(caseStudyId){
    try {
      return await aestheticCaseStudyModel.findOne({ _id: new mongoose.Types.ObjectId(caseStudyId)});
    } catch (error) {
      throw error;
    }
  };
  async getCaseStudyDentalDetails(caseStudyId){
    try {
      return await dentalCaseStudyModel.findOne({ _id: new mongoose.Types.ObjectId(caseStudyId)});
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
            sessions :1,
            paymentFor: 1,
afterRemovingGST           : 1,
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
          $addFields: {
            ptFirstName: { $toLower: "$ptData.firstName" },
            ptLastName: { $toLower: "$ptData.lastName" },
            amount: { $toDouble: "$payableAmount" },
            hcuraId: "$ptData.hcuraId",
            paymentDoneDetails: "$paymentDoneDetails",
            docDetails: "$docDetails",
            branchDetails: "$branchDetails"
          },
        },
        {
          $match: {
            ...(data.status !== null && { paymentStatus: data.status }),
            // ...(data.type !== null && { paymentFor: data.type }),
            ...(data.type !== null && {
                paymentFor:
                  data.type === "ASTHETIC_GROUP"
                    ? { $in: ["ASTHETIC", "SKIN", "HAIR"] }
                    : data.type,
              }),

            ...(data.branchId !== null && { branchId: new mongoose.Types.ObjectId(data.branchId) }),
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
                  docSecondName: "$docDetails.lastName",
                  branchName: "$branchDetails.branchName"
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
          $addFields: {
            ptFirstName: { $toLower: "$ptData.firstName" },
            ptLastName: { $toLower: "$ptData.lastName" },
            amount: { $toDouble: "$payableAmount" },
            hcuraId: "$ptData.hcuraId",
            paymentDoneDetails: "$paymentDoneDetails",
            docDetails: "$docDetails",
            branchDetails: "$branchDetails"
          },
        },
        {
          $match: {
            ...(data.status !== null && { paymentStatus: data.status }),
            // ...(data.type !== null && { paymentFor: data.type }),
            ...(data.type !== null && {
                paymentFor:
                  data.type === "ASTHETIC_GROUP"
                    ? { $in: ["ASTHETIC", "SKIN", "HAIR"] }
                    : data.type,
              }),

            ...(data.branchId !== null && { branchId: new mongoose.Types.ObjectId(data.branchId) }),
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
                  discount: 1,
                  SGST: 1,
                  CGST: 1,
                  IGST: 1,
                  UGST: 1,
                  GSTAmount: 1,
                  afterRemovingGST: 1,
                  createdOn: 1,
                  ptEmail: "$ptData.emailId",
                  ptAddress: "$ptData.address",
                  stateName: "$ptData.stateName",
                  paymentDoneFirstName: "$paymentDoneDetails.firstName",
                  paymentDoneLastName: "$paymentDoneDetails.lastName",
                  docFirstName: "$docDetails.firstName",
                  docLastName: "$docDetails.lastName",
                  branchName: "$branchDetails.branchName"
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
          $addFields: {
            ptFirstName: { $toLower: "$ptData.firstName" },
            ptLastName: { $toLower: "$ptData.lastName" },
            amount: { $toDouble: "$payableAmount" },
            hcuraId: "$ptData.hcuraId",
            ptData: "$ptData",
            paymentDoneDetails: "$paymentDoneDetails",
            apptDetails: "$apptDetails",
            docDetails: "$docDetails",
            packageDetails: "$packageDetails",
            branchDetails: "$branchDetails"
          },
        },
        {
          $match: {
            ...(data.status !== null && { paymentStatus: data.status }),
            // ...(data.type !== null && { paymentFor: data.type }),
            ...(data.type !== null && {
                  paymentFor:
                    data.type === "ASTHETIC_GROUP"
                      ? { $in: ["ASTHETIC", "SKIN", "HAIR"] }
                      : data.type,
                }),

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
                  packageName: "$packageDetails.name",
                  branchName: "$branchDetails.branchName"
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

  async masterReportDownload(data) {
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
          $addFields: {
            ptFirstName: { $toLower: "$ptData.firstName" },
            ptLastName: { $toLower: "$ptData.lastName" },
            amount: { $toDouble: "$payableAmount" },
            hcuraId: "$ptData.hcuraId",
            ptData: "$ptData",
            paymentDoneDetails: "$paymentDoneDetails",
            apptDetails: "$apptDetails",
            docDetails: "$docDetails",
            packageDetails: "$packageDetails",
            branchDetails: "$branchDetails"
          },
        },
        {
          $match: {
            ...(data.status !== null && { paymentStatus: data.status }),
            // ...(data.type !== null && { paymentFor: data.type }),
            ...(data.type !== null && {
                paymentFor:
                  data.type === "ASTHETIC_GROUP"
                    ? { $in: ["ASTHETIC", "SKIN", "HAIR"] }
                    : data.type,
              }),

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
                  stateName: "$ptData.stateName",
                  paymentDoneFirstName: "$paymentDoneDetails.firstName",
                  paymentDoneLastName: "$paymentDoneDetails.lastName",
                  consultationType: "$apptDetails.consultationType",
                  apptDate: "apptDetails.startTime",
                  docFirstName: "$docDetails.firstName",
                  docLastName: "$docDetails.lastName",
                  packageAmount: "$packageDetails.amount",
                  packageName: "$packageDetails.name",
                  branchName: "$branchDetails.branchName"
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
      let result = await paymentModel.aggregate([
        {
          $match: filter
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
            from: "suggestionPrescription",
            localField: "appointmentId",
            foreignField: "appointmentId",
            as: "caseStudyDetails"
          }
        },
        {
          $lookup: {
            from: "prescription",
            localField: "appointmentId",
            foreignField: "appointmentId",
            as: "prescriptionDetails"
          }
        },
        {
          $project: {
            startTime: 1,
            appointmentNumber: "$apptDetails.appointmentNumber",
            hcuraId: "$ptDetails.hcuraId",
            ptFirstName: "$ptDetails.firstName",
            ptLastName: "$ptDetails.lastName",
            docFirstName: "$docDetails.firstName",
            docLastName: "$docDetails.lastName",
            paidOn: 1,
            payableAmount: 1,
            paymentFor: 1,
            branchName: "$branchDetails.branchName",
            caseStudyStatus: {
              $cond: {
                if: {
                  $eq: [{ $size: "$caseStudyDetails" }, 0]
                },
                then: "NotAvailable",
                else: "Available"
              }
            },
            prescriptionStatus: {
              $cond: {
                if: {
                  $eq: [{ $size: "$prescriptionDetails" }, 0]
                  },
                then: "NotAvailable",
                else: "Available"
              }
            }
          }
        },
        { $sort: { 
          paidOn: -1
          }
        } 
      ]);
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
                  stateName: 1,
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

  async patientReportDownload(data) {
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
            metadata: [{ $count: "total" }],
            data: [
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
          $lookup: {
            from: "branches",
            localField: "branchId",
            foreignField: "_id",
            as: "branchData"
          }
        },
        {
          $unwind: {
            path: "$branchData",
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
                  allegires: 1,
                  packageFor: 1,
                  branchName: "$branchData.branchName"
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

  async appointmentReportDowanload(data) {
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
          $lookup: {
            from: "branches",
            localField: "branchId",
            foreignField: "_id",
            as: "branchData"
          }
        },
        {
          $unwind: {
            path: "$branchData",
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
            metadata: [{ $count: "total" }],
            data: [
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
                  allegires: 1,
                  packageFor: 1,
                  branchName: "$branchData.branchName"
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

  async apptFormPtDetailsDA(body, newApptId, createdOn){
    try{
      let result = new bookApptFormModel({
        name: body.name,
        age: body.age,
        gender: body.gender,
        phoneNo: body.phoneNo,
        whatsAppNo: body.whatsAppNo,
        emailId: body.emailId,
        state: body.state,
        consultationType: body.consultationType,
        message: body.message,
        branch: body.branch,
        formId: newApptId,
        createdOn: createdOn,
        concern: body.concern
      });
    return await result.save();
    } catch(e) {
      throw e;
    }
  };

  async getApptId(){
    try{
      let result = await bookApptFormModel.aggregate([
        {
          '$project': {
          '_id': 0, 
          'formId': 1
          }
        }
      ]);
      return result;
    } catch(e){
      throw e;
    }
  };

  async webContactUsFormDA(body, newId, createdOn){
    try{
      let result = new contactUsModel({
        name: body.name,
        phoneNo: body.phoneNo,
        emailId: body.emailId,
        city: body.city,
        comment: body.comment,
        contactId: newId,
        createdOn: createdOn
      });
    return await result.save();
    } catch(e) {
      throw e;
    }
  };
  async getContactUsId(){
    try{
      let result = await contactUsModel.aggregate([
        {
          '$project': {
          '_id': 0, 
          'contactId': 1
          }
        }
      ]);
      return result;
    } catch(e){
      throw e;
    }
  };

  async webCorporateFormDA(body, newId, createdOn){
    try{
      let result = new corporateModel({
        name: body.name,
        workEmail: body.workEmail,
        phoneNo: body.phoneNo,
        companyName: body.companyName,
        companySize: body.companySize,
        prefferedDate: body.prefferedDate,
        street: body.street,
        city: body.city,
        state: body.state,
        zipcode: body.zipcode,
        corporateId: newId,
        createdOn: createdOn
      });
    return await result.save();
    } catch(e) {
      throw e;
    }
  };
  async getCorporateId(){
    try{
      let result = await corporateModel.aggregate([
        {
          '$project': {
          '_id': 0, 
          'corporateId': 1
          }
        }
      ]);
      return result;
    } catch(e){
      throw e;
    }
  };

  async webOfferFormDA(body, newId, createdOn){
    try{
      let result = new offerFormModel({
        name: body.name,
        emailId: body.emailId,
        phoneNo: body.phoneNo,
        state: body.state,
        couponCode: body.couponCode,
        offerId: newId,
        createdOn: createdOn
      });
    return await result.save();
    } catch(e) {
      throw e;
    }
  };
  async getOfferId(){
    try{
      let result = await offerFormModel.aggregate([
        {
          '$project': {
          '_id': 0, 
          'offerId': 1
          }
        }
      ]);
      return result;
    } catch(e){
      throw e;
    }
  };

  async homeCountDataDA(body){
    try{
      let createdOn = moment().format();
      let result = new homeCountModel({
        onlineConsultation: body.onlineConsultation,
        offlineConsultation: body.offlineConsultation,
        treatmentCompleted: body.treatmentCompleted,
        ongoingPatients: body.ongoingPatients,
        skinCured: body.skinCured,
        hairTreated: body.hairTreated,
        pcodTreated: body.pcodTreated,
        infertilityCured: body.infertilityCured,
        psoriasis: body.psoriasis,
        prp: body.prp,
        gfc: body.gfc,
        hydrafacial: body.hydrafacial,
        createdOn: createdOn
      });
    return await result.save();
    } catch(e) {
      throw e;
    }
  };

  async getHomeCountData() {
    try {
      return await homeCountModel
        .findOne({ isActive: true }) 
        .sort({ createdOn: -1 });
    } catch (e) {
      console.error("Error fetching home count data:", e);
      throw e; 
    }
  };    
  
}
module.exports = new appointmentDA();
