const express = require('express');
const router = express.Router();
const Objetivo = require('../modelos/Objetivo');
const controlador = require('../controladores/controladorObjetivos');
const { verificarToken } = require('../middleware/authMiddleware');

// Middleware para inyectar moment.js en las vistas
router.use((req, res, next) => {
  res.locals.moment = require('moment');
  next();
});

router.get('/', verificarToken, controlador.verPanelSemanal);
router.get('/crear', verificarToken, controlador.mostrarFormularioCrear);
router.post('/', verificarToken, controlador.crearObjetivo);
router.post('/:id/vincular', verificarToken, controlador.vincularHabito); ////
router.get('/:id/editar', verificarToken, controlador.mostrarFormularioEditar);
router.put('/:id', verificarToken, controlador.actualizarObjetivo);
router.delete('/:id', verificarToken, controlador.eliminarObjetivo);

// Webhook para actualización automática
//router.post('/webhook/progreso', controlador.actualizarProgresoWebhook);

module.exports = router;