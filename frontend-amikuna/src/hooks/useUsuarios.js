import { useEffect, useState } from "react";
import useFetch from "./useFetch"; // Ajusta ruta según donde guardes useFetch

const useUsuarios = () => {
  const { fetchDataBackend } = useFetch();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const data = await fetchDataBackend("/api/usuarios", null, "GET");
        setUsuarios(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuarios();
  }, []);

  return { usuarios, loading };
};

export default useUsuarios;
