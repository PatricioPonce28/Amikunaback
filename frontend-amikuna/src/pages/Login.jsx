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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />

      {/* Contenedor del login */}
      <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Columna izquierda - Login */}
        <div className="w-[400px] flex flex-col justify-start items-center p-6">
          <div className="flex items-center mb-4">
            <div className="w-[80px] h-[80px]">
              <img src={logoAmikuna} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-3xl font-bold ml-2 font-serif">AMIKUNA</h1>
          </div>

          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-3 w-full"
          >
            <h2 className="text-1xl font-bold text-center mb-1">Inicia sesión</h2>

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
  type="submit"
  className="mt-0 text-sm font-semibold px-6 py-2 rounded-full bg-white text-black border border-gray-400 hover:bg-gray-100 transition-all flex items-center justify-center gap-3 w-full"
>
  <img src={logingogle} alt="Icono Ingresar" className="w-5 h-5" />
  Ingresar con google
</button>


              <Link to="/forgot" className="text-blue-600 hover:underline text-sm text-center mt-2">
                ¿Olvidaste tu contraseña?
              </Link>

              

              <Link to="/register" className="text-blue-600 hover:underline text-sm text-center mt-2">
                ¿No tienes cuenta? Regístrate aquí
              </Link>

              <Link to="/" className="text-blue-600 hover:underline text-sm text-center mt-2">
                Regresar
              </Link>
            </div>
          </form>
        </div>

        {/* Columna derecha - Imagen */}
        <div className="w-[500px]">
          <img 
            src={loginImage} 
            alt="Decoración" 
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default Login;
