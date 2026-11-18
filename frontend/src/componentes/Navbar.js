import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const { estaLogueado, logout } = useAuth()
  const navigate = useNavigate()

  const cerrarSesion = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="marca">
        MiApp
      </NavLink>
      <div className="enlaces">
        <NavLink to="/">Inicio</NavLink>
        {estaLogueado ? (
          <>
            <NavLink to="/usuarios">Usuarios</NavLink>
            <NavLink to="/perfil">Mi perfil</NavLink>
            <button className="boton secundario" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Iniciar sesión</NavLink>
            <NavLink to="/registro" className="boton">
              Crear cuenta
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
