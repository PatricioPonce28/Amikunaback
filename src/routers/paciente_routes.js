import {Router} from 'express'
import { registrarPaciente } from '../controllers/estudiante_controllers.js'

const router = Router()

router.post('/paciente/registro', registrarPaciente)

export default router 