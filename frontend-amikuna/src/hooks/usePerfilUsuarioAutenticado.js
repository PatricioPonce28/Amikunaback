import { useState, useEffect } from "react";
import useFetch from "./useFetch";

function usePerfilUsuarioAutenticado() {
  const { fetchDataBackend } = useFetch();
  const [perfil, setPerfil] = useState(null);
  const [loadingPerfil, setLoadingPerfil] = useState(true);

  const cargarPerfil = async () => {
  setLoadingPerfil(true);
  try {
    // Desactivar toast para GET para evitar bucle infinito
    const data = await fetchDataBackend("estudiantes/perfil", null, "GET", {}, false);
    setPerfil(data);
  } catch (error) {
    setPerfil(null);
    console.error("Error cargando perfil:", error);
  }
  setLoadingPerfil(false);
};
  const actualizarPerfil = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetchDataBackend("estudiantes/completarPerfil", formData, "PUT", headers, true);
      setPerfil(response.perfilActualizado || response);
      return response;
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      throw error;
    }
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  return { perfil, loadingPerfil, cargarPerfil, actualizarPerfil };
}

export default usePerfilUsuarioAutenticado;
