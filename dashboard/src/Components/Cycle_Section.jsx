import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../Firebase.js";
import cycle_Title_Background from "../images/cycle_Title_Background.jpeg"; 
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

const CycleSection = () => {
  const [cycles, setCycles] = useState([]);

  useEffect(() => {
    const fetchCycles = async () => {
      const dbRef = ref(database, "cycles");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const cyclesArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setCycles(cyclesArray);
      } else {
        console.log("No data found in /cycles.");
      }
    };

    fetchCycles();
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
          backgroundImage: `url(${cycle_Title_Background})`,
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
            🚲 Cycles Section
          </Typography>
        </Box>
      </Box>

      {/* Cycles Grid */}
      <Grid container spacing={3}>
        {cycles.map((cycle) => (
          <Grid item key={cycle.id} xs={12} sm={6} md={3}>
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
                image={cycle.imageUrl}
                alt={cycle.name}
                sx={{
                  height: 180,
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {cycle.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Brand:</strong> {cycle.brand}<br />
                  <strong>Model:</strong> {cycle.model}<br />
                  <strong>Fuel:</strong> {cycle.fuelType}<br />
                  <strong>Seats:</strong> {cycle.seats}<br />
                  <strong>Transmission:</strong> {cycle.transmission}<br />
                  <strong>Type:</strong> {cycle.type}<br />
                  <strong>Description:</strong> {cycle.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ₹{cycle.pricePerDay} / day
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => alert(`Book ${cycle.name}`)}
                >
                  Book Now
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => alert(`View details for ${cycle.name}`)}
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

export default CycleSection;
