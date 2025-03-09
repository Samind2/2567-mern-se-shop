import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const AdminRoute = ({ children }) => {
  const { user, getUser, isLoading } = useContext(AuthContext);
  const location = useLocation();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const userInfo = getUser();
  if (user && userInfo?.role === "admin") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;