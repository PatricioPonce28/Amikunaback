import React, { useState } from "react";
import storeAuth from '../context/storeAuth';
import { FaUser } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";

import GaleriaImagenes from "../components/Dashboard_User/GaleriaImagenes";
import FormularioCompletarPerfil from "../components/Dashboard_User/FormularioCompletarPerfil";
import SwipeCards from "../components/Dashboard_User/SwipeCards";

import usePerfilUsuarioAutenticado from "../hooks/usePerfilUsuarioAutenticado";
import useMatches from "../hooks/useMatches";

const Dashboard_Users = () => {
  const { perfil: profile, loadingPerfil, actualizarPerfil } = usePerfilUsuarioAutenticado();
  const { matches, loading: loadingMatches } = useMatches(); // ✅ usamos matches como usuarios
  const usuarios = matches;

  const [imagenesGaleria, setImagenesGaleria] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [amigoSeleccionado, setAmigoSeleccionado] = useState(null);

  const handleAgregarImagenes = (e) => {
    const archivos = Array.from(e.target.files);
    const nuevasUrls = archivos.map(file => URL.createObjectURL(file));
    setImagenesGaleria(prev => [...prev, ...nuevasUrls]);
  };

  const handleLogout = () => {
    storeAuth.getState().logout();
    window.location.href = "/login";
  };

  const handleSaveProfile = async (formData) => {
    try {
      const success = await actualizarPerfil(formData);
      if (success) setEditMode(false);
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      alert("Error actualizando perfil, revisa consola.");
    }
  };

  if (loadingPerfil) return <div>Cargando perfil...</div>;
  if (!profile) return <div>No se encontró el perfil</div>;

  return (
    <div className="flex md:flex-row h-screen w-full gap-4">
      <aside className="flex flex-col gap-4 min-w-[280px] max-w-sm bg-gray-100 p-4 rounded shadow overflow-y-auto">
        <div className="flex gap-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition duration-300"
            onClick={() => setEditMode(true)}
            title="Editar perfil"
          >
            <FaUser size={24} />
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition duration-300 flex items-center justify-center"
            title="Cerrar sesión"
          >
            <FiLogOut size={24} />
          </button>
        </div>

        {!editMode ? (
          <>
            <img
              src={profile.imagenPerfil || 'https://placehold.co/150x150'}
              alt="Tu foto de perfil"
              className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
            />
            <h3 className="text-lg font-bold text-center">{profile.nombre}</h3>
            <p><strong>Biografía:</strong> {profile.biografia || 'No definida'}</p>
            <p><strong>Intereses:</strong> {profile.intereses?.join(', ') || 'No definidos'}</p>
            <p><strong>Género:</strong> {profile.genero || 'No definido'}</p>
            <p><strong>Orientación:</strong> {profile.orientacion || 'No definida'}</p>
            <p><strong>Fecha de nacimiento:</strong> {profile.fechaNacimiento ? profile.fechaNacimiento.split('T')[0] : 'No definida'}</p>

            <GaleriaImagenes imagenes={imagenesGaleria} onAgregarImagenes={handleAgregarImagenes} />

            <hr className="my-4" />
            <h3 className="font-semibold mb-2">Matches</h3>
            <ul>
              {Array.isArray(matches) && matches.length > 0 ? matches.map((match) => (
                <li
                  key={match._id}
                  onClick={() => setAmigoSeleccionado(match)}
                  className="cursor-pointer flex items-center gap-3 mb-3 hover:bg-gray-200 p-2 rounded"
                >
                  <img
                    src={match.imagenPerfil || 'https://placehold.co/40x40'}
                    alt={match.nombre}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{match.nombre}</span>
                </li>
              )) : <li>No hay matches disponibles.</li>}
            </ul>
          </>
        ) : (
          <FormularioCompletarPerfil
            initialData={profile}
            onCancel={() => setEditMode(false)}
            onSave={handleSaveProfile}
          />
        )}
      </aside>

      <main className={`transition-all duration-300 relative flex justify-center items-center shadow p-4 rounded-lg ${amigoSeleccionado ? "flex-[2]" : "flex-[3]"}`}>
        {loadingMatches ? (
          <p>Cargando usuarios para swipes...</p>
        ) : (
          <SwipeCards usuarios={usuarios} />
        )}
      </main>

      {amigoSeleccionado && (
        <aside className="flex-[1] max-w-xs bg-gray-100 p-4 rounded shadow overflow-y-auto relative hidden md:block">
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
              src={amigoSeleccionado.imagenPerfil || 'https://placehold.co/150x150'}
              alt={amigoSeleccionado.nombre}
              className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
            />
            <h3 className="text-lg font-bold">{amigoSeleccionado.nombre}</h3>
            <p className="mb-2">Ciudad: {amigoSeleccionado.ubicacion?.ciudad || 'No definida'}</p>
            <p>Intereses: {amigoSeleccionado.intereses?.join(", ") || 'No definidos'}</p>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Dashboard_Users;
