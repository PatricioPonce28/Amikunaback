// DashboardRedirect.jsx
import { Navigate } from "react-router-dom";
import storeAuth from "../context/storeAuth";

const DashboardRedirect = () => {
  const user = storeAuth((state) => state.user);

  if (!user) return <Navigate to="/login" replace />;
  if (user.rol === "admin") return <Navigate to="/admin/dashboard" replace />;
  if (user.rol === "estudiante") return <Navigate to="/user/dashboard" replace />;

  return <Navigate to="/forbidden" replace />;
};

export default DashboardRedirect;
