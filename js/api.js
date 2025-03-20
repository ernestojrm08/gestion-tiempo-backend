const API_URL = "http://localhost:3000/api";

async function obtenerUsuarios() {
    const respuesta = await fetch(`${API_URL}/usuarios`);
    return await respuesta.json();
}

async function agregarUsuario(usuario) {
    await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    });
}
