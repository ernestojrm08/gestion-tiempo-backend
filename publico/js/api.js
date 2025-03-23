const API_URL = "http://localhost:5000/api";

async function obtenerUsuarios() {
    try {
        const respuesta = await fetch(`${API_URL}/usuarios`);
        return await respuesta.json();
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    }
}

async function agregarUsuario(usuario) {
    try {
        await fetch(`${API_URL}/usuarios`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });
        location.reload();
    } catch (error) {
        console.error("Error al agregar usuario:", error);
    }
}
