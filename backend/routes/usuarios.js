const express = require("express")
const verificarToken = require("../middlewares/verificarToken")
const soloElMismo = require("../middlewares/soloElMismo")
const {
  listarUsuarios,
  actualizarUsuario,
  actualizarPerfil,
  eliminarUsuario,
  verPerfil,
  eliminarPerfil,
} = require("../controllers/usuariosController")

const router = express.Router()

// Todas estas rutas necesitan token
router.get("/perfil", verificarToken, verPerfil)
router.put("/perfil", verificarToken, actualizarPerfil)
router.delete("/perfil", verificarToken, eliminarPerfil)

router.get("/usuarios", verificarToken, listarUsuarios)
router.put("/usuarios/:id", verificarToken, soloElMismo, actualizarUsuario)
router.delete("/usuarios/:id", verificarToken, soloElMismo, eliminarUsuario)

module.exports = router
