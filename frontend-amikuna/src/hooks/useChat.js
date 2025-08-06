// src/hooks/useChat.js

import { useState, useCallback } from 'react';
import useFetch from './useFetch';

const useChat = () => { // No toma argumentos aquí, como en tu código original
    const { fetchDataBackend } = useFetch();
    const [cargandoMensajes, setCargandoMensajes] = useState(false);
    const [error, setError] = useState(null);
    const [mensajes, setMensajes] = useState([]);

    const abrirChat = useCallback(async (idOtro) => {
        try {
            const chat = await fetchDataBackend(`estudiantes/chat-con-match/${idOtro}`, null, "POST");
            return chat;
        } catch (err) {
            setError(err.message);
            return null;
        }
    }, [fetchDataBackend]);

    const obtenerMensajes = useCallback(async (chatId) => {
        // Validación crucial: no intentar cargar mensajes si no hay un chatId
        if (!chatId) {
            console.log("ChatId no válido, no se obtienen mensajes.");
            setMensajes([]); // Limpiamos los mensajes si el chat se cierra
            return;
        }
        
        setCargandoMensajes(true);
        setError(null);
        try {
            const respuesta = await fetchDataBackend(`estudiantes/chats/${chatId}/ver-mensajes`, null, "GET");
            setMensajes(respuesta.mensajes || []);
        } catch (err) {
            setError(err.message);
            setMensajes([]);
        } finally {
            setCargandoMensajes(false);
        }
    }, [fetchDataBackend, setMensajes]);

    const enviarMensaje = useCallback(async (chatId, contenido) => {
        if (!chatId || !contenido) return null;
        try {
            const mensajeEnviado = await fetchDataBackend(`estudiantes/chats/${chatId}/mensajes`, { contenido }, "POST");
            return mensajeEnviado;
        } catch (err) {
            setError(err.message);
            return null;
        }
    }, [fetchDataBackend]);

    return { abrirChat, obtenerMensajes, enviarMensaje, cargandoMensajes, error, mensajes, setMensajes };
};

export default useChat;