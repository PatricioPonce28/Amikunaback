// Servidor web
// requerir módulos
import express from 'express'
import dotenv from 'dotenv' 
import cors from 'cors'; 
import router from './routers/admin_routes.js';


// Inicializaciones 
const app = express()
dotenv.config()

// Configuraciones 
app.set(`port`, process.env.PORT || 3000)

app.use(cors()) // Middlewares 

// Middleware 
app.use(express.json())

// Rutas 
app.get('/',(req,res)=>{
    res.send("Server on")
})

// Rutas para admin
app.use('/api', router)

// Rutas que no existen 
app.use((req, res)=>{res.status(404).send("Endpoint no encontrado")})

// Exportar la instancia de express
export default app 


