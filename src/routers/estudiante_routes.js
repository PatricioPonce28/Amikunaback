import { Router } from 'express';
import { completarPerfil, chatEstudiante, obtenerPerfilCompleto } from '../controllers/estudiante_controllers.js';
import { verificarTokenJWT } from '../middlewares/JWT.js';

const router = Router();

// Ruta para actualizar perfil
router.put("/completarPerfil", verificarTokenJWT, completarPerfil);

// Ruta para chat con Gemini
router.post('/perfil/chat', verificarTokenJWT, chatEstudiante);

// Nueva ruta para obtener perfil completo
router.get('/perfil', verificarTokenJWT, obtenerPerfilCompleto);

export default router;
