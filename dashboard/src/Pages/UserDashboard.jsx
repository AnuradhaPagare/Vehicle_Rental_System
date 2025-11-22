import React from "react";
import { Card, CardContent, CardHeader, Avatar, Divider, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Edit as EditIcon,
  DirectionsCar as CarIcon,
  TwoWheeler as BikeIcon,
  PedalBike as CycleIcon,
  Favorite as FavoriteIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

// Glassmorphism background
const GlassContainer = styled("div")({
  minHeight: "100vh",
  width: "100%",
  background: "linear-gradient(135deg, #e0f7fa, #80deea)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "100px 20px 50px",
});

// Section wrapper
const Section = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "30px",
  width: "100%",
  maxWidth: "1200px",
});

// Glass-style card
const GlassCard = styled(Card)({
  width: "340px",
  borderRadius: "16px",
  backdropFilter: "blur(10px)",
  background: "rgba(255, 255, 255, 0.7)",
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 14px 30px rgba(0, 0, 0, 0.25)",
  },
});

export default function UserDashboard() {
  // Mock data (later you can fetch from backend)
  const user = {
    name: "Anuradha Sharma",
    email: "anuradha@example.com",
    phone: "+91 98765 43210",
    address: "Pune, Maharashtra, India",
  };

  const bookingHistory = [
    { vehicle: "Honda City", type: "Car", date: "12 Oct 2025", price: "₹1,500/day" },
    { vehicle: "Royal Enfield Classic 350", type: "Bike", date: "01 Nov 2025", price: "₹900/day" },
  ];

  const favorites = [
    { title: "Tesla Model 3", icon: <CarIcon sx={{ color: "#00796b" }} /> },
    { title: "Yamaha MT-15", icon: <BikeIcon sx={{ color: "#00796b" }} /> },
    { title: "Hero Sprint", icon: <CycleIcon sx={{ color: "#00796b" }} /> },
  ];

  return (
    <GlassContainer>
      {/* Title */}
      <h1 className="text-4xl font-bold mb-8 text-gray-800">User Dashboard</h1>

      {/* Section: Personal Info */}
      <Section>
        <GlassCard>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: "#008080" }}>{user.name[0]}</Avatar>}
            title="Personal Information"
          />
          <Divider />
          <CardContent>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              sx={{
                mt: 2,
                background: "#008080",
                "&:hover": { background: "#006666" },
              }}
            >
              Edit Profile
            </Button>
          </CardContent>
        </GlassCard>

        {/* Booking History */}
        <GlassCard>
          <CardHeader
            avatar={<HistoryIcon sx={{ color: "#008080" }} />}
            title="Booking History"
          />
          <Divider />
          <CardContent>
            {bookingHistory.map((item, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <p><strong>{item.vehicle}</strong> ({item.type})</p>
                <p>{item.date} — {item.price}</p>
                <Divider sx={{ my: 1 }} />
              </div>
            ))}
            <Button
              size="small"
              sx={{
                textTransform: "none",
                color: "#008080",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              View All Bookings
            </Button>
          </CardContent>
        </GlassCard>
      </Section>
    </GlassContainer>
  );
}
