const express = require("express");
const Usuario = require("../modelos/Usuario")
const { verificarToken, verificarRol } = require("../middleware/authMiddleware");
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

// Solo el admin puede crear, actualizar y eliminar usuarios
router.post("/", verificarToken, verificarRol(["admin"]), crearUsuario);
router.put("/:id", verificarToken, verificarRol(["admin"]), actualizarUsuario);
router.delete("/:id", verificarToken, verificarRol(["admin"]), eliminarUsuario);
// Ruta para asignar roles (solo para admin)
router.post("/asignar-rol", verificarToken, verificarRol(["admin"]));

router.get("/", verificarToken, obtenerUsuarios);      // Obtener todos los usuarios
router.get("/:id", verificarToken, obtenerUsuarioPorId); // Obtener usuario por ID

module.exports = router;
