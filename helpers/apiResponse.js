class ServerErrors {}
class ServerSuccess {}
ServerErrors.error = {
  admin_already_exist : "Admin already exist with this username or emailid or phonenumber",
  phoneNumber_Exist: "Phone-number already exists",
  branchCode_not_exist: "Branch Code not avaliable",
//   invalid_otp: "Invalid-OTP",
  otp_expired: "OTP-Expired",
//   invalid_phoneNumber_Otp: "Phone-number OTP is Invalid",
  invalid_Otp: "OTP is Invalid",
  session_expired: "Session Expired",
//   user_not_exist: "User not exist. Please register yourself",
  user_not_exist_admin: "Username not exist",
//   user_already_exist: "User already exist with username or email id",
  password: "Password is incorrect",
//   user_blocked: "User blocked by admin please contact Administrator",
//   relative_limit: "Only five relative's allowed",
//   not_uploaded: "File not uploaded to S3",
//   files_to_upload: "Please select files to upload",
//   file_size: "File size must be less than 4 MB",
//   dependent_delete:
//     "You cant delete this dependent. Because this dependent having an appointment.",
//   medical_record_delete:
//     "you can't delete this medical record its already used in the appointment.",
//   aws_error: "AWS error,File is not deleted in AWS",
//   payout_error: "you have already accepted please contact admin",
//   email_id_error: "Email id already exists.",
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
