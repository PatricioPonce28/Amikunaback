import app from './server.js'
import connection from './database.js'

connection()

console.log()


app.listen(app.get(`port`), ()=>{
    console.log("Server On")
})

