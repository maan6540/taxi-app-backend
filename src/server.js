import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import bookingDetailsRoutes from "./routes/bookingDetailsRoute.js";

dotenv.config();

const app = express();

// allowed origins (DEV + PROD)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://taxi-app-pi-eight.vercel.app"
];

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / server-to-server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// middleware
app.use(express.json());

// routes
app.use("/api", bookingDetailsRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Server Running");
});

// ❌ REMOVED: app.options("*", cors()); (caused Render crash)

// 404 handler (safe replacement for "*")
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// PORT
const PORT = process.env.PORT || 5000;

// connect DB then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB Connection Failed:", err);
  });