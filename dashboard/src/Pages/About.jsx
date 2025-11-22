import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";

export default function About() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #020024 0%, #090979 50%, #00d4ff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 8,
        pb: 8,
      }}
    >
      <Container maxWidth="md">

        {/* 3D Glass Card */}
        <Paper
          sx={{
            p: 4,
            borderRadius: "20px",
            backdropFilter: "blur(12px)",
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
            transform: "perspective(1000px) rotateX(2deg) rotateY(-2deg)",
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
            "&:hover": {
              transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.03)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            }
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontFamily: `'Orbitron', sans-serif`, color: "white", textAlign: "center", letterSpacing: "1px" }}
          >
            About Rydify
          </Typography>

          <Typography variant="body1" sx={{ mb: 2, color: "#e0e0e0" }}>
            Rydify is your one-stop solution for booking vehicles seamlessly. Whether you want to rent a car, bike, or cycle, we provide a simple and intuitive platform to manage your bookings.
          </Typography>

          <Typography variant="body1" sx={{ mb: 2, color: "#e0e0e0" }}>
            Our mission is to make transportation hassle-free and accessible for everyone. With features like online check-in, secure payments, and personalized recommendations, Rydify ensures a smooth and enjoyable experience.
          </Typography>

          <Typography variant="body1" sx={{ color: "#e0e0e0" }}>
            We value our users and continuously strive to improve our services with the latest technology and innovative solutions.
          </Typography>
        </Paper>

        {/* Contact Section */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: "16px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontFamily: `'Orbitron', sans-serif`, color: "white" }}
          >
            Contact Information
          </Typography>

          <Typography variant="body1" sx={{ color: "#e0e0e0" }}>
            Email: support@rydify.com
          </Typography>
          <Typography variant="body1" sx={{ color: "#e0e0e0" }}>
            Phone: +91 9876543210
          </Typography>
          <Typography variant="body1" sx={{ color: "#e0e0e0" }}>
            Address: 123, Tech Park, Pune, India
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
