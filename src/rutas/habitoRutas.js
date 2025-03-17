const express = require("express");
const {
    crearHabito,
    obtenerHabitos,
    obtenerHabitoPorId,
    actualizarHabito,
    eliminarHabito
} = require("../controladores/habitoControlador");

const router = express.Router();

// Definir las rutas
router.post("/", crearHabito);         // Crear hábito
router.get("/", obtenerHabitos);       // Obtener todos los hábitos
router.get("/:id", obtenerHabitoPorId); // Obtener hábito por ID
router.put("/:id", actualizarHabito);  // Actualizar hábito
router.delete("/:id", eliminarHabito); // Eliminar hábito

module.exports = router;
