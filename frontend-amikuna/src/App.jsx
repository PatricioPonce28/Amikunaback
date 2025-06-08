import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import NuevoPassword from "./pages/NuevoPassword";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
     <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/forgot" element={<ForgotPassword />} />
  <Route path="/nuevopassword/:token" element={<NuevoPassword />} />
 
</Routes>
    </BrowserRouter>
  );
}

export default App;
