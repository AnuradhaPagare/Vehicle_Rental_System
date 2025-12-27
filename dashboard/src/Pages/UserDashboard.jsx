import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Edit as EditIcon, Save as SaveIcon, History as HistoryIcon } from "@mui/icons-material";

// --- Styled Components ---
const GlassContainer = styled("div")({
  minHeight: "100vh",
  width: "100%",
  background: "linear-gradient(135deg, #e0f7fa, #80deea)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "100px 20px 50px",
});

const Section = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "30px",
  width: "100%",
  maxWidth: "1200px",
});

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
  const [user, setUser] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    // --- Fetch user profile ---
    fetch(`http://localhost:5000/api/auth/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData({
          name: data.name || "",
          username: data.username || "",
          mobile: data.mobile || "",
          address: data.address || "",
        });
      })
      .catch((err) => console.error("Error loading user:", err));

    // --- Fetch booking history ---
    fetch(`http://localhost:5000/api/booking/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.bookings)) {
          setBookingHistory(data.bookings);
        }
      })
      .catch((err) => console.error("Error loading bookings:", err));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const res = await fetch(`http://localhost:5000/api/auth/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.updatedUser);
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Update Error:", err);
      alert("Server error. Try again later.");
    }
  };

  if (!user) return <h2>Loading user info...</h2>;

  return (
    <GlassContainer>
      <h1 className="text-4xl font-bold mb-8 text-gray-800">User Dashboard</h1>

      <Section>
        {/* ---------- PERSONAL INFO ---------- */}
        <GlassCard>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: "#008080" }}>{user.name?.[0]}</Avatar>}
            title="Personal Information"
          />
          <Divider />
          <CardContent>
            {isEditing ? (
              <>
                <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                <TextField label="Username" name="username" value={formData.username} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                <TextField label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} sx={{ mt: 2, background: "#008080", "&:hover": { background: "#006666" } }}>Save</Button>
              </>
            ) : (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Mobile:</strong> {user.mobile}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <Button variant="contained" startIcon={<EditIcon />} onClick={() => setIsEditing(true)} sx={{ mt: 2, background: "#008080", "&:hover": { background: "#006666" } }}>Edit Profile</Button>
              </>
            )}
          </CardContent>
        </GlassCard>

        {/* ---------- BOOKING HISTORY ---------- */}
        <GlassCard>
          <CardHeader avatar={<HistoryIcon sx={{ color: "#008080" }} />} title="Booking History" />
          <Divider />
          <CardContent>
            {bookingHistory.length === 0 ? (
              <p>No bookings yet</p>
            ) : (
              bookingHistory.map((item, index) => (
                <div key={index} style={{ marginBottom: "12px" }}>
                  <p><strong>{item.vehicleName}</strong> ({item.vehicleType})</p>
                  <p>{item.date} – ₹{item.price}</p>
                  <Divider sx={{ my: 1 }} />
                </div>
              ))
            )}
            {bookingHistory.length > 0 && (
              <Button size="small" onClick={() => window.location.href = "/user-bookings"} sx={{ textTransform: "none", color: "#008080", "&:hover": { textDecoration: "underline" } }}>
                View All Bookings
              </Button>
            )}
          </CardContent>
        </GlassCard>
      </Section>
    </GlassContainer>
  );
}
