import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { pedir } from "../api"
import { useAuth } from "../context/AuthContext"

const Perfil = () => {
  const [usuario, setUsuario] = useState(null)
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [error, setError] = useState("")
  const [guardando, setGuardando] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  // Al abrir la página, pide tus datos al backend (con tu token)
  useEffect(() => {
    pedir("/perfil")
      .then((datos) => {
        setUsuario(datos)
        setNombre(datos.nombre)
        setEmail(datos.email)
      })
      .catch((err) => setError(err.message))
  }, [])

  const guardar = async (e) => {
    e.preventDefault()
    setMensaje("")
    setError("")
    setGuardando(true)
    try {
      const datos = await pedir("/perfil", {
        method: "PUT",
        body: { nombre, email },
      })
      setUsuario(datos.usuarioActualizado)
      setMensaje("Datos guardados!")
    } catch (err) {
      setError(err.message) // ej: "Ese email ya está registrado"
    }
    setGuardando(false)
  }

  const eliminarCuenta = async () => {
    if (!window.confirm("¿Seguro que quieres borrar tu cuenta? No se puede deshacer.")) return
    try {
      await pedir("/perfil", { method: "DELETE" })
      logout()
      navigate("/")
    } catch (err) {
      setError(err.message)
    }
  }

  if (!usuario) {
    return error ? <p className="mensaje error">{error}</p> : <p>Cargando...</p>
  }

  const hayCambios = nombre !== usuario.nombre || email !== usuario.email

  return (
    <div className="tarjeta formulario">
      <h1>Hola, {usuario.nombre}</h1>
      <p className="pie">Miembro desde {new Date(usuario.createdAt).toLocaleDateString()}</p>

      <h3>Editar mis datos</h3>
      <form onSubmit={guardar}>
        <label>
          Nombre
          <input
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
        {mensaje && <p className="mensaje exito">{mensaje}</p>}
        {error && <p className="mensaje error">{error}</p>}
        <button type="submit" className="boton" disabled={!hayCambios || guardando}>
          {guardando ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>

      <div className="zona-peligro">
        <h3>Zona de peligro</h3>
        <button className="boton peligro" onClick={eliminarCuenta}>
          Eliminar mi cuenta
        </button>
      </div>
    </div>
  )
}

export default Perfil
