// components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default ProtectedRoute;