const Actividad = require("../modelos/Actividad");

// Crear una nueva actividad
const crearActividad = async (req, res) => {
    try {
        const { usuario, habito, proyecto, nombre, descripcion, categoria, fecha_inicio, fecha_fin, completada } = req.body;
        const nuevaActividad = new Actividad({ usuario, habito, proyecto, nombre, descripcion, categoria, fecha_inicio, fecha_fin, completada });
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

// Obtener Actividades por Categoría
const obtenerActividadesPorCategoria = async (req, res) => {
    try {
        const { usuarioId, categoria } = req.params;
        const actividades = await Actividad.find({ usuario: usuarioId, categoria }).populate("usuario", "nombre").populate("habito", "nombre");
        res.json(actividades);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener actividades por categoría", error });
    }
};

// Obtener Ultimas Actividades
const obtenerUltimasActividades = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const actividades = await Actividad.find({ usuario: usuarioId })
            .sort({ fecha_inicio: -1 })
            .limit(5)
            .populate("usuario", "nombre")
            .populate("habito", "nombre");
        res.json(actividades);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las últimas actividades", error });
    }
};

// Obtener Actividades por Proyecto
const obtenerActividadesPorProyecto = async (req, res) => {
    try {
        const { proyecto } = req.params;
        const actividades = await Actividad.find({ proyecto }).populate("usuario", "nombre").populate("habito", "nombre");
        res.json(actividades);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener actividades por proyecto", error });
    }
};

// Obtener Actividades por Habito y Rango de Fechas
const obtenerActividadesPorHabitoYRangoFechas = async (req, res) => {
    try {
        const { habitoId, fechaInicio, fechaFin } = req.params;
        const actividades = await Actividad.find({
            habito: habitoId,
            fecha_inicio: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) }
        }).populate("usuario", "nombre").populate("habito", "nombre");
        res.json(actividades);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener actividades por hábito y rango de fechas", error });
    }
};

// Obtener Habitos Sin Actividades
const obtenerHabitosSinActividades = async (req, res) => {
    try {
        const habitos = await Habito.aggregate([
            {
                $lookup: {
                    from: "actividades",
                    localField: "_id",
                    foreignField: "habito",
                    as: "actividades"
                }
            },
            {
                $match: {
                    actividades: { $size: 0 }
                }
            }
        ]);
        res.json(habitos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener hábitos sin actividades", error });
    }
};

// Buscar Actividades Por Nombre
const buscarActividadesPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const actividades = await Actividad.find({ nombre: { $regex: nombre, $options: "i" } })
            .populate("usuario", "nombre")
            .populate("habito", "nombre");
        res.json(actividades);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar actividades por nombre", error });
    }
};

// Tiempo por categoria o proyecto
const calcularTiempoPorCategoriaOProyecto = async (req, res) => {
    try {
        const { agruparPor } = req.params;
        const actividades = await Actividad.aggregate([
            {
                $group: {
                    _id: `$${agruparPor}`,
                    tiempoTotal: { $sum: { $subtract: ["$fecha_fin", "$fecha_inicio"] } }
                }
            }
        ]);
        res.json(actividades);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al calcular tiempo", error });
    }
};

// Actividades sin Finalizar
const obtenerActividadesAbiertas = async (req, res) => {
    try {
        const actividades = await Actividad.find({ fecha_fin: { $exists: false } })
            .populate("usuario", "nombre")
            .populate("habito", "nombre");
        res.json(actividades);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener actividades abiertas", error });
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

const obtenerActividadesPublicas = async (req, res) => {
    try {
        const actividades = await Actividad.find({ publica: true }); // Solo actividades públicas
        res.json(actividades);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener actividades públicas", error });
    }
};

module.exports = {
    crearActividad,
    obtenerActividades,
    obtenerActividadPorId,
    actualizarActividad,
    eliminarActividad,
    obtenerActividadesPorCategoria,
    obtenerUltimasActividades,
    obtenerActividadesPorProyecto,
    obtenerActividadesPorHabitoYRangoFechas,
    obtenerHabitosSinActividades,
    buscarActividadesPorNombre,
    calcularTiempoPorCategoriaOProyecto,
    obtenerActividadesAbiertas,
    obtenerActividadesPublicas
};
