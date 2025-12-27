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
  Menu,
  MenuItem,
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

  // Filters
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [fuelOpen, setFuelOpen] = useState(false);
  const [transmissionOpen, setTransmissionOpen] = useState(false);

  const navigate = useNavigate();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  // Profile dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const isLoggedIn = !!localStorage.getItem("token"); // 👈 check login

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleMenuClose();
    navigate("/login");
  };

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          
          {/* Drawer Open Button */}
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
              cursor: "pointer",
              textShadow: "0px 2px 8px rgba(0,0,0,0.4)",
            }}
            onClick={() => navigate("/")}
          >
            Rydify
          </Typography>

          {/* Search */}
          <Search onSearch={(q) => console.log("Searching:", q)} />

          {/* Navbar Buttons */}
          <Button color="inherit" onClick={() => navigate("/about")}>
            About
          </Button>
          <Button color="inherit" onClick={() => navigate("/contact")}>
            Contact
          </Button>

          {/* Profile Icon with dropdown */}
          <IconButton
            color="inherit"
            onClick={handleProfileClick}
            sx={{
              "&:hover": { transform: "scale(1.15)" },
              transition: "0.3s",
            }}
          >
            <ProfileIcon />
          </IconButton>

          {/* PROFILE MENU */}
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {isLoggedIn ? (
              <>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/user-dashboard");
                  }}
                >
                  Profile
                </MenuItem>

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/login");
                  }}
                >
                  Login
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/register");
                  }}
                >
                  Register
                </MenuItem>
              </>
            )}
          </Menu>
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
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />

        {/* Vehicle Categories */}
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
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Filters */}
        <List>
          <ListItemButton onClick={() => setFilterOpen(!filterOpen)}>
            <ListItemIcon>
              <FilterIcon />
            </ListItemIcon>
            <ListItemText primary="Filters" />
            {filterOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={filterOpen}>
            {/* PRICE RANGE */}
            <ListItemButton onClick={() => setPriceOpen(!priceOpen)} sx={{ pl: 4 }}>
              <ListItemIcon>
                <MoneyIcon />
              </ListItemIcon>
              <ListItemText primary="Price Range" />
              {priceOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={priceOpen}>
              {["₹0 - ₹500", "₹500 - ₹1000", "₹1000+"].map((range) => (
                <ListItemButton key={range} sx={{ pl: 8 }}>
                  <ListItemText primary={range} />
                </ListItemButton>
              ))}
            </Collapse>

            {/* FUEL */}
            <ListItemButton onClick={() => setFuelOpen(!fuelOpen)} sx={{ pl: 4 }}>
              <ListItemIcon>
                <FuelIcon />
              </ListItemIcon>
              <ListItemText primary="Fuel Type" />
              {fuelOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={fuelOpen}>
              {["Petrol", "Diesel", "Electric"].map((fuel) => (
                <ListItemButton key={fuel} sx={{ pl: 8 }}>
                  <ListItemText primary={fuel} />
                </ListItemButton>
              ))}
            </Collapse>

            {/* TRANSMISSION */}
            <ListItemButton
              onClick={() => setTransmissionOpen(!transmissionOpen)}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <GearIcon />
              </ListItemIcon>
              <ListItemText primary="Transmission" />
              {transmissionOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={transmissionOpen}>
              {["Manual", "Automatic"].map((type) => (
                <ListItemButton key={type} sx={{ pl: 8 }}>
                  <ListItemText primary={type} />
                </ListItemButton>
              ))}
            </Collapse>
          </Collapse>
        </List>
      </Drawer>
    </>
  );
}
