// Servidor web
// requerir módulos
import express from 'express'
import dotenv from 'dotenv' // variables globales
import cors from 'cors'; // Hacer la comunicación backend con frontend 

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

// Exportar la instancia de express
export default app 


