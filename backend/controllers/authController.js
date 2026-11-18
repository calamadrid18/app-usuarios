const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Usuario = require("../models/usuario")
const crearError = require("../utils/crearError")

// POST /usuarios -> crear cuenta
const registrar = async (req, res) => {
  const { nombre, email, password } = req.body

  // La contraseña se valida aquí porque en la base se guarda encriptada
  if (typeof password !== "string" || password.length < 6) {
    throw crearError(400, "La contraseña debe tener al menos 6 caracteres")
  }

  const passwordEncriptada = await bcrypt.hash(password, 10)
  const nuevoUsuario = await Usuario.create({ nombre, email, password: passwordEncriptada })

  // El modelo quita la contraseña automáticamente al convertir a JSON
  res.status(201).json({ mensaje: "Usuario creado!", nuevoUsuario })
}

// POST /login -> devuelve un token
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw crearError(400, "Email y contraseña son obligatorios")
  }

  // String(...) evita que manden un objeto como { "$gt": "" } (inyección NoSQL)
  const usuario = await Usuario.findOne({ email: String(email).toLowerCase().trim() })

  // Mismo mensaje en los dos casos: así no revelamos qué emails existen
  const passwordCorrecta = usuario && (await bcrypt.compare(String(password), usuario.password))
  if (!passwordCorrecta) {
    throw crearError(401, "Email o contraseña incorrectos")
  }

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
  res.json({ mensaje: "Login exitoso!", token })
}

module.exports = { registrar, login }
