const mongoose = require("mongoose");
require("dotenv").config();
const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conexión a MongoDB establecida");
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error);
        process.exit(1); // Sale de la app en caso de error
    }
};

module.exports = conectarDB;
