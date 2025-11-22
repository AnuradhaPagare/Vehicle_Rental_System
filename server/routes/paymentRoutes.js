import dotenv from "dotenv";
dotenv.config();

import express from "express";
import crypto from "crypto";
import Razorpay from "razorpay";
import Booking from "../models/Booking.js";

const router = express.Router();

// ✅ Razorpay Instance
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create Order
router.post("/order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount,
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    };

    const order = await instance.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).send("Something went wrong");
  }
});

// ✅ Verify Payment & Save Booking
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingDetails, // extra info from frontend
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // ✅ Save booking in DB
      const booking = new Booking({
        ...bookingDetails,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        status: "Confirmed",
      });

      await booking.save();

      res.json({ success: true, message: "Payment verified & booking saved" });
    } else {
      res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ Export router (ESM)
export default router;
