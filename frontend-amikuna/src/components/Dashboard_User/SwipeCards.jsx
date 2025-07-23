import React, { useEffect, useState } from "react";
import fetchDataBackend from "../../helpers/fetchDataBackend";

const calcularEdad = (fechaNacimiento) => {
  if (!fechaNacimiento) return "N/A";
  const fecha = new Date(fechaNacimiento);
  const hoy = new Date();
  let edad = hoy.getFullYear() - fecha.getFullYear();
  const m = hoy.getMonth() - fecha.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) edad--;
  return edad;
};

const SwipeCards = () => {
  const [usuarios, setUsuarios] = useState([]);

  const cargarUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token almacenado");

      const data = await fetchDataBackend("estudiantes/matches", token);
      console.log("Usuarios recibidos:", data);
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error.message);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Usuarios sugeridos</h2>
      <div className="grid gap-4">
        {usuarios.length === 0 ? (
          <p>No hay usuarios para mostrar.</p>
        ) : (
          usuarios.map((usuario) => (
            <div key={usuario._id} className="bg-white shadow rounded p-4">
              <h3 className="text-lg font-semibold">{usuario.nombre}</h3>
              <p>Edad: {calcularEdad(usuario.fechaNacimiento)}</p>
              <p>Intereses: {usuario.intereses?.join(", ") || "No definidos"}</p>
              {usuario.imagenPerfil && (
                <img
                  src={usuario.imagenPerfil}
                  alt="Foto de perfil"
                  className="w-32 h-32 object-cover rounded-full mt-2"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SwipeCards;
