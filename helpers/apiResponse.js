class ServerErrors {}
class ServerSuccess {}
ServerErrors.error = {
  admin_already_exist : "Admin already exist with this username or emailid or phonenumber or EmpNumber",
  phoneNumber_Exist: "Phone-number already exists",
  branchCode_not_exist: "Branch Code not avaliable",
  illegial: "Payment Missmatch please contact Admin",
  otp_expired: "OTP-Expired",
  invalid_Otp: "OTP is Invalid",
  session_expired: "Session Expired",
  user_not_exist_admin: "Username not exist",
  password: "Password is incorrect",
  branches_not_found: "Branches not found", 
  role_not_found: "Role not found"
};
ServerSuccess.Codes = {
  SUCCESS: { status: true, success_code: 200, success_message: "SUCCESS" },
  otp_message: {
    status: true,
    success_code: 200,
    success_message: "Both OTP is correct please click Verify & Processed",
  },
};

module.exports = { ServerErrors, ServerSuccess };
