const authentationDAObj = require("../dataLayer/authentationDA");

class authenticationBA {
    async insertBranchBA(body) {
        return await authentationDAObj.insertBranchDA(body);
    };

    async insertRoleBA(body) {
        return await authentationDAObj.insertRoleDA(body);
    }; 

    async adminExistBA(email ,username, phoneNumber, EmpNumber) {
        return await authentationDAObj.adminExistDA(email ,username, phoneNumber, EmpNumber);
    };

    async addAdminBA(data) {
        return await authentationDAObj.addAdminDA(data);
    };

    async adminIsExistBA(username) {
        return await authentationDAObj.adminIsExistDA(username);
    };

    async getroleCodeBA(roleId) {
        return await authentationDAObj.getroleCodeDA(roleId);
    };

    async adminPasswordBA(password, resPassword) {
        return await authentationDAObj.adminPasswordDA(password, resPassword);
    };

    async updatePasswordBA(data) {
        return await authentationDAObj.updatePasswordDA(data);
    };

    async getBrachDetailsBA(branchId) {
        return await authentationDAObj.getBrachDetailsDA(branchId);
    };

    async getHcuraIdBA() {
        return await authentationDAObj.getHcuraIdDA();
    };

    async patientRegBA(
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
    ) {
        return await authentationDAObj.patientRegDA(
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
        );
    };

    async getBrachDetailsBA(branchId) {
        return await authentationDAObj.getBrachDetailsDA(branchId);
    };

    async getHcuraTIdBA() {
        return await authentationDAObj.getHcuraTIdDA();
    };

    async branchListBA() {
        return await authentationDAObj.branchListDA();
    };

    async roleListBA() {
        return await authentationDAObj.roleListDA();
    };

    async insertTimeBA() {
        return await authentationDAObj.insertTimeDA();
    };

    async insertDayBA() {
        return await authentationDAObj.insertDayDA();
    };

    async insertAmountBA(data) {
        return await authentationDAObj.insertAmountDA(data);
    };

    async insertPackageBA(data) {
        return await authentationDAObj.insertPackageDA(data);
    };

    async addPromoCodesBA(data) {
        return await authentationDAObj.addPromoCodesDA(data);
    };

    async offlineGetStatusBA(relationId) {
        return await authentationDAObj.offlineGetStatusDA(relationId);
    };

    async getBrachDetailsBA(branchId) {
        return await authentationDAObj.getBrachDetailsDA(branchId);
    };

    async getBrachDetailsBA(paymentId) {
        return await authentationDAObj.getBrachDetailsDA(paymentId);
    };

    async getPaymentStatusBA(paymentId) {
        return await authentationDAObj.getPaymentStatusDA(paymentId);
    };

    async getRoleDetilsBA(roleId) {
        return await authentationDAObj.getRoleDetils(roleId);
    };

    async updateAdminFcmTokenBA(_id, sessionId) {
        return await authentationDAObj.updateAdminFcmTokenDA(_id, sessionId);
    };

    async adminLogoutBA(patientId) {
        return await authentationDAObj.adminLogoutDA(patientId);
    };

    async getPackageDetailsApptIdBA(appointmentId) {
        return await authentationDAObj.getPackageDetailsApptId(appointmentId);
    };

}
module.exports = new authenticationBA();