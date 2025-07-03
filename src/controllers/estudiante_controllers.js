import users from '../models/users.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs-extra';

const completarPerfil = async (req, res) => {
  try {
    const id = req.userBDD._id;

    // Extraer y normalizar datos
    const nombre = req.body.nombre?.trim();
    const biografia = req.body.biografia?.trim();
    const intereses = req.body.intereses?.split(',').map(i => i.trim()) || [];
    const genero = req.body.genero?.toLowerCase();
    const orientacion = req.body.orientacion?.toLowerCase();
    const fechaNacimiento = req.body.fechaNacimiento;
    const ubicacion = JSON.parse(req.body.ubicacion || '{}');

    // Validar campos obligatorios
    if (!nombre || !biografia || !fechaNacimiento || !genero || !orientacion || intereses.length === 0) {
      return res.status(400).json({ msg: "Por favor, completa todos los campos obligatorios." });
    }

    // Buscar al usuario
    const usuario = await users.findById(id);
    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado." });

    // Subir imagen a Cloudinary si se envió
    if (req.files?.imagenPerfil) {
      const file = req.files.imagenPerfil.tempFilePath;
      const resultado = await cloudinary.uploader.upload(file, {
        folder: 'Estudiantes'
      });
      usuario.imagenPerfil = resultado.secure_url;
      await fs.unlink(file); // borrar imagen temporal
    }

    // Actualizar campos
    usuario.nombre = nombre;
    usuario.biografia = biografia;
    usuario.intereses = intereses;
    usuario.genero = genero;
    usuario.orientacion = orientacion;
    usuario.fechaNacimiento = fechaNacimiento;
    usuario.ubicacion = ubicacion;

    // Por si no están inicializados
    usuario.activo = true;
    usuario.matches = usuario.matches || [];
    usuario.seguidores = usuario.seguidores || [];
    usuario.siguiendo = usuario.siguiendo || [];
    usuario.imagenesGaleria = usuario.imagenesGaleria || [];

    await usuario.save();

    // Limpiar respuesta
    const { password, token, __v, createdAt, updatedAt, ...perfil } = usuario.toObject();

    res.status(200).json({
      msg: "Perfil actualizado correctamente",
      perfilActualizado: perfil
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor al actualizar el perfil" });
  }
};

export { completarPerfil };
