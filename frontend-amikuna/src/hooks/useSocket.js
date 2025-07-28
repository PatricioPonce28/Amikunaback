// src/hooks/useSocket.js

import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const useSocket = (chatId, onNuevoMensaje) => {
  const [isConnected, setIsConnected] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    // La URL de conexión al socket es la misma que la del backend
    socket.current = io(API_URL, {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    socket.current.on('connect', () => {
      console.log('Conectado al servidor de sockets');
      setIsConnected(true);
      // La lógica de unirse a la sala ya la maneja el backend
    });

    socket.current.on('disconnect', () => {
      console.log('Desconectado del servidor de sockets');
      setIsConnected(false);
    });

    // Escuchar el evento "chat:mensaje"
    socket.current.on('chat:mensaje', (mensaje) => {
      onNuevoMensaje(mensaje);
    });

    return () => {
      // Desconectarse al desmontar
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [onNuevoMensaje]); // El chatId ya no es una dependencia aquí, pues el backend lo maneja

  const enviarMensajeSocket = (contenido) => {
    if (socket.current && isConnected) {
      // Emitir el evento "chat:mensaje" con el chatId y el contenido
      socket.current.emit('chat:mensaje', { chatId, contenido });
    }
  };

  return { isConnected, enviarMensajeSocket };
};

export default useSocket;