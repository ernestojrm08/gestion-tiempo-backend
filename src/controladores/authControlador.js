const { body, validationResult } = require("express-validator"); //OJO//
const Usuario = require("../modelos/Usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


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

// Controlador para registrar un nuevo usuario
const registrarUsuario = async (req, res) => {
    // Verificar si hay errores de validación
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        //return res.status(400).json({ errores: errores.array() });
        req.flash('error', errores.array().map(item => item.msg).join("<br>") ); 
        return res.redirect('/registro');
    }

    try {
        const { nombre, correo, contraseña, rol } = req.body;

        // Verificar si el usuario ya existe
        const usuarioExiste = await Usuario.findOne({ correo });
        if (usuarioExiste) {
            //return res.status(400).json({ mensaje: "El correo ya está registrado" });
            req.flash('error',"El correo ya está registrado" );
            return res.redirect('/registro');
        }

        // Crear usuario
        const nuevoUsuario = new Usuario({ nombre, correo, contraseña, rol: "usuario" });
        await nuevoUsuario.save();

        // Generar token JWT
        const token = jwt.sign({ id: nuevoUsuario._id, rol: nuevoUsuario.rol }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.cookie("token",token);
        return res.redirect("/api/usuarios/dashboard");
        //res.status(201).json({ mensaje: "Usuario registrado correctamente", token });
    } catch (error) {
        //res.status(500).json({ mensaje: "Error al registrar usuario", error });
        req.flash('error',"Error al registrar usuario" );
        return res.redirect('/registro');
    }
};


// Iniciar sesión
const iniciarSesion = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;
      
        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            //return res.status(400).json({ mensaje: "Credenciales inválidas" });
            req.flash('error',"Usuario no encontrado");
            return res.redirect('/login');
        }

        // Comparar contraseñas
        const contraseñaValida = await usuario.compararContraseña(contraseña);
        if (!contraseñaValida) {
            req.flash('error',"Credenciales inválidas");
            return res.redirect('/login');
            //return res.status(400).json({ mensaje: "Credenciales inválidas" });
        }

        // Generar token JWT
        const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        //res.json({ mensaje: "Inicio de sesión exitoso", token });
        res.cookie("token",token);
        return res.redirect("/api/usuarios/dashboard");
    } catch (error) {
        //res.status(500).json({ mensaje: "Error al iniciar sesión", error });
        req.flash('error',"Error al iniciar sesión");
        return res.redirect('/login');
    }
};

module.exports = { registrarUsuario, iniciarSesion, validarRegistro };