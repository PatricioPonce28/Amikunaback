import React from "react";
import useMatches from "../hooks/useMatches";

const ListaMatches = () => {
  const { matches, loading } = useMatches();

  if (loading) return <p>Cargando matches...</p>;
  if (matches.length === 0) return <p>No hay matches disponibles</p>;

  return (
    <ul>
      {matches.map(match => (
        <li key={match._id}>
          <img src={match.imagenPerfil} alt={match.nombre} width={50} />
          <span>{match.nombre}</span>
        </li>
      ))}
    </ul>
  );
};

export default ListaMatches;
