import app from './server.js'
import connection from './database.js'
import http from 'http'
import { initSocket } from "../src/sockets/socket.js";


connection()
console.log("Conectado a MongoDB")

console.log()

const server = http.createServer(app);
initSocket(server);


app.listen(app.get('port'), () => {
  console.log(`Servidor escuchando en el puerto ${app.get('port')}`);
});
