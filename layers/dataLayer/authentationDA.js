
const branchesModel = require("../../models/schema").branchesModel;
const roleModel = require("../../models/schema").roleModel;
const adminModel = require("../../models/schema").adminModel;
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
                location: obj.location
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
                createdOn: new Date()
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
                branchId: obj.branchId
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
}

module.exports = new authentationDA();
