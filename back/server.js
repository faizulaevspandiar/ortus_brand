console.log("🚀 ORTUS BRAND API — STARTED (CORS FIX ENABLED) 🚀");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

const app = express();

// Подключаем базу данных
connectDB();

// ===============================
// ✅ Глобальная CORS-настройка
// ===============================
app.use(
  cors({
    origin: "*", // Разрешаем все источники (универсально)
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Preflight-запросы (OPTIONS) разрешаем универсально
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return res.status(204).end();
  }
  next();
});

// ===============================
// 🧠 Middleware и маршруты
// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логирование запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Основные маршруты
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Тестовый маршрут
app.get("/", (req, res) => {
  res.send("Ortus Brand API Running ✅");
});

// ===============================
// 🚀 Запуск сервера
// ===============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
