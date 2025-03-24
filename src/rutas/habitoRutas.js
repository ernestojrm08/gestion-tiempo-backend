const express = require("express");
const Habito = require("../modelos/Habito");
const { verificarToken } = require("../middleware/authMiddleware");
const {
    crearHabito,
    obtenerHabitos,
    obtenerHabitoPorId,
    actualizarHabito,
    eliminarHabito
} = require("../controladores/habitoControlador");

const router = express.Router();

//renderizar vistas habitos
router.get("/vista", async (req, res) => {
    try {
        console.log("Intentando obtener hábitos...");
        const habitos = await Habito.find();
        console.log("Hábitos obtenidos:", habitos);
        res.render("habitos", { habitos });
    } catch (error) {
        console.error("ERROR DETECTADO:", error);
        res.status(500).send("Error al cargar la vista de hábitos");
    }
});

// Definir las rutas
router.post("/", verificarToken, crearHabito);         // Crear hábito
router.get("/", verificarToken, obtenerHabitos);       // Obtener todos los hábitos
router.get("/:id", verificarToken, obtenerHabitoPorId); // Obtener hábito por ID
router.put("/:id", verificarToken, actualizarHabito);  // Actualizar hábito
router.delete("/:id", verificarToken, eliminarHabito); // Eliminar hábito

module.exports = router;
