import {sendMailToRegister, sendMailToRecoveryPassword} from "../config/nodemailer.js"
import users from "../models/users.js"

const registro = async (req, res) => {
  const { email, password } = req.body;

  if (Object.values(req.body).includes("")) {
    return res.status(400).json({ msg: "Lo sentimos, todos los campos son obligatorios" });
  }

  const verificarEmailBDD = await users.findOne({ email });
  if (verificarEmailBDD) {
    return res.status(400).json({ msg: "Lo sentimos, este email ya está registrado" });
  }

  const newUser = new users(req.body);
  newUser.password = await newUser.encryptPassword(password);

  // Generar token y asignarlo
  newUser.crearToken();

  await newUser.save();

  // Enviar correo de confirmación con el token
  await sendMailToRegister(email, newUser.token);

  return res.status(200).json({ msg: "Revisa tu correo electrónico para confirmar tu cuenta" });
}

const confirmarMail = async (req,res)=>{
    const token = req.params.token
    const userBDD = await users.findOne({token})
    if(!userBDD?.token) return res.status(404).json({msg:"La cuenta ya ha sido confirmada"})
    userBDD.token = null
    userBDD.confirmEmail=true
    await userBDD.save()
    res.status(200).json({msg:"Token confirmado, ya puedes iniciar sesión"}) 
}

const recuperarPassword = async(req,res)=>{
    const {email} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const userBDD = await users.findOne({email})
    if(!userBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    const token = userBDD.crearToken()
    userBDD.token=token
    await sendMailToRecoveryPassword(email,token)
    await userBDD.save()
    res.status(200).json({msg:"Revisa tu correo electrónico para reestablecer tu cuenta"})
}

const comprobarTokenPasword = async (req,res)=>{
    const {token} = req.params
    const userBDD = await users.findOne({token})
    if(userBDD?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    await userBDD.save()
    res.status(200).json({msg:"Token confirmado, ya puedes crear tu nuevo password"}) 
}

const crearNuevoPassword = async (req,res)=>{
    const{password,confirmpassword} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if(password != confirmpassword) return res.status(404).json({msg:"Lo sentimos, los passwords no coinciden"})
    const userBDD = await users.findOne({token:req.params.token})
    if(userBDD?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    userBDD.token = null
    userBDD.password = await userBDD.encryptPassword(password)
    await userBDD.save()
    res.status(200).json({msg:"Felicitaciones, ya puedes iniciar sesión con tu nuevo password"}) 
}


export {
  registro,
  confirmarMail,
  recuperarPassword,
  comprobarTokenPasword, 
  crearNuevoPassword
}
