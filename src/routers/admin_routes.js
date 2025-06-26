import {Router} from 'express'
import { comprobarTokenPasword, confirmarMail, crearNuevoPassword, recuperarPassword, registro, 
    cambiarPasswordAdmin, generarNuevaPasswordAdmin, login, perfil, actualizarPerfilAdmin} 
from '../controllers/admin_controllers.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'

const router = Router()


router.post('/registro',registro)
router.get('/confirmar/:token',confirmarMail)

router.post('/recuperarpassword',recuperarPassword)
router.get('/recuperarpassword/:token',comprobarTokenPasword)
router.post('/nuevopassword/:token',crearNuevoPassword)

// Nuevas rutas para administrador
router.put('/admin/cambiar-password', cambiarPasswordAdmin);
router.post('/admin/generar-nueva-password', generarNuevaPasswordAdmin);

// Ruta del Login
router.post('/login', login)

// Ruta protegida
router.get('/perfil', verificarTokenJWT, perfil)
router.put('/perfil/:id',verificarTokenJWT,actualizarPerfilAdmin)

export default router