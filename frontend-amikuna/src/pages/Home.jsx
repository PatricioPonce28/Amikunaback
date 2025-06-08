import React from "react";
import logoAmikuna from "../assets/logoAmikuna.jpeg";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-tinder-gradient text-black p-4 min-h-screen">
      {/* Header con logo y título */}
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

      {/* Main Section */}
      <main className="flex flex-col items-start mt-20 mx-6 text-black">
        <p className="mt-6 text-5xl font-bold">
          Desliza - Explora - Comparte 
        </p>

        <NavLink to="/register">
          <button className="mt-10 text-2xl font-bold px-6 py-4 rounded-full transition-colors duration-300 hover:bg-purple-900 hover:text-white">
            Regístrate
          </button>
        </NavLink>

        <h2 className="text-3xl font-bold mt-6">Consigue la app</h2>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full border-t border-gray-400 pt-5 text-sm text-center">
        <p>© {new Date().getFullYear()} AMIKUNA - Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
