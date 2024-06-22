const port_redis = 6379;
const redis = require("redis");

const redisClient = redis.createClient({
    url: process.env.redis,
});

redisClient.on("error", (err) => {
    console.error("Redis Client Error", err);
});

redisClient.on("ready", () => {
    console.log("Successfully connected to Redis server");
});

(async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        console.error("Failed to connect to Redis server", error);
    }
})();

module.exports = redisClient;