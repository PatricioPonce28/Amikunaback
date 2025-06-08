import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logoAmikuna from '../assets/logoAmikuna.jpeg';

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
        navigate('/'); // o a otra ruta que quieras
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="bg-tinder-gradient text-black p-4 min-h-screen">
      <ToastContainer />

      <header className="flex items-center h-20">
        <div className="flex items-center">
          <div className="inline-block relative w-[80px] h-[80px]">
            <img
              src={logoAmikuna}
              alt="Logo"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
          <h1 className="text-5xl font-bold ml-3">AMIKUNA</h1>
        </div>
      </header>

      <main className="mt-10 mx-4 md:mx-20 text-black">
        <h2 className="text-4xl font-bold mb-6">Inicia sesión</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border rounded"
          />
          <button
            type="submit"
            className="mt-4 text-xl font-bold px-6 py-3 rounded-full bg-[#B5651D] text-white hover:bg-opacity-90 transition-all"
          >
            Ingresar
          </button>

          <div className="flex flex-col gap-2 mt-4">
            <button
              type="button"
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-all"
            >
              Ingresar con Google
            </button>
            <Link
              to="/forgot"
              className="text-blue-600 hover:underline text-sm text-center"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </form>
      </main>

      <footer className="fixed bottom-0 left-0 w-full border-t border-gray-400 pt-5 text-sm text-center">
        <p>© {new Date().getFullYear()} AMIKUNA - Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Login;
