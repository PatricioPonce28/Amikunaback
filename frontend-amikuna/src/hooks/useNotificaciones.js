// src/hooks/useNotificaciones.js

import { useState, useEffect } from 'react';
import usePerfilUsuarioAutenticado from "./usePerfilUsuarioAutenticado";

const useNotificaciones = () => {
  const { perfil, loadingPerfil } = usePerfilUsuarioAutenticado();
  const [solicitudes, setSolicitudes] = useState([]);
  
  // Asume que la lista de solicitudes está en alguna parte del perfil
  // Si tu backend no lo tiene, esto no funcionará
  // Una alternativa es obtener los matches y filtrar los seguidores que no se siguen
  
  useEffect(() => {
    if (perfil) {
      // Esta es la lógica que asume que una solicitud es alguien en 'seguidores'
      // que no está en 'siguiendo'.
      const misSeguidores = new Set(perfil.seguidores || []);
      const aQuienSigo = new Set(perfil.siguiendo || []);
      
      const solicitudesPendientes = Array.from(misSeguidores).filter(
        (seguidorId) => !aQuienSigo.has(seguidorId)
      );

      // En un caso real, necesitarías los datos del usuario, no solo el ID
      // Aquí, por simplicidad, solo guardamos los IDs
      setSolicitudes(solicitudesPendientes);
    }
  }, [perfil]);
  
  return { solicitudes, loading: loadingPerfil };
};

export default useNotificaciones;