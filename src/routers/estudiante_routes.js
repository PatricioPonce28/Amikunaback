import {Router} from 'express'
import { completarPerfil  } from '../controllers/estudiante_controllers.js'
import {verificarTokenJWT} from '../middlewares/JWT.js'

const router = Router()

router.put('/perfil/completar', verificarTokenJWT, completarPerfil)

export default router 