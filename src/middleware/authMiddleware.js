const jwt = require("jsonwebtoken");

// Middleware para verificar el token JWT
const verificarToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
        return res.status(401).json({ mensaje: "Acceso denegado. Token no proporcionado." });
    }

    try {
        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decodificado; // Agrega el usuario decodificado al objeto req
        next();
    } catch (error) {
        res.status(400).json({ mensaje: "Token inválido" });
    }
};

// Middleware para verificar roles
const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({ mensaje: "Usuario no autenticado" });
        }
        
        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({ mensaje: "No tienes permisos para realizar esta acción" });
        }
        next();
    };
};

module.exports = { verificarToken, verificarRol };