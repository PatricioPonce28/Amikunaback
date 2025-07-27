import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FormularioCompletarPerfil = ({ initialData, onSave, onCancel }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || "",
    biografia: initialData?.biografia || "",
    intereses: initialData?.intereses ? initialData.intereses.join(", ") : "",
    genero: initialData?.genero || "",
    orientacion: initialData?.orientacion || "",
    fechaNacimiento: initialData?.fechaNacimiento
      ? initialData.fechaNacimiento.split("T")[0]
      : "",
  });

  const [imagenArchivo, setImagenArchivo] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(initialData?.imagenPerfil || "");

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  // Sincronizar estado cuando cambie initialData
  useEffect(() => {
    setFormData({
      nombre: initialData?.nombre || "",
      biografia: initialData?.biografia || "",
      intereses: initialData?.intereses ? initialData.intereses.join(", ") : "",
      genero: initialData?.genero || "",
      orientacion: initialData?.orientacion || "",
      fechaNacimiento: initialData?.fechaNacimiento
        ? initialData.fechaNacimiento.split("T")[0]
        : "",
    });
    setImagenPreview(initialData?.imagenPerfil || "");
    setImagenArchivo(null);
  }, [initialData]);

  // Limpiar URL de imagen para evitar fugas de memoria
  useEffect(() => {
    return () => {
      if (imagenPreview && imagenArchivo) {
        URL.revokeObjectURL(imagenPreview);
      }
    };
  }, [imagenPreview, imagenArchivo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenArchivo(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError(null);

    const interesesArray = formData.intereses
    .split(",")
    .map(i => i.trim())
    .filter(Boolean);

    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("biografia", formData.biografia);
    data.append("genero", formData.genero);
    data.append("orientacion", formData.orientacion);
    data.append("fechaNacimiento", formData.fechaNacimiento);
    data.append("intereses", interesesArray.join(','));

    if (imagenArchivo) {
      data.append("imagenPerfil", imagenArchivo);
    }

    try {
      const success = await onSave(data);
      if (success === false) {
        setError("Error al guardar perfil");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      setError("Error al guardar perfil");
      console.error(err);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {error && (
        <div className="text-red-600 font-semibold mb-2">{error}</div>
      )}

      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          disabled={guardando}
        />
      </label>

      <label>
        Biografía:
        <textarea
          name="biografia"
          value={formData.biografia}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          disabled={guardando}
        />
      </label>

      <label>
        Intereses (separados por coma):
        <input
          type="text"
          name="intereses"
          value={formData.intereses}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          disabled={guardando}
        />
      </label>

      <label>
        Género:
        <input
          type="text"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          disabled={guardando}
        />
      </label>

      <label>
        Orientación:
        <input
          type="text"
          name="orientacion"
          value={formData.orientacion}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          disabled={guardando}
        />
      </label>

      <label>
        Fecha de nacimiento:
        <input
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          disabled={guardando}
        />
      </label>

      <label>
        Imagen de perfil:
        <input
          type="file"
          accept="image/*"
          onChange={handleImagenChange}
          className="w-full border p-2 rounded"
          disabled={guardando}
        />
      </label>

      {imagenPreview && (
        <img
          src={imagenPreview}
          alt="Vista previa"
          className="w-32 h-32 object-cover rounded-full mx-auto"
        />
      )}

      <div className="flex justify-between gap-4 mt-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={guardando}
        >
          {guardando ? "Guardando..." : "Guardar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={guardando}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormularioCompletarPerfil;
