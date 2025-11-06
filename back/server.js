console.log("!!!!!!!!!! ЗАПУЩЕН НОВЫЙ КОД v2 !!!!!!!!!!");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

const app = express();

// Подключаем MongoDB
connectDB();

// ДЕБАГ: логируем каждый входящий запрос
app.use((req, res, next) => {
  console.log(
    `[INCOMING] ${req.method} ${req.path} | Origin: ${req.headers.origin}`
  );
  next();
});

// CORS настройка (подходит и для localhost, и для деплоя)
app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        /http:\/\/localhost:\d+/.test(origin) ||
        /https:\/\/ortusbrand-production-0ace\.up\.railway\.app/.test(origin)
      ) {
        console.log(`[CORS ALLOWED] Origin: ${origin}`);
        callback(null, true);
      } else {
        console.error(`[CORS BLOCKED] Origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Подключаем роуты
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Тестовый эндпоинт
app.get("/", (req, res) => {
  res.send("🚀 Ortus Brand API Running Successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
