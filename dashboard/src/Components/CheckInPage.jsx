import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";

export default function CheckInPage() {
  const vehicle =
    JSON.parse(localStorage.getItem("selectedBike")) ||
    JSON.parse(localStorage.getItem("selectedCycle")) ||
    JSON.parse(localStorage.getItem("selectedCar"));

  const [details, setDetails] = useState({
    name: localStorage.getItem("username") || "",
    mobile: localStorage.getItem("mobile") || "",
    location: "",
    date: "",
    hour: "",
    minute: "",
    ampm: "",
    returnHour: "",
    returnMinute: "",
    returnAmpm: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const convertToDateTime = (dateStr, hour, minute, ampm) => {
    if (!dateStr || !hour || !minute || !ampm) return null;
    const [day, month, year] = dateStr.split("/");

    let h = parseInt(hour);
    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;

    return new Date(`${year}-${month}-${day}T${h}:${minute}`);
  };

  const handlePayment = async () => {
    if (
      !details.name ||
      !details.mobile ||
      !details.location ||
      !details.date ||
      !details.hour ||
      !details.minute ||
      !details.ampm ||
      !details.returnHour ||
      !details.returnMinute ||
      !details.returnAmpm
    ) {
      setError("❌ Please fill all fields!");
      return;
    }

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(details.date)) {
      setError("❌ Date format should be DD/MM/YYYY");
      return;
    }

    const now = new Date();
    const startTime = convertToDateTime(
      details.date,
      details.hour,
      details.minute,
      details.ampm
    );
    const returnTime = convertToDateTime(
      details.date,
      details.returnHour,
      details.returnMinute,
      details.returnAmpm
    );

    if (startTime <= now) {
      setError("❌ Pickup time must be greater than current time!");
      return;
    }

    if (returnTime <= startTime) {
      setError("❌ Return time must be later than pickup time!");
      return;
    }

    setError("");

    try {
      // ✅ Step 1: Create Razorpay Order
      const response = await fetch("http://localhost:5000/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: vehicle.pricePerDay }), // Amount in paise
      });

      const orderData = await response.json();

      // ✅ Step 2: Razorpay Payment Window
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Rydify Booking",
        description: "Vehicle Rental Service",
        order_id: orderData.id,

        handler: async function (response) {
          // ✅ Step 3: Verify Payment & Save Booking
          const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingDetails: {
                userId: localStorage.getItem("userId") || null,
                name: details.name,
                mobile: details.mobile,
                vehicleName: vehicle.name,
                vehicleType: vehicle.type,
                location: details.location,
                date: details.date,
                hour: details.hour,
                minute: details.minute,
                ampm: details.ampm,
                returnHour: details.returnHour,
                returnMinute: details.returnMinute,
                returnAmpm: details.returnAmpm,
                price: vehicle.pricePerDay,
              },
            }),
          });

          const data = await verifyRes.json();
          if (data.success) {
            alert("✅ Booking Confirmed!");
            window.location.href = "/"; // Redirect to Home Page
          } else {
            alert("❌ Payment verification failed");
          }
        },

        theme: { color: "#2374e1" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      alert("❌ Payment failed!");
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: 5,
          background: "linear-gradient(to bottom right, #ffffff, #e9f6ff)",
        }}
      >
        {vehicle && (
          <Box sx={{ background: "#e6f4ff", p: 2, borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" color="primary">
              🚘 Vehicle Details
            </Typography>
            <Typography>
              <strong>Name:</strong> {vehicle.name}
            </Typography>
            <Typography>
              <strong>Brand:</strong> {vehicle.brand}
            </Typography>
            <Typography>
              <strong>Type:</strong> {vehicle.type}
            </Typography>
            <Typography>
              <strong>Price:</strong> ₹{vehicle.pricePerDay} / Day
            </Typography>
          </Box>
        )}

        <Typography variant="h5" align="center" gutterBottom>
          📝 Check-In Details
        </Typography>

        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <TextField
          label="Full Name"
          name="name"
          value={details.name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Mobile Number"
          name="mobile"
          value={details.mobile}
          onChange={handleChange}
          fullWidth
          required
          inputProps={{ maxLength: 10 }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Pickup Location"
          name="location"
          value={details.location}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Date (DD/MM/YYYY)"
          name="date"
          value={details.date}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        {/* Pickup Time */}
        <Typography>
          <b>Receiving Time</b>
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            select
            name="hour"
            label="Hour"
            value={details.hour}
            onChange={handleChange}
            fullWidth
            SelectProps={{ native: true }}
          >
            <option></option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1}>{i + 1}</option>
            ))}
          </TextField>

          <TextField
            select
            name="minute"
            label="Min"
            value={details.minute}
            onChange={handleChange}
            fullWidth
            SelectProps={{ native: true }}
          >
            <option></option>
            {["00", "15", "30", "45"].map((m) => (
              <option key={m}>{m}</option>
            ))}
          </TextField>

          <TextField
            select
            name="ampm"
            label="AM/PM"
            value={details.ampm}
            onChange={handleChange}
            fullWidth
            SelectProps={{ native: true }}
          >
            <option></option>
            <option>AM</option>
            <option>PM</option>
          </TextField>
        </Box>

        {/* Return Time */}
        <Typography>
          <b>Return Time</b>
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            select
            name="returnHour"
            label="Hour"
            value={details.returnHour}
            onChange={handleChange}
            fullWidth
            SelectProps={{ native: true }}
          >
            <option></option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1}>{i + 1}</option>
            ))}
          </TextField>

          <TextField
            select
            name="returnMinute"
            label="Min"
            value={details.returnMinute}
            onChange={handleChange}
            fullWidth
            SelectProps={{ native: true }}
          >
            <option></option>
            {["00", "15", "30", "45"].map((m) => (
              <option key={m}>{m}</option>
            ))}
          </TextField>

          <TextField
            select
            name="returnAmpm"
            label="AM/PM"
            value={details.returnAmpm}
            onChange={handleChange}
            fullWidth
            SelectProps={{ native: true }}
          >
            <option></option>
            <option>AM</option>
            <option>PM</option>
          </TextField>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{ py: 1.3, fontSize: "16px", borderRadius: 2 }}
          onClick={handlePayment}
        >
          💳 Pay & Book Now
        </Button>
      </Paper>
    </Container>
  );
}
