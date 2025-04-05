const express = require('express');
const router = express.Router();
const Objetivo = require('../modelos/Objetivo');
const Habito = require("../modelos/Habito") 
const controlador = require('../controladores/controladorObjetivos');
const { verificarToken } = require('../middleware/authMiddleware');

// Middleware para inyectar moment.js en las vistas
router.use((req, res, next) => {
  res.locals.moment = require('moment');
  next();
});

router.get("/vista", verificarToken, async (req, res) => {
  try {
    const habitosDisponibles = await Habito.find();
    const objetivos = await Objetivo.find({ usuario: req.usuario.id }).sort({ fechaVencimiento: 1 });
    res.render("objetivos/panel", { usuario: req.usuario,objetivos:objetivos,habitosDisponibles:habitosDisponibles });
  } catch (error) {
      console.error("ERROR DETECTADO:", error);
      res.status(500).send("Error al cargar la vista de recordaorio");
  }
});

router.get('/', verificarToken, controlador.verPanelSemanal);
router.get('/crear', verificarToken, controlador.mostrarFormularioCrear);
router.post('/', verificarToken, controlador.crearObjetivo);
router.post('/:id/vincular', verificarToken, controlador.vincularHabito); ////
router.get('/:id/editar', verificarToken, controlador.mostrarFormularioEditar);
router.put('/:id',  controlador.actualizarObjetivo);
router.delete('/:id', verificarToken, controlador.eliminarObjetivo);

// Webhook para actualización automática
//router.post('/webhook/progreso', controlador.actualizarProgresoWebhook);

module.exports = router;