import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "../components/Navbar";
import logoAmikuna from "../assets/logoAmikuna.jpeg";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    ciudad: "",
    pais: "",
    fechaNacimiento: "",
    genero: "",
    orientacion: "",
    biografia: "",
    intereses: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validaciones básicas
      if (!formData.nombre || !formData.apellido || !formData.email || !formData.password) {
        return toast.error("Completa todos los campos obligatorios.");
      }
      if (formData.password.length < 6) {
        return toast.error("La contraseña debe tener al menos 6 caracteres.");
      }

      const url = `${import.meta.env.VITE_BACKEND_URL}/registro`;
      const payload = {
        ...formData,
        intereses: formData.intereses.split(",").map(i => i.trim())
      };
      const { data } = await axios.post(url, payload);
      toast.success(data.msg || "Registro exitoso. Revisa tu correo para confirmar.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message || "Error desconocido");
    } finally {
      setLoading(false);
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

      <div className="my-4">
        <Navbar />
      </div>

      <main className="mt-10 mx-4 md:mx-20 text-black">
        <h2 className="text-4xl font-bold mb-6">¡Únete a AMIKUNA!</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-lg">
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="p-3 border rounded" required />
          <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" className="p-3 border rounded" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo electrónico" className="p-3 border rounded" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" className="p-3 border rounded" required />
          <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} placeholder="Ciudad" className="p-3 border rounded" />
          <input type="text" name="pais" value={formData.pais} onChange={handleChange} placeholder="País" className="p-3 border rounded" />

          <label className="block text-lg font-semibold">
            Fecha de nacimiento
            <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} className="p-3 border rounded w-full mt-2" required />
          </label>

          <select name="genero" value={formData.genero} onChange={handleChange} className="p-3 border rounded" required>
            <option value="">Seleccione género</option>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="otro">Otro</option>
          </select>

          <select name="orientacion" value={formData.orientacion} onChange={handleChange} className="p-3 border rounded" required>
            <option value="">Seleccione orientación</option>
            <option value="heterosexual">Heterosexual</option>
            <option value="homosexual">Homosexual</option>
            <option value="bisexual">Bisexual</option>
            <option value="otro">Otro</option>
          </select>

          <textarea
            name="biografia"
            value={formData.biografia}
            onChange={handleChange}
            placeholder="Biografía (máx. 300 caracteres)"
            className="p-3 border rounded col-span-full"
            maxLength={300}
          />

          <input
            type="text"
            name="intereses"
            value={formData.intereses}
            onChange={handleChange}
            placeholder="Intereses (separados por comas)"
            className="p-3 border rounded col-span-full"
          />

          <button
            type="submit"
            className="col-span-full mt-6 text-2xl font-bold px-6 py-3 rounded-full bg-[#B5651D] text-white hover:bg-opacity-90 transition-all mx-auto block"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </main>

      <footer className="fixed bottom-0 left-0 w-full border-t border-gray-400 pt-5 text-sm text-center">
        <p>© {new Date().getFullYear()} AMIKUNA - Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Register;
