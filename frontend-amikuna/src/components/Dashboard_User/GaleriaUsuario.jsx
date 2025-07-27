import React, { useEffect, useState } from "react";

const GaleriaUsuario = ({
  idOtroUsuario,
  miId,
  token,
  esPropietario = false,
  actualizarPerfil,
  perfilCompleto,
}) => {
  const [imagenes, setImagenes] = useState([]);
  const [matchConfirmado, setMatchConfirmado] = useState(false);

  useEffect(() => {
    const obtenerGaleria = async () => {
      try {
        if (esPropietario) {
          const perfilRes = await fetch("http://localhost:3000/api/estudiantes/perfil", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const perfil = await perfilRes.json();
          setImagenes(perfil.imagenesGaleria || []);
          setMatchConfirmado(true);
          return;
        }

        const matchRes = await fetch("http://localhost:3000/api/estudiantes/matches", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const lista = await matchRes.json();
        const perfil = lista.find((u) => u._id === idOtroUsuario);

        if (perfil) {
          setMatchConfirmado(true);
          setImagenes(perfil.imagenesGaleria || []);
        }
      } catch (error) {
        console.error("Error al cargar galería:", error.message);
      }
    };

    obtenerGaleria();
  }, [idOtroUsuario, miId, token, esPropietario]);

  const construirPerfilActualizado = (imagenesActualizadas) => {
    return {
      ...perfilCompleto,
      imagenesGaleria: imagenesActualizadas,
      intereses: Array.isArray(perfilCompleto.intereses)
        ? perfilCompleto.intereses.join(',')
        : perfilCompleto.intereses || '',
      ubicacion: typeof perfilCompleto.ubicacion === 'object'
        ? JSON.stringify(perfilCompleto.ubicacion)
        : perfilCompleto.ubicacion || '{}',
    };
  };

  const handleAgregarImagenes = async (e) => {
    const archivos = Array.from(e.target.files);
    const nuevasUrls = [];

    for (const file of archivos) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "amikuna-estudiante");
      data.append("folder", `usuarios/${miId}`);
      data.append("public_id", `galeria_${Date.now()}`);

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dyjvd8jii/image/upload", {
          method: "POST",
          body: data,
        });

        if (!res.ok) throw new Error("Error al subir imagen");

        const fileData = await res.json();
        nuevasUrls.push(fileData.secure_url);
      } catch (error) {
        console.error("Error subiendo imagen:", error.message);
      }
    }

    const imagenesActualizadas = [...imagenes, ...nuevasUrls];
    setImagenes(imagenesActualizadas);

    if (actualizarPerfil) {
      const perfilActualizado = construirPerfilActualizado(imagenesActualizadas);
      await actualizarPerfil(perfilActualizado);
    }
  };

  const handleEliminarImagen = async (index) => {
    const imagenesActualizadas = imagenes.filter((_, i) => i !== index);
    setImagenes(imagenesActualizadas);

    if (actualizarPerfil) {
      const perfilActualizado = construirPerfilActualizado(imagenesActualizadas);
      await actualizarPerfil(perfilActualizado);
    }
  };

  if (!matchConfirmado) {
    return <p className="text-center text-gray-500">Solo puedes ver las fotos si hay un match mutuo.</p>;
  }

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">{esPropietario ? "Tu galería" : "Galería del usuario"}</h3>

      {esPropietario && (
        <input type="file" multiple accept="image/*" onChange={handleAgregarImagenes} />
      )}

      {imagenes.length === 0 ? (
        <p className="text-center text-gray-400 mt-4">
          {esPropietario ? "Aún no has subido imágenes." : "Este usuario no tiene imágenes públicas."}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {imagenes.map((url, i) => (
            <div key={i} className="relative">
              <img
                src={url}
                alt={`Imagen ${i + 1}`}
                className="rounded-lg shadow-md object-cover w-full h-40"
              />
              {esPropietario && (
                <button
                  onClick={() => handleEliminarImagen(i)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 py-1 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GaleriaUsuario;
