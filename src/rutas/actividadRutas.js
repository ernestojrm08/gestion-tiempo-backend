const express = require("express");
const {
    crearActividad,
    obtenerActividades,
    obtenerActividadPorId,
    actualizarActividad,
    eliminarActividad
} = require("../controladores/actividadControlador");

const router = express.Router();

// Definir las rutas
router.post("/", crearActividad);         // Crear actividad
router.get("/", obtenerActividades);      // Obtener todas las actividades
router.get("/:id", obtenerActividadPorId); // Obtener actividad por ID
router.put("/:id", actualizarActividad);  // Actualizar actividad
router.delete("/:id", eliminarActividad); // Eliminar actividad

module.exports = router;
