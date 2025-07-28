// src/components/Dashboard_User/ChatConversacion.jsx

import React, { useState, useEffect, useCallback } from 'react';
import useChat from '../../hooks/useChat';
import useSocket from '../../hooks/useSocket';

const ChatConversacion = ({ chatId, miId }) => {
  const { obtenerMensajes } = useChat();
  const [mensajes, setMensajes] = useState([]);
  const [textoMensaje, setTextoMensaje] = useState('');

  // Callback para manejar nuevos mensajes recibidos por socket
  const handleNuevoMensaje = useCallback((mensaje) => {
    // Tu backend ya envía el mensaje completo, solo lo añadimos al estado
    setMensajes(prev => [...prev, {
        emisor: mensaje.emisor,
        contenido: mensaje.contenido,
        createdAt: mensaje.createdAt
    }]);
  }, []);

  // Usamos el hook de socket para la conexión
  const { isConnected, enviarMensajeSocket } = useSocket(chatId, handleNuevoMensaje);

  useEffect(() => {
    const fetchMensajes = async () => {
      if (chatId) {
        const mensajesObtenidos = await obtenerMensajes(chatId);
        if (mensajesObtenidos) {
          // Tu backend devuelve un array de mensajes, lo guardamos tal cual
          setMensajes(mensajesObtenidos);
        }
      }
    };
    fetchMensajes();
  }, [chatId, obtenerMensajes]);

  const handleEnviarMensaje = async (e) => {
    e.preventDefault();
    if (!textoMensaje.trim()) return;

    // Enviar el mensaje a través del socket
    enviarMensajeSocket(textoMensaje);
    
    // Optimización: mostrar el mensaje inmediatamente en la interfaz
    setMensajes(prev => [...prev, {
        emisor: miId,
        contenido: textoMensaje,
        createdAt: new Date().toISOString()
    }]);

    setTextoMensaje('');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mensajes.length > 0 ? (
          mensajes.map((mensaje, index) => (
            <div
              key={index}
              className={`flex ${mensaje.emisor === miId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-xl ${
                  mensaje.emisor === miId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                <p>{mensaje.contenido}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            {isConnected ? 'Inicia una conversación...' : 'Conectando al chat...'}
          </p>
        )}
      </div>
      <form onSubmit={handleEnviarMensaje} className="p-4 border-t">
        <input
          type="text"
          value={textoMensaje}
          onChange={(e) => setTextoMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
          disabled={!isConnected}
          className="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
      </form>
    </div>
  );
};

export default ChatConversacion;