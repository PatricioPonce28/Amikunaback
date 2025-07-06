import {Router} from 'express'
import { completarPerfil, chatEstudiante   } from '../controllers/estudiante_controllers.js'
import {verificarTokenJWT} from '../middlewares/JWT.js'

const router = Router()

router.put('/perfil/completar', verificarTokenJWT, completarPerfil)

router.post('/perfil/chat', verificarTokenJWT, chatEstudiante);

export default router 