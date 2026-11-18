const Usuario = require("../models/usuario")
const crearError = require("../utils/crearError")

// Nota: en Express 5, si una función async lanza un error,
// Express lo manda solo al middleware manejarErrores. Por eso no hay try/catch.

// GET /usuarios
const listarUsuarios = async (req, res) => {
  const usuarios = await Usuario.find().sort({ createdAt: -1 })
  res.json(usuarios)
}

// Lógica compartida para editar un usuario.
// Lista blanca: solo se pueden cambiar el nombre y el email.
const guardarCambios = async (id, body, res) => {
  const { nombre, email } = body

  // Solo cambiamos los campos que llegaron
  const cambios = {}
  if (nombre !== undefined) cambios.nombre = nombre
  if (email !== undefined) cambios.email = email

  const usuarioActualizado = await Usuario.findByIdAndUpdate(id, cambios, {
    new: true, // devuelve el usuario ya actualizado
    runValidators: true, // aplica las reglas del modelo también al editar
  })

  if (!usuarioActualizado) {
    throw crearError(404, "Usuario no encontrado")
  }

  res.json({ mensaje: "Usuario actualizado!", usuarioActualizado })
}

// PUT /usuarios/:id -> el id viene de la URL (por eso la ruta usa soloElMismo)
const actualizarUsuario = (req, res) => guardarCambios(req.params.id, req.body, res)

// PUT /perfil -> el id viene del token: es imposible editar a otra persona
const actualizarPerfil = (req, res) => guardarCambios(req.usuarioId, req.body, res)

// DELETE /usuarios/:id
const eliminarUsuario = async (req, res) => {
  const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id)
  if (!usuarioEliminado) {
    throw crearError(404, "Usuario no encontrado")
  }
  res.json({ mensaje: "Usuario eliminado!" })
}

// GET /perfil -> los datos del dueño del token
const verPerfil = async (req, res) => {
  const usuario = await Usuario.findById(req.usuarioId)
  if (!usuario) {
    throw crearError(404, "Usuario no encontrado")
  }
  res.json(usuario)
}

// DELETE /perfil -> borra la cuenta del dueño del token
const eliminarPerfil = async (req, res) => {
  const usuarioEliminado = await Usuario.findByIdAndDelete(req.usuarioId)
  if (!usuarioEliminado) {
    throw crearError(404, "Usuario no encontrado")
  }
  res.json({ mensaje: "Tu cuenta fue eliminada" })
}

module.exports = {
  listarUsuarios,
  actualizarUsuario,
  actualizarPerfil,
  eliminarUsuario,
  verPerfil,
  eliminarPerfil,
}
