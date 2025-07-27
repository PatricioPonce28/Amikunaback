import { useEffect, useState } from "react";
import fetchDataBackend from "../helpers/fetchDataBackend"; // Asegúrate que esta función exista

const useEventosAdmin = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const obtenerEventos = async () => {
    try {
      const token = localStorage.getItem("token");  // Obtén el token
      const data = await fetchDataBackend("estudiantes/ver-eventos", token);  // Pasa el token
      setEventos(data);
    } catch (error) {
      console.error("Error al obtener eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  obtenerEventos();
}, []);

  return { eventos, loading };
};

export default useEventosAdmin;
