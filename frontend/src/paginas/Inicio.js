import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Inicio = () => {
  const { estaLogueado } = useAuth()

  return (
    <div className="inicio">
      <h1>Bienvenido!</h1>
      <p>App de usuarios hecha con React, Express, MongoDB y Docker.</p>
      {estaLogueado ? (
        <Link to="/perfil" className="boton">
          Ir a mi perfil
        </Link>
      ) : (
        <div className="acciones">
          <Link to="/registro" className="boton">
            Crear cuenta
          </Link>
          <Link to="/login" className="boton secundario">
            Iniciar sesión
          </Link>
        </div>
      )}
    </div>
  )
}

export default Inicio
