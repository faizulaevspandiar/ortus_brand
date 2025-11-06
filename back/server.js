import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*", // Разрешаем всем
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = process.env.PORT || 8080; // ВАЖНО: Railway передает порт через env
const MONGO_URI = process.env.MONGO_URI;

// Подключаем MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Пример маршрута
app.get("/", (req, res) => {
  res.send("🚀 ORTUS BRAND API — RUNNING SUCCESSFULLY!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
