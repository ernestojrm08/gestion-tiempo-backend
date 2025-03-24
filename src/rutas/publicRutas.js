const express = require("express");
const { obtenerActividadesPublicas } = require("../controladores/actividadControlador");

const router = express.Router();

// Rutas públicas para invitados
router.get("/actividades", obtenerActividadesPublicas);

module.exports = router;