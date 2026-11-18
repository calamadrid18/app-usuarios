import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { pedir } from "../api"
import { useAuth } from "../context/AuthContext"

const Registro = () => {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [enviando, setEnviando] = useState(false)
  const { estaLogueado, login } = useAuth()
  const navigate = useNavigate()

  // Si ya tiene sesión, no tiene sentido registrarse
  if (estaLogueado) {
    return <Navigate to="/perfil" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // evita que recargue la página
    setError("")
    setEnviando(true)
    try {
      await pedir("/usuarios", { method: "POST", body: { nombre, email, password } })
      await login(email, password) // inicia sesión automáticamente
      navigate("/perfil")
    } catch (err) {
      setError(err.message)
      setEnviando(false)
    }
  }

  return (
    <div className="tarjeta formulario">
      <h1>Crear cuenta</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            minLength={2}
            maxLength={50}
            required
          />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            placeholder="Mínimo 6 caracteres"
            required
          />
        </label>
        {error && <p className="mensaje error">{error}</p>}
        <button type="submit" className="boton" disabled={enviando}>
          {enviando ? "Creando..." : "Registrarme"}
        </button>
      </form>
      <p className="pie">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  )
}

export default Registro
