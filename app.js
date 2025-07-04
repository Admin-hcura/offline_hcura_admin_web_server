require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const pino = require("express-pino-logger")();
const mongoose = require("mongoose");
const Boom = require("@hapi/boom");
const appointmentDA = require("./layers/dataLayer/appointmentDA")

let MSM = require("mongo-scheduler-more");
let scheduler = require("./scheduler/scheduler");
let schedulerObj = new scheduler();

const routingV1 = require("./routes");
const port = 7001;
const app = express();

async function connectMongo() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.dbName,
      }
    );
    console.log('MongoDB connected successfully')
  } catch(e) {
    console.log('Error While connecting MongoDB')
  }
  
  try {
    let mongoScheduler = new MSM(process.env.MONGO_URI, {});
    mongoScheduler.on("error", function (e) {
    console.log("-------->error", e);
    });
    mongoScheduler.on(
      "changeisActiveStatus", 
      async function(details, event){
        if(new Date(details.data.endDate) < new Date()) {
          await appointmentDA.changeisActivePackage(details.data._id)
        }
    });
    schedulerObj.startScheduler(mongoScheduler);
    console.log('Scheduler is Active');
  } catch(e) {
      console.log('Scheduler is ERROR');
  }
}
connectMongo();

app.use(logger('dev'));
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.options("*", cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api/v1", routingV1);

app.get("/", async (req, res) => {
  res.send({ service: "H-cura_admin_offline_server", status: "Running" });
});

app.use((error, req, res, _) => {
  console.log(error);
  const { message = "Oops! Something went wrong", isBoom, output } = error;
  if (isBoom) {
    return res.status(output.statusCode).json({ success: false, message });
  }
  return res
    .status(500)
    .json({ success: false, message: "Oops! Something went wrong" });
});

let server = require("http").Server(app);
server.listen(port, () =>
  console.log(`H-Cura admin_offline API server listening on port ${port}!`)
);

process.on('SIGINT', async () => {
  if (redisClient) {
    await redisClient.quit();
  }
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
  
process.on('SIGTERM', async () => {
  if (redisClient) {
    await redisClient.quit();
  }
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;