import React from "react";
import Navbar from "../components/Navbar";
import logoAmikuna from "../assets/logoAmikuna.jpeg"; // Asegúrate que esta ruta es correcta
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
  <div className="bg-tinder-gradient text-black p-4 min-h-screen">

      {/* Header con tamaño fijo y alineación precisa */}
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
          <h1 className="text-5xl font-bold ml-3"> {/* 12px de margen izquierdo */}
            AMIKUNA
          </h1>
        </div>
      </header>

      {/* Navbar */}
<div className="my-4">
  <Navbar />
</div>

{/* Main Section */}
<main className=" contain-items items-center-safe    mt-22 mx-22 text-black">

 <p className="mt-6 text-8xl font-bold w-full text-left">
  Desliza - Explora - Comparte 
</p>

<NavLink to="/register">
  <button className="mt-15 text-4xl font-bold w-auto px-8 py-6 rounded-full transition-colors duration-300 hover-bg-color-black_pur hover:text-white mx-auto block">
    Regístrate
  </button>
</NavLink>

  <h2 className="text-4xl font-bold mt-6">Consigue la app</h2>
</main>

{/* Footer */}
<footer className="fixed bottom-0 left-0 w-full border-t border-gray-400 pt-5 text-sm text-center ">
  <p>© {new Date().getFullYear()} AMIKUNA - Todos los derechos reservados.</p>
</footer>



    </div>
  );
};

export default Home;
