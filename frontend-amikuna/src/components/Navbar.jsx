import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const activeClass = "text-white bg-color-black_pur px-4 py-2 rounded-lg font-semibold";
  const baseClass = "text-black px-6 py-2 rounded-lg transition-colors duration-300 hover-bg-color-black_pur hover:text-white";

  return (
    <div className="container mx-auto px-4 ml-14">

      <nav className="flex justify-items-normal  items-baseline mt-5 mb-6 px-5  font-poppins">

        <div className="flex gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? activeClass : baseClass} text-sm md:text-base p-6 `
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
              `${isActive ? activeClass : baseClass} text-sm md:text-base p-4`
            }
          >
            LOGIN
          </NavLink>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
