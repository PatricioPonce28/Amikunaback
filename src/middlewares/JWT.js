import jwt from "jsonwebtoken";
import users from "../models/users.js";

const crearTokenJWT = (id, rol) => {
return jwt.sign({ id, rol }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const verificarTokenJWT = async (req, res, next) => {
const { authorization } = req.headers;
if (!authorization)
return res.status(401).json({ msg: "Token no proporcionado" });

try {
const token = authorization.split(" ")[1];
const { id, rol } = jwt.verify(token, process.env.JWT_SECRET);
if (rol === "admin" || rol === "estudiante") {
  req.userBDD = await users.findById(id).lean().select("-password");
  next();
} else {
  return res.status(403).json({ msg: "Acceso restringido" });
}
} catch (error) {
return res.status(401).json({ msg: "Token no válido o expirado" });
}
};

export { crearTokenJWT, verificarTokenJWT };