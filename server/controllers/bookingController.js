import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    console.log("📩 Booking Request:", req.body);

    const {
      userId,
      name,
      mobile,
      location,

      vehicleName,
      vehicleType,

      date,
      hour,
      minute,
      ampm,

      returnHour,
      returnMinute,
      returnAmpm,

      price,
      orderId,
      paymentId,
    } = req.body;

    // VALIDATION  
    if (!userId || !vehicleName || !vehicleType) {
      return res.status(400).json({ message: "Missing required booking data" });
    }

    const newBooking = new Booking({
      userId,

      name,
      mobile,
      location,

      vehicleName,
      vehicleType,

      date,
      hour,
      minute,
      ampm,

      returnHour,
      returnMinute,
      returnAmpm,

      price,
      orderId,
      paymentId,

      status: "Confirmed",
    });

    await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking saved successfully",
      booking: newBooking,
    });

  } catch (error) {
    console.error("❌ Booking Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error) {
    console.error("❌ Fetch Bookings Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
