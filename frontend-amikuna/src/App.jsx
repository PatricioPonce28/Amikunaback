import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rutas con Navbar */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/register" element={<><Navbar /><Register /></>} />
        <Route path="/confirmar/:token" element={<><Navbar /><ConfirmarCuenta /></>} />
        <Route path="/forgot" element={<><Navbar /><ForgotPassword /></>} />
        <Route path="/recuperarPassword/:token" element={<><Navbar /><NuevoPassword /></>} />

        {/* Rutas SIN Navbar */}
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
