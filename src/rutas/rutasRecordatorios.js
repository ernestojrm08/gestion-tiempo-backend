const express = require('express');
const router = express.Router();
const controladorRecordatorios = require('../controladores/controladorRecordatorios'); 
const { verificarToken } = require('../middleware/authMiddleware');
const Recordatorio = require("./../modelos/Recordatorio");

router.get("/vista",verificarToken, async (req, res) => {
    try {
        const recordatorios = await Recordatorio.find({ usuario: req.usuario.id }).sort({ fechaVencimiento: 1 });
       res.render("recordatorios/index", {recordatorios, usuario:req.usuario });
    } catch (error) {
        console.error("ERROR DETECTADO:", error);
        res.status(500).send("Error al cargar la vista de recordaorio");
    }
});

// CRUD de recordatorios (solo usuarios autenticados)
router.get('/', verificarToken, controladorRecordatorios.obtenerRecordatorios);
router.get('/crear', verificarToken, controladorRecordatorios.mostrarFormularioCrear);
router.post('/crear', verificarToken, controladorRecordatorios.crearRecordatorio);
router.get('/:id/editar', verificarToken, controladorRecordatorios.mostrarFormularioEditar);
router.put('/:id', verificarToken, controladorRecordatorios.actualizarRecordatorio);
router.delete('/:id', verificarToken, controladorRecordatorios.eliminarRecordatorio);

module.exports = router;