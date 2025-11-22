import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // ✅ For error text

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setErrorMessage(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save token + user info
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("mobile", data.user.mobile);

        navigate("/checkin"); // redirect user
      } else {
        setErrorMessage(data.message || "Invalid credentials"); // ✅ Display red error
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
      setErrorMessage("Server not responding. Try again later.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: "16px",
          background: "linear-gradient(135deg, #008080, #20c997)",
          color: "#fff",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        >
          <TextField
            label="Username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{ style: { backgroundColor: "#fff", borderRadius: 8 } }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{ style: { backgroundColor: "#fff", borderRadius: 8 } }}
          />

          {errorMessage && (
            <Typography sx={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
              {errorMessage}
            </Typography>
          )}

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
            Login
          </Button>
        </Box>

        <Divider sx={{ my: 3, backgroundColor: "#e0f7fa" }} />

        <Box textAlign="center">
          <Typography variant="body1">Not registered yet?</Typography>
          <Button
            onClick={() => navigate("/register")}
            sx={{
              color: "#fff",
              textTransform: "none",
              fontWeight: "bold",
              mt: 1,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Create an Account
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
