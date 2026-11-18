const express = require("express")
const { registrar, login } = require("../controllers/authController")
const limitarLogin = require("../middlewares/limitarLogin")

const router = express.Router()

// Rutas públicas (no necesitan token)
router.post("/usuarios", registrar)
router.post("/login", limitarLogin, login)

module.exports = router
