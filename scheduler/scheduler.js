const moment = require("moment-timezone");
const mongoose = require("mongoose");
const mongoSchedulerObjExported = require("../helpers/mongoSchedulerObj");






class scheduler {
    startScheduler(mongoScheduler) {
        mongoSchedulerObjExported.mongo_scheduler = mongoScheduler;
    }
    async changeisActiveStatusPackage(details){
        try{
          const changeisActivePackage = {
            name: "changeisActiveStatusPackage",
            after: new Date(details.endDate),
            data: {
              endDate: details.endDate,
              _id: details._id
            },
          };
          await mongoSchedulerObjExported.mongo_scheduler.schedule(changeisActivePackage);
        } catch (e){
          throw e;
        }
      }


}
module.exports = scheduler;
