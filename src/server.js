import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import bookingDetailsRoutes from "./routes/bookingDetailsRoute.js";
import authRoutes from "./routes/authRoutes.js"; // 🔐 NEW (auth system)

dotenv.config();

const app = express();

// ==========================
// 🌐 Allowed Origins
// ==========================
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://taxi-app-pi-eight.vercel.app"
];

// ==========================
// 🔐 CORS CONFIG (SAFE)
// ==========================
app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server / Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(null, false); // 👈 IMPORTANT: do not crash server
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// ==========================
// 🧠 Middleware
// ==========================
app.use(express.json());

// ==========================
// 🛣️ Routes
// ==========================
app.use("/api", bookingDetailsRoutes); // existing booking routes
app.use("/api/auth", authRoutes);       // 🔐 NEW auth routes

// ==========================
// 🧪 Test Route
// ==========================
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

// ==========================
// ❌ 404 Handler
// ==========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// ==========================
// 🚀 START SERVER
// ==========================
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ DB Connection Failed:", err);
  });