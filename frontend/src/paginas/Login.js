import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [enviando, setEnviando] = useState(false)
  const { estaLogueado, login } = useAuth()
  const navigate = useNavigate()

  if (estaLogueado) {
    return <Navigate to="/perfil" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setEnviando(true)
    try {
      await login(email, password)
      navigate("/perfil")
    } catch (err) {
      setError(err.message) // "Email o contraseña incorrectos"
      setEnviando(false)
    }
  }

  return (
    <div className="tarjeta formulario">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
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
            required
          />
        </label>
        {error && <p className="mensaje error">{error}</p>}
        <button type="submit" className="boton" disabled={enviando}>
          {enviando ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <p className="pie">
        ¿No tienes cuenta? <Link to="/registro">Créala aquí</Link>
      </p>
    </div>
  )
}

export default Login
