const { body, validationResult } = require("express-validator");
const Usuario = require("../modelos/Usuario");

// Validaciones para el registro de usuarios
const validarRegistro = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),
    body("correo")
        .notEmpty().withMessage("El correo es obligatorio")
        .isEmail().withMessage("El correo no es válido"),
    body("contraseña")
        .notEmpty().withMessage("La contraseña es obligatoria")
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
];

// Controlador para crear un nuevo usuario
const crearUsuario = async (req, res) => {
    // Verificar si hay errores de validación
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const { nombre, correo, contraseña } = req.body;

        // Verificar si el usuario ya existe
        const usuarioExiste = await Usuario.findOne({ correo });
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: "El correo ya está registrado" });
        }

        // Crear usuario
        const nuevoUsuario = new Usuario({ nombre, correo, contraseña, rol: "usuario" });
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

const asignarRol = async (req, res) => {
    try {
        const { usuarioId, rol } = req.body;

        // Verificar si el rol es válido
        const rolesPermitidos = ["admin", "usuario", "invitado"];
        if (!rolesPermitidos.includes(rol)) {
            return res.status(400).json({ mensaje: "Rol no válido" });
        }

        // Actualizar el rol del usuario
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            usuarioId,
            { rol },
            { new: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json({ mensaje: "Rol actualizado correctamente", usuario: usuarioActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al asignar rol", error });
    }
};

module.exports = {
    crearUsuario,
    validarRegistro, //OJO
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario,
    asignarRol
};
