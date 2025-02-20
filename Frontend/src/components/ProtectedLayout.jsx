import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "../useContext/UserContext";

const ProtectedLayout = () => {
  const { user } = useUser();

  const isAuthenticated = user || localStorage.getItem("User");
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedLayout;