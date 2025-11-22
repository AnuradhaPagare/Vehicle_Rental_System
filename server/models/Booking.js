import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    name: { type: String, required: true },
    mobile: { type: String, required: true },
    location: { type: String, required: true },

    vehicleName: { type: String, required: true },
    vehicleType: { type: String, required: true },

    // Receiving / Pickup Date & Time
    date: { type: String, required: true }, // stored as dd/mm/yyyy
    hour: { type: String, required: true },
    minute: { type: String, required: true },
    ampm: { type: String, required: true },

    // Return Time
    returnHour: { type: String, required: true },
    returnMinute: { type: String, required: true },
    returnAmpm: { type: String, required: true },

    price: { type: Number, required: true }, // price per day
    paymentId: { type: String, required: true },
    orderId: { type: String, required: true },

    status: { type: String, default: "Confirmed" },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
