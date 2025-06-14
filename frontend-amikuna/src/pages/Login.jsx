import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logoAmikuna from "../assets/Logo.png";
import loginImage from "../assets/login.jpg";
import logingogle from "../assets/gogle.png";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/login`;

      const { data } = await axios.post(url, { email, password });

      toast.success('Inicio de sesión exitoso');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <ToastContainer />

      {/* Columna izquierda - Login */}
      <div className="md:w-1/2 w-full flex flex-col justify-start items-center p-6 bg-white">
        <div className="flex items-center mb-4">
          <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px]">
            <img src={logoAmikuna} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold ml-2 font-serif">AMIKUNA</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-6 w-full max-w-sm">
          <h2 className="text-lg md:text-xl font-bold text-center mb-1 mt-29">Inicia sesión</h2>

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5651D] text-sm"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5651D] text-sm"
          />

          <button
            type="submit"
            className="mt-0 text-sm font-semibold px-4 py-2 rounded-full bg-white text-black border border-gray-400 hover:bg-gray-100 transition-all"
          >
            Ingresar
          </button>

          <div className="flex flex-col gap-1 mt-1">
            <button
              type="button"
              className="mt-0 text-sm font-semibold px-6 py-2 rounded-full bg-white text-black border border-gray-400 hover:bg-gray-100 transition-all flex items-center justify-center gap-3 w-full"
            >
              <img src={logingogle} alt="Icono Ingresar" className="w-5 h-5" />
              <span className="text-xs md:text-sm">Ingresar con Google</span>
            </button>

            <Link to="/forgot" className="text-blue-600 hover:underline text-sm text-center mt-16">
              ¿Olvidaste tu contraseña?
            </Link>

            <Link to="/register" className="text-blue-600 hover:underline text-sm text-center mt-8">
              ¿No tienes cuenta? Regístrate aquí
            </Link>

            <Link to="/" className="text-blue-600 hover:underline text-sm text-center mt-8">
              Regresar
            </Link>
          </div>
        </form>
      </div>

      {/* Columna derecha - Imagen */}
      <div className="md:w-1/2 w-full hidden md:flex">
        <img src={loginImage} alt="Decoración" className="object-cover w-full h-full" />
      </div>

    </div>
  );
};

export default Login;