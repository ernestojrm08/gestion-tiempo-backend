const express = require("express");
const { obtenerActividadesPublicas } = require("../controladores/actividadControlador");

const router = express.Router();

// Rutas públicas para invitados
router.get("/actividades", obtenerActividadesPublicas);

//renderizar vistas de usuario
router.get("/", async (req, res) => {
    try {
        res.render("auth/login");
    } catch (error) {
        console.error("Error DETECTADO", error)
        res.status(500).send("Error al cargar lista de usuarios")
    }
})

router.get("/login", async (req, res) => {
    try {
        res.render("auth/login");
    } catch (error) {
        console.error("Error DETECTADO", error)
        res.status(500).send("Error al cargar lista de usuarios")
    }
})

router.get("/register", async (req, res) => {
    try {
        res.render("auth/register");
    } catch (error) {
        console.error("Error DETECTADO", error)
        res.status(500).send("Error al cargar lista de usuarios")
    }
})


// Ruta para la página de inicio
router.get('/home', (req, res) => {
    res.render('home', { title: 'Gestión de Hábitos - Inicio', pagina: 'inicio' });
});

// Ruta para la lista de hábitos
router.get('/home/habitos', (req, res) => {
    res.render('home', { title: 'Lista de Hábitos', pagina: 'habitos'});
});

// Ruta para la importación de hábitos
router.get('/home/importar-habitos', (req, res) => {
    res.render('home', { title: 'Importar Hábitos', pagina: 'importar-habitos' });
});


module.exports = router;