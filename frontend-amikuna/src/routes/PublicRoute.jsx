// PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import storeAuth from "../context/storeAuth";

const PublicRoute = () => {
  const token = storeAuth((state) => state.token);
  const user = storeAuth((state) => state.user);

  return token && user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
