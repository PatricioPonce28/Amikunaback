import React, { useEffect, useState } from "react";
import storeProfile from "../context/storeProfile";
import storeAuth from '../context/storeAuth';
import TinderCard from "react-tinder-card";

const Dashboard_Users = () => {
  const profile = storeProfile(state => state.user);
  const loadProfile = storeProfile(state => state.profile);
  const updateProfile = storeProfile(state => state.updateProfile);

  // Estados para edición
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    biografia: '',
    intereses: '',
    genero: '',
    orientacion: '',
    fechaNacimiento: '',
    imagenPerfil: '',
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Amigos simulados
  const [amigos, setAmigos] = useState([
    { _id: "a1", nombre: "José", fotoPerfil: "https://randomuser.me/api/portraits/men/10.jpg", intereses: ["gaming", "música"], ciudad: "Quito" },
    { _id: "a2", nombre: "Luisa", fotoPerfil: "https://randomuser.me/api/portraits/women/20.jpg", intereses: ["fotografía", "viajes"], ciudad: "Guayaquil" }
  ]);
  const [usuarios, setUsuarios] = useState([
    { _id: "1", nombre: "Milena", edad: 23, ciudad: "Quito", intereses: ["música", "viajes"], fotoPerfil: "https://randomuser.me/api/portraits/women/65.jpg" },
    { _id: "2", nombre: "Carlos", edad: 28, ciudad: "Guayaquil", intereses: ["fútbol", "cine"], fotoPerfil: "https://randomuser.me/api/portraits/men/32.jpg" },
    { _id: "3", nombre: "Ana", edad: 21, ciudad: "Cuenca", intereses: ["lectura", "yoga"], fotoPerfil: "https://randomuser.me/api/portraits/women/44.jpg" }
  ]);
  const [amigoSeleccionado, setAmigoSeleccionado] = useState(null);

  // Cargar perfil al montar
  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // Actualizar formData cuando profile cambie
  useEffect(() => {
    if (profile) {
      setFormData({
        nombre: profile.nombre || '',
        apellido: profile.apellido || '',
        biografia: profile.biografia || '',
        intereses: profile.intereses ? profile.intereses.join(', ') : '',
        genero: profile.genero || '',
        orientacion: profile.orientacion || '',
        fechaNacimiento: profile.fechaNacimiento ? profile.fechaNacimiento.split('T')[0] : '',
        imagenPerfil: profile.imagenPerfil || '',
      });
      setPreviewImage(profile.imagenPerfil || null);
    }
  }, [profile]);

  // Manejar cambios de inputs
  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Manejar selección de imagen para vista previa
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Guardar cambios y enviar a backend
  const handleSave = async () => {
    try {
      const dataToSend = new FormData();
      dataToSend.append('nombre', formData.nombre);
      dataToSend.append('apellido', formData.apellido);
      dataToSend.append('biografia', formData.biografia);
      dataToSend.append('intereses', formData.intereses);
      dataToSend.append('genero', formData.genero);
      dataToSend.append('orientacion', formData.orientacion);
      dataToSend.append('fechaNacimiento', formData.fechaNacimiento);

      if (selectedFile) {
        dataToSend.append('imagenPerfil', selectedFile);
      }

      await updateProfile(dataToSend); // Función de storeProfile que hace PUT con FormData

      setEditMode(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      alert("Error actualizando perfil, revisa consola.");
    }
  };

  // Logout
  const handleLogout = () => {
    storeAuth.getState().logout();
    window.location.href = "/login";
  };

  if (!profile) return <div>Cargando perfil...</div>;

  return (
    <div className="flex flex-col md:flex-row h-screen w-full gap-4">

      {/* Lado Izquierdo */}
      <aside className="flex-[1] min-w-[280px] max-w-sm bg-gray-100 p-4 rounded shadow overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Tu Perfil</h2>

        {!editMode ? (
          <>
        <img
  src={`http://localhost:3000${profile.imagenPerfil || ''}`}
  alt="Tu foto de perfil"
  className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
/>






            <h3 className="text-lg font-bold text-center">{`${profile.nombre} ${profile.apellido}`}</h3>
            <p><strong>Biografía:</strong> {profile.biografia || 'No definida'}</p>
            <p><strong>Intereses:</strong> {profile.intereses?.join(', ') || 'No definidos'}</p>
            <p><strong>Género:</strong> {profile.genero || 'No definido'}</p>
            <p><strong>Orientación:</strong> {profile.orientacion || 'No definida'}</p>
            <p><strong>Fecha de nacimiento:</strong> {profile.fechaNacimiento ? profile.fechaNacimiento.split('T')[0] : 'No definida'}</p>

            <button
              onClick={() => setEditMode(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
            >
              Editar Perfil
            </button>

            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full"
            >
              Cerrar Sesión
            </button>

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
          </>
        ) : (
          <>
            <label className="block mb-2">
              Foto de perfil:
              <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1" />
            </label>
            {previewImage && (
              <img
                src={previewImage}
                alt="Vista previa"
                className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
              />
            )}

            <label className="block mb-2">
              Nombre:
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
              />
            </label>

            <label className="block mb-2">
              Apellido:
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
              />
            </label>

            <label className="block mb-2">
              Biografía:
              <textarea
                name="biografia"
                value={formData.biografia}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
              />
            </label>

            <label className="block mb-2">
              Intereses (separados por coma):
              <input
                type="text"
                name="intereses"
                value={formData.intereses}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
              />
            </label>

            <label className="block mb-2">
              Género:
              <input
                type="text"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
              />
            </label>

            <label className="block mb-2">
              Orientación:
              <input
                type="text"
                name="orientacion"
                value={formData.orientacion}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
              />
            </label>

            <label className="block mb-2">
              Fecha de nacimiento:
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
              />
            </label>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="flex-1 px-4 py-2 bg-gray-400 text-black rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      </aside>

      {/* Centro */}
      <main className={`transition-all duration-300 relative flex justify-center items-center shadow p-4 rounded-lg ${amigoSeleccionado ? "flex-[2]" : "flex-[3]"}`}>
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

      {/* Lado Derecho - Info amigo seleccionado */}
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
