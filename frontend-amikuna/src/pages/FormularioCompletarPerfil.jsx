import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FormularioCompletarPerfil = () => {
  const { fetchDataBackend } = useFetch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    biografia: "",
    intereses: "",
    genero: "",
    orientacion: "",
    fechaNacimiento: "",
    ubicacion: "",
  });

  const [imagenPerfil, setImagenPerfil] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cargar datos existentes para edición
  useEffect(() => {
    async function cargarDatos() {
      try {
        const data = await fetchDataBackend("/api/perfil", null, "GET");
        if (data) {
          setFormData({
            nombre: data.nombre || "",
            biografia: data.biografia || "",
            intereses: data.intereses ? data.intereses.join(", ") : "",
            genero: data.genero || "",
            orientacion: data.orientacion || "",
            fechaNacimiento: data.fechaNacimiento ? data.fechaNacimiento.split("T")[0] : "",
            ubicacion: data.ubicacion ? JSON.stringify(data.ubicacion) : "",
          });
        }
      } catch (error) {
        console.error("Error cargando perfil:", error);
        toast.error("No se pudieron cargar los datos del perfil");
      }
    }
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagenChange = (e) => {
    setImagenPerfil(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar JSON de ubicación
    if (formData.ubicacion) {
      try {
        JSON.parse(formData.ubicacion);
      } catch {
        toast.error("Ubicación debe ser un JSON válido");
        return;
      }
    }

    setLoading(true);

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    if (imagenPerfil) {
      form.append("imagenPerfil", imagenPerfil);
    }

    try {
      await fetchDataBackend("/api/perfil/completar", form, "POST");
      toast.success("Perfil guardado correctamente");
      navigate("/dashboard"); // Cambia a la ruta que uses
    } catch (error) {
      toast.error(error?.message || "Error al guardar perfil");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Completar Perfil</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="biografia"
          placeholder="Biografía"
          value={formData.biografia}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="intereses"
          placeholder="Intereses (separados por comas)"
          value={formData.intereses}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="genero"
          placeholder="Género"
          value={formData.genero}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="orientacion"
          placeholder="Orientación sexual"
          value={formData.orientacion}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="ubicacion"
          placeholder='Ubicación (formato JSON, ej: {"lat": -0.2, "lng": -78.5})'
          value={formData.ubicacion}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <div>
          <label className="block mb-1 font-medium">Imagen de Perfil</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Guardando..." : "Guardar Perfil"}
        </button>
      </form>
    </div>
  );
};

export default FormularioCompletarPerfil;
