// Tarjeta con los datos de un usuario
const Usuario = ({ nombre, email, creado }) => {
  return (
    <div className="tarjeta usuario">
      <div className="avatar">{nombre.charAt(0).toUpperCase()}</div>
      <div>
        <h3>{nombre}</h3>
        <p>{email}</p>
        {creado && <small>Miembro desde {new Date(creado).toLocaleDateString()}</small>}
      </div>
    </div>
  )
}

export default Usuario
