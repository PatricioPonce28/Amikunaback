import React from "react";

const EventosPublicados = ({ eventos = [], loading = false }) => {
  console.log(eventos);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Eventos del Administrador</h2>
      {loading ? (
        <p>Cargando eventos...</p>
      ) : eventos.length === 0 ? (
        <p>No hay eventos publicados.</p>
      ) : (
        <ul className="space-y-2">
          {eventos.map((evento, index) => (
            <li
              key={evento.titulo || index}
              className="bg-blue-100 p-2 rounded shadow"
            >
              <p className="font-medium">{evento.titulo}</p>
              <p className="text-sm text-gray-700">{evento.descripcion}</p>
              <p className="text-xs text-gray-500">
                {new Date(evento.fecha).toLocaleString()}
              </p>
              {evento.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventosPublicados;
