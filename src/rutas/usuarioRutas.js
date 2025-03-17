const express = require("express");
const {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
} = require("../controladores/usuarioControlador");

const router = express.Router();

// Definir las rutas
router.post("/", crearUsuario);        // Crear usuario
router.get("/", obtenerUsuarios);      // Obtener todos los usuarios
router.get("/:id", obtenerUsuarioPorId); // Obtener usuario por ID
router.put("/:id", actualizarUsuario); // Actualizar usuario
router.delete("/:id", eliminarUsuario); // Eliminar usuario

module.exports = router;
