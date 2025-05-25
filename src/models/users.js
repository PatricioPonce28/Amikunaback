// src/models/User.js
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellido: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    default: 'estudiante' 
  },
  imagenPerfil: {
    type: String, 
    default: ''
  },
  imagenesGaleria: {
    type: [String], 
    default: []
  },
  biografia: {
    type: String,
    trim: true,
    maxlength: 300
  },
  ubicacion: {
    ciudad: { type: String, default: '' },
    pais: { type: String, default: '' }
  },
  intereses: {
    type: [String],
    default: []
  },
  activo: {
    type: Boolean,
    default: true
  },
  seguidores: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  siguiendo: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  matches: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  fechaNacimiento: {
    type: Date
  },
  genero: {
    type: String,
    enum: ['hombre', 'mujer', 'otro'],
    default: 'otro'
  },
  orientacion: {
    type: String,
    enum: ['heterosexual', 'homosexual', 'bisexual', 'otro'],
    default: 'otro'
  },
  confirmEmail: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Encriptar contraseña
userSchema.methods.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Verificar contraseña
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default model('User', userSchema);
