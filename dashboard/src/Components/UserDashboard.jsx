import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  Avatar,
} from "@mui/material";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);

  const favoriteVehicles = ["KTM Duke 200", "Yamaha MT-15", "TVS Apache RR310"];

  const sunsetCard = {
    borderRadius: 3,
    p: 3,
    mb: 4,
    background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #fbc2eb 100%)",
    color: "#111",
    boxShadow: `0 5px 15px rgba(250, 192, 235, 0.3), 0 10px 25px rgba(250, 192, 235, 0.2)`,
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return console.log("User not logged in");

    // Fetch user info
    fetch(`http://localhost:5000/api/auth/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.message) setUser(data);
        else console.error("Error fetching user:", data.message);
      })
      .catch((err) => console.error("Error loading user:", err));

    // Fetch user-specific booking history
    fetch(`http://localhost:5000/api/booking/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.bookings)) setBookingHistory(data.bookings);
        else setBookingHistory([]);
      })
      .catch((err) => {
        console.error("Error loading bookings:", err);
        setBookingHistory([]);
      });
  }, []);

  if (!user) return <h2>Loading user info...</h2>;

  const latestBookings = bookingHistory.slice(0, 3); // Show only latest 3 bookings

  return (
    <Box sx={{ p: 4, background: "#ffe8e0", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", maxWidth: 700 }}>
        {/* Profile Card */}
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#f85c70" }}>
          User Dashboard
        </Typography>
        <Card sx={{ ...sunsetCard, display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: "#f85c70", color: "#fff", fontWeight: "bold" }}>
            {user.name?.[0]}
          </Avatar>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>{user.name}</Typography>
            <Typography>Email: {user.email || user.username}</Typography>
            <Typography>Phone: {user.mobile}</Typography>
            <Typography>Address: {user.address}</Typography>
            <Button
              variant="contained"
              sx={{ mt: 2, background: "#008080", "&:hover": { background: "#006666" } }}
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Booking History Card */}
        <Typography variant="h5" sx={{ mb: 1, mt: 4, fontWeight: "bold", color: "#ff6f61" }}>
          Booking History
        </Typography>
        <Card sx={{ ...sunsetCard, p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Vehicle</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {latestBookings.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.vehicleName}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {bookingHistory.length > 3 && (
            <Button
              size="small"
              sx={{ mt: 2, color: "#008080", textTransform: "none" }}
              onClick={() => window.location.href = "/user-bookings"} // navigate to full bookings page
            >
              View All Bookings
            </Button>
          )}
        </Card>

        {/* Favorite Vehicles */}
        <Typography variant="h5" sx={{ mb: 1, mt: 4, fontWeight: "bold", color: "#ff6f61" }}>
          Favorite Vehicles
        </Typography>
        <Card sx={{ ...sunsetCard, p: 3 }}>
          {favoriteVehicles.map((bike, idx) => (
            <Typography key={idx} sx={{ mb: 1 }}>
              • {bike}
            </Typography>
          ))}
        </Card>

        {/* Support */}
        <Typography variant="h5" sx={{ mb: 1, mt: 4, fontWeight: "bold", color: "#ff6f61" }}>
          Support
        </Typography>
        <Card sx={{ ...sunsetCard, p: 3 }}>
          <Typography>Email: support@rydify.com</Typography>
          <Typography>Phone: +91 9876543210</Typography>
          <Typography sx={{ mt: 2 }}>Need help? Contact us anytime!</Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              background: "#ff6f61",
              color: "#fff",
              "&:hover": { background: "#f85c70" },
            }}
          >
            Create Support Ticket
          </Button>
        </Card>

        {/* Account Settings */}
        <Divider sx={{ mb: 3, mt: 4, borderColor: "#ff6f61" }} />
        <Button
          variant="outlined"
          sx={{
            mr: 2,
            borderColor: "#ff6f61",
            color: "#ff6f61",
            "&:hover": { borderColor: "#f85c70", color: "#f85c70" },
          }}
        >
          Change Password
        </Button>
        <Button variant="contained" color="error">
          Logout
        </Button>
      </Box>
    </Box>
  );
}
