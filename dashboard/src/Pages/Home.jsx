import React from "react";
import NavBar from "../Components/NavBar";
import Cards from "../Components/Cards";
import Footer from "../Components/Footer";
import Car_Section from "../Components/Car_Section";
import Bike_Section from "../Components/Bike_Section";
import Cycle_Section from "../Components/Cycle_Section";
import CheckInPage from "../Components/CheckInPage";
import About from "./About";
import Contact from "./Contact";

import { Routes, Route } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
      <NavBar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkin" element={<CheckInPage />} />
      </Routes>
      <Cards />
      <Car_Section />
      <Bike_Section />
      <Cycle_Section />
      <Footer />
    </div>
  );
};
export default Home;