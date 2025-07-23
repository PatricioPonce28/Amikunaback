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
    <div>
      {!editMode ? (
        <>
          <h2>{perfil.nombre}</h2>
          <p>{perfil.biografia}</p>
          <p>Género: {perfil.genero}</p>
          <p>Intereses: {perfil.intereses?.join(", ")}</p>
          {perfil.imagenPerfil && <img src={perfil.imagenPerfil} alt="Perfil" width={150} />}
          <br />
          <button onClick={() => setEditMode(true)}>Editar Perfil</button>
        </>
      ) : (
        <>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
          />
          <textarea
            name="biografia"
            value={formData.biografia}
            onChange={handleChange}
            placeholder="Biografía"
          />
          <input
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            placeholder="Género"
          />
          <input
            name="intereses"
            value={formData.intereses}
            onChange={handleChange}
            placeholder="Intereses separados por coma"
          />
          <br />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {formData.imagenPerfil && <img src={formData.imagenPerfil} alt="Preview" width={150} />}
          <br />
          <button onClick={handleSave}>Guardar</button>
          <button onClick={() => setEditMode(false)}>Cancelar</button>
        </>
      )}
    </div>
  );
};

export default PerfilUsuario;
