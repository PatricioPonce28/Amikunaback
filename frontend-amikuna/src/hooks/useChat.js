// src/hooks/useChat.js

import { useState } from 'react';
import useFetch from './useFetch';

const useChat = () => {
  const { fetchDataBackend } = useFetch();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const abrirChat = async (idOtro) => {
    setCargando(true);
    setError(null);
    try {
      // Endpoint para crear o encontrar un chat con otro usuario
      const chat = await fetchDataBackend(`estudiantes/chat/${idOtro}`, null, "POST");
      return chat;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setCargando(false);
    }
  };

  const obtenerMensajes = async (chatId) => {
    setCargando(true);
    setError(null);
    try {
      // Endpoint para obtener todos los mensajes de un chat específico
      const mensajes = await fetchDataBackend(`estudiantes/chat/${chatId}`, null, "GET");
      return mensajes;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setCargando(false);
    }
  };

  const enviarMensaje = async (chatId, texto) => {
    setCargando(true);
    setError(null);
    try {
      // Endpoint para enviar un mensaje a un chat específico
      const mensajeEnviado = await fetchDataBackend(`estudiantes/chat/${chatId}/mensaje`, { texto }, "POST");
      return mensajeEnviado;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setCargando(false);
    }
  };

  return { abrirChat, obtenerMensajes, enviarMensaje, cargando, error };
};

export default useChat;