import React, { useState } from "react";
import useChat from "../hooks/useChat";

const ChatAmikuna = () => {
  const { respuesta, loading, enviarMensaje } = useChat();
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;
    await enviarMensaje(mensaje);
    setMensaje("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {respuesta && (
        <div>
          <h4>Respuesta:</h4>
          <p>{respuesta}</p>
        </div>
      )}
    </div>
  );
};

export default ChatAmikuna;
