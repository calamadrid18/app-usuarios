const { rateLimit } = require("express-rate-limit")

// Protege el login contra ataques de fuerza bruta (probar miles de contraseñas).
// Cada IP tiene 5 intentos FALLIDOS cada 15 minutos; después responde 429.
const limitarLogin = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 5,
  skipSuccessfulRequests: true, // los logins correctos no cuentan como intentos
  standardHeaders: true, // informa el límite en los headers RateLimit
  legacyHeaders: false,
  message: { error: "Demasiados intentos fallidos. Espera 15 minutos e inténtalo de nuevo" },
})

module.exports = limitarLogin
