const mongoose = require("mongoose");

// Definir el esquema del usuario
const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    contraseña: {
        type: String,
        required: true,
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    }
});

// Crear el modelo de Usuario
const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
