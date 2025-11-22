import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // ✅ Check token stored after login

  if (!token) {
    return <Navigate to="/login" replace />; // ✅ Redirect to login if no token
  }

  return children; // ✅ Allow access if logged in
};

export default ProtectedRoute;
