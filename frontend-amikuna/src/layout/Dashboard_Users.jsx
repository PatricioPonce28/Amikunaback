import React, { useEffect, useState } from "react";
import storeProfile from "../context/storeProfile";
import TinderCard from "react-tinder-card";
import storeAuth from '../context/storeAuth';

const usuariosSimulados = [
  { _id: "1", nombre: "Milena", edad: 23, ciudad: "Quito", intereses: ["música", "viajes"], fotoPerfil: "https://randomuser.me/api/portraits/women/65.jpg" },
  { _id: "2", nombre: "Carlos", edad: 28, ciudad: "Guayaquil", intereses: ["fútbol", "cine"], fotoPerfil: "https://randomuser.me/api/portraits/men/32.jpg" },
  { _id: "3", nombre: "Ana", edad: 21, ciudad: "Cuenca", intereses: ["lectura", "yoga"], fotoPerfil: "https://randomuser.me/api/portraits/women/44.jpg" }
];

const amigosSimulados = [
  { _id: "a1", nombre: "José", fotoPerfil: "https://randomuser.me/api/portraits/men/10.jpg", intereses: ["gaming", "música"], ciudad: "Quito" },
  { _id: "a2", nombre: "Luisa", fotoPerfil: "https://randomuser.me/api/portraits/women/20.jpg", intereses: ["fotografía", "viajes"], ciudad: "Guayaquil" }
];

const Dashboard_Users = () => {
  const profile = storeProfile(state => state.user);
  const loadProfile = storeProfile(state => state.profile);

  const [amigos, setAmigos] = useState(amigosSimulados);
  const [usuarios, setUsuarios] = useState(usuariosSimulados);
  const [amigoSeleccionado, setAmigoSeleccionado] = useState(null);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full gap-4">

      {/* Lado Izquierdo */}
      <aside className="flex-[1] min-w-[200px] max-w-sm bg-gray-100 p-4 rounded shadow overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Tu Perfil</h2>
        <img
          src={profile?.imagenPerfil || "https://via.placeholder.com/150"}
          alt="Tu foto de perfil"
          className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
        />
        <h3 className="text-lg font-bold text-center">{profile?.nombre || "Usuario"}</h3>
        <p className="text-center text-gray-600 mb-2">
          Intereses: {profile?.intereses?.join(", ") || "No definido"}
        </p>

        {/* Botón de cerrar sesión */}
        <div className="text-center mt-4">
          <button
            onClick={() => {
              storeAuth.getState().logout();  // Limpia token y datos del usuario
              window.location.href = "/login"; // Redirige manualmente al login
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cerrar Sesión
          </button>
        </div>

        <hr className="my-4" />
        <h3 className="font-semibold mb-2">Amigos</h3>
        <ul>
          {amigos.map((amigo) => (
            <li
              key={amigo._id}
              onClick={() => setAmigoSeleccionado(amigo)}
              className="cursor-pointer flex items-center gap-3 mb-3 hover:bg-gray-200 p-2 rounded"
            >
              <img
                src={amigo.fotoPerfil}
                alt={amigo.nombre}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span>{amigo.nombre}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Centro */}
      <main className={`transition-all duration-300 relative flex justify-center items-center shadow p-4 rounded-lg 
        ${amigoSeleccionado ? "flex-[2]" : "flex-[3]"}`}>
        {usuarios.map((user) => (
          <TinderCard
            className="absolute"
            key={user._id}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => console.log(`Swiped ${dir} on ${user.nombre}`)}
            onCardLeftScreen={() => console.log(`${user.nombre} salió de la pantalla`)}
          >
            <div className="bg-white rounded-xl shadow-lg p-4 w-72 h-96 flex flex-col items-center">
              <img
                src={user.fotoPerfil}
                alt={user.nombre}
                className="rounded-xl w-full h-3/5 object-cover mb-3"
              />
              <h3 className="text-xl font-bold">{user.nombre}, {user.edad}</h3>
              <p className="text-gray-500">{user.ciudad}</p>
              <p className="text-sm text-center">Intereses: {user.intereses.join(", ")}</p>
            </div>
          </TinderCard>
        ))}
      </main>

      {/* Lado Derecho solo si hay amigo */}
      {amigoSeleccionado && (
        <aside className="flex-[1] max-w-xs bg-gray-100 p-4 rounded shadow overflow-y-auto relative hidden md:block">
          {/* Botón cerrar */}
          <button
            onClick={() => setAmigoSeleccionado(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
            aria-label="Cerrar"
          >
            ×
          </button>

          <h2 className="text-xl font-semibold mb-4 text-center">Info del amigo</h2>
          <div className="text-center">
            <img
              src={amigoSeleccionado.fotoPerfil}
              alt={amigoSeleccionado.nombre}
              className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
            />
            <h3 className="text-lg font-bold">{amigoSeleccionado.nombre}</h3>
            <p className="mb-2">Ciudad: {amigoSeleccionado.ciudad}</p>
            <p>Intereses: {amigoSeleccionado.intereses.join(", ")}</p>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Dashboard_Users;
