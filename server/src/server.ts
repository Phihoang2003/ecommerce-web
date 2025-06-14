const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const routes = require("./routes/index");
const createSocket = require("./socket/index");
const { connectRedis } = require("./ulits/redisCache");
const compression = require("compression");
const { default: helmet } = require("helmet");
const Database = require("./dbs/init.mongodb");

const app = express();

app.use(
  compression({
    level: 6,
    threshold: 10 * 1024,
  })
);

app.use(helmet());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.1.13:5173",
      process.env.URL_CLIENT,
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

Database.getInstance();

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`
    );
  });
  next();
});

const initializeServices = async () => {
  if (process.env.REDIS_URL) {
    try {
      await connectRedis();
      console.log("Redis setup complete");
    } catch (err) {
      console.warn("Redis connection failed, running without cache:", err);
    }
  } else {
    console.log("Redis URL not provided - running without Redis cache");
  }
};

routes(app);

initializeServices().then(() => {
  const server = app.listen(process.env.PORT || 8080, (err) => {
    if (err) {
      console.error("Server error:", err);
      process.exit(1);
    }
    console.log(
      `Server is running on port: ${process.env.PORT || 8080}`,
      `environment: ${process.env.NODE_ENV || "development"}`
    );
  });

  createSocket(server);
});
