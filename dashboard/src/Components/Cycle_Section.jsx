import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../Firebase.js";
import cycle_Title_Background from "../images/cycle_Title_Background.jpeg";
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

const CycleSection = () => {
  const [cycles, setCycles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCycles = async () => {
      const dbRef = ref(database, "cycles");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const cyclesArray = Object.entries(snapshot.val()).map(([key, value]) => ({
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


  const handleBookNow = (cycle) => {
  localStorage.removeItem("selectedCar");
  localStorage.removeItem("selectedBike");
  localStorage.setItem("selectedCycle", JSON.stringify(cycle));
  window.location.href = "/checkin";
};


  return (
    <Box sx={{ p: 4 }}>
       
      <Box
        sx={{
          mb: 6,
          minHeight: "200px",
          backgroundImage: `url(${cycle_Title_Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 2,
        }}
      >
         {/* Back Button */}
          <Button 
            variant="contained" 
            color="secondary" 
            sx={{ mb: 3 }} 
            onClick={() => navigate("/")}
          >
            ⬅️ Back
          </Button>
        <Typography
          variant="h3"
          align="center"
          sx={{
            pt: 6,
            pb: 6,
            fontFamily: `'Orbitron', sans-serif`,
            fontWeight: 700,
            color: "#fff",
            textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          🚲 Cycles Section
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {cycles.map((cycle) => (
          <Grid item key={cycle.id} xs={12} sm={6} md={3}>
            <Card sx={{ maxWidth: 340, height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                image={cycle.imageUrl}
                alt={cycle.name}
                sx={{ height: 180, objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{cycle.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Brand:</strong> {cycle.brand}<br />
                  <strong>Model:</strong> {cycle.model}<br />
                  <strong>Type:</strong> {cycle.type}<br />
                  <strong>Description:</strong> {cycle.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ₹{cycle.pricePerDay} / day
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                <Button variant="contained" onClick={() => handleBookNow(cycle)}>
                  Book Now
                </Button>
                <Button variant="outlined" onClick={() => alert(`View details for ${cycle.name}`)}>
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
