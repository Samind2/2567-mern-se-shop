const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routers/user.router");
const productRouter = require("./routers/Products.router");
const CartRouter = require("./routers/Cart.router");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger-output.json");

const app = express();
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

// กำหนดค่าของ corsOptions
const corsOptions = {
  origin: [BASE_URL], // อนุญาตเฉพาะ URL ของ Frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Methods ที่อนุญาต
  allowedHeaders: ["Content-Type", "x-access-token"], // Headers ที่อนุญาต
};

// ใช้งาน CORS พร้อม corsOptions
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // เปิดใช้งาน Preflight Request

app.use(express.json());
// เส้นทางหลัก
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Mern-SE-Shop Restful API</h1>");
});

// เชื่อมต่อ MongoDB
try {
  mongoose.connect(DB_URL);
  console.log("Connected to MongoDB successfully");
} catch (err) {
  console.log("DB Connection Failed");
}

// User router
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", CartRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// สั่งให้เซิร์ฟเวอร์ทำงาน
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
