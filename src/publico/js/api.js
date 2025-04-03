const API_URL = "http://localhost:5000/api";

export async function obtenerUsuarios() {
    try {
        let respuesta = await fetch(`${API_URL}/usuarios`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${returnToken()}` // Correcto header para el token
            }
            // No necesitas el body si solo usas el token para autenticacion.
        })
        return await respuesta.json();

        //location.reload(); // Si es necesario, pero probablemente no aquí.

    } catch (error) {
        console.error("Error al obtener el dashboard:", error);
    }
}

export async function agregarUsuario(usuario) {
    try {
        const response = await fetch(`${API_URL}/auth/registro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al agregar usuario:", error);
    }
}


export async function eliminarUsuario(id) {
    if (confirm("¿Seguro que quieres eliminar este usuario?")) {
        try {
            await fetch(`http://localhost:5000/api/usuarios/${id}`, { method: "DELETE" });
            location.reload();
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    }
}

export async function updateUsuario(usuario) {
    try {
        await fetch(`http://localhost:5000/api/usuarios/${usuario._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${returnToken()}`
            },
            body: JSON.stringify(usuario)
        }).then(() => console.log("Usuario actualizado"));
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
    }
}

export async function obtenerHabitos() {
    const response = await fetch(`http://localhost:5000/api/habitos`, {
        headers: {
            "Authorization": `Bearer ${returnToken()}`
        }
    });
    return await response.json();
}

export async function agregarHabito(habito) {
    await fetch("http://localhost:5000/api/habitos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${returnToken()}`
        },
        body: JSON.stringify(habito)
    });
}

export async function obtenerActividades() {
    const response = await fetch(`${API_URL}/actividades`, {
        headers: {
            "Authorization": `Bearer ${returnToken()}`
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function crearActividad(actividad) {
    const response = await fetch(`${API_URL}/actividades`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${returnToken()}`
        },
        body: JSON.stringify(actividad)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function actualizarActividad(id, actividad) {
    const response = await fetch(`${API_URL}/actividades/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${returnToken()}`
        },
        body: JSON.stringify(actividad)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function eliminarActividad(id) {
    const response = await fetch(`${API_URL}/actividades/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${returnToken()}`
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function obtenerActividadesPorCategoria(usuarioId, categoria) {
    const response = await fetch(`${API_URL}/actividades/usuarios/${usuarioId}/categorias/${categoria}`, {
        headers: {
            "Authorization": `Bearer ${returnToken()}`
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

function returnToken(){
    const match = document.cookie.match(/token=(.+)/);
    const token = match[1];
    return token;
}