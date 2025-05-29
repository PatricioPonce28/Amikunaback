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

export {
  registro
}
