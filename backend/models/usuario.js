const mongoose = require("mongoose")

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true, // quita espacios al inicio y al final
      minlength: [2, "El nombre debe tener al menos 2 letras"],
      maxlength: [50, "El nombre no puede tener más de 50 letras"],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true, // no se puede repetir el mismo email
      trim: true,
      lowercase: true, // "Pedro@Gmail.com" se guarda como "pedro@gmail.com"
      match: [/^\S+@\S+\.\S+$/, "El email no es válido"],
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt automáticamente
    toJSON: {
      // Cada vez que se manda un usuario como JSON, se quita la contraseña
      transform: (doc, ret) => {
        delete ret.password
        delete ret.__v
        return ret
      },
    },
  }
)

const Usuario = mongoose.model("Usuario", usuarioSchema)

module.exports = Usuario
