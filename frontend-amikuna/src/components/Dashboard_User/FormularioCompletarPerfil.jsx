import React, { useState } from "react";

const FormularioCompletarPerfil = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || "",
    biografia: initialData?.biografia || "",
    intereses: initialData?.intereses ? initialData.intereses.join(", ") : "",
    genero: initialData?.genero || "",
    orientacion: initialData?.orientacion || "",
    fechaNacimiento: initialData?.fechaNacimiento ? initialData.fechaNacimiento.split("T")[0] : "",
    imagenPerfil: initialData?.imagenPerfil || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convierte intereses a array
    const interesesArray = formData.intereses.split(",").map(i => i.trim()).filter(Boolean);
    onSave({ ...formData, intereses: interesesArray });
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

      <div className="flex justify-between gap-4 mt-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
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
