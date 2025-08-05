import {Router} from 'express'
import { completarPerfil, chatEstudiante,  listarPotencialesMatches, seguirUsuario, listarMatches, obtenerPerfilCompleto, 
    obtenerEventos, confirmarAsistencia, rechazarAsistencia, abrirChatCon, enviarMensaje, obtenerMensajes,
    crearAporte, iniciarChat
  } from '../controllers/estudiante_controllers.js'
import {verificarTokenJWT, } from '../middlewares/JWT.js'
import { perfilCompleto } from '../middlewares/perfilCompleto.js'
import { injectIO } from "../middlewares/injectIO.js";


const router = Router();

// Ruta para actualizar perfil
router.put("/completarPerfil", verificarTokenJWT, completarPerfil);

// Ruta para chatbot
router.post('/perfil/chat', verificarTokenJWT, chatEstudiante);

// Nueva ruta para obtener perfil completo
router.get('/perfil', verificarTokenJWT, obtenerPerfilCompleto);

router.get("/matches", verificarTokenJWT, perfilCompleto, listarPotencialesMatches);

// Endpoint clave y genera el match
router.post("/seguir/:idSeguido", verificarTokenJWT, perfilCompleto, seguirUsuario);

// Listar Matches
router.get("/listarmatches", verificarTokenJWT, perfilCompleto, listarMatches);


// Ruta para obtener los eventos creados
router.get("/ver-eventos", verificarTokenJWT, perfilCompleto, obtenerEventos);

// Asistir al evento 
router.post("/asistir/:idEvento", verificarTokenJWT, confirmarAsistencia);

// No asistir al evento 
router.post("/no-asistir/:idEvento", verificarTokenJWT, rechazarAsistencia);

// Probar Estos 3 endpoitns cuando el Jhonn me siga
// routes/chatRoutes.js
router.post('/chat-con-match/:otroUserId', verificarTokenJWT, injectIO, iniciarChat );
// Chat 1
router.post("/chat/:idOtro", verificarTokenJWT, perfilCompleto, abrirChatCon);
// Enviar mensaje
router.post("/chat/:chatId/mensaje", verificarTokenJWT, injectIO, enviarMensaje);
// Obtener mensaje
router.get("/chat/:chatId", verificarTokenJWT, obtenerMensajes);
// Pasarela para aporte 
router.post("/aportes", verificarTokenJWT, crearAporte);


export default router 