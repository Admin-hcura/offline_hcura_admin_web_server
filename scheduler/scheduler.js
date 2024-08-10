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
          console.log("mongoSchedulerObjExported-------11111111-----")
          return await mongoSchedulerObjExported.mongo_scheduler.schedule(changeisActivePackage);
          console.log("mongoSchedulerObjExported------------")
        } catch (e){
          throw e;
        }
      }


}
module.exports = scheduler;
