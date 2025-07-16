import { useState, useEffect } from 'react';
import useFetch from './useFetch';

const useMatches = () => {
  const { fetchDataBackend } = useFetch();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarMatches = async () => {
      setLoading(true);
      try {
        const data = await fetchDataBackend("estudiantes/matches");

        setMatches(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error cargando matches:", error);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    cargarMatches();
  }, [fetchDataBackend]);

  return { matches, loading };
};

export default useMatches;
