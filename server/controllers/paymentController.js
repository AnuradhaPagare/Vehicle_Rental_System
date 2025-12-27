import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // Rs → paise
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    };

    const order = await instance.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("❌ Razorpay Error:", err);
    res.status(500).send("Payment creation failed");
  }
};
