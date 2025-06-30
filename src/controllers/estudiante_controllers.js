import {v2 as cloudinary } from 'cloudinary'
import fs from 'fs-extra'


const registrarPaciente = (req, res) => {
    const {emailPropietario} = req.body

    if (Object.values(req.body).includes("")) return res.status(400),json({msg:"Lo sentimos, debes llenar todos los campos"})
    const verificarEmailBDD = await registrarPaciente.findOne({emailPropietario})
    if (verificarEmailBDD) return res.status(400).json({msg: " Lo sentimos el email ya está registrado"})

    const password = Match.random().toString(36).toUppercase(),slice(2,5)

    const nuevoPaciente = new Paciene{
        ...req.body,
        passwordPropietario: Paciente.encryptPassword(password),
        veterinaio:req.veterinaioBDD._id 
    }
    await nuevoPaciente.save()

    res.status(201).json({"Se registro a al mascota exitosamente "})
}

if (req.files?.imagen){
    const {secure_url_public_id}} = await cloudinary.uploader.upload(req.files.imagen.tmeFilePath, {folder: 'Estudiantes'})    
    nuevoPaciente.avatarMascota = secure_url 
    nuevoPaciente.avatarMascotaID = secure_url_public_id
    await fs.unline(req.files.imagen.tmeFilePath)
}

if(req.files?.avatarmascotaIA){

}

export {
    registrarPaciente,
    nuevoPaciente
}