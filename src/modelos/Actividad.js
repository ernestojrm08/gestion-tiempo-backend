const mongoose = require("mongoose");

const actividadSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    habito: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Habito",
        required: false, // Puede estar relacionado o no con un hábito
    },
    proyecto: { 
        type: String,
        required: false,
        trim: true,
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    descripcion: {
        type: String,
        trim: true,
    },
    categoria: {
        type: String,
        required: true,
        trim: true,
    },
    fecha_inicio: {
        type: Date,
        required: true,
    },
    fecha_fin: {
        type: Date,
        required: false, // Puede estar en curso
    },
    completada: {
        type: Boolean,
        default: false,
    }
});

const Actividad = mongoose.model("Actividad", actividadSchema);

module.exports = Actividad;
