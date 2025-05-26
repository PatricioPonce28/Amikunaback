import sendMailToRegister from "../config/nodemailer.js"
import users from "../models/users.js"

const registro = async (req, res) => {
    const {email, password} = req.body

    if (Object.values(req.body).includes("")) 
        return res.status(400).json({msg:"Lo sentimos, todos los campos son obligatorios"})

    
    const verificarEmailBDD = await users.findOne({email})

    
    if(verificarEmailBDD) {
        return res.status(400).json({msg:"Lo sentimos, este email ya está registrado"})
    }

    const newUser = new user(req.body)
    nuevoUser.password = await nuevoUser.encrypPassword(password)
    nuevoUser.crearToken()
    await nuevoUser.save()
    res.status(200).json({nuevoUser})
}

    
sendMailToRegister(email, token)
export {
    registro 
}