
const branchesModel = require("../../models/schema").branchesModel;
const roleModel = require("../../models/schema").roleModel;
const adminModel = require("../../models/schema").adminModel;
const patientModel = require("../../models/schema").patientModel;
const mongoose = require("mongoose");
const moment = require("moment-timezone");
const bcrypt = require("bcrypt");
const saltRounds = 10;

let mongDB = require("mongodb");


class authentationDA {
    async insertBranchDA(obj){
        try{
            let result = new branchesModel({
                branchCode: obj.branchCode,
                branchName: obj.branchName,
                createdOn: new Date(),
                location: obj.location,
                insertedBy: obj.insertedBy
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
                registeredBy: obj.registeredBy,
                gender: obj.gender
            });
            return await result.save();
        } catch(e) {
            throw e;
        }
    };

    async adminExistDA(email ,username ,phoneNumber){
        try{
            let result = await adminModel.findOne({
                $and: [
                    { $or: [{ email: email }, { username: username }, { phoneNumber: phoneNumber }] },
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
            )
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
        alternativeNumber,
        bloodGroup,
        address,
        registeredBy,
        source,
        occupation
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
                alternativeNumber: alternativeNumber,
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

}

module.exports = new authentationDA();
