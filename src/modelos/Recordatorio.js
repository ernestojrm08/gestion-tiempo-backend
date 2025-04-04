const mongoose = require("mongoose");

const RecordatorioSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fechaVencimiento: { type: Date, required: true },
  prioridad: {
    type: String,
    enum: ["baja", "media", "alta"],
    required: true,
  },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
});

const Recordatorio = mongoose.model("Recordatorio", RecordatorioSchema);
module.exports = Recordatorio;