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

    async getAppointmentNumberBA() {
        return await appointmentDAObj.getAppointmentNumber();
    };

    async patientDetaiilsBA(patientId) {
        return await appointmentDAObj.patientDetaiils(patientId);
    };

    async createAppointmentBA(data) {
        return await appointmentDAObj.createAppointment(data);
    };

    async getLatestApptBA(patientId) {
        return await appointmentDAObj.getLatestAppt(patientId);
    };

    async updateFollowupIdBA(patientId, _id) {
        return await appointmentDAObj.updateFollowupId(patientId, _id);
    };

    async blockSlotBA(data) {
        return await appointmentDAObj.blockSlot(data);
    };

    async updateOldApptBA(data) {
        return await appointmentDAObj.updateOldAppt(data);
    };

    async rescheduleAppointmentBA(data) {
        return await appointmentDAObj.rescheduleAppointment(data);
    };

    async getApptDetailsBA(appointmentId) {
        return await appointmentDAObj.getApptDetails(appointmentId);
    };

    async getConsultationGSTBA(stateId) {
        return await appointmentDAObj.getConsultationGST(stateId);
    };

    async getPromoCodeListBA(promoCodes) {
        return await appointmentDAObj.getPromoCodeList(promoCodes);
    };

    async addPaymentInfoBA(data) {
        return await appointmentDAObj.addPaymentInfo(data);
    };

    async confirmAppointmentBA(apptId, paymentId) {
        return await appointmentDAObj.confirmAppointment(apptId, paymentId);
    };

    async updatePaymentReportDABA(data) {
        return await appointmentDAObj.updatePaymentReportDA(data);
    };

    async updatePaymentDetailsAppointmentBA(apptId, paymentId) {
        return await appointmentDAObj.updatePaymentDetailsAppointment(apptId, paymentId);
    };

    async getPatientListBA(type, page, limit, search, roleId, branchId) {
        return await appointmentDAObj.getPatientList(type, page, limit, search, roleId, branchId);
    };

    async getpatientDetailsBA(hcuraId) {
        return await appointmentDAObj.getpatientDetailsDA(hcuraId);
    };

    async insertOccuptionBA(data) {
        return await appointmentDAObj.insertOccuption(data);
    };

    async insertSourceBA(data) {
        return await appointmentDAObj.insertSource(data);
    };

    async insertStatesBA(data) {
        return await appointmentDAObj.insertStates(data);
    };

    async getSourceOccuptionListBA() {
        return await appointmentDAObj.getSourceOccuptionList();
    };

    async getStateListBA() {
        return await appointmentDAObj.getStateList();
    };

    async insertSymptomsAllergiesBA(data) {
        return await appointmentDAObj.insertSymptomsAllergiesDA(data);
    };

    async getSymptomsAllegiresListBA() {
        return await appointmentDAObj.getSymptomsAllegiresList();
    };

    async getDoctorsListBA() {
        return await appointmentDAObj.getDoctorsList();
    };

    async getPromoListConsultationBA() {
        return await appointmentDAObj.getPromoListConsultation();
    };

    async getAppointmentDetailsPaymentDetailsBA(hcuraId, roleId, branchId) {
        return await appointmentDAObj.getAppointmentDetailsPaymentDetails(hcuraId, roleId, branchId);
    };

    async getAppointmentPaymentDetailsBA(appointmentId) {
        return await appointmentDAObj.getAppointmentPaymentDetails(appointmentId);
    };

    async validatePromoCodeBA(promoCode) {
        return await appointmentDAObj.validatePromoCode(promoCode);
    };

    async getRemainingSlotsAndTimingsBA(doctorId, selectedDate) {
        return await appointmentDAObj.getRemainingSlotsAndTimings(doctorId, selectedDate);
    };

    async getpackageListBA() {
        return await appointmentDAObj.getpackageList();
    };

    async getAstheticListBA() {
        return await appointmentDAObj.getAstheticList();
    };

    async getPackageDetailsBA(packageId) {
        return await appointmentDAObj.getPackageDetails(packageId);
    };

    async updatePackageDetailsInApptBA(appointmentId, paymentId, packageId) {
        return await appointmentDAObj.updatePackageDetailsInAppt(appointmentId, paymentId, packageId);
    };

    async addPackagePaymentInfoBA(data) {
        return await appointmentDAObj.addPackagePaymentInfo(data);
    };

    async updatePaymentByPaymentIdBA(data) {
        return await appointmentDAObj.updatePaymentByPaymentIdBA(data);
    };

    async updateAstheticPackageDetailsInApptBA(appointmentId, paymentId, packageId) {
        return await appointmentDAObj.updateAstheticPackageDetailsInAppt(appointmentId, paymentId, packageId);
    };

    async createEstimationBA(data) {
        return await appointmentDAObj.createEstimation(data);
    };

    async getPatientDetailsPackagePaymentsBA(hcuraId, roleId, branchId) {
        return await appointmentDAObj.getPatientDetailsPackagePayments(hcuraId, roleId, branchId);
    };

    async getPaymentDetailsByAppointmentIdBA(appointmentId) {
        return await appointmentDAObj.getPaymentDetailsByAppointmentId(appointmentId);
    };

    async getPatientAndPaymentDetailsForExternalBA(hcuraId, roleId, branchId) {
        return await appointmentDAObj.getPatientAndPaymentDetailsForExternal(hcuraId, roleId, branchId);
    };

    async addExternalSourcePaymentInfoBA(data, paymentObj) {
        return await appointmentDAObj.addExternalSourcePaymentInfo(data, paymentObj);
    };

    async getPromoListPackageBA() {
        return await appointmentDAObj.getPromoListPackage();
    };

    async getPromoListAstheticBA() {
        return await appointmentDAObj.getPromoListAsthetic();
    };

    async dashboardAllPtDetailsBA(data) {
        return await appointmentDAObj.dashboardAllPtDetailsDA(data);
    };

    async dashboardPtDetailsBA(data) {
        return await appointmentDAObj.dashboardPtDetailsDA(data);
    };

    async getAllApptListBA(obj, page, limit, searchKey, fromDate, toDate, branchId, roleId) {
        return await appointmentDAObj.getAllApptList(obj, page, limit, searchKey, fromDate, toDate, branchId, roleId);
    };

    async updateAppointmentStatusBA(data) {
        return await appointmentDAObj.updateAppointmentStatus(data);
    };

    async getStateDetailsBA(branchId) {
        return await appointmentDAObj.getStateDetails(branchId);
    };

    async getDashboardAptCountBA(data) {
        return await appointmentDAObj.getDashboardAptCount(data);
    };

    async getDashboardRevenueCountBA(data) {
        return await appointmentDAObj.getDashboardRevenueCount(data);
    };

    async getPatientListTempBA(type, page, limit, search, roleId, branchId) {
        return await appointmentDAObj.getPatientListTemp(type, page, limit, search, roleId, branchId);
    };

    async changeisActiveStatusTempBA(data) {
        return await appointmentDAObj.changeisActiveStatusTemp(data);
    };

    async insertCaseStudyBA(data) {
        return await appointmentDAObj.insertCaseStudyDA(data);
    };

    async insertCaseStudySuggestionPrescriptionBA(data) {
        return await appointmentDAObj.insertCaseStudySuggestionPrescription(data);
    };

    async insertPrescriptionBA(data) {
        return await appointmentDAObj.insertPrescription(data);
    };

    async getPatientDetailsCaseStudyBA(hcuraId, roleId, branchId) {
        return await appointmentDAObj.getPatientDetailsCaseStudy(hcuraId, roleId, branchId);
    };

    async updateSuggestionPrescriptionBA(data) {
        return await appointmentDAObj.updateSuggestionPrescription(data);
    };

    async getCaseStudyDetailsBA(caseStudyId) {
        return await appointmentDAObj.getCaseStudyDetails(caseStudyId);
    };

    async updatePrescriptionBA(data) {
        return await appointmentDAObj.updatePrescription(data);
    };

    async getPrescriptionDetailsBA(prescriptionId) {
        return await appointmentDAObj.getPrescriptionDetails(prescriptionId);
    };

    async getDoctorListBA(branchId, roleId) {
        return await appointmentDAObj.getDoctorList(branchId, roleId);
    };

    async getPackageScheduleDetailsBA(patientId) {
        return await appointmentDAObj.getPackageScheduleDetails(patientId);
    };

    async getSuggestionPrescriptionDetailsBA(appointmentId) {
        return await appointmentDAObj.getSuggestionPrescriptionDetails(appointmentId);
    };

    async getPaymentDetailsBA(paymentId) {
        return await appointmentDAObj.getPaymentDetails(paymentId);
    };

    async getAppointmentDataForPrescriptionBA(appointmentId, patientId) {
        return await appointmentDAObj.getAppointmentDataForPrescriptionDA(appointmentId, patientId);
    };

    async getTransactionReportBA(data) {
        return await appointmentDAObj.getTransactionReport(data);
    };

    async transactionReportDownloadBA(data) {
        return await appointmentDAObj.transactionReportDownload(data);
    };

    async masterReportBA(data) {
        return await appointmentDAObj.masterReport(data);
    };

    async masterReportDownloadBA(data) {
        return await appointmentDAObj.masterReportDownload(data);
    };

    async statusCaseStudyBA(data) {
        return await appointmentDAObj.statusCaseStudy(data);
    };

    async getApptListDocsBA(page, limit, searchKey, fromDate, toDate, docId, roleId) {
        return await appointmentDAObj.getApptListDocs(page, limit, searchKey, fromDate, toDate, docId, roleId);
    };

    async patientReportBA(data) {
        return await appointmentDAObj.patientReport(data);
    };

    async patientReportDownloadBA(data) {
        return await appointmentDAObj.patientReportDownload(data);
    };

    async appointmentReportBA(data) {
        return await appointmentDAObj.appointmentReport(data);
    };

    async appointmentReportDowanloadBA(data) {
        return await appointmentDAObj.appointmentReportDowanload(data);
    };

    async apptFormPtDetailsBA(data, newApptId, createdOn) {
        return await appointmentDAObj.apptFormPtDetailsDA(data, newApptId, createdOn);
    };

    async webContactUsFormBA(data) {
        return await appointmentDAObj.webContactUsFormDA(data);
    };

    async getCorporateIdBA() {
        return await appointmentDAObj.getCorporateId();
    };

    async webCorporateFormBA(body, newId, createdOn) {
        return await appointmentDAObj.webCorporateFormDA(body, newId, createdOn);
    };

    async getOfferIdBA() {
        return await appointmentDAObj.getOfferId();
    };

    async webOfferFormBA(body, newId, createdOn) {
        return await appointmentDAObj.webOfferFormDA(body, newId, createdOn);
    };

    async homeCountDataBA(data) {
        return await appointmentDAObj.homeCountDataDA(data);
    };

    async getHomeCountDataBA() {
        return await appointmentDAObj.getHomeCountData();
    };
    
    async getContactUsIdBA() {
        return await appointmentDAObj.getContactUsId();
    };

    async getApptIdBA() {
        return await appointmentDAObj.getApptId();
    };

}
module.exports = new appointmentBA();