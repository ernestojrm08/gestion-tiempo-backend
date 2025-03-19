const express = require("express");
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

const router = express.Router();

// Definir las rutas
router.post("/", crearActividad);         // Crear actividad
router.get("/", obtenerActividades);      // Obtener todas las actividades
router.get("/:id", obtenerActividadPorId); // Obtener actividad por ID
router.put("/:id", actualizarActividad);  // Actualizar actividad
router.delete("/:id", eliminarActividad); // Eliminar actividad
router.get("/usuarios/:usuarioId/categorias/:categoria", obtenerActividadesPorCategoria); //Obtener Actividades por categoría
router.get("/usuarios/:usuarioId/ultimas-actividades", obtenerUltimasActividades); //Obtener Ultimas Actividades
router.get("/proyectos/:proyecto/actividades", obtenerActividadesPorProyecto); //Obtener Actividades por Proyecto
router.get("/habitos/:habitoId/actividades/:fechaInicio/:fechaFin", obtenerActividadesPorHabitoYRangoFechas); //Obtener Actividades por Habito y Rango de Fechas
router.get("/sin-actividades", obtenerHabitosSinActividades); //Obtener Habitos sin Actividades
router.get("/buscar/:nombre", buscarActividadesPorNombre); //Actividades por Nombre
router.get("/tiempo/:agruparPor", calcularTiempoPorCategoriaOProyecto); //Tiempo por categoria o proyecto
router.get("/sin-finalizar", obtenerActividadesAbiertas); //Actividades Abiertas
module.exports = router;
