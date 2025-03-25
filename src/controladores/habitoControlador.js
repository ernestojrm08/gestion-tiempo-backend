const Habito = require("../modelos/Habito");

// Crear un nuevo hábito
const crearHabito = async (req, res) => {
    try {
        const { usuario, nombre, descripcion } = req.body;
        const nuevoHabito = new Habito({ usuario : req.usuario.id, nombre, descripcion });
        await nuevoHabito.save();
        res.status(201).json({ mensaje: "Hábito creado correctamente", habito: nuevoHabito });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear hábito", error });
    }
};

// Obtener todos los hábitos
const obtenerHabitos = async (req, res) => {
    try {
        const habitos = await Habito.find().populate("usuario", "nombre correo");
        res.json(habitos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener hábitos", error });
    }
};

// Obtener un hábito por ID
const obtenerHabitoPorId = async (req, res) => {
    try {
        const habito = await Habito.findById(req.params.id).populate("usuario", "nombre correo");
        if (!habito) {
            return res.status(404).json({ mensaje: "Hábito no encontrado" });
        }
        res.json(habito);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener hábito", error });
    }
};

// Actualizar un hábito
const actualizarHabito = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const habitoActualizado = await Habito.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion },
            { new: true }
        );

        if (!habitoActualizado) {
            return res.status(404).json({ mensaje: "Hábito no encontrado" });
        }

        res.json({ mensaje: "Hábito actualizado", habito: habitoActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar hábito", error });
    }
};

// Eliminar un hábito
const eliminarHabito = async (req, res) => {
    try {
        const habitoEliminado = await Habito.findByIdAndDelete(req.params.id);
        if (!habitoEliminado) {
            return res.status(404).json({ mensaje: "Hábito no encontrado" });
        }

        res.json({ mensaje: "Hábito eliminado" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar hábito", error });
    }
};

module.exports = {
    crearHabito,
    obtenerHabitos,
    obtenerHabitoPorId,
    actualizarHabito,
    eliminarHabito
};
