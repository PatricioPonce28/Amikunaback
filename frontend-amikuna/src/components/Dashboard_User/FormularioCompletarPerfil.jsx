import React, { useState } from "react";

const FormularioCompletarPerfil = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || "",
    biografia: initialData?.biografia || "",
    intereses: initialData?.intereses ? initialData.intereses.join(", ") : "",
    genero: initialData?.genero || "",
    orientacion: initialData?.orientacion || "",
    fechaNacimiento: initialData?.fechaNacimiento ? initialData.fechaNacimiento.split("T")[0] : "",
  });

  const [imagenArchivo, setImagenArchivo] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(initialData?.imagenPerfil || "");

  // Actualiza campos texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Captura archivo y genera preview
  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenArchivo(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  // Cuando envías el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convertir intereses a array
    const interesesArray = formData.intereses
      .split(",")
      .map(i => i.trim())
      .filter(Boolean);

    // Construir FormData para enviar archivo + texto
    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("biografia", formData.biografia);
    data.append("genero", formData.genero);
    data.append("orientacion", formData.orientacion);
    data.append("fechaNacimiento", formData.fechaNacimiento);
    // Envía intereses como JSON string para backend
    data.append("intereses", JSON.stringify(interesesArray));

    if (imagenArchivo) {
      data.append("imagenPerfil", imagenArchivo);
    }

    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </label>

      <label>
        Biografía:
        <textarea
          name="biografia"
          value={formData.biografia}
          onChange={handleChange}
          className="w-full border p-2 rounded"
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
        />
      </label>

      <label>
        Imagen de perfil:
        <input
          type="file"
          accept="image/*"
          onChange={handleImagenChange}
          className="w-full border p-2 rounded"
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
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormularioCompletarPerfil;
