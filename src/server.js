// Servidor web
// requerir módulos
import express from 'express'
import dotenv from 'dotenv' 
import cors from 'cors'; 
import fileUpload from 'express-fileupload'
import { v2 as cloudinary } from 'cloudinary'
import router from './routers/admin_routes.js';
import estudianteRoutes from './routers/estudiante_routes.js'


// Inicializaciones 
const app = express()
dotenv.config()
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

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

// Rutas específicas para los estudiantes 
app.use('/api/estudiantes', estudianteRoutes) 

// Rutas que no existen 
app.use((req, res)=>{res.status(404).send("Endpoint no encontrado")})

// Exportar la instancia de express
export default app 


