import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { History as HistoryIcon } from "@mui/icons-material";

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetch(`http://localhost:5000/api/booking/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        } else {
          setBookings([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setBookings([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={{ color: "#00f0ff" }}>Loading bookings...</h2>;
  if (bookings.length === 0) return <h2 style={{ color: "#00f0ff" }}>No bookings found.</h2>;

  const neonCardStyle = {
    borderRadius: 3,
    mb: 3,
    background: "linear-gradient(145deg, #0f0c29, #302b63, #24243e)",
    color: "#fff",
    boxShadow: `
      0 0 5px #00f0ff,
      0 0 10px #00f0ff,
      0 0 20px rgba(0, 255, 255, 0.3)
    `,
    transformStyle: "preserve-3d",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "rotateX(3deg) rotateY(3deg) scale(1.03)",
      boxShadow: `
        0 0 10px #00f0ff,
        0 0 20px #00f0ff,
        0 0 40px rgba(0, 255, 255, 0.4)
      `,
    },
  };

  return (
    <Box
      sx={{
        p: 4,
        perspective: "1500px",
        background: "#111",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Medium-sized container */}
      <Box sx={{ width: "100%", maxWidth: 1300 }}>
        <Typography
          variant="h4"
          sx={{ mb: 4, color: "#00f0ff", fontWeight: "bold", textShadow: "0 0 10px #00f0ff" }}
        >
          My Bookings
        </Typography>

        {bookings.map((item, index) => (
          <Card key={index} sx={neonCardStyle}>
            <CardHeader
              avatar={<HistoryIcon sx={{ color: "#00f0ff" }} />}
              title={item.vehicleName}
              subheader={item.vehicleType}
            />
            <Divider sx={{ borderColor: "#00f0ff" }} />
            <CardContent>
              <Typography>
                <strong>Date:</strong> {item.date} ({item.hour}:{item.minute} {item.ampm})
              </Typography>
              <Typography>
                <strong>Return:</strong> {item.returnHour}:{item.returnMinute} {item.returnAmpm}
              </Typography>
              <Typography>
                <strong>Price:</strong> ₹{item.price}
              </Typography>
              <Typography>
                <strong>Status:</strong> {item.status}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
