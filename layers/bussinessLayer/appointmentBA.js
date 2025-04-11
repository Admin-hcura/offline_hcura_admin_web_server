const appointmentDAObj = require("../dataLayer/appointmentDA");

class appointmentBA {
    async bookedDetailsBA(data, hcuraTId) {
        return await appointmentDAObj.bookedDetails(data, hcuraTId);
    };

    async getDoctorDetailsBA(doctorId) {
        return await appointmentDAObj.getDoctorDetails(doctorId);
    };

    async getuserInfoWithpaymentRelationIdBA(relationId) {
        return await appointmentDAObj.getuserInfoWithpaymentRelationId(relationId);
    };

    async updatePaymentReportBA(relationId) {
        return await appointmentDAObj.updatePaymentReport(relationId);
    };

    async getAppointmentDetailsBA(appointmentId) {
        return await appointmentDAObj.getAppointmentDetails(appointmentId);
    };

    async branchCodeBA(branchId) {
        return await appointmentDAObj.branchCode(branchId);
    };

    async getAmountBA(consultationType) {
        return await appointmentDAObj.getAmount(consultationType);
    };

    async insertPackageSchedulesBA(packageSchedules) {
        return await appointmentDAObj.insertPackageSchedules(packageSchedules);
    };

}
module.exports = new appointmentBA();