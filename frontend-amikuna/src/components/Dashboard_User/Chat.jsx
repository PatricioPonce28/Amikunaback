import React, { useState } from "react";

const Chat = () => {
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");

  const enviarMensaje = () => {
    if (input.trim() !== "") {
      setMensajes([...mensajes, { texto: input, autor: "Tú" }]);
      setInput("");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <div className="h-40 overflow-y-auto border p-2 mb-4">
        {mensajes.map((msg, i) => (
          <div key={i} className="mb-1">
            <strong>{msg.autor}:</strong> {msg.texto}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Escribe un mensaje..."
        />
        <button
          onClick={enviarMensaje}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
