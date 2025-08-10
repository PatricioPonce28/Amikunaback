import React, { useState, useEffect, useCallback, useRef } from "react";
import useChat from "../../hooks/useChat";
import useSocket from "../../hooks/useSocket";
import { FaTimes } from "react-icons/fa";

const ChatConversacion = ({ chatInfo, miId, onCloseChat }) => {
  const { chatId } = chatInfo;
  const { obtenerMensajes } = useChat();
  const [mensajes, setMensajes] = useState([]);
  const [textoMensaje, setTextoMensaje] = useState("");
  const messagesEndRef = useRef(null);

  const handleNuevoMensaje = useCallback((payload) => {
    setMensajes((prevMensajes) => {
      const existe = prevMensajes.some(
        (m) =>
          m.createdAt === payload.createdAt && m.contenido === payload.contenido
      );
      if (existe) return prevMensajes;
      return [...prevMensajes, payload];
    });
  }, []);

  const { isConnected, emitMessage } = useSocket(chatId, handleNuevoMensaje);

  useEffect(() => {
    const fetchMensajes = async () => {
      if (chatId) {
        const mensajesObtenidos = await obtenerMensajes(chatId);
        console.log("Mensajes obtenidos:", mensajesObtenidos);
        if (mensajesObtenidos) {
          setMensajes(mensajesObtenidos);
        }
      }
    };
    fetchMensajes();
  }, [chatId, obtenerMensajes]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  const handleEnviarMensaje = (e) => {
    e.preventDefault();
    const contenido = textoMensaje.trim();
    if (!contenido || !isConnected) return;

    emitMessage({ chatId, contenido });

    setTextoMensaje("");
  };

  return (
    <div className="fixed bottom-0 right-0 w-96 h-[400px] bg-white shadow-xl z-50 rounded-t-lg flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src={chatInfo.imagenPerfil || "https://placehold.co/40x40"}
            alt={chatInfo.nombre}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-semibold">{chatInfo.nombre}</span>
        </div>
        <button onClick={onCloseChat} className="text-gray-500 hover:text-red-600">
          <FaTimes size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mensajes.length > 0 ? (
          mensajes.map((mensaje, index) => {
            const emisorId =
              mensaje.emisor?._id?.toString() || mensaje.emisor?.toString();
            const esMensajeMio = emisorId === miId.toString();

            return (
              <div
                key={index}
                className={`flex ${esMensajeMio ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-xl ${
                    esMensajeMio ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                  }`}
                >
                  <p>{mensaje.contenido}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">
            {isConnected ? "Inicia una conversación..." : "Conectando al chat..."}
          </p>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleEnviarMensaje}
        className="p-4 border-t flex gap-2"
      >
        <input
          type="text"
          value={textoMensaje}
          onChange={(e) => setTextoMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
          disabled={!isConnected}
          className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={!isConnected || !textoMensaje.trim()}
          className="bg-blue-500 text-white px-4 rounded-full disabled:bg-gray-400"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatConversacion;
