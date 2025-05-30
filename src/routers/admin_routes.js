import {Router} from 'express'
import { registro } from '../controllers/admin_controllers.js'

const router = Router()


router.post('/registro',registro)

export default router