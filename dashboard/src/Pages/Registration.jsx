import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ Add this

export default function Registration() {
  const navigate = useNavigate(); // ✅ Initialize navigation

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    mobile: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile Number is required";
    else if (formData.mobile.length !== 10)
      newErrors.mobile = "Mobile must be 10 digits";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Registration Successful!");

        // ✅ Clear Form
        setFormData({ name: "", username: "", password: "", mobile: "", address: "" });
        setErrors({});

        // ✅ Redirect to Login page after success
        navigate("/login");
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong (Backend Not Connected)");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: "16px",
          background: "linear-gradient(135deg, #20c997, #17a2b8)",
          color: "#fff",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          User Registration
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            InputProps={{ style: { backgroundColor: "#fff", borderRadius: 8 } }}
          />

          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            fullWidth
            InputProps={{ style: { backgroundColor: "#fff", borderRadius: 8 } }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            InputProps={{ style: { backgroundColor: "#fff", borderRadius: 8 } }}
          />

          <TextField
            label="Mobile Number"
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={handleChange}
            error={!!errors.mobile}
            helperText={errors.mobile}
            fullWidth
            inputProps={{ maxLength: 10 }}
            InputProps={{ style: { backgroundColor: "#fff", borderRadius: 8 } }}
          />

          <TextField
            label="Address"
            name="address"
            multiline
            rows={3}
            value={formData.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
            fullWidth
            InputProps={{ style: { backgroundColor: "#fff", borderRadius: 8 } }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              backgroundColor: "#05668D",
              borderRadius: "10px",
              "&:hover": { backgroundColor: "#034752" },
            }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
