import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Booking from "../models/Booking.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

router.post("/order", async (req, res) => {
  try {
    const { amount } = req.body;

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,        // ✅ Correct
      key_secret: process.env.RAZORPAY_KEY_SECRET // ✅ Correct
    });

    const options = {
      amount: amount * 100,       // Razorpay expects paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Order creation failed" });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingDetails,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET) 
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // ✅ Save Booking
    const booking = new Booking({
      ...bookingDetails,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
    await booking.save();

    res.json({ success: true, message: "Payment Verified & Booking Saved!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
});


export default router;
