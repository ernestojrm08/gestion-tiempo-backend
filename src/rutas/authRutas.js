const express = require("express");
const { registrarUsuario, validarRegistro, iniciarSesion } = require("../controladores/authControlador");

const router = express.Router();

// Rutas de autenticación
router.post("/registro", validarRegistro, registrarUsuario);
router.post("/login", iniciarSesion);

module.exports = router;

