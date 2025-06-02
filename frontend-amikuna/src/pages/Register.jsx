import React from "react";
import Navbar from "../components/Navbar";
import logoAmikuna from "../assets/logoAmikuna.jpeg";

const Register = () => {
  return (
    <div className="p-6 font-sans">
      {/* Header */}
      <header className="flex items-center h-20"> {/* Altura fija para el header */}
              <div className="flex items-center">
                {/* Contenedor del logo con tamaño estricto */}
                <div className="inline-block relative w-[80px] h-[80px]">
        <img
          src={logoAmikuna}
          alt="Logo"
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            display: 'block'
          }}
        />
      </div>
                
                {/* Texto del título con margen exacto */}
                <h1 className="text-2xl font-bold ml-3"> {/* 12px de margen izquierdo */}
                  AMIKUNA
                </h1>
              </div>
            </header>
      {/* Navbar */}
      <Navbar />

      {/* Título */}
      <h2 className="text-2xl font-bold mt-6 mb-4">Registro de usuario</h2>

      {/* Formulario */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Nombre" className="p-2 border rounded" required />
        <input type="text" placeholder="Apellido" className="p-2 border rounded" />
        <input type="email" placeholder="Correo electrónico" className="p-2 border rounded" required />
        <input type="password" placeholder="Contraseña" className="p-2 border rounded" required />
        <input type="text" placeholder="Ciudad" className="p-2 border rounded" />
        <input type="text" placeholder="País" className="p-2 border rounded" />
        <input type="date" placeholder="Fecha de nacimiento" className="p-2 border rounded" />

        <select className="p-2 border rounded" defaultValue="">
          <option value="" disabled>Género</option>
          <option value="hombre">Hombre</option>
          <option value="mujer">Mujer</option>
          <option value="otro">Otro</option>
        </select>

        <select className="p-2 border rounded" defaultValue="">
          <option value="" disabled>Orientación</option>
          <option value="heterosexual">Heterosexual</option>
          <option value="homosexual">Homosexual</option>
          <option value="bisexual">Bisexual</option>
          <option value="otro">Otro</option>
        </select>

        <textarea placeholder="Biografía (máx. 300 caracteres)" className="p-2 border rounded col-span-full" maxLength={300} />

        <input type="text" placeholder="Intereses (separados por comas)" className="p-2 border rounded col-span-full" />

        <button type="submit" className="col-span-full mt-4 bg-[#B5651D] text-white px-6 py-2 rounded hover:bg-opacity-90">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
