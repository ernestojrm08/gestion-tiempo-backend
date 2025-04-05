const Tarea = require("../modelos/tarea");


// Crear tarea para usuarios
const crearTarea = async (req, res) => {
    try {
        const { usuario, actividad, nombre, descripcion, fecha_inicio, fecha_fin, completada, } = req.body;

        if (!usuario || !descripcion || !nombre ) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const nuevaTarea = new Tarea({ usuario, actividad, descripcion, nombre, fecha_inicio, fecha_fin });
        await nuevaTarea.save();

        res.status(201).json({ mensaje: "Tarea creada correctamente", tarea: nuevaTarea });
    } catch (error) {
        console.log("muestra el error en consola", error)
        res.status(500).json({ error: "Error al crear la tarea" });
    }
};

// Obtener todas las tareas de un usuario
const obtenerTareasUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const tareas = await Tarea.find({ usuario: usuarioId });

        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las tareas" });
    }
};

// Obtener todas las tareas
const obtenerTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find()
            .populate('usuario', 'nombre') 
            .populate('actividad', 'nombre'); 

        res.status(200).json(tareas);
    } catch (error) {
        console.log("error al obtener tareas", error)
        res.status(500).json({ error: "Error al obtener las tareas" });
    }
};


// Marcar una tarea como completada
const marcarTareaCompletada = async (req, res) => {
    try {
        const { tareaId } = req.params;
        const tarea = await Tarea.findByIdAndUpdate(tareaId, { completada: true }, { new: true });

        if (!tarea) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }

        res.status(200).json({ mensaje: "Tarea completada", tarea });
    } catch (error) {
        res.status(500).json({ error: "Error al marcar la tarea" });
    }
};

// Actualizar tarea
const actualizarTarea = async (req, res) => {
    try {
        const { tareaId } = req.params;
        const data = req.body;

        const tareaActualizada = await Tarea.findByIdAndUpdate(tareaId, data, { new: true });

        if (!tareaActualizada) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }

        res.status(200).json({ mensaje: "Tarea actualizada", tarea: tareaActualizada });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la tarea" });
    }
};

// Eliminar tarea
const eliminarTarea = async (req, res) => {
    try {
        const { tareaId } = req.params;

        const tarea = await Tarea.findByIdAndDelete(tareaId);

        if (!tarea) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }

        res.status(200).json({ mensaje: "Tarea eliminada" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la tarea" });
    }
};

module.exports = {
    crearTarea,
    obtenerTareasUsuario,
    obtenerTareas,
    marcarTareaCompletada,
    actualizarTarea,
    eliminarTarea
}
