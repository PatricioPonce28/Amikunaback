import {Router} from 'express'
import { completarPerfil, chatEstudiante,  listarPotencialesMatches, seguirUsuario, obtenerPerfilCompleto, 
    obtenerEventos, confirmarAsistencia, rechazarAsistencia
  } from '../controllers/estudiante_controllers.js'
import {verificarTokenJWT, } from '../middlewares/JWT.js'
import { perfilCompleto } from '../middlewares/perfilCompleto.js'

const router = Router();

// Ruta para actualizar perfil
router.put("/completarPerfil", verificarTokenJWT, completarPerfil);

// Ruta para chatbot
router.post('/perfil/chat', verificarTokenJWT, chatEstudiante);

// Nueva ruta para obtener perfil completo
router.get('/perfil', verificarTokenJWT, obtenerPerfilCompleto);

router.get("/matches", verificarTokenJWT, perfilCompleto, listarPotencialesMatches);

router.post("/seguir/:idSeguido", verificarTokenJWT, perfilCompleto, seguirUsuario);

// Ruta para obtener los eventos creados
router.get("/ver-eventos", verificarTokenJWT, perfilCompleto, obtenerEventos);

// Asistir al evento 
router.post("/asistir/:idEvento", verificarTokenJWT, confirmarAsistencia);

// No asistir al evento 
router.post("/no-asistir/:idEvento", verificarTokenJWT, rechazarAsistencia);


export default router 