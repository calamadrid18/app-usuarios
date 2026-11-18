import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Navbar from "./componentes/Navbar"
import RutaPrivada from "./componentes/RutaPrivada"
import Inicio from "./paginas/Inicio"
import Registro from "./paginas/Registro"
import Login from "./paginas/Login"
import Perfil from "./paginas/Perfil"
import Usuarios from "./paginas/Usuarios"

function App() {
  return (
    // AuthProvider comparte la sesión con toda la app
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="contenedor">
          <Routes>
            {/* Públicas */}
            <Route path="/" element={<Inicio />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />

            {/* Privadas: necesitan sesión */}
            <Route path="/perfil" element={<RutaPrivada><Perfil /></RutaPrivada>} />
            <Route path="/usuarios" element={<RutaPrivada><Usuarios /></RutaPrivada>} />

            {/* Cualquier otra ruta -> inicio */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
