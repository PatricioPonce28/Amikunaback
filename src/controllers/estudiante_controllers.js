import users from '../models/users.js'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs-extra'

const completarPerfil = async (req, res) => {
  try {
    const id = req.userBDD._id;

    // Verifica si está completo
    const user = await users.findById(id);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const {
      biografia,
      intereses,
      fechaNacimiento,
      genero,
      orientacion,
      ubicacion
    } = req.body;

    if (Object.values({ biografia, intereses, fechaNacimiento, genero, orientacion, ubicacion }).includes("")) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    // Imagen principal
    if (req.files?.imagenPerfil) {
      const resultado = await cloudinary.uploader.upload(req.files.imagenPerfil.tempFilePath, {
        folder: "Perfiles"
      });
      user.imagenPerfil = resultado.secure_url;
      await fs.unlink(req.files.imagenPerfil.tempFilePath);
    }

    // Galería (puede aceptar múltiples imágenes)
    if (req.files?.imagenesGaleria) {
      const imagenes = Array.isArray(req.files.imagenesGaleria) 
        ? req.files.imagenesGaleria 
        : [req.files.imagenesGaleria];

      const urls = [];
      for (const imagen of imagenes) {
        const resultado = await cloudinary.uploader.upload(imagen.tempFilePath, {
          folder: "Galeria"
        });
        urls.push(resultado.secure_url);
        await fs.unlink(imagen.tempFilePath);
      }
      user.imagenesGaleria = urls;
    }

    // Asignación de datos normales
    user.biografia = biografia;
    user.intereses = intereses;
    user.fechaNacimiento = fechaNacimiento;
    user.genero = genero;
    user.orientacion = orientacion;
    user.ubicacion = ubicacion;
    user.activo = true;

    // Inicializar si están undefined
    user.seguidores = user.seguidores ?? [];
    user.siguiendo = user.siguiendo ?? [];
    user.matches = user.matches ?? [];

    await user.save();

    res.status(200).json({ msg: "Perfil completado exitosamente", perfil: user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
}
