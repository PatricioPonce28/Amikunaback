import app from './server.js'
import connection from './database.js'


connection()
console.log("Conectado a MongoDB")

console.log()



app.listen(app.get('port'), () => {
  console.log(`Servidor escuchando en el puerto ${app.get('port')}`);
});
