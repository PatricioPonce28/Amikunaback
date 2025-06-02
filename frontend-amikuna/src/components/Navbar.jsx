import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const activeClass = "text-white bg-amikunaBrown px-6 py-2 rounded-lg font-semibold";
  const baseClass = "text-black  px-6 py-2 rounded-lg transition-colors duration-200";

  return (
    <div className="container mx-auto px-4">
      <nav className="flex justify-between items-center mt-5 mb-8 px-5 bg-amikunaRed font-poppins">

        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? activeClass : baseClass} text-sm md:text-base p-4`
            }
          >
            INICIO
          </NavLink>

          <NavLink
            to="/download"
            className={({ isActive }) =>
              `${isActive ? activeClass : baseClass} text-sm md:text-base p-4`
            }
          >
            DESCARGAR
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${isActive ? activeClass : baseClass} text-sm md:text-base p-4`
            }
          >
            QUIÉNES SOMOS
          </NavLink>
        </div>

        <div className="flex gap-6">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${isActive ? 'text-white bg-blue-600' : 'text-blue-600 hover:bg-blue-50'} p-4 rounded-lg font-medium text-sm md:text-base border border-blue-600 transition-colors`
            }
          >
            LOGIN
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              `${isActive ? 'text-white bg-green-600' : 'text-green-600 hover:bg-green-50'} p-4 rounded-lg font-medium text-sm md:text-base border border-green-600 transition-colors`
            }
          >
            REGISTRO
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
