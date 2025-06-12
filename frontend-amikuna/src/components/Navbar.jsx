import React from "react";
import { NavLink } from "react-router-dom";
import logoAmikuna from "../assets/Logo.png";

const Navbar = () => {
const activeClass = "text-pink-600 px-4 py-2 rounded-lg font-semibold transition-colors duration-300";
const baseClass = "text-black px-6 py-2 rounded-lg transition-colors duration-300 hover:text-pink-600";

  return (
    <div className="bg-white text-black">
      <nav className="w-full flex items-center h-28 px-4 font-poppins ">

        {/* Logo */}
        <div className="flex items-center">
          <img src={logoAmikuna} alt="Logo" className="w-24 h-24 object-contain flex-shrink-0" />

        </div>

        {/* Enlaces */}
        <div className="flex gap-4 ml-4">
          <NavLink to="/" className={({ isActive }) => `${isActive ? activeClass : baseClass} text-xs md:text-sm whitespace-nowrap select-none`}>
            Inicio
          </NavLink>
          <NavLink to="/download" className={({ isActive }) => `${isActive ? activeClass : baseClass} text-xs md:text-sm whitespace-nowrap select-none`}>
            Descarga
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `${isActive ? activeClass : baseClass} text-xs md:text-sm whitespace-nowrap select-none ml-[-16px]`}>
  ¿Quiénes somos?
</NavLink>

        </div>

        {/* Botones */}
        <div className="flex gap-4">
          <NavLink to="/login">
            <button className="px-4 py-2 rounded-full bg-white text-black font-semibold border border-black 
  hover:text-pink-600 active:text-pink-600 focus:outline-none
  text-xs md:text-sm whitespace-nowrap select-none transition-colors duration-300">
  Iniciar sesión
</button>

          </NavLink>

          <NavLink to="/register">
            <button className="px-4 py-2 rounded-full bg-white text-black font-semibold border border-black 
  hover:text-pink-600 active:text-pink-600 focus:outline-none
  text-xs md:text-sm whitespace-nowrap select-none transition-colors duration-300">
  Registrate
</button>

          </NavLink>
        </div>

      </nav>
    </div>
  );
};

export default Navbar;
