const mongoose = require("mongoose");
const conectarDB = require("./config/db");
const Usuario = require("./modelos/Usuario");
const bcrypt = require("bcrypt");

//  Conectar a la base de datos
conectarDB();

const inicializarBD = async () => {
    try {
        console.log(" Iniciando migraciones...");

        //  Verificar si los usuarios ya existen para no duplicarlos
        const adminExiste = await Usuario.findOne({ correo: "admin@mail.com" });
        const usuarioExiste = await Usuario.findOne({ correo: "usuario@mail.com" });

        if (!adminExiste) {
            const salt = await bcrypt.genSalt(10);
            const passwordAdmin = await bcrypt.hash("admin123", salt);

            await Usuario.create({
                nombre: "Admin",
                correo: "admin@mail.com",
                contraseña: passwordAdmin,
                rol: "admin"
            });

            console.log(" Usuario Admin creado.");
        } else {
            console.log(" Usuario Admin ya existe, no se creó otro.");
        }

        if (!usuarioExiste) {
            const salt = await bcrypt.genSalt(10);
            const passwordUser = await bcrypt.hash("usuario123", salt);

            await Usuario.create({
                nombre: "Usuario",
                correo: "usuario@mail.com",
                contraseña: passwordUser,
                rol: "usuario"
            });

            console.log(" Usuario estándar creado.");
        } else {
            console.log(" Usuario estándar ya existe, no se creó otro.");
        }

        console.log(" Migraciones completadas con éxito.");
        process.exit();
    } catch (error) {
        console.error(" Error en migraciones:", error);
        process.exit(1);
    }
};

// Ejecutar migraciones
inicializarBD();
