// src/Dashboard_Admin/EventList.jsx
import React, { useState } from 'react';

const EventList = () => {
  const [eventos, setEventos] = useState([
    { id: 1, titulo: 'Reunión general', fecha: '2025-07-01' },
    { id: 2, titulo: 'Taller de bienestar', fecha: '2025-07-05' },
  ]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Eventos</h2>
      <ul className="list-disc ml-6">
        {eventos.map(ev => (
          <li key={ev.id}>{ev.titulo} - {ev.fecha}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
