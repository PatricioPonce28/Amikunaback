// src/hooks/useAsistenciaEvento.js

import { useState } from 'react';
import useFetch from './useFetch';

const useAsistenciaEvento = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  
  const { fetchDataBackend } = useFetch();

  const confirmarAsistencia = async (idEvento) => {
    setCargando(true);
    setError(null);
    try {
      // Llama al endpoint POST para confirmar asistencia
      const data = await fetchDataBackend(`asistir/${idEvento}`, null, "POST");
      return data;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setCargando(false);
    }
  };

  const rechazarAsistencia = async (idEvento) => {
    setCargando(true);
    setError(null);
    try {
      // Llama al endpoint POST para rechazar asistencia
      const data = await fetchDataBackend(`no-asistir/${idEvento}`, null, "POST");
      return data;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setCargando(false);
    }
  };

  return { confirmarAsistencia, rechazarAsistencia, cargando, error };
};

export default useAsistenciaEvento;