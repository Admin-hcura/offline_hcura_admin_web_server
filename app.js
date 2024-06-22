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

let MSM = require("mongo-scheduler-more");
// let scheduler = require("./scheduler/scheduler");
// let schedulerObj = new scheduler();

const routingV1 = require("./routes");
// const redisClient = require("./config/redisConfiguration");

const port = 7001;

// mongoose.set("useNewUrlParser", true);
// mongoose.set("useFindAndModify", false);
// mongoose.set("useCreateIndex", true);

const app = express();

async function connectMongo() {
    console.log(".............",process.env.MONGO_URI)
    try {
        await mongoose.connect(
          process.env.MONGO_URI,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.dbName,
          }
        );
        console.log('MongoDB connected successfully');
      } catch (error) {
        console.error('Error connecting to MongoDB', error);
      }
}
connectMongo();

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

//Route Prefixes
app.use("/api/v1", routingV1);

//service description
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

// Graceful shutdown
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