import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Box } from "@mui/material";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    alert(`Message sent.\nName: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`);
    setForm({ name: "", email: "", message: "" });
  };

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
      <Container maxWidth="sm">
        
        {/* Glass 3D Card */}
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
            sx={{
              fontFamily: `'Orbitron', sans-serif`,
              textAlign: "center",
              letterSpacing: "1px",
              color: "white",
            }}
          >
            Contact Us
          </Typography>

          <Typography variant="body1" sx={{ mb: 3, color: "#e0e0e0", textAlign: "center" }}>
            Have questions or feedback? Send us a message.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              sx={{
                mb: 2,
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiInputLabel-root": { color: "#cfd8dc" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#cfd8dc" },
              }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              sx={{
                mb: 2,
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiInputLabel-root": { color: "#cfd8dc" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#cfd8dc" },
              }}
            />
            <TextField
              label="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              sx={{
                mb: 3,
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiInputLabel-root": { color: "#cfd8dc" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#cfd8dc" },
              }}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{
                py: 1.3,
                fontSize: "1rem",
                borderRadius: "10px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
              }}
            >
              Send Message
            </Button>
          </form>
        </Paper>

        {/* Contact Info Card */}
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
            sx={{ fontFamily: `'Orbitron', sans-serif`, color: "white", mb: 2 }}
          >
            Contact Information
          </Typography>

          <Typography variant="body1" sx={{ color: "#e0e0e0" }}>Email: support@rydify.com</Typography>
          <Typography variant="body1" sx={{ color: "#e0e0e0" }}>Phone: +91 9876543210</Typography>
          <Typography variant="body1" sx={{ color: "#e0e0e0" }}>Address: 123, Tech Park, Pune, India</Typography>
        </Box>

      </Container>
    </Box>
  );
}
