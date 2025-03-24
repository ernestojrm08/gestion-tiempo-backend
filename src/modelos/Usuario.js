const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    rol: {
        type: String,
        enum: ["admin", "usuario", "invitado"],
        default: "usuario",
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    }
});

// Cifrar la contraseña antes de guardar
usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("contraseña")) return next();
    this.contraseña = await bcrypt.hash(this.contraseña, 10);
    next();
});

// Método para comparar contraseñas
usuarioSchema.methods.compararContraseña = async function (contraseña) {
    return await bcrypt.compare(contraseña, this.contraseña);
};

// Crear el modelo de Usuario
const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
