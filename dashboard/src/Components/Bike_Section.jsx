import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../Firebase.js";
import bike_Title_Background from "../images/Bike_Title_Background.jpeg";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@mui/material";

const BikeSection = () => {
  const [bikes, setBikes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBikes = async () => {
      const dbRef = ref(database, "bikes");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const bikesArray = Object.entries(snapshot.val()).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setBikes(bikesArray);
      } else {
        console.log("No data found in /bikes.");
      }
    };

    fetchBikes();
  }, []);

  

  const handleBookNow = (bike) => {
  localStorage.removeItem("selectedCar");
  localStorage.removeItem("selectedCycle");
  localStorage.setItem("selectedBike", JSON.stringify(bike));
  window.location.href = "/checkin"; 
};


  return (
    
    <Box sx={{ p: 4 }}>
      
      
      <Box
  sx={{
    mb: 6,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "200px",
    backgroundImage: `url(${bike_Title_Background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    borderRadius: 2,
    overflow: "hidden",
  }}
>

  {/* Back Button (Top Left) */}
  <Button
    variant="contained"
    color="secondary"
    onClick={() => navigate("/")}
    sx={{
      position: "absolute",
      top: 20,
      left: 20,
      zIndex: 3
    }}
  >
    ⬅ Back
  </Button>

  <Box
    sx={{
      position: "relative",
      zIndex: 2,
      px: 6,
      py: 4,
      borderRadius: "16px",
      backdropFilter: "blur(12px)",
      background: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
    }}
  >
    <Typography
      variant="h3"
      align="center"
      sx={{
        fontFamily: `'Orbitron', sans-serif`,
        fontWeight: 700,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "#ffffff",
      }}
    >
      🏍️ Bikes Section
    </Typography>
  
</Box>

      </Box>

      <Grid container spacing={3}>
        {bikes.map((v) => (
          <Grid item key={v.id} xs={12} sm={6} md={3}>
            <Card sx={{ maxWidth: 340, height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                image={v.imageUrl}
                alt={v.name}
                sx={{ height: 180, objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{v.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Brand:</strong> {v.brand}<br />
                  <strong>Model:</strong> {v.model}<br />
                  <strong>Fuel:</strong> {v.fuelType}<br />
                  <strong>Seats:</strong> {v.seats}<br />
                  <strong>Transmission:</strong> {v.transmission}<br />
                  <strong>Type:</strong> {v.type}<br />
                  <strong>Description:</strong> {v.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ₹{v.pricePerDay} / day
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                <Button variant="contained" onClick={() => handleBookNow(v)}>
                  Book Now
                </Button>
                <Button variant="outlined" onClick={() => alert(`View details for ${v.name}`)}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BikeSection;
