const moment = require("moment-timezone");
const appointmentDA = require("../layers/dataLayer/appointmentDA")


class invoiceGenerator {
    async generateInvoiceNumber(branchcode) {
      try {
        let lastAppData = await appointmentDA.getLastInvoiceNo(branchcode);
        console.log("......lastAppData......",lastAppData);
        const oldInvoice = lastAppData.length > 0
              ? lastAppData.reduce((max, item) => item.invoiceNumber > max ? item.invoiceNumber : max, -Infinity) : null;
          console.log("......oldInvoice......",oldInvoice);
        if (oldInvoice) {
            let invNo = parseInt(oldInvoice);
            let newNo = invNo + 1;
          console.log("......3333333333......");
          if (newNo > 9) {
            return `${branchcode}/${newNo}/${moment().format("DD")}/${moment().format(
              "MMM"
            )}/${moment().format("YYYY")}-SAC999319`;
          } else {
            return `${branchcode}/0${newNo}/${moment().format("DD")}/${moment().format(
              "MMM"
            )}/${moment().format("YYYY")}-SAC999319`;
          }
        } else {
          return `${branchcode}/01/${moment().format("DD")}/${moment().format(
            "MMM"
          )}/${moment().format("YYYY")}-SAC999319`;
        }
      } catch (e) {
            throw e;
      }
    };

    async generateInvoiceNumberAsthetic(branchcode) {
      try {
        let lastAppData = await appointmentDA.getLastInvoiceNo(branchcode);
        console.log("......lastAppData......",lastAppData);
        const oldInvoice = lastAppData.length > 0
              ? lastAppData.reduce((max, item) => item.invoiceNumber > max ? item.invoiceNumber : max, -Infinity) : null;
          console.log("......oldInvoice......",oldInvoice);
        if (oldInvoice) {
            let invNo = parseInt(oldInvoice);
            let newNo = invNo + 1;
          console.log("......3333333333......");
          if (newNo > 9) {
            return `${branchcode}/${newNo}/${moment().format("DD")}/${moment().format(
              "MMM"
            )}/${moment().format("YYYY")}-SAC999722`;
          } else {
            return `${branchcode}/0${newNo}/${moment().format("DD")}/${moment().format(
              "MMM"
            )}/${moment().format("YYYY")}-SAC999722`;
          }
        } else {
          return `${branchcode}/01/${moment().format("DD")}/${moment().format(
            "MMM"
          )}/${moment().format("YYYY")}-SAC999722`;
        }
      } catch (e) {
            throw e;
      }
    };
  }
  
  module.exports = new invoiceGenerator();