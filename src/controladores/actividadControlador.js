const Actividad = require("../modelos/Actividad");

// Crear una nueva actividad
const crearActividad = async (req, res) => {
    try {
        const { usuario, habito, nombre, descripcion, fecha_inicio, fecha_fin, completada } = req.body;
        const nuevaActividad = new Actividad({ usuario, habito, nombre, descripcion, fecha_inicio, fecha_fin, completada });
        await nuevaActividad.save();
        res.status(201).json({ mensaje: "Actividad creada correctamente", actividad: nuevaActividad });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear actividad", error });
    }
};

// Obtener todas las actividades
const obtenerActividades = async (req, res) => {
    try {
        const actividades = await Actividad.find().populate("usuario", "nombre").populate("habito", "nombre");
        res.json(actividades);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener actividades", error });
    }
};

// Obtener una actividad por ID
const obtenerActividadPorId = async (req, res) => {
    try {
        const actividad = await Actividad.findById(req.params.id).populate("usuario", "nombre").populate("habito", "nombre");
        if (!actividad) {
            return res.status(404).json({ mensaje: "Actividad no encontrada" });
        }
        res.json(actividad);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener actividad", error });
    }
};

// Actualizar una actividad
const actualizarActividad = async (req, res) => {
    try {
        const { nombre, descripcion, fecha_inicio, fecha_fin, completada } = req.body;
        const actividadActualizada = await Actividad.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, fecha_inicio, fecha_fin, completada },
            { new: true }
        );

        if (!actividadActualizada) {
            return res.status(404).json({ mensaje: "Actividad no encontrada" });
        }

        res.json({ mensaje: "Actividad actualizada", actividad: actividadActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar actividad", error });
    }
};

// Eliminar una actividad
const eliminarActividad = async (req, res) => {
    try {
        const actividadEliminada = await Actividad.findByIdAndDelete(req.params.id);
        if (!actividadEliminada) {
            return res.status(404).json({ mensaje: "Actividad no encontrada" });
        }

        res.json({ mensaje: "Actividad eliminada" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar actividad", error });
    }
};

module.exports = {
    crearActividad,
    obtenerActividades,
    obtenerActividadPorId,
    actualizarActividad,
    eliminarActividad
};
