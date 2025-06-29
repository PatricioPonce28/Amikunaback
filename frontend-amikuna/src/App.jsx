import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect } from 'react';

import storeProfile from './context/storeProfile';
import storeAuth from './context/storeAuth';

import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import NuevoPassword from './pages/NuevoPassword';
import ForgotAdministrador from './pages/ForgotAdministrador';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import Dashboard_Admin from './layout/Dashboard_Admin';
import Dashboard_Users from './layout/Dashboard_Users';
import Forbidden from './pages/Forbidden';

const DashboardRedirect = () => {
  const user = storeAuth.getState().user;

  if (!user) return <Navigate to="/login" replace />;
  if (user.rol === 'admin') return <Navigate to="/admin/dashboard" replace />;
  if (user.rol === 'estudiante') return <Navigate to="/user/dashboard" replace />;
  return <Navigate to="/forbidden" replace />;
};

function App() {
  const profile = storeProfile(state => state.profile);
  const token = storeAuth(state => state.token);

  useEffect(() => {
    if (token) profile();
  }, [token]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Rutas públicas protegidas */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Rutas públicas normales */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/confirmar/:token" element={<><Navbar /><ConfirmarCuenta /></>} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/forgot2" element={<ForgotAdministrador />} />
        <Route path="/recuperarPassword/:token" element={<NuevoPassword />} />
        <Route path="/admin/cambiar-password" element={<ForgotAdministrador />} />
        <Route path="/admin/generar-nueva-password" element={<ForgotAdministrador />} />

        {/* Redirección según rol */}
        <Route path="/dashboard" element={<DashboardRedirect />} />

        {/* Rutas protegidas por rol */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <Dashboard_Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute requiredRole="estudiante">
              <Dashboard_Users />
            </ProtectedRoute>
          }
        />

        <Route path="/forbidden" element={<Forbidden />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
