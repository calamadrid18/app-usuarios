import { useState, useEffect } from "react"
import Usuario from "../componentes/Usuario"
import { pedir } from "../api"

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Los usuarios vienen de TU backend (ruta protegida con token)
    pedir("/usuarios")
      .then(setUsuarios)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false))
  }, [])

  if (cargando) return <p>Cargando...</p>
  if (error) return <p className="mensaje error">{error}</p>

  return (
    <div>
      <h1>Usuarios ({usuarios.length})</h1>
      <div className="lista">
        {usuarios.map(({ _id, nombre, email, createdAt }) => (
          <Usuario key={_id} nombre={nombre} email={email} creado={createdAt} />
        ))}
      </div>
    </div>
  )
}

export default Usuarios
