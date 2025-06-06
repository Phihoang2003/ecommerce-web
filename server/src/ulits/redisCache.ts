const redis = require("redis");
const dotenv = require("dotenv");
dotenv.config();
let client = null;

const connectRedis = async () => {
  if (!process.env.REDIS_URL) {
    console.log("Redis URL not provided - using in-memory cache instead");
    return Promise.resolve();
  }

  client = redis.createClient({
    url: process.env.REDIS_URL,
    socket: {
      connectTimeout: 3000,
      keepAlive: 5000,
      reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
    },
  });

  client.on("error", (err) => {
    console.error("Redis Client Error:", err);
  });

  client.on("reconnecting", () => {
    console.log("Redis client reconnecting...");
  });

  if (!client) {
    console.log("Redis client not initialized - using in-memory cache instead");
    return Promise.resolve();
  }

  try {
    await client.connect();
    console.log("Redis connected successfully");

    await client.ping();
    console.log("Redis ping successful");

    return client;
  } catch (err) {
    console.error("Redis connection error:", err);
    client = null;
    return Promise.resolve();
  }
};

const getFromCache = async (key) => {
  try {
    if (client && client.isReady) {
      const data = await client.get(key);
      return data ? JSON.parse(data) : null;
    }
  } catch (error) {
    console.error("Error getting from cache:", error);
    return null;
  }
};

const setToCache = async (key, value, ttl = 1800) => {
  try {
    if (client) {
      return await client.set(key, JSON.stringify(value), {
        EX: ttl,
      });
    }
  } catch (error) {
    console.error("Error setting to cache:", error);
    return false;
  }
};

const deleteFromCache = async (key) => {
  try {
    if (client && client.isReady) {
      return await client.del(key);
    }
  } catch (error) {
    console.error("Error deleting from cache:", error);
    return false;
  }
};

const deleteByPattern = async (pattern) => {
  try {
    if (client && client.isReady) {
      const keys = await client.keys(pattern);
      if (keys.length > 0) {
        return await client.del(keys);
      }
      return 0;
    }
  } catch (error) {
    console.error("Error deleting by pattern from cache:", error);
    return false;
  }
};

module.exports = {
  client,
  connectRedis,

  isConnected: () => client && client.isReady,
  getFromCache,
  setToCache,
  deleteFromCache,
  deleteByPattern,
};
