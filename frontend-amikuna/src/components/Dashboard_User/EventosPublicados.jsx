import React from "react";

// Recibimos las nuevas props para las funciones de asistencia
const EventosPublicados = ({ 
  eventos = [], 
  loading = false, 
  onConfirmar, 
  onRechazar, 
  cargandoAsistencia 
}) => {
  
  // Manejadores de eventos que llamarán a las funciones pasadas por props
  const handleConfirmar = async (idEvento) => {
    // La función 'onConfirmar' ya incluye el manejo de la petición y los toasts
    await onConfirmar(idEvento);
  };

  const handleRechazar = async (idEvento) => {
    // La función 'onRechazar' también maneja la petición y los toasts
    await onRechazar(idEvento);
  };

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
              key={evento._id || index} // Usamos '_id' si está disponible, si no, 'index'
              className="bg-blue-100 p-2 rounded shadow"
            >
              <p className="font-medium">{evento.titulo}</p>
              <p className="text-sm text-gray-700">{evento.descripcion}</p>
              <p className="text-xs text-gray-500">
                {new Date(evento.fecha).toLocaleString()}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleConfirmar(evento._id)}
                  disabled={cargandoAsistencia}
                  className="bg-green-500 text-white text-xs px-3 py-1 rounded-full hover:bg-green-600 disabled:opacity-50"
                >
                  Asistir
                </button>
                <button
                  onClick={() => handleRechazar(evento._id)}
                  disabled={cargandoAsistencia}
                  className="bg-red-500 text-white text-xs px-3 py-1 rounded-full hover:bg-red-600 disabled:opacity-50"
                >
                  No Asistir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventosPublicados;