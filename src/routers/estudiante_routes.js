import {Router} from 'express'
import { completarPerfil, chatEstudiante,  listarPotencialesMatches, seguirUsuario, obtenerPerfilCompleto   } from '../controllers/estudiante_controllers.js'
import {verificarTokenJWT, } from '../middlewares/JWT.js'
import { perfilCompleto } from '../middlewares/perfilCompleto.js'

const router = Router();

// Ruta para actualizar perfil
router.put("/completarPerfil", verificarTokenJWT, completarPerfil);

// Ruta para chat con Gemini
router.post('/perfil/chat', verificarTokenJWT, chatEstudiante);

// Nueva ruta para obtener perfil completo
router.get('/perfil', verificarTokenJWT, obtenerPerfilCompleto);

router.get("/matches", verificarTokenJWT, perfilCompleto, listarPotencialesMatches);

router.post("/seguir/:idSeguido", verificarTokenJWT, perfilCompleto, seguirUsuario);

// Nueva ruta para obtener perfil completo


export default router 