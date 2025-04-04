const Recordatorio = require('../modelos/Recordatorio');

const obtenerRecordatorios = async (req, res) => {
  try {
    const recordatorios = await Recordatorio.find({ usuario: req.usuario.id }).sort({ fechaVencimiento: 1 });
    res.render('recordatorios/index', { recordatorios });
  } catch (error) {
    res.status(500).send('Error al cargar recordatorios');
  }
};

const crearRecordatorio = async (req, res) => {
  try {

    const { titulo, descripcion, fechaVencimiento, prioridad } = req.body;
    if (!titulo || !descripcion || !fechaVencimiento || !prioridad) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    const nuevoRecordatorio = new Recordatorio({
      titulo,
      descripcion,
      fechaVencimiento,
      prioridad:prioridad.toLowerCase(),
      usuario: req.usuario.id,
    });

    await nuevoRecordatorio.save();
    res.redirect("/api/recordatorios"); 
  } catch (error) {
    console.error("Error al crear recordatorio:", error);
    res.status(500).json({ mensaje: "Error al crear recordatorio" });
  }
};



const mostrarFormularioCrear = (req, res) => {
  res.render('recordatorios/crear');
};


// Obtener formulario de edición
const mostrarFormularioEditar = async (req, res) => {
  try {
    const recordatorio = await Recordatorio.findById(req.params.id);
    if (!recordatorio) {
      return res.render("recordatorios/editar", { error: "Recordatorio no encontrado", recordatorio: {} });
    }
    res.render("recordatorios/editar", { recordatorio, error: null });
  } catch (error) {
    res.render("recordatorios/editar", { error: "Error al cargar el formulario de edición", recordatorio: {} });
  }
};

// Actualizar recordatorio
const actualizarRecordatorio = async (req, res) => {
  try {
    const { titulo, descripcion, fechaVencimiento, prioridad } = req.body;
    const recordatorio = await Recordatorio.findByIdAndUpdate(
      req.params.id,
      { titulo, descripcion, fechaVencimiento, prioridad },
      { new: true }
    );
    if (!recordatorio) {
      return res.status(404).send('Recordatorio no encontrado');
    }
    res.redirect('/api/recordatorios'); //////
  } catch (error) {
    res.status(400).render('recordatorios/editar', { 
      error: 'Error al actualizar el recordatorio',
      recordatorio: req.body
    });
  }
};

// Eliminar recordatorio
const eliminarRecordatorio = async (req, res) => {
  try {
    const recordatorio = await Recordatorio.findByIdAndDelete(req.params.id);
    if (!recordatorio) {
      return res.status(404).send('Recordatorio no encontrado');
    }
    res.redirect('/api/recordatorios');
  } catch (error) {
    res.status(500).redirect('/recordatorios');
  }
};


module.exports = {
  obtenerRecordatorios,
  crearRecordatorio,
  mostrarFormularioCrear,
  mostrarFormularioEditar,
  actualizarRecordatorio,
  eliminarRecordatorio,        
};