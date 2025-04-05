const Objetivo = require('../modelos/Objetivo');
const Habito = require('../modelos/Habito');
const Recordatorio = require('../modelos/Recordatorio');

const crearObjetivo = async (req, res) => {
    try {
      const { titulo, descripcion, fechaFin } = req.body;
      
      const nuevoObjetivo = new Objetivo({
        titulo,
        descripcion,
        fechaFin: new Date(fechaFin),
        usuario: req.usuario.id
      });
  
      await nuevoObjetivo.save();
      res.redirect('/api/objetivos');
    } catch (error) {
      
      const habitos = await Habito.find({ 
        usuario: req.usuario.id, 
        estado: { $ne: 'completado' } 
      });
  
      res.status(400).render('objetivos/crear', { 
        error: error.message,
        datos: req.body,
        habitos 
      });
    }
  };

// Actualizar progreso automáticamente
const actualizarProgreso = async (objetivoId) => {
  const objetivo = await Objetivo.findById(objetivoId)
    .populate('habitos')
    .populate('recordatorios');

  const totalElementos = objetivo.habitos.length + objetivo.recordatorios.length;
  const completados = [
    ...objetivo.habitos.filter(h => h.estado === 'completado'),
    ...objetivo.recordatorios.filter(r => r.estado === 'completado')
  ].length;

  objetivo.progreso = totalElementos > 0 
    ? Math.round((completados / totalElementos) * 100)
    : 0;

  await objetivo.save();
  return objetivo;
};

const verPanelSemanal = async (req, res) => {
  try {
    const objetivos = await Objetivo.find({
      usuario: req.usuario.id,
      fechaFin: { $gte: new Date() }
    })
    .sort('-fechaFin')
    .populate('habitos'); 

    const habitosDisponibles = await Habito.find({
      usuario: req.usuario.id,
      estado: { $ne: 'completado' }
    });

    res.render('objetivos/panel', { 
      objetivos,
      habitosDisponibles,
      moment: require('moment') 
    });
  } catch (error) {
    res.status(500).send('Error al cargar el panel');
  }
};
  

const mostrarFormularioCrear = async (req, res) => {
    try {
        // 1. Obtener hábitos del usuario actual
        const habitos = await Habito.find({ 
            usuario: req.usuario.id,
            estado: { $ne: 'completado' }
        });

        // 2. Renderizar vista con los datos necesarios
        res.render('objetivos/crear', {
            habitos: habitos || [], // Asegurar array aunque esté vacío
            moment: require('moment'),
            error: null // Inicializar variable de error
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).render('objetivos/crear', {
            error: "Error al cargar el formulario",
            habitos: [],
            moment: require('moment')
        });
    }
};

const vincularHabito = async (req, res) => {
    try {
        const { habitoId } = req.body;
        
        // 1. Verificar que el hábito existe
        const habito = await Habito.findById(habitoId);
        if (!habito) {
            return res.status(404).json({ error: 'Hábito no encontrado' });
        }

        // 2. Actualizar el objetivo
        const objetivo = await Objetivo.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { habitos: habitoId } }, // Evita duplicados
            { new: true }
        );

        // 3. Actualizar progreso
        const objetivoActualizado = await actualizarProgreso(objetivo._id);

        res.json({ success: true, progreso: objetivoActualizado.progreso });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al vincular hábito' });
    }
};


// Mostrar formulario de edición
const mostrarFormularioEditar = async (req, res) => {
  try {
    const [objetivo, habitos] = await Promise.all([
      Objetivo.findById(req.params.id).populate('habitos'),
      Habito.find({ usuario: req.usuario.id })
    ]);

    if (!objetivo) {
      return res.status(404).render('objetivos/editar', {
        error: 'Objetivo no encontrado',
        objetivo: {},
        habitos: [],
        moment: require('moment')
      });
    }

    // Renderizar con error inicialmente como null/false
    res.render('objetivos/editar', {
      objetivo,
      habitos: habitos || [],
      moment: require('moment'),
      error: null
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).render('objetivos/editar', {
      error: "Error al cargar el formulario", // Mensaje claro
      objetivo: {},
      habitos: [],
      moment: require('moment')
    });
  }
};

/*const mostrarFormularioEditar = async (req, res) => {
  try {
    const objetivo = await Objetivo.findById(req.params.id);
    const habitos = await Habito.find({ usuario: req.usuario.id });
    
    if (!objetivo) {
      return res.status(404).send('Objetivo no encontrado');
    }

    res.render('objetivos/editar', {
      objetivo,
      habitos,
      moment: require('moment')
    });
  } catch (error) {
    res.status(500).send('Error al cargar el formulario de edición');
  }
};*/

// Actualizar objetivo
const actualizarObjetivo = async (req, res) => {
  try {
    const { titulo, descripcion, fechaFin, habitos } = req.body;
    
    const objetivoActualizado = await Objetivo.findByIdAndUpdate(
      req.params.id,
      {
        titulo,
        descripcion,
        fechaFin: new Date(fechaFin),
        habitos: Array.isArray(habitos) ? habitos : [habitos].filter(Boolean)
      },
      { new: true }
    );

    if (!objetivoActualizado) {
      return res.status(404).send('Objetivo no encontrado');
    }

    res.redirect('/api/objetivos');
  } catch (error) {
    console.error("Error al actualizar objetivo:", error);
    res.status(500).render('objetivos/editar', {
      error: "Error al actualizar: " + error.message,
      objetivo: req.body,
      habitos: await Habito.find({ usuario: req.usuario.id }),
      moment: require('moment')
    });
  }
};


// Eliminar objetivo
const eliminarObjetivo = async (req, res) => {
  try {
    const objetivoEliminado = await Objetivo.findByIdAndDelete(req.params.id);
    
    if (!objetivoEliminado) {
      return res.status(404).send('Objetivo no encontrado');
    }

    res.redirect('/api/objetivos');
  } catch (error) {
    res.status(500).redirect('/objetivos');
  }
};


module.exports = {
crearObjetivo,
actualizarProgreso,
verPanelSemanal,
mostrarFormularioCrear,
vincularHabito,
mostrarFormularioEditar,
actualizarObjetivo,
eliminarObjetivo
};