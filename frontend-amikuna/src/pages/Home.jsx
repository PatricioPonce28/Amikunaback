import React from "react";
import Navbar from "../components/Navbar";
import logoAmikuna from "../assets/logoAmikuna.jpeg"; // Asegúrate que esta ruta es correcta

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
<main className="mt-3 max-w-lg mx-auto text-center">
  <p className="mt-3 text-lg">
    Descubre cómo AMIKUNA puede ayudarte a brindar apoyo a quienes más lo necesitan.
  </p>

  <button className="mt-5 px-8 py-3 bg-amikunaBrown text-white rounded-lg shadow-lg hover:bg-opacity-80 transition">
    Descargar
  </button>

  <h2 className="text-4xl font-bold mt-6">Consigue la app</h2>
</main>

{/* Footer */}
<footer className="mt-16 border-t border-gray-400 pt-5 text-sm text-center">
  <p>© {new Date().getFullYear()} AMIKUNA - Todos los derechos reservados.</p>
</footer>

    </div>
  );
};

export default Home;
