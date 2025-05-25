import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './users.js'; // Importa el modelo User
import '../database.js';

dotenv.config();

const crearAdmin = async () => {
  try {
    // Usar la URI de producción o local según disponibilidad
    const mongoUri = process.env.MONGODB_URI_PRODUCTION;
    
    // Verificar que la URI existe
    if (!mongoUri) {
      console.error('No se encontró MONGODB_URI_PRODUCTION ni MONGO_URI_LOCAL en el archivo .env');
      console.error('Variables disponibles:', Object.keys(process.env).filter(key => key.includes('MONGO')));
      process.exit(1);
    }

    console.log('Conectando a MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Conexión exitosa a MongoDB');

    const existe = await User.findOne({ email: 'admin@epn.edu.ec' });
    if (existe) {
      console.log('El administrador ya existe');
      await mongoose.disconnect();
      process.exit();
    }

    const admin = new User({
      nombre: 'Administrador General',
      email: 'admin@epn.edu.ec',
      password: await new User().encryptPassword('admin123'),
      // Agregar rol de admin si tu modelo lo requiere
      rol: 'admin' // opcional, dependiendo de tu esquema
    });

    await admin.save();
    console.log('Administrador principal creado exitosamente');
    
    await mongoose.disconnect();
    process.exit();
  } catch (error) {
    console.error('Error al crear administrador:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

crearAdmin();