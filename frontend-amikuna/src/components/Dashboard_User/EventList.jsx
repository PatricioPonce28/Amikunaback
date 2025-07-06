import React from "react";

const EventList = () => {
  // Puedes reemplazar esto con datos reales de eventos
  const eventos = [
    { id: 1, titulo: "Conferencia de tecnología", fecha: "2025-07-10" },
    { id: 2, titulo: "Taller de React", fecha: "2025-07-15" },
  ];

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Eventos Recientes</h2>
      {eventos.length === 0 ? (
        <p>No hay eventos por el momento.</p>
      ) : (
        <ul className="list-disc pl-5">
          {eventos.map(evento => (
            <li key={evento.id}>
              <strong>{evento.titulo}</strong> - {evento.fecha}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
