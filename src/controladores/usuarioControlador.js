const Usuario = require("../modelos/Usuario");

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
    try {
        const { nombre, correo, contraseña } = req.body;

        // Verificar si el usuario ya existe
        const usuarioExiste = await Usuario.findOne({ correo });
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: "El correo ya está registrado" });
        }

        // Crear usuario
        const nuevoUsuario = new Usuario({ nombre, correo, contraseña });
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: "Usuario creado correctamente", usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear usuario", error });
    }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuarios", error });
    }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuario", error });
    }
};

// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
    try {
        const { nombre, correo } = req.body;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            { nombre, correo },
            { new: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json({ mensaje: "Usuario actualizado", usuario: usuarioActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar usuario", error });
    }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json({ mensaje: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar usuario", error });
    }
};

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};
