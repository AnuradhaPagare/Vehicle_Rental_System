import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
//import paymentRoutes from "./routes/paymentRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

import paymentRoutes from "./routes/payment.js";
const app = express();

// ✅ Connect Database
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // ✅ your Vite frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/booking", bookingRoutes);




// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
