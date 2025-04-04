const express = require('express');
const router = express.Router();
const controladorRecordatorios = require('../controladores/controladorRecordatorios'); 
const { verificarToken } = require('../middleware/authMiddleware');


// CRUD de recordatorios (solo usuarios autenticados)
router.get('/', verificarToken, controladorRecordatorios.obtenerRecordatorios);
router.get('/crear', verificarToken, controladorRecordatorios.mostrarFormularioCrear);
router.post('/crear', verificarToken, controladorRecordatorios.crearRecordatorio);
router.get('/:id/editar', verificarToken, controladorRecordatorios.mostrarFormularioEditar);
router.put('/:id', verificarToken, controladorRecordatorios.actualizarRecordatorio);
router.delete('/:id', verificarToken, controladorRecordatorios.eliminarRecordatorio);

module.exports = router;