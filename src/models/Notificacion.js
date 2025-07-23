const mongoose = require('mongoose');

const notificacionSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  mensaje: { type: String, required: true },
  evento: { type: mongoose.Schema.Types.ObjectId, ref: 'evento' },
  leida: { type: Boolean, default: false },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('notificacion', notificacionSchema);
