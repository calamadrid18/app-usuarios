// Deja pasar solo si el ID de la URL es el mismo del token.
// Así cada usuario solo puede editar o borrar SU cuenta.
// Va siempre DESPUÉS de verificarToken (necesita req.usuarioId).
const soloElMismo = (req, res, next) => {
  if (req.usuarioId !== req.params.id) {
    return res.status(403).json({ error: "Solo puedes modificar tu propia cuenta" })
  }
  next()
}

module.exports = soloElMismo
