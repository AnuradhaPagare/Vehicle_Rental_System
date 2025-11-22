import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";

export default function UserDashboard() {
  const [user] = useState({
    name: "Amit Verma",
    email: "amit@example.com",
    phone: "+91 9876543210",
    address: "Pune, Maharashtra",
  });

  const bookingHistory = [
    { vehicle: "Honda Activa 6G", date: "10 Jan 2025", status: "Completed" },
    { vehicle: "Royal Enfield Classic 350", date: "18 Feb 2025", status: "Cancelled" },
    { vehicle: "TVS Ntorq", date: "02 Mar 2025", status: "Ongoing" },
  ];

  const favoriteVehicles = [
    "KTM Duke 200",
    "Yamaha MT-15",
    "TVS Apache RR310",
  ];

  return (
    <Box sx={{ p: 4 }}>
      {/* Title */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        User Dashboard
      </Typography>

      {/* Profile Card 3D */}
      <Card
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          boxShadow: "0px 8px 25px rgba(0,0,0,0.25)",
          transform: "perspective(1000px) translateZ(8px)",
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: "#1976D2" }}>
            {user.name[0]}
          </Avatar>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {user.name}
            </Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Phone: {user.phone}</Typography>
            <Typography>Address: {user.address}</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Booking History */}
      <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
        Booking History
      </Typography>
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: "0px 5px 20px rgba(0,0,0,0.2)",
          p: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Vehicle</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookingHistory.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.vehicle}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Favorite Vehicles */}
      <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
        Favorite Vehicles
      </Typography>
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: "0px 5px 20px rgba(0,0,0,0.2)",
          p: 3,
        }}
      >
        {favoriteVehicles.map((bike, idx) => (
          <Typography key={idx} sx={{ mb: 1 }}>
            • {bike}
          </Typography>
        ))}
      </Card>

      {/* Support */}
      <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
        Support
      </Typography>
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: "0px 5px 20px rgba(0,0,0,0.2)",
          p: 3,
        }}
      >
        <Typography>Email: support@rydify.com</Typography>
        <Typography>Phone: +91 9876543210</Typography>
        <Typography sx={{ mt: 2 }}>
          Need help? Contact us anytime!
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }}>
          Create Support Ticket
        </Button>
      </Card>

      {/* Account Settings */}
      <Divider sx={{ mb: 3 }} />
      <Button variant="outlined" color="primary" sx={{ mr: 2 }}>
        Change Password
      </Button>
      <Button variant="contained" color="error">
        Logout
      </Button>
    </Box>
  );
}
