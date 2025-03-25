require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");
const path = require("path");

// Importamos rutas
const habitoRutas =  require("./rutas/habitoRutas");
const actividadRutas = require("./rutas/actividadRutas");
const usuarioRutas = require("./rutas/usuarioRutas");
const authRutas = require("./rutas/authRutas");
const publicRutas = require("./rutas/publicRutas");
const Usuario = require("./modelos/Usuario");
const Actividad = require("./modelos/Actividad");

// Importar middlewares
const { verificarToken, verificarRol } = require("./middleware/authMiddleware");

//iniar la app
const app = express();

//conectar a mongoDB
conectarDB();

//middlewares
app.use (cors());
app.use (express.json());

//configuracion ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../vistas"));

//servir archivos estaticos
app.use(express.static(path.join(__dirname, "../publico")));
app.use(express.static(path.join(__dirname, "../js")));

// ruta para testear
/*
app.get("/", (req, res) => {
    res.send("servidor corriendo correctamente")
});
*/

//rutas del servidor
app.use("/api/habitos", habitoRutas);
app.use("/api/actividades", actividadRutas);
app.use("/api/usuarios", usuarioRutas);
app.use("/api/auth", authRutas);
app.use("/", publicRutas);

// configuracion del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});

