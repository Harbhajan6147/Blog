import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

const PublicRoute = ({ children }) => {
  const { user, token } = useAuth();
  
  if (user || token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;