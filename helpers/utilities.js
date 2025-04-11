let sha1 = require("sha1");

exports.encryptSession = async (session) => {
  return await sha1(session);
};
exports.generateAndGetOTP = function (length) {
  let generatedCode = Math.floor(
    Math.pow(10, length - 1) +
    Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
  if (generatedCode !== undefined) {
    return generatedCode;
  } else {
    return null;
  }
};