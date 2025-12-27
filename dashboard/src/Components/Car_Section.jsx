import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../Firebase.js";
import car_Title_Background from "../images/car_Title_Background.jpeg";
import Search from "./Search";
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
  TextField,
} from "@mui/material";

const CarsSection = () => {
  const navigate = useNavigate();

  const handleBookNow = (car) => {
    localStorage.removeItem("selectedBike");
    localStorage.removeItem("selectedCycle");
    localStorage.setItem("selectedCar", JSON.stringify(car));
    window.location.href = "/checkin";
  };

  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      const dbRef = ref(database, "cars");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const vehiclesArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setVehicles(vehiclesArray);
      } else {
        console.log("No data found in /cars.");
      }
    };

    fetchVehicles();
  }, []);

  // Filter vehicles by brand name
  const filteredVehicles = vehicles.filter((v) =>
    v.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      {/* Title Section */}
      <Box
  sx={{
    mb: 4,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "200px",
    backgroundImage: `url(${car_Title_Background})`,
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
      🚘 Cars Section
    </Typography>
</Box>

      </Box>

      {/* Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Search onSearch={(value) => setSearchTerm(value)} />
      </Box>

      {/* Cars Grid */}
      <Grid container spacing={3}>
        {filteredVehicles.map((v) => (
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
                  <strong>Brand:</strong> {v.brand}
                  <br />
                  <strong>Model:</strong> {v.model}
                  <br />
                  <strong>Fuel:</strong> {v.fuelType}
                  <br />
                  <strong>Seats:</strong> {v.seats}
                  <br />
                  <strong>Transmission:</strong> {v.transmission}
                  <br />
                  <strong>Type:</strong> {v.type}
                  <br />
                  <strong>Description:</strong> {v.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ₹{v.pricePerDay} / day
                </Typography>
              </CardContent>
              <CardActions
                sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
              >
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleBookNow(v)} // pass car data
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

export default CarsSection;
