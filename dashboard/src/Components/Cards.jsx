import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";

// Section imports
import Car_Section from "./Car_Section";
import Bike_Section from "./Bike_Section";
import Cycle_Section from "./Cycle_Section";

// Image imports
import bike from "../images/bike.jpeg";
import car from "../images/car.jpeg";
import cycle from "../images/cycle.jpeg";

// Vehicle data
const vehicleData = [
  { title: "Cars", image: car, description: "Explore a range of rental cars." },
  { title: "Bikes", image: bike, description: "Rent motorcycles for quick rides." },
  { title: "Cycles", image: cycle, description: "Healthy and eco-friendly cycle rentals." },
];

function VehicleCards() {
  const [selectedCard, setSelectedCard] = React.useState(null);

  // Handle section rendering
  const renderSection = () => {
    if (selectedCard === 0) return <Car_Section />;
    if (selectedCard === 1) return <Bike_Section />;
    if (selectedCard === 2) return <Cycle_Section />;
    return null;
  };

  // If a card is selected, show the relevant section
  if (selectedCard !== null) {
    return (
      <Box sx={{ p: 4 }}>
        <button
          onClick={() => setSelectedCard(null)}
          style={{
            marginBottom: "20px",
            padding: "8px 16px",
            background: "#05668D",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
        {renderSection()}
      </Box>
    );
  }

  // Otherwise show cards
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        flexWrap: "wrap",
      }}
    >
      {vehicleData.map((vehicle, index) => (
        <Card key={index} sx={{ maxWidth: 345, maxHeight: 350 }}>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            sx={{
              height: "70%",
              "&[data-active]": {
                backgroundColor: "action.selected",
              },
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={vehicle.image}
              alt={vehicle.title}
              sx={{ objectFit: "cover", objectPosition: "center" }}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ textAlign: "center" }}
              >
                {vehicle.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                {vehicle.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default VehicleCards;
