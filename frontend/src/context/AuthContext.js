import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { pedir } from "../api"

// El "contexto" guarda la sesión en un solo lugar y la comparte con toda la app.
// Así cualquier componente puede saber si hay sesión sin pasarle props.
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  // Se lee de localStorage para no perder la sesión al recargar la página
  const [token, setToken] = useState(() => localStorage.getItem("token"))

  const login = async (email, password) => {
    const datos = await pedir("/login", { method: "POST", body: { email, password } })
    localStorage.setItem("token", datos.token)
    setToken(datos.token)
  }

  const logout = useCallback(() => {
    localStorage.removeItem("token")
    setToken(null)
  }, [])

  // Si api.js detecta que el token venció, cerramos la sesión
  useEffect(() => {
    window.addEventListener("sesion-expirada", logout)
    return () => window.removeEventListener("sesion-expirada", logout)
  }, [logout])

  return (
    <AuthContext.Provider value={{ token, estaLogueado: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Atajo para usar la sesión: const { estaLogueado, login, logout } = useAuth()
export const useAuth = () => useContext(AuthContext)
