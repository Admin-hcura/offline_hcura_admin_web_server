const { number, required } = require("joi");

(function(){
  const mongoose = require("mongoose");
//   mongoose.set("useCreateIndex", true);
  const schema = mongoose.Schema;
  const moment = require("moment-timezone");
  var mongooseIncrement = require("mongoose-increment");
  var increment = mongooseIncrement(mongoose);


  let branches = new schema ({
    branchCode: {type: String, required: true,unique: true },
    branchName: {type: String, required: true,unique: true },
    createdOn: {type: Date, default: new Date()},
    location: {type: String, required: true},
    isDeleted: {type: Boolean, default: false },
    isLocked: {
        type: String,
        enum: ["ENABLED", "DISABLED"],
        default: "ENABLED",
      },
    insertedBy: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true},
  });

  let role = new schema ({
    roleName: {type: String, required: true, unique: true },
    roleCode: {type: String, required: true,unique: true },
    createdOn: {type: Date, default: new Date()},
    isDeleted: {type: Boolean, default: false },
    isLocked: {
        type: String,
        enum: ["ENABLED", "DISABLED"],
        default: "ENABLED",
      },
    insertedBy: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true},
  });

  let admin = new schema ({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    emailId: {type: String, required: true, unique: true},
    phoneNumber: {type: String, required: true, unique: true},
    birthDate: {type: Date, required: true},
    fcmToken: {type: String, default: null},
    createdOn: {type: Date, default: new Date()},
    isDeleted: {type: Boolean, default: false},
    isLocked: {
        type: String,
        enum: ["ENABLED", "DISABLED"],
        default: "ENABLED",
      },
    roleId: {type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true},
    branchId: {type: mongoose.Schema.Types.ObjectId, ref: "Branches", required: true},
    lockedBy: {type: mongoose.Schema.Types.ObjectId, default: null, ref: "Admin"},
    remarks: {type: String, default: null},
    gender: {type: String, enum: ["Male", "Female", "Others"], required: true },
  });

  let patient = new schema ({
    hcuraId: {type: String, required: true},
    branchId: {type: mongoose.Schema.Types.ObjectId, ref: "Branches", required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    birthDate : {type: Date, required: true },
    gender: {type: String, enum: ["Male", "Female", "Others"], required: true },
    emailId: {type:String, required: true},
    phoneNumber: {type: Number, required: true},
    alternativeNumber: {type: Number, default: null},
    bloodGroup: {type: String, default: null},
    address: {
        houseNo: {type: String, default: null},
        street: {type: String, default: null},
        city: {type: String, default: null},
        state: {type: String, default: null},
        pinCode: {type: Number, default: null},
    },
    consultationType: {type: String, required: true, default: "OFFLINE", enum: ["OFFLINE", "ONLINE"]},
    registeredBy: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Admin"},
    registeredOn: {type: Date, default: new Date()},
    source: {type: String, default: null},
    occupation: {type: String, default: null},
    lockedBy: {type: mongoose.Schema.Types.ObjectId, default: null, ref: "Admin"},
    lockedOn: {type: Date, default: null},
    isDeleted: {type: Boolean, default: false},
    deletedOn: {type: Date, default: null},
    registeredBy: {type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true},
  });

  exports.branchesModel = mongoose.model("Branches", branches, "branches");
  exports.roleModel = mongoose.model("Role", role, "role");
  exports.adminModel = mongoose.model("Admin", admin, "admin");
  exports.patientModel = mongoose.model("Patient", patient, "patient");

}.call(this))