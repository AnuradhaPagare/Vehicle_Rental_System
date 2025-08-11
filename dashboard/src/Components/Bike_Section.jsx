import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../Firebase.js";
import bike_Title_Background from "../images/Bike_Title_Background.jpeg"; // <-- Add your bike section background image here
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

  useEffect(() => {
    const fetchBikes = async () => {
      const dbRef = ref(database, "bikes");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const bikesArray = Object.entries(data).map(([key, value]) => ({
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

  return (
    <Box sx={{ p: 4 }}>
      {/* Title Section */}
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
            transition: "transform 0.4s ease",
            "&:hover": {
              transform: "scale(1.05) rotateX(5deg)",
            },
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
              textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            🏍️ Bikes Section
          </Typography>
        </Box>
      </Box>

      {/* Bikes Grid */}
      <Grid container spacing={3}>
        {bikes.map((v) => (
          <Grid item key={v.id} xs={12} sm={6} md={3}>
            <Card
              sx={{
                maxWidth: 340,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                image={v.imageUrl}
                alt={v.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                }}
                sx={{
                  height: 180,
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {v.name}
                </Typography>
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
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => alert(`Book ${v.name}`)}
                >
                  Book Now
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => alert(`View details for ${v.name}`)}
                >
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
