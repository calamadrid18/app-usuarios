// Dirección del backend. Se puede cambiar con la variable REACT_APP_API_URL
// (útil cuando subas el backend a internet).
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001"

// Función única para hablar con el backend.
// - Agrega el token automáticamente si hay sesión.
// - Si el backend responde con error, lanza un Error con su mensaje.
export const pedir = async (ruta, opciones = {}) => {
  const token = localStorage.getItem("token")

  let respuesta
  try {
    respuesta = await fetch(API_URL + ruta, {
      method: opciones.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: opciones.body ? JSON.stringify(opciones.body) : undefined,
    })
  } catch {
    //fetch solo falla así cuando el servidor está apagado o no hay internet
    throw new Error("No se pudo conectar con el servidor")
  }

  // Si la respuesta no trae JSON, usamos un objeto vacío
  const datos = await respuesta.json().catch(() => ({}))

  // Token vencido o inválido: avisamos a la app para que cierre la sesión
  if (respuesta.status === 401 && token) {
    window.dispatchEvent(new Event("sesion-expirada"))
  }

  if (!respuesta.ok) {
    throw new Error(datos.error || "Algo salió mal")
  }

  return datos
}
