<<<<<<< HEAD
import {Router} from 'express'
import { completarPerfil, chatEstudiante,  listarPotencialesMatches, seguirUsuario   } from '../controllers/estudiante_controllers.js'
import {verificarTokenJWT, } from '../middlewares/JWT.js'
import { perfilCompleto } from '../middlewares/perfilCompleto.js'
=======
import { Router } from 'express';
import { completarPerfil, chatEstudiante, obtenerPerfilCompleto } from '../controllers/estudiante_controllers.js';
import { verificarTokenJWT } from '../middlewares/JWT.js';
>>>>>>> 0ab300bbc2490b956d29693b29980e0b7898e5ce

const router = Router();

// Ruta para actualizar perfil
router.put("/completarPerfil", verificarTokenJWT, completarPerfil);

// Ruta para chat con Gemini
router.post('/perfil/chat', verificarTokenJWT, chatEstudiante);

<<<<<<< HEAD
router.get("/matches", verificarTokenJWT, perfilCompleto, listarPotencialesMatches);

router.post("/seguir/:idSeguido", verificarTokenJWT, perfilCompleto, seguirUsuario);

export default router 
=======
// Nueva ruta para obtener perfil completo
router.get('/perfil', verificarTokenJWT, obtenerPerfilCompleto);

export default router;
>>>>>>> 0ab300bbc2490b956d29693b29980e0b7898e5ce
