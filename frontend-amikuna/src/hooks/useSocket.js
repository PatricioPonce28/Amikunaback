// src/hooks/useSocket.js

import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import getAuthHeaders from "../helpers/getAuthHeaders.js";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const useSocket = (chatId, onNuevoMensaje) => {
  const [isConnected, setIsConnected] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    const authHeaders = getAuthHeaders();
    const fullToken = authHeaders?.headers?.Authorization; // <-- Se obtiene el token completo

    
    // Extraemos solo la cadena del token, quitando "Bearer "
    const token = fullToken?.startsWith('Bearer ') ? fullToken.split(' ')[1] : fullToken;


    if (!token) {
      console.error("No se encontró token de autenticación para el socket.");
      return;
    }

    // --- CONEXIÓN ÚNICA Y CORRECTA ---
    socket.current = io(SOCKET_URL, {
      auth: {
        token: token,
      },
    });

    socket.current.on('connect', () => {
      console.log('Conectado al servidor de sockets');
      setIsConnected(true);
      if (chatId) {
        socket.current.emit('join:room', chatId);
      }
    });

    socket.current.on('disconnect', () => {
      console.log('Desconectado del servidor de sockets');
      setIsConnected(false);
    });

    socket.current.on('mensaje:nuevo', onNuevoMensaje);

    return () => {
      if (socket.current) {
        socket.current.off('mensaje:nuevo', onNuevoMensaje);
        socket.current.disconnect();
      }
    };
  }, [onNuevoMensaje, chatId]);

  const enviarMensajeSocket = (contenido) => {
    if (socket.current && isConnected) {
      
      socket.current.emit('chat:mensaje', { chatId, contenido });
    }
  };

  return { isConnected, enviarMensajeSocket };
};

export default useSocket;