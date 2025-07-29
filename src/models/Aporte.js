import mongoose from "mongoose"

const aporteSchema = new mongoose.Schema({
  estudianteNombre: String,
  estudianteEmail: String,
  cantidad: Number,
  motivo: String,
  fecha: { type: Date, default: Date.now },
  estado: { type: String, enum: ["Exitoso", "Fallido"], default: "Exitoso" },
  stripeId: String
})

export default mongoose.model("Aporte", aporteSchema)
