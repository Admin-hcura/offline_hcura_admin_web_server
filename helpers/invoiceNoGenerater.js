const moment = require("moment-timezone");
const appointmentDA = require("../layers/dataLayer/appointmentDA")


class invoiceGenerator {
    async generateInvoiceNumber(branchcode) {
      // old invoive number generating is not working 
    //   try {
    //     let lastAppData = await appointmentBAObj.getLastAppointmentBA();
    //     let oldInvoice =
    //       lastAppData.length > 0 ? lastAppData[0].invoiceNumber : null;
    //     if (oldInvoice) {
    //       let invNo = oldInvoice.split("/"); //'01/06/Jun/2022' //10/06/Jun/2022/6789
    //       let newNo = parseInt(invNo[0]) + 1;
    //       if (newNo > 9) {
    //         return `${newNo}/${moment().format("DD")}/${moment().format(
    //           "MMM"
    //         )}/${moment().format("YYYY")}`;
    //       } else {
    //         return `0${newNo}/${moment().format("DD")}/${moment().format(
    //           "MMM"
    //         )}/${moment().format("YYYY")}`;
    //       }
    //     } else {
    //       return `01/${moment().format("DD")}/${moment().format(
    //         "MMM"
    //       )}/${moment().format("YYYY")}`;
    //     }
    //   } catch (e) {}
      try {
        let lastAppData = await appointmentDA.getLastInvoiceNo();
        let oldInvoice =
          lastAppData.length > 0 ? lastAppData[0].invoiceNumber : null;
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
    }
  }
  
  module.exports = new invoiceGenerator();