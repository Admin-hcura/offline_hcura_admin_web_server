const branchesModel = require("../../models/schema").branchesModel;
const roleModel = require("../../models/schema").roleModel;
const adminModel = require("../../models/schema").adminModel;
const patientModel = require("../../models/schema").patientModel;
const timeModel = require("../../models/schema").timeModel;
const dayModel = require("../../models/schema").dayModel;
const mongoose = require("mongoose");
const moment = require("moment-timezone");
const bcrypt = require("bcrypt");
const saltRounds = 10;

let mongDB = require("mongodb");
const { consulatationAmountModel, packageModel, paymentModel, tempAppointmentModel,
     promoCodesModel, 
     appointmentModel} = require("../../models/schema");


class authentationDA {
    async insertBranchDA(obj){
        try{
            let result = new branchesModel({
                branchCode: obj.branchCode,
                branchName: obj.branchName,
                createdOn: new Date(),
                location: obj.location,
                insertedBy: obj.insertedBy,
                stateId: obj.stateId,
                branchPhoneNumber: obj.branchPhoneNumber
            });
            return await result.save();
        } catch (e) {
            throw e;
        }
    };

    async insertRoleDA(obj){
        try{
            let result = new roleModel({
                roleName: obj.roleName,
                roleCode: obj.roleCode,
                createdOn: new Date(),
                insertedBy: obj.insertedBy
            });
            return await result.save();
        } catch (e) {
            throw e;
        }
    };

    async addAdminDA(obj){
        try{
            let pass = obj.password
            let password = await bcrypt.hash(pass, saltRounds);
            let result = new adminModel({
                firstName: obj.firstName,
                lastName: obj.lastName,
                username: obj.username,
                password: password,
                emailId: obj.emailId,
                phoneNumber: obj.phoneNumber,
                birthDate: obj.birthDate,
                roleId: obj.roleId,
                branchId: obj.branchId,
                EmpNumber: obj.EmpNumber,
                registerationNumber: obj.registerationNumber,
                registeredBy: obj.registeredBy,
                gender: obj.gender,
                qualifaction: obj.qualifaction,
                specilazation: obj.specilazation,
                experience: obj.experience
            });
            return await result.save();
        } catch(e) {
            throw e;
        }
    };

    async adminExistDA(email ,username, phoneNumber, EmpNumber){
        try{
            let result = await adminModel.findOne({
                $and: [
                    { $or: [{ email: email }, { username: username }, { phoneNumber: phoneNumber }, {EmpNumber: EmpNumber}] },
                    { isDeleted: false }
                  ]
            });
            return result;
        } catch(e){
            throw e;
        }
    };

    async adminIsExistDA(username){
        try{
            let result = await adminModel.findOne({
                $and: [
                    { $or: [{ username: username }] },
                    { isDeleted: false }
                  ]
            });
            return result;
        } catch(e){
            throw e;
        }
    };

    async adminPasswordDA(password, dbPassword){
        try {
            let passwordCheck = await bcrypt.compare(password, dbPassword);
            return passwordCheck;
          } catch (e) {
            throw e;
          }
    };

    async updateAdminFcmTokenDA(id, token){
        try {
            return await adminModel.updateOne(
              { _id: id },
              { $set: { fcmToken: token } }
            );
          } catch (e) {
            throw e;
          }
    };

    async updatePasswordDA(data){
        try {
            let password = await bcrypt.hash(data.password, saltRounds);
            return await adminModel.updateOne(
              { _id: data.userId },
              { $set: { password: password } }
            );
          } catch (e) {
            throw e;
          }
    };

    async branchListDA(){
        try{
            let result = await branchesModel.find({ isDeleted: false, isLocked: "ENABLED" })
            return result;
        } catch (e){
            throw e;
        }
    };

    async roleListDA(){
        try{
            let result = await roleModel.find({ isDeleted: false, isLocked: "ENABLED"})
            return result;
        } catch (e){
            throw e;
        }
    };

    async patientExistDA(phoneNumber){
        try{
            let result = await patientModel.findOne({ phoneNumber: phoneNumber});
            return result;
        } catch(e) {
            throw e;
        }
    };

    async getHcuraIdDA(){
        try{
            let result = await patientModel.aggregate([
                {
                  '$project': {
                    '_id': 0, 
                    'hcuraId': 1
                  }
                }
              ]
            );
            return result;
        } catch (e) {
            throw e;
        }
    };

    async getHcuraTIdDA(){
        try{
            let result = await tempAppointmentModel.aggregate([
                {
                  '$project': {
                    '_id': 0, 
                    'hcuraTId': 1
                  }
                }
              ]
            );
            return result;
        } catch (e) {
            throw e;
        }
    };

    async getBrachDetailsDA(branchId){
        try{
            let result = await branchesModel.findOne({ _id : branchId});
            return result;
        } catch (e){
            throw e;
        }
    };

    async patientRegDA(
        hcuraId,
        branchId,
        firstName,
        lastName, 
        birthDate,
        gender,
        emailId,
        phoneNumber,
        whatsappNumber,
        stateName,
        bloodGroup,
        address,
        registeredBy,
        source,
        occupation,
        stateId
    ){
        try{
            let result = new patientModel({
                hcuraId: hcuraId,
                branchId: branchId,
                firstName: firstName,
                lastName: lastName,
                birthDate: birthDate,
                gender: gender,
                emailId: emailId,
                phoneNumber: phoneNumber,
                whatsappNumber: whatsappNumber,
                stateId: stateId,
                stateName: stateName,
                bloodGroup: bloodGroup,
                address: address,
                registeredBy: registeredBy,
                source: source,
                occupation: occupation,
            });
            return await result.save();
        } catch(e){
            throw e;
        }
    };

    async getroleCodeDA(roleId){
        try{
            let result = await roleModel.findOne({ _id : roleId});
            return result;
        } catch(e){
            throw e;
        }
    };

    async adminLogoutDA(userId){
        try{
            return await adminModel.updateOne(
                { _id: userId },
                { $set: { fcmToken: "" } }
              );
        } catch(e){
            throw e;
        }
    };

    async insertTime(body){
        try{
            let result = new timeModel({
                slots: body.slots,
            });
            return await result.save();
        } catch(e){
            throw e;
        }
    };

    async insertDay(body){
        try{
            let result = new dayModel({
                day: body.day
            });
            return await result.save();
        } catch(e){
            throw(e);
        }
    };

    async insertAmountDA(body){
        try{
            let result = new consulatationAmountModel({
                type: body.type,
                amount: body.amount,
            });
            return await result.save();
        } catch(e){
            throw(e);
        }
    };

    async insertPackage(body){
        try{
            console.log("=============",body);
            let result = new packageModel({
                name: body.name,
                packageFor: body.packageFor,
                months: body.months,
                amount: body.amount,
                installments: body.installments,
                createdBy: body.createdBy
            });
            return await result.save();
        } catch(e){
            throw e;
        }
    };

    async offlineGetStatusDA(relationId) {
        try {
          return await paymentModel.findOne({paymentRelationId : relationId , isDeleted: false});
        } catch (e) {
          throw e;
        }
    };

    async getPaymentStatus(paymentId) {
        try {
          return await paymentModel.findOne({_id : paymentId , isDeleted: false} ,
          {paymentStatus : 1 ,paymentMethod : 1});
        } catch (e) {
          throw e;
        }
    };

    async addpromoCodes(promoCodes){
        try{
            let result = new promoCodesModel({
                promoCodeName: promoCodes.promoCodeName,
                promoCodeFor: promoCodes.promoCodeFor,
                discount: promoCodes.discount,
                promoCodeFor: promoCodes.promoCodeFor,
                startsOn: promoCodes.startsOn,
                expiredOn: promoCodes.expiredOn
            });
            return await result.save();
        } catch(e){
            throw e;
        }
    };

    async getRoleDetils(roleId){
        try{
            return await roleModel.findOne({_id: roleId, isLocked: "ENABLED"});
        } catch(e){
            throw e;
        }
    };

    async getPackageDetailsApptId(appointmentId){
        try{
            return await appointmentModel.aggregate(
                [
                    {
                      $match: {
                        _id: appointmentId,
                        isActive: true
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
                      $project: {
                        packageName: "$packageDetails.name",
                        packageAmount: "$packageDetails.amount",
                        packageId: "$packageDetails._id",
                        months: "$packageDetails.months"
                      }
                    }
                  ]
            );
        } catch(e){
            throw e;
        }
    }

}

module.exports = new authentationDA();
