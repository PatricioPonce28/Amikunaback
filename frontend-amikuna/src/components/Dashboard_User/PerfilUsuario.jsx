import React, { useState, useEffect } from "react";
import usePerfil from "../hooks/usePerfil";


const PerfilUsuario = () => {
  const { perfil, loading, actualizarPerfil } = usePerfil();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    biografia: "",
    genero: "",
    intereses: "",
    imagenPerfil: "",
  });

  useEffect(() => {
    if (perfil) {
      setFormData({
        nombre: perfil.nombre || "",
        biografia: perfil.biografia || "",
        genero: perfil.genero || "",
        intereses: perfil.intereses?.join(", ") || "",
        imagenPerfil: perfil.imagenPerfil || "",
      });
    }
  }, [perfil]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "tu_upload_preset_cloudinary");

    const res = await fetch("https://api.cloudinary.com/v1_1/dyjvd8jii/image/upload", {
      method: "POST",
      body: data,
    });

    const fileData = await res.json();
    setFormData((prev) => ({
      ...prev,
      imagenPerfil: fileData.secure_url,
    }));
  };

  const handleSave = async () => {
    const datosEnviar = {
      ...formData,
      intereses: formData.intereses.split(",").map((i) => i.trim()),
    };

    const success = await actualizarPerfil(datosEnviar);
    if (success) setEditMode(false);
  };

  if (loading) return <p>Cargando perfil...</p>;
  if (!perfil) return <p>No hay perfil disponible</p>;
return (
  <div className="w-full max-w-xl mx-auto p-4">
    {!editMode ? (
      <div className="bg-white rounded-xl shadow-md p-6 text-center space-y-4">
        {perfil.imagenPerfil && (
          <img
            src={perfil.imagenPerfil}
            alt="Perfil"
            className="w-32 h-32 rounded-full mx-auto object-cover"
          />
        )}
        <h2 className="text-2xl font-bold text-gray-800">{perfil.nombre}</h2>
        <p className="text-gray-600 whitespace-pre-line">{perfil.biografia}</p>
        <p className="text-gray-500">Género: {perfil.genero}</p>
        <p className="text-gray-500">
          Intereses: {perfil.intereses?.join(", ") || "No definidos"}
        </p>
        <button
          onClick={() => setEditMode(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Editar Perfil
        </button>
      </div>
    ) : (
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <input
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full p-2 border rounded-md"
        />
        <textarea
          name="biografia"
          value={formData.biografia}
          onChange={handleChange}
          placeholder="Biografía"
          className="w-full p-2 border rounded-md"
        />
        <input
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          placeholder="Género"
          className="w-full p-2 border rounded-md"
        />
        <input
          name="intereses"
          value={formData.intereses}
          onChange={handleChange}
          placeholder="Intereses separados por coma"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full"
        />
        {formData.imagenPerfil && (
          <img
            src={formData.imagenPerfil}
            alt="Preview"
            className="w-32 h-32 rounded-full object-cover mx-auto"
          />
        )}
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
          >
            Guardar
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    )}
  </div>
);
};

export default PerfilUsuario;
