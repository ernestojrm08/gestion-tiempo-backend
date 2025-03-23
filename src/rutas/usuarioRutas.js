const express = require("express");
const Usuario = require("../modelos/Usuario")
const {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
} = require("../controladores/usuarioControlador");

const router = express.Router();

//renderizar vistas de usuario
router.get("/vista", async (req, res) => {
    try {
        console.log("Obteniendo usuarios...");
        const usuarios = await Usuario.find();
        console.log("Usuarios obtenidos:", usuarios);
        res.render("usuarios", {usuarios});
    } catch (error) {
        console.error("Error DETECTADO", error)
        res.status(500).send("Error al cargar lista de usuarios")
    }
})

// Definir las rutas
router.post("/", crearUsuario);        // Crear usuario
router.get("/", obtenerUsuarios);      // Obtener todos los usuarios
router.get("/:id", obtenerUsuarioPorId); // Obtener usuario por ID
router.put("/:id", actualizarUsuario); // Actualizar usuario
router.delete("/:id", eliminarUsuario); // Eliminar usuario



module.exports = router;
