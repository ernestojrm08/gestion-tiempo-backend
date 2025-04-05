const express = require("express");
const router = express.Router();
const tareaControlador = require("../controladores/tareaControlador");
const { verificarToken, verificarRol } = require("../middleware/authMiddleware");


router.get("/", verificarToken, verificarRol(['admin', 'usuario']), tareaControlador.obtenerTareas);

//  Mostrar la vista de tareas solo a usuarios con rol 'admin' o 'usuario'
router.get("/vista", verificarToken, verificarRol(['admin', 'usuario']), (req, res) => {
    res.render("tareas", { usuario: req.usuario });
});

// Ruta para crear una nueva tarea
router.post("/", tareaControlador.crearTarea);

// Ruta para obtener las tareas de un usuario
router.get("/usuario/:usuarioId", verificarToken, verificarRol, tareaControlador.obtenerTareasUsuario);

// Ruta para marcar una tarea como completada
router.put("/completar/:tareaId", verificarToken, verificarRol, tareaControlador.marcarTareaCompletada);

// Editar tarea
router.put("/:tareaId", verificarToken, verificarRol(['admin', 'usuario']), tareaControlador.actualizarTarea);

// Eliminar tarea
router.delete("/:tareaId", verificarToken, verificarRol(['admin', 'usuario']), tareaControlador.eliminarTarea);


module.exports = router;
