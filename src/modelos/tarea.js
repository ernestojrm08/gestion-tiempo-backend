const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, 
        ref : "Usuario", 
        required: true
    },
    actividad: { type: mongoose.Schema.Types.ObjectId,
        ref: "Actividad",
        required: false 
    },
    nombre: {
        type: String,
        require: true,
        trim: true
    },

    descripcion: {type: String,
         require: true},

    fecha_inicio: {type: Date, 
        require: true
    },

    fecha_fin: {type: Date, 
        require: false //puede estar en curso
    }, 
    
    completada: {type: Boolean,
         default: false
        },
    prioridad: {
        type: String,
        enum: ['Alta', 'Media', 'Baja'],
        default: 'Media'
    }
});

module.exports = mongoose.model("Tarea", tareaSchema);