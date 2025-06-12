import React from "react";
import fondo from "../assets/imagen3.avif";
import segundaImagen from "../assets/rick2.webp"; 
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full">

      {/* Sección con fondo */}
      <div
        className="bg-cover bg-center min-h-screen flex flex-col items-center justify-between px-4 py-10 text-white"
        style={{ backgroundImage: `url(${fondo})` }}
      >
        {/* Contenido principal */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <main className="text-center mt-20">
            <p className="text-4xl md:text-5xl font-semibold mb-6">
              Desliza - Explora - Conócenos
            </p>
          </main>

          <footer className="mt-10 text-sm text-gray-300 text-center">
            © {new Date().getFullYear()} <strong>AMIKUNA</strong> - Todos los derechos reservados.
          </footer>
        </div>
      </div>
       {/* Segunda imagen debajo */}
<div className="w-full mt-10 relative">
  <img src={segundaImagen} alt="Imagen secundaria" className="w-full object-cover" />

  {/* Texto encima de la imagen alineado arriba y a la derecha */}
  <div className="absolute inset-0 flex flex-col justify-start items-end text-white pr-10 pt-10">
    <p className="text-5xl font-semibold mb-4">Solo y sin amigos :(</p>
    <p className="text-3xl font-semibold mb-4">Solo tomas para llenar ese vacío</p>
  </div>
</div>





      {/* Sección de texto fuera de la imagen */}
      <section className="max-w-4xl mx-auto mt-10 px-4  text-black text-sm md:text-base leading-relaxed">

        <p>

          ¿Te cuesta socializar en el campus? ¿Quieres conocer compañeros de tu carrera o de otras facultades? ¿Buscas formar grupos de estudio, encontrar amigos para proyectos o simplemente ampliar tu círculo social? AMIKUNA es la app perfecta para ti.
        </p>

        <p className="mt-4">
          Sabemos que muchos estudiantes llegan a la universidad sin conocer a nadie, y a veces es difícil romper el hielo en clases o en los pasillos. Con AMIKUNA, tienes en la palma de tu mano a miles de estudiantes universitarios que, como tú, buscan conectar con otros compañeros.
        </p>
      </section>

    </div>
  );
};

export default Home;
