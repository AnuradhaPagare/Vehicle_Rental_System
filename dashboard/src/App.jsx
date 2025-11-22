import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import CheckInPage from "./Components/CheckInPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import Car_Section from "./Components/Car_Section";
import Bike_Section from "./Components/Bike_Section";
import Cycle_Section from "./Components/Cycle_Section";
import UserDashboard from "./Pages/UserDashboard";



function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cars" element={<Car_Section />} />
        <Route path="/bikes" element={<Bike_Section />} />
        <Route path="/cycles" element={<Cycle_Section />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        
        {/* ✅ Protected CheckIn Page */}
        <Route
          path="/checkin"
          element={
            <ProtectedRoute>
              <CheckInPage />
            </ProtectedRoute>
          }
        />
      </Routes>
  );
}

export default App;
