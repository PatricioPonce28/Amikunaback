import { Server } from "socket.io";
import jwt from "jsonwebtoken"; 
import users from "../models/users.js";
import Chat from "../models/chats.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: process.env.URL_FRONTEND}
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Token requerido"));

      const { id, rol } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await users.findById(id).select("_id nombre rol");
      if (!user) return next(new Error("Usuario no encontrado"));
      socket.user = user;
      // Úsalo para notificar directo al usuario
      socket.join(user._id.toString());
      next();
    } catch (e) {
      next(new Error("Token inválido"));
    }
  });

  io.on("connection", async (socket) => {
    console.log("Socket conectado:", socket.user._id.toString());

    // Unir al usuario a cada room(chat) donde participa:
    const chats = await Chat.find({ participantes: socket.user._id }).select("_id");
    chats.forEach(c => socket.join(c._id.toString()));

    // escuchar envío de mensajes
    socket.on("chat:mensaje", async ({ chatId, contenido }) => {
      if (!chatId || !contenido) return;

      // validar pertenencia
      const chat = await Chat.findById(chatId);
      if (!chat || !chat.participantes.includes(socket.user._id)) return;

      const msg = {
        emisor: socket.user._id,
        contenido
      };

      chat.mensajes.push(msg);
      chat.ultimoMensaje = contenido;
      chat.updatedAt = new Date();
      await chat.save();

      // emitir solo a los que están en el room del chat
      io.to(chatId.toString()).emit("chat:mensaje", {
        chatId,
        emisor: socket.user._id,
        contenido,
        createdAt: new Date()
      });
    });
  });

  return io;
};

export const getIO = () => io;
