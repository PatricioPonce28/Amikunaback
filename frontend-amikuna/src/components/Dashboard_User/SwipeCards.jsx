import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import useUsuarios from "../../hooks/useUsuarios"; // Cambia la ruta si es necesario

const SwipeCards = () => {
  const { usuarios, loading } = useUsuarios();
  const [lastDirection, setLastDirection] = useState("");

  const swiped = (direction, nombre) => {
    console.log("Swiped " + direction + " on " + nombre);
    setLastDirection(direction);
    // Aquí podrías guardar el swipe al backend si quieres
  };

  const outOfFrame = (nombre) => {
    console.log(nombre + " salió de la pantalla");
  };

  if (loading) return <p>Cargando perfiles...</p>;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[300px] h-[400px]">
        {usuarios.map((user) => (
          <TinderCard
            className="absolute w-full h-full"
            key={user._id}
            onSwipe={(dir) => swiped(dir, user.nombre)}
            onCardLeftScreen={() => outOfFrame(user.nombre)}
            preventSwipe={["up", "down"]}
          >
            <div className="bg-white rounded-xl shadow-lg p-4 text-center h-full">
              <img
                src={user.imagenPerfil}
                alt={user.nombre}
                className="rounded w-full mb-2 h-3/5 object-cover"
              />
              <h3 className="text-xl font-bold">{user.nombre}</h3>
              <p className="text-sm text-gray-500">{user.genero} - {user.orientacion}</p>
              <p className="text-sm">Intereses: {user.intereses?.join(", ")}</p>
            </div>
          </TinderCard>
        ))}
      </div>
      {lastDirection && (
        <p className="mt-4 text-sm text-gray-600">
          Último swipe: {lastDirection}
        </p>
      )}
    </div>
  );
};

export default SwipeCards;
