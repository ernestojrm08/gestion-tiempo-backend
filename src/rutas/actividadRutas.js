const express = require("express");
const Actividad = require("../modelos/Actividad");
const {
    crearActividad,
    obtenerActividades,
    obtenerActividadPorId,
    actualizarActividad,
    eliminarActividad,
    obtenerActividadesPorCategoria,
    obtenerUltimasActividades,
    obtenerActividadesPorProyecto,
    obtenerActividadesPorHabitoYRangoFechas,
    obtenerHabitosSinActividades,
    buscarActividadesPorNombre,
    calcularTiempoPorCategoriaOProyecto,
    obtenerActividadesAbiertas,
} = require("../controladores/actividadControlador");
const { verificarToken, verificarRol } = require("../middleware/authMiddleware");


const router = express.Router();

//renderizar vistas 
router.get("/vista",verificarToken, async (req, res) => {
    try {
        const actividad = await Actividad.find();
        res.render("actividades", { actividad,usuario:req.usuario });
    } catch (error) {
        console.error("ERROR DETECTADO:", error);
        res.status(500).send("Error al cargar la vista de hábitos");
    }
});

// Solo el admin puede crear, actualizar y eliminar actividades
router.post("/", verificarToken, verificarRol(["admin", "usuario"]), crearActividad); // Crear actividad
router.put("/:id", verificarToken, verificarRol(["admin"]), actualizarActividad); // Actualizar actividad
router.delete("/:id", verificarToken, verificarRol(["admin"]), eliminarActividad); // Eliminar actividad

router.get("/", obtenerActividades); // Obtener todas las actividades
router.get("/:id", obtenerActividadPorId); // Obtener actividad por ID
router.get("/usuarios/:usuarioId/categorias/:categoria", verificarToken, obtenerActividadesPorCategoria); // Obtener actividades por categoría
router.get("/usuarios/:usuarioId/ultimas-actividades", verificarToken, obtenerUltimasActividades); // Obtener Ultimas Actividades
router.get("/proyectos/:proyecto/actividades", verificarToken, obtenerActividadesPorProyecto); // Obtener actividades por Proyecto
router.get("/habitos/:habitoId/actividades/:fechaInicio/:fechaFin", verificarToken, obtenerActividadesPorHabitoYRangoFechas); // Obtener Actividades por Hábito y Rango de Fechas
router.get("/sin-actividades", verificarToken, obtenerHabitosSinActividades); // Obtener Hábitos sin Actividades
router.get("/buscar/:nombre", verificarToken, buscarActividadesPorNombre); // Actividades por Nombre
router.get("/tiempo/:agruparPor", verificarToken, calcularTiempoPorCategoriaOProyecto); // Tiempo por categoría o proyecto
router.get("/sin-finalizar", verificarToken, obtenerActividadesAbiertas); // Actividades Abiertas

module.exports = router;