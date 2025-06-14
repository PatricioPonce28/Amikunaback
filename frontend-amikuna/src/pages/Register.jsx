import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import logoAmikuna from "../assets/Logo.png";
import loginImage from "../assets/reegistro1.avif";




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
    
    // ✅ Solo mostramos el mensaje, sin redirigir automáticamente
    toast.success(data.msg || "Registro exitoso. Revisa tu correo para confirmar.");
    
  } catch (error) {
    toast.error(error.response?.data?.msg || error.message || "Error desconocido");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <ToastContainer />
 {/* Columna izquierda - Registro */}
      <div className="md:w-1/2 w-full flex flex-col justify-start items-center p-6 bg-white">
        <div className="flex items-center mb-4">
          <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px]">
            <img src={logoAmikuna} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold ml-2 font-serif">AMIKUNA</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-6 w-full max-w-sm">
<h2 className="text-3xl md:text-4xl font-bold text-center mb-1 mt-15">Unete ahora!</h2>

         <div className="flex flex-col gap-4">
  <label className="text-sm font-medium">Nombre</label>
  <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="p-2 border border-black-300 rounded-lg text-sm" required />

  <label className="text-sm font-medium">Apellido</label>
  <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} className="p-2 border border-black-300 rounded-lg text-sm" required />

  <label className="text-sm font-medium">Correo electrónico</label>
  <input type="email" name="email" value={formData.email} onChange={handleChange} className="p-2 border border-black-300 rounded-lg text-sm" required />

  <label className="text-sm font-medium">Contraseña</label>
  <input type="password" name="password" value={formData.password} onChange={handleChange} className="p-2 border border-black-300 rounded-lg text-sm" required />

  <label className="text-sm font-medium">Confirma la Contraseña</label>
  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="p-2 border border-black-300 rounded-lg text-sm" required />
</div>


          <button
            type="submit"
            className="mt-9 text-sm font-semibold px-4 py-2 rounded-full bg-white text-black border border-black-400 hover:bg-gray-100 transition-all"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
          <button
  type="button"
  onClick={() => navigate("/")}
  className="mt-4 text-sm font-semibold px-4 py-2 rounded-full bg-white text-black border border-black-400 hover:bg-gray-100 transition-all"
>
  Regresar
</button>

          
        </form>
      </div>

      {/* Columna derecha - Imagen */}
      <div className="md:w-1/2 w-full hidden md:flex">
        <img src={loginImage} alt="Decoración" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default Register;