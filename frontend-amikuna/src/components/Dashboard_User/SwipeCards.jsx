import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import fetchDataBackend from "../../helpers/fetchDataBackend";

const SwipeCards = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const cargarUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token almacenado");

      const data = await fetchDataBackend("estudiantes/matches", token);
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error.message);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleSwipe = (dir) => {
    setDirection(dir);
    setTimeout(() => {
      setIndex((prev) => prev + 1);
      setDirection(null);
    }, 400);
  };

  const variants = {
    left: { x: "-100%", opacity: 0, rotate: -20 },
    up: { y: "-100%", opacity: 0, scale: 0.8 },
    initial: { x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 },
  };

  const usuarioActual = usuarios[index];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6">Usuarios sugeridos</h2>
      <div className="relative w-[90vw] max-w-md h-[60vh] flex items-center justify-center">
        <AnimatePresence>
          {usuarioActual && (
            <motion.div
              key={usuarioActual._id}
              variants={variants}
              initial="initial"
              animate={direction ? direction : "initial"}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-6 absolute w-full h-full flex flex-col items-center justify-center"
            >
              {usuarioActual.imagenPerfil && (
                <img
                  src={usuarioActual.imagenPerfil}
                  alt="Foto de perfil"
                  className="w-40 h-40 object-cover rounded-full mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{usuarioActual.nombre}</h3>
              <p className="text-sm text-gray-600">
                Intereses: {usuarioActual.intereses?.join(", ") || "No definidos"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-6 mt-10">
        <button
          onClick={() => handleSwipe("left")}
          className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600"
        >
          ❌
        </button>
        <button
          onClick={() => handleSwipe("up")}
          className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600"
        >
          ❤️
        </button>
      </div>
    </div>
  );
};

export default SwipeCards;
