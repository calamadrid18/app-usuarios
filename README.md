# App Full Stack de Gestión de Usuarios

Aplicación full stack enfocada en autenticación y seguridad. Una persona puede registrarse, iniciar sesión, ver y editar su perfil, y borrar su cuenta.

*Full stack user management app focused on authentication and security, built with React, Node.js, Express, MongoDB and Docker.*

## Tecnologías

| Parte | Tecnologías |
|---|---|
| Frontend | React 19, React Router 7, Context API |
| Backend | Node.js, Express 5, Mongoose |
| Base de datos | MongoDB |
| Seguridad | JWT, bcrypt, express-rate-limit, CORS |
| Infraestructura | Docker, Docker Compose |

## Funcionalidades

- Registro e inicio de sesión con JWT
- Rutas privadas en el frontend y en la API
- Ver, editar y borrar la cuenta propia
- Validaciones en frontend y backend
- Manejo de errores centralizado con códigos HTTP (400, 401, 403, 404, 409, 429)

## Decisiones de seguridad

- **Contraseñas:** se guardan con hash de bcrypt y nunca se devuelven en las respuestas.
- **Fuerza bruta:** el login permite 5 intentos fallidos cada 15 minutos por IP.
- **Autorización:** `PUT /perfil` toma el id del token, así que nadie puede editar a otra persona.
- **Inyección NoSQL:** el email se convierte a texto antes de consultar la base de datos.
- **Enumeración de usuarios:** el login responde el mismo mensaje si falla el email o la contraseña.
- **Asignación masiva:** al editar solo se aceptan los campos `nombre` y `email`.

## Cómo ejecutarlo

Necesitas Docker y Node.js.

```bash
# 1. Backend y base de datos
cd backend
cp .env.example .env   # cambia JWT_SECRET por un texto largo y secreto
docker compose up -d --build

# 2. Frontend (en otra terminal)
cd frontend
npm install
npm start
```

- Frontend: http://localhost:3000
- API: http://localhost:3001

## API

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| POST | `/usuarios` | Público | Crear cuenta |
| POST | `/login` | Público | Iniciar sesión y recibir el token |
| GET | `/perfil` | Token | Ver mi perfil |
| PUT | `/perfil` | Token | Editar mi perfil |
| DELETE | `/perfil` | Token | Borrar mi cuenta |
| GET | `/usuarios` | Token | Listar usuarios |
| PUT | `/usuarios/:id` | Token, solo el dueño | Editar usuario |
| DELETE | `/usuarios/:id` | Token, solo el dueño | Borrar usuario |

## Estructura

```
backend/
  config/        conexión a MongoDB
  controllers/   lógica de cada ruta
  middlewares/   token, permisos, límite de intentos y errores
  models/        modelo Usuario
  routes/        definición de rutas
frontend/src/
  componentes/   Navbar, RutaPrivada, Usuario
  context/       sesión compartida (AuthContext)
  paginas/       Inicio, Login, Registro, Perfil, Usuarios
  api.js         comunicación con el backend
```

## Próximas mejoras

- Pruebas automáticas con Jest y Supertest
- Token en cookie httpOnly
- Paginación en la lista de usuarios
