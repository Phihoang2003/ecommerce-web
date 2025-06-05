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

<<<<<<< HEAD
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
=======
//init middlewares
app.use(cors({
    origin: ["http://localhost:3000","http://localhost:5173", "http://192.168.1.13:5173",process.env.URL_CLIENT],
    credentials: true,
}));
app.use(cookieParser()) //để có thể truyền được cookie
app.use(compression()) // để giảm size của tệp tin hoặc dữ liệu trước khi chuyển gửi qua mạng. Tối ưu hóa tốc độ truyền dữ liệu và giảm băng thông mạng cần thiết.
app.use(helmet()) // bảo vệ ứng dụng khỏi các cuộc tấn công bảo mật thông qua việc thiết lập các HTTP headers liên quan đến bảo mật.
app.use(bodyParser.json());//để có thể truyền được chuỗi json
//để phân tích và trích xuất dữ liệu từ phần thân (body) của các yêu cầu HTTP có định dạng "x-www-form-urlencoded". Đây là một trong những loại dữ liệu phổ biến được sử dụng khi gửi dữ liệu từ một trang web HTML thông qua form.
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }))
// init router 
routes(app) 
// init database
require("./dbs/init.mongodb")
//------------ socket ---------------
const Server = http.createServer(app)
createSocket(Server)
//-----------------------------------
Server.listen(process.env.PORT, () => {
    console.log("Server is ready!")
})
>>>>>>> 2b0459b42786da3eee100c7a081e97bd0de28e23
