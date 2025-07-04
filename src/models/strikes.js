import mongoose from "mongoose";

const strikeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  razon: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  }
});

const Strike = mongoose.model("strikes", strikeSchema);
export default Strike;
