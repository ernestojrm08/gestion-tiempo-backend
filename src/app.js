require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");

// Importamos rutas
const habitoRutas =  require("./rutas/habitoRutas");
const actividadRutas = require("./rutas/actividadRutas");
const usuarioRutas = require("./rutas/usuarioRutas");

//iniar la app
const app = express();

//conectar a mongoDB
conectarDB();

//middlewares
app.use (cors());
app.use (express.json());


// ruta para testear
app.get("/", (req, res) => {
    res.send("servidor corriendo correctamente")
});

//rutas del servidor
app.use("/api/habitos", habitoRutas)
app.use("/api/actividades", actividadRutas)
app.use("/api/usuarios", usuarioRutas)

// configuracion del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en https://localhost:${PORT}`)
});

