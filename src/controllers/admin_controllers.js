import sendMailToRegister from "../config/nodemailer.js"
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



export {
  registro,
  confirmarMail
}
