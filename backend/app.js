const express = require("express")
const cors = require("cors")
const authRoutes = require("./routes/auth")
const usuariosRoutes = require("./routes/usuarios")
const { rutaNoEncontrada, manejarErrores } = require("./middlewares/manejarErrores")

const app = express()

// En internet (Render, Railway...) hay un proxy delante: TRUST_PROXY=1 permite ver la IP real
if (process.env.TRUST_PROXY) app.set("trust proxy", Number(process.env.TRUST_PROXY))

// 1. Middlewares globales (se ejecutan en TODAS las peticiones)
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }))
app.use(express.json())

// 2. Rutas
app.get("/", (req, res) => {
  res.send("Hola desde el servidor!")
})
app.use(authRoutes)
app.use(usuariosRoutes)

// 3. Si ninguna ruta coincidió -> 404
app.use(rutaNoEncontrada)

// 4. Manejo de errores (siempre al final)
app.use(manejarErrores)

module.exports = app
