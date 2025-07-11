import { useEffect, useState } from "react";
import useFetch from "./useFetch"; // Ajusta la ruta según tu estructura

const useUsuarios = () => {
  const { fetchDataBackend } = useFetch();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      setLoading(true);
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
  }, [fetchDataBackend]); // opcional, para evitar warning de dependencia

  return { usuarios, loading };
};

export default useUsuarios;
