const mongoose = require('mongoose');

const esquemaObjetivo = new mongoose.Schema({
  titulo: { 
    type: String, 
    required: true,
    maxlength: 100 
  },
  descripcion: String,
  fechaInicio: { 
    type: Date, 
    default: Date.now 
  },
  fechaFin: { 
    type: Date,
    required: true,
    validate: {
      validator: function(v) {
        return v > this.fechaInicio;
      },
      message: "La fecha fin debe ser posterior a la de inicio"
    }
  },
  progreso: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 100 
  },
  usuario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario',
    required: true 
  },
  habitos: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Habito' 
  }],
  recordatorios: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Recordatorio' 
  }]
}, { 
  timestamps: true,
  toJSON: { virtuals: true } 
});

// Virtual para días restantes
esquemaObjetivo.virtual('diasRestantes').get(function() {
  return Math.ceil((this.fechaFin - Date.now()) / (1000 * 60 * 60 * 24));
});

module.exports = mongoose.model('Objetivo', esquemaObjetivo);