import users from '../models/users.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs-extra';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import Evento from '../models/Evento.js';
import { Stripe } from "stripe"
import Chat from '../models/chats.js';
import Aporte from '../models/Aporte.js';
import { injectIO } from "../middlewares/injectIO.js";

const stripe = new Stripe(`${process.env.STRIPE_PRIVATE_KEY}`)

const completarPerfil = async (req, res) => {
  try {
    const id = req.userBDD._id;

    // Extraer y normalizar datos
    const nombre = req.body.nombre?.trim();
    const biografia = req.body.biografia?.trim();
    const intereses = req.body.intereses?.split(',').map(i => i.trim()) || [];
    const genero = req.body.genero?.toLowerCase();
    const orientacion = req.body.orientacion?.toLowerCase();
    const fechaNacimiento = req.body.fechaNacimiento;
    const ubicacion = JSON.parse(req.body.ubicacion || '{}');

    // Validar campos obligatorios
    if (!nombre || !biografia || !fechaNacimiento || !genero || !orientacion || intereses.length === 0) {
      return res.status(400).json({ msg: "Por favor, completa todos los campos obligatorios." });
    }

    // Buscar al usuario
    const usuario = await users.findById(id);
    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado." });

    // Subir imagen a Cloudinary si se envió
    if (req.files?.imagenPerfil) {
      const file = req.files.imagenPerfil.tempFilePath;
      const resultado = await cloudinary.uploader.upload(file, {
        folder: 'Estudiantes'
      });
      usuario.imagenPerfil = resultado.secure_url;
      await fs.unlink(file); // borrar imagen temporal
    }
if (usuario.imagenPerfil) {
    const rutaAnterior = path.join(process.cwd(), usuario.imagenPerfil);
    if (fs.existsSync(rutaAnterior)) {
      await fs.unlink(rutaAnterior);
    }
  }
    // Actualizar campos
    usuario.nombre = nombre;
    usuario.biografia = biografia;
    usuario.intereses = intereses;
    usuario.genero = genero;
    usuario.orientacion = orientacion;
    usuario.fechaNacimiento = fechaNacimiento;
    usuario.ubicacion = ubicacion;

    // Por si no están inicializados
    usuario.activo = true;
    usuario.matches = usuario.matches || [];
    usuario.seguidores = usuario.seguidores || [];
    usuario.siguiendo = usuario.siguiendo || [];
    usuario.imagenesGaleria = usuario.imagenesGaleria || [];

    await usuario.save();

    // Limpiar respuesta
    const { password, token, __v, createdAt, updatedAt, ...perfil } = usuario.toObject();

    res.status(200).json({
      msg: "Perfil actualizado correctamente",
      perfilActualizado: perfil
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor al actualizar el perfil" });
  }
};


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY )

const chatEstudiante = async (req, res) => {
  try {
    const { mensaje } = req.body;
    if (!mensaje) {
      return res.status(400).json({ msg: "Debes enviar un mensaje" });
    }

    // Obtiene el modelo generativo
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Define el prompt completo
    const prompt = `
Eres un asistente amigable en una app de citas llamada Amikuna. 
Ayudas a los usuarios a iniciar conversaciones, mejorar sus perfiles y dar consejos de relaciones de manera divertida y respetuosa. 
Responde siempre con un tono informal pero con buena ortografía. 
Además, usa lenguaje natural, y sobre todo que no parezca escrito por una IA.
Finalmente, usa jerga y expresiones de Ecuador si es posible.

Mensaje del estudiante: "${mensaje}"
`;

    // Generar respuesta
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const texto = response.text();

    res.status(200).json({ respuesta: texto });
  } catch (error) {
    console.error("Error con Gemini:", error);
    res.status(500).json({ 
      msg: "Error interno al consultar",
      error: error.message 
    });
  }
};
const obtenerPerfilCompleto = async (req, res) => {
  try {
    const usuario = await users.findById(req.userBDD._id).select('-password -token -__v -createdAt -updatedAt');
    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener el perfil completo" });
  }
};


const listarPotencialesMatches = async (req, res) => {
  const yo = req.userBDD;

  let filtroGenero = {};
  if (yo.genero === "hombre")  filtroGenero.genero = "mujer";
  if (yo.genero === "mujer")   filtroGenero.genero = "hombre";
  if (yo.genero === "otro")    filtroGenero.genero = "otro";

  const perfiles = await users.find({
    _id: { $ne: yo._id },            // que no sea yo
    ...filtroGenero,
    imagenPerfil: { $ne: "" },       // tiene foto
    biografia:  { $ne: "" },         // tiene bio
    intereses: { $exists: true, $not: { $size: 0 } }
  })
  .select("-password -token -__v -updatedAt")
  .lean();

  return res.status(200).json(perfiles);
};


const seguirUsuario = async (req, res) => {
  const yoId = req.userBDD._id;
  const { idSeguido } = req.params;              

  if (yoId.toString() === idSeguido)
    return res.status(400).json({ msg: "No puedes seguirte a ti mismo" });

  const yo    = await users.findById(yoId);
  const otro  = await users.findById(idSeguido);

  if (!otro) return res.status(404).json({ msg: "Usuario no encontrado" });

  const yaLoSigo = yo.siguiendo.includes(idSeguido);
  if (yaLoSigo) {
    yo.siguiendo.pull(idSeguido);
    otro.seguidores.pull(yoId);
  } else {
    yo.siguiendo.push(idSeguido);
    otro.seguidores.push(yoId);
  }

  

  await yo.save();
  await otro.save();

  let huboMatch = false;
  let chatCreado = null;

  if (!yaLoSigo && otro.siguiendo.includes(yoId)) {
    huboMatch = true;
    chatCreado = await guardarMatch(yoId, idSeguido, req.io); // <-- req.io
  }
 
  return res.status(200).json({
    msg: yaLoSigo ? "Has dejado de seguir" : "Ahora sigues a este usuario",
    siguiendo: yo.siguiendo.length,
  });
};

const crearMatchAutomático = async (usuarioAId, usuarioBId, io) => {
  const usuarioA = await users.findById(usuarioAId);
  const usuarioB = await users.findById(usuarioBId);

  // Verificar si ya son match (para evitar duplicados)
  const yaSonMatch = usuarioA.matches.includes(usuarioBId) || usuarioB.matches.includes(usuarioAId);
  if (yaSonMatch) return null;

  // Agregar el match a ambos usuarios
  usuarioA.matches.push(usuarioBId);
  usuarioB.matches.push(usuarioAId);

  await usuarioA.save();
  await usuarioB.save();

  // Crear el chat (usando tu función existente)
  const chat = await guardarMatch(usuarioAId, usuarioBId, io);

  return chat;
};

const listarMatches = async (req, res) => {
  const usuario = await users.findById(req.userBDD._id).populate("matches", "nombre", "imagenPerfil", ); // Ajusta los campos según tu schema
  res.status(200).json(usuario.matches);
};

const obtenerEventos = async (req, res) => {
  try {
    const eventos = await Evento.find().select('-_id -__v -createdAt -updatedAt -creador');
      
    res.status(200).json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener eventos" });
  }
};

const confirmarAsistencia = async (req, res) => {
  try {
    const { idEvento } = req.params;
    const userId = req.userBDD._id;

    const evento = await Evento.findById(idEvento);
    if (!evento) return res.status(404).json({ msg: "Evento no encontrado" });

    if (!evento.asistentes.includes(userId)) {
      evento.asistentes.push(userId);
      evento.noAsistiran = evento.noAsistiran.filter(id => id.toString() !== userId.toString());
    }

    await evento.save();
    res.status(200).json({ msg: "Asistencia confirmada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al confirmar asistencia" });
  }
};

const rechazarAsistencia = async (req, res) => {
  try {
    const { idEvento } = req.params;
    const userId = req.userBDD._id;

    const evento = await Evento.findById(idEvento);
    if (!evento) return res.status(404).json({ msg: "Evento no encontrado" });

    if (!evento.noAsistiran.includes(userId)) {
      evento.noAsistiran.push(userId);
      evento.asistentes = evento.asistentes.filter(id => id.toString() !== userId.toString());
    }

    await evento.save();
    res.status(200).json({ msg: "Asistencia rechazada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al rechazar asistencia" });
  }
};

/// NADA DOCUMENTADO DE AQUÍ EN ADELANTE PILAS

const crearAporte = async (req, res) => {
  try {
    const { amount, paymentMethodId } = req.body;
    const userId = req.userBDD._id;

    // 1. Crear intento de pago en Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe trabaja en centavos
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      return_url: "http://localhost:5173/user/dashboard", // <--- Con esta ruta
    });

    // 2. Guardar en la base de datos
    const nuevoAporte = await Aporte.create({
      userId,
      amount,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status === "succeeded" ? "pagado" : "pendiente",
    });

    res.status(201).json({
      ok: true,
      mensaje: "Aporte creado exitosamente.",
      aporte: nuevoAporte,
    });
  } catch (error) {
    console.error("Error al procesar aporte:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error al crear el aporte.",
      error: error.message,
    });
  }
};


const pairKey = (id1, id2) =>
  [id1.toString(), id2.toString()].sort((a, b) => a.localeCompare(b));

const guardarMatch = async (id1, id2, io) => {
  const [a, b] = pairKey(id1, id2);

  // upsert del chat (si ya existe, lo devuelve; si no, lo crea)
  let chat = await Chat.findOneAndUpdate(
    { participantes: [a, b] },
    { $setOnInsert: { participantes: [a, b] } },
    { new: true, upsert: true }
  );

  // (opcional) crear notificaciones para ambos
  await Notificacion.create([
    { usuario: a, tipo: "match", mensaje: "¡Tienes un nuevo match!", data: { chatId: chat._id, con: b } },
    { usuario: b, tipo: "match", mensaje: "¡Tienes un nuevo match!", data: { chatId: chat._id, con: a } }
  ]);

  // emitir a ambos usuarios que ya pueden chatear (si están conectados)
  if (io) {
    io.to(a).emit("match:nuevo", { chatId: chat._id, con: b });
    io.to(b).emit("match:nuevo", { chatId: chat._id, con: a });
  }

  return chat;
};

// Crear o buscar chat entre dos usuarios
const abrirChatCon = async (req, res) => {
  try {
    const myId = req.userBDD._id;
    const { idOtro } = req.params;

    // (opcional) validar que son match antes de abrir chat
    const yo = await users.findById(myId).select("siguiendo seguidores").lean();
    const esMatch = yo.siguiendo.includes(idOtro) && yo.seguidores.includes(idOtro);
    if (!esMatch) {
      return res.status(403).json({ msg: "Solo puedes chatear con tus matches" });
    }

    // upsert del chat
    let chat = await Chat.findOne({
      participantes: { $all: [myId, idOtro] }
    });

    if (!chat) {
      chat = await Chat.create({
        participantes: [myId, idOtro],
        mensajes: []
      });
    }

    // devolverlo poblado con los datos que quieres ver
    await chat.populate({
      path: "participantes",
      select: "nombre apellido email rol genero orientacion imagenPerfil"
    });

    return res.status(200).json(chat);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Error al abrir chat" });
  }
};

// Enviar mensaje
const enviarMensaje = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { texto } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ msg: "Chat no encontrado" });

    chat.mensajes.push({ emisor: req.userBDD._id, texto });
    await chat.save();

    // Emitir el mensaje en tiempo real
    req.io.to(chatId).emit("nuevo-mensaje", {
      chatId,
      emisor: req.userBDD._id,
      texto
    });

    res.status(200).json({ msg: "Mensaje enviado", chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al enviar mensaje" });
  }
};

// Obtener mensajes del chat
const obtenerMensajes = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId).populate("mensajes.emisor", "nombre apellido");

    if (!chat) return res.status(404).json({ msg: "Chat no encontrado" });

    res.status(200).json(chat.mensajes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener mensajes" });
  }
};




export { 
  completarPerfil,
  chatEstudiante,
  obtenerPerfilCompleto, 
  listarPotencialesMatches,
  seguirUsuario,
  crearMatchAutomático,
  listarMatches,
  obtenerEventos,
  confirmarAsistencia,
  rechazarAsistencia,
  crearAporte,
  abrirChatCon,
  enviarMensaje,
  obtenerMensajes
}
