require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session  = require("express-session");
const flash = require("connect-flash");
const methodOverride = require('method-override');
// Importamos rutas
const habitoRutas =  require("./rutas/habitoRutas");
const actividadRutas = require("./rutas/actividadRutas");
const usuarioRutas = require("./rutas/usuarioRutas");
const authRutas = require("./rutas/authRutas");
const publicRutas = require("./rutas/publicRutas");
const Usuario = require("./modelos/Usuario");
const Actividad = require("./modelos/Actividad");
const rutasRecordatorios = require('./rutas/rutasRecordatorios'); ////
const rutasObjetivos = require('./rutas/rutasObjetivos');

// Importar middlewares
const { verificarToken, verificarRol } = require("./middleware/authMiddleware");

//iniar la app
const app = express();

//conectar a mongoDB
conectarDB();

//middlewares
app.use (cors());
app.use (express.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600 }
}));
app.use(flash());
app.use(express.urlencoded({ extended: true }));

// Para analizar application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

// Para analizar application/json
app.use(bodyParser.json());

//configuracion ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../vistas"));

//servir archivos estaticos
app.use(express.static(path.join(__dirname, "./publico")));

//rutas del servidor
app.use("/api/habitos", habitoRutas);
app.use("/api/actividades", actividadRutas);
app.use("/api/usuarios", usuarioRutas);
app.use("/api/auth", authRutas);
app.use("/", publicRutas);
app.use('/api/recordatorios', rutasRecordatorios); ////////
app.use('/api/objetivos', rutasObjetivos);

// configuracion del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});

