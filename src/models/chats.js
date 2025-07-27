import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  emisor:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  contenido:  { type: String, required: true },
  createdAt:  { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema({
  participantes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }], // siempre 2 ids (ordenados para evitar duplicados)
  mensajes:      [messageSchema],
  ultimoMensaje: { type: String, default: "" },
  updatedAt:     { type: Date, default: Date.now }
}, { timestamps: true });

chatSchema.index({ participantes: 1 }, { unique: true }); // evita chats duplicados

export default mongoose.model("chats", chatSchema);
