import React, { useState } from "react";
import usePerfil from "../hooks/usePerfil";

const PerfilUsuario = () => {
  const { perfil, loading, actualizarPerfil } = usePerfil();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  if (loading) return <p>Cargando perfil...</p>;
  if (!perfil) return <p>No hay perfil disponible</p>;

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    const success = await actualizarPerfil(formData);
    if (success) setEditMode(false);
  };

  return (
    <div>
      {!editMode ? (
        <>
          <h2>{perfil.nombre}</h2>
          <p>{perfil.biografia}</p>
          {/* Más campos */}
          <button onClick={() => setEditMode(true)}>Editar Perfil</button>
        </>
      ) : (
        <>
          <input name="nombre" defaultValue={perfil.nombre} onChange={handleChange} />
          <textarea name="biografia" defaultValue={perfil.biografia} onChange={handleChange} />
          {/* Más inputs */}
          <button onClick={handleSave}>Guardar</button>
          <button onClick={() => setEditMode(false)}>Cancelar</button>
        </>
      )}
    </div>
  );
};

export default PerfilUsuario;
