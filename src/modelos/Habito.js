const mongoose = require("mongoose");

const habitoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
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
    fecha_creacion: {
        type: Date,
        default: Date.now,
    }
});

const Habito = mongoose.model("Habito", habitoSchema);

module.exports = Habito;
