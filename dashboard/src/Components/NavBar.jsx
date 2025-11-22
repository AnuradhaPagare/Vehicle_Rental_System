import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Collapse,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  DirectionsCar as CarIcon,
  PedalBike as BikeIcon,
  TwoWheeler as MotorcycleIcon,
  Tune as FilterIcon,
  ExpandLess,
  ExpandMore,
  AccountCircle as ProfileIcon,
  LocalGasStation as FuelIcon,
  Settings as GearIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

// 3D Glass Styled AppBar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  background: "rgba(0, 128, 128, 0.85)",
  backdropFilter: "blur(10px)",
  color: "#fff",
  boxShadow: "0px 8px 20px rgba(0,0,0,0.35)",
  borderBottom: "2px solid rgba(255,255,255,0.25)",
  zIndex: theme.zIndex.drawer + 1,
  transition: "0.4s ease",
  transform: open ? "translateX(240px)" : "translateX(0)",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  backgroundColor: "#ffffffdd",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
  ...theme.mixins.toolbar,
}));

export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [fuelOpen, setFuelOpen] = useState(false);
  const [transmissionOpen, setTransmissionOpen] = useState(false);

  const navigate = useNavigate();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Drawer Button */}
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            sx={{
              "&:hover": { transform: "scale(1.15)" },
              transition: "0.3s",
              mr: 2,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Brand */}
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: "1.5px",
              textShadow: "0px 2px 8px rgba(0,0,0,0.4)",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-2px)",
                transition: "0.3s ease",
              },
            }}
            onClick={() => navigate("/")}
          >
            Rydify
          </Typography>

          {/* Search */}
          <Search onSearch={(q) => console.log("Searching:", q)} />

          {/* Links */}
          <Button
            color="inherit"
            sx={{
              ml: 2,
              textTransform: "none",
              fontWeight: 500,
              "&:hover": { transform: "translateY(-2px)" },
              transition: "0.3s",
            }}
            onClick={() => navigate("/about")}
          >
            About
          </Button>

          <Button
            color="inherit"
            sx={{
              ml: 1,
              textTransform: "none",
              fontWeight: 500,
              "&:hover": { transform: "translateY(-2px)" },
              transition: "0.3s",
            }}
            onClick={() => navigate("/contact")}
          >
            Contact
          </Button>

          {/* Profile Icon */}
          <IconButton
            color="inherit"
            onClick={() => navigate("/user-dashboard")}
            sx={{
              "&:hover": { transform: "scale(1.15)" },
              transition: "0.3s",
            }}
          >
            <ProfileIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backdropFilter: "blur(5px)",
            background: "rgba(255,255,255,0.85)",
            boxShadow: "6px 0px 20px rgba(0,0,0,0.15)",
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        {/* Vehicle List */}
        <List>
          {[
            { text: "Cars", icon: <CarIcon />, path: "/cars" },
            { text: "Bikes", icon: <MotorcycleIcon />, path: "/bikes" },
            { text: "Cycles", icon: <BikeIcon />, path: "/cycles" },
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  handleDrawerClose();
                }}
                sx={{
                  borderRadius: "8px",
                  mx: 1,
                  my: 0.5,
                  "&:hover": {
                    background: "#d7f3f0",
                    transform: "translateX(6px)",
                  },
                  transition: "0.3s",
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Filter Section */}
        <List>
          <ListItemButton onClick={() => setFilterOpen(!filterOpen)}>
            <ListItemIcon>
              <FilterIcon />
            </ListItemIcon>
            <ListItemText primary="Filters" />
            {filterOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={filterOpen} timeout="auto" unmountOnExit>
            {/* Price Range */}
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => setPriceOpen(!priceOpen)}>
                <ListItemIcon>
                  <MoneyIcon />
                </ListItemIcon>
                <ListItemText primary="Price Range" />
                {priceOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={priceOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {["₹0 - ₹500", "₹500 - ₹1000", "₹1000+"].map((range) => (
                    <ListItemButton key={range} sx={{ pl: 8 }}>
                      <ListItemText primary={range} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>

              {/* Fuel Type */}
              <ListItemButton sx={{ pl: 4 }} onClick={() => setFuelOpen(!fuelOpen)}>
                <ListItemIcon>
                  <FuelIcon />
                </ListItemIcon>
                <ListItemText primary="Fuel Type" />
                {fuelOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={fuelOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {["Petrol", "Diesel", "Electric"].map((fuel) => (
                    <ListItemButton key={fuel} sx={{ pl: 8 }}>
                      <ListItemText primary={fuel} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>

              {/* Transmission */}
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setTransmissionOpen(!transmissionOpen)}
              >
                <ListItemIcon>
                  <GearIcon />
                </ListItemIcon>
                <ListItemText primary="Transmission" />
                {transmissionOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={transmissionOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {["Manual", "Automatic"].map((type) => (
                    <ListItemButton key={type} sx={{ pl: 8 }}>
                      <ListItemText primary={type} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </>
  );
}
