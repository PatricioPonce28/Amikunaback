import React from "react";
import { useNavigate } from "react-router-dom";
import usePerfilUsuarioAutenticado from "../../hooks/usePerfilUsuarioAutenticado"; 

// Este es el componente del formulario, que se encarga solo de la UI
const Formulario = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = React.useState({
    nombre: initialData?.nombre || "",
    biografia: initialData?.biografia || "",
    intereses: initialData?.intereses ? initialData.intereses.join(", ") : "",
    genero: initialData?.genero || "",
    orientacion: initialData?.orientacion || "",
    fechaNacimiento: initialData?.fechaNacimiento
      ? initialData.fechaNacimiento.split("T")[0]
      : "",
  });

  const [imagenArchivo, setImagenArchivo] = React.useState(null);
  const [imagenPreview, setImagenPreview] = React.useState(initialData?.imagenPerfil || "");
  const [guardando, setGuardando] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
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
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full border p-2 rounded" required disabled={guardando} />
      </label>
      <label>
        Biografía:
        <textarea name="biografia" value={formData.biografia} onChange={handleChange} className="w-full border p-2 rounded" disabled={guardando} />
      </label>
      <label>
        Intereses (separados por coma):
        <input type="text" name="intereses" value={formData.intereses} onChange={handleChange} className="w-full border p-2 rounded" disabled={guardando} />
      </label>
      <label>
        Género:
        <input type="text" name="genero" value={formData.genero} onChange={handleChange} className="w-full border p-2 rounded" disabled={guardando} />
      </label>
      <label>
        Orientación:
        <input type="text" name="orientacion" value={formData.orientacion} onChange={handleChange} className="w-full border p-2 rounded" disabled={guardando} />
      </label>
      <label>
        Fecha de nacimiento:
        <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} className="w-full border p-2 rounded" disabled={guardando} />
      </label>
      <label>
        Imagen de perfil:
        <input type="file" accept="image/*" onChange={handleImagenChange} className="w-full border p-2 rounded" disabled={guardando} />
      </label>
      {imagenPreview && (
        <img src={imagenPreview} alt="Vista previa" className="w-32 h-32 object-cover rounded-full mx-auto" />
      )}
      <div className="flex justify-between gap-4 mt-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50" disabled={guardando}>
          {guardando ? "Guardando..." : "Guardar"}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50" disabled={guardando}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

// --- EL COMPONENTE PRINCIPAL QUE SE EXPORTARÁ ---
const FormularioCompletarPerfil = () => {
  const navigate = useNavigate();
  const { perfil, loadingPerfil, actualizarPerfil } = usePerfilUsuarioAutenticado();

  if (loadingPerfil) {
    return <p className="text-center p-4">Cargando perfil para editar...</p>;
  }

  if (!perfil) {
    return <p className="text-center text-red-500 p-4">No se pudo cargar el perfil para editar.</p>;
  }

  const handleSave = async (formData) => {
    try {
      await actualizarPerfil(formData);
      navigate("/user/dashboard");
      return true;
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
      return false;
    }
  };

  const handleCancel = () => {
    navigate("/user/dashboard");
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar Perfil</h2>
      <Formulario
        initialData={perfil}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default FormularioCompletarPerfil;
