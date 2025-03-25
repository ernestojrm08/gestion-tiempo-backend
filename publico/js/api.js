import { action_dashboard } from "./dashboard/dashboard.js";
const API_URL = "http://localhost:5000/api";

export async function obtenerUsuarios() {
    try {
        let usuario = JSON.parse(localStorage.getItem("usuario"));

        if (!usuario || !usuario.token) {
            console.error("Token no encontrado en localStorage.");
            return; // Detener la ejecución si no hay token
        }

        let respuesta = await fetch(`${API_URL}/usuarios`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${usuario.token}` // Correcto header para el token
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

export async function login(usuario){
    try {
        let aux = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        }).then(response => response.json()).then(data => {
            localStorage.setItem("usuario", JSON.stringify(data));
            dashboardApi();
        });
        
        //location.reload();
    } catch (error) {
        console.error("Error al logearse:", error);
    }
}

async function dashboardApi() {
    try {
        let usuario = JSON.parse(localStorage.getItem("usuario"));

        if (!usuario || !usuario.token) {
            console.error("Token no encontrado en localStorage.");
            return; // Detener la ejecución si no hay token
        }

        let aux = await fetch(`${API_URL}/usuarios/dashboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${usuario.token}` // Correcto header para el token
            }
            // No necesitas el body si solo usas el token para autenticacion.
        }).then(response => response.text()).then(data => {
            document.body.innerHTML = data;
            window.history.pushState({}, "", "api/usuarios/dashboard"); 
            action_dashboard();
        });


        //location.reload(); // Si es necesario, pero probablemente no aquí.

    } catch (error) {
        console.error("Error al obtener el dashboard:", error);
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
        let user = JSON.parse(localStorage.getItem("usuario"));
        await fetch(`http://localhost:5000/api/usuarios/${usuario._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(usuario)
        }).then(() => console.log("Usuario actualizado"));
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
    }
}

export async function obtenerHabitos() {
    let user = JSON.parse(localStorage.getItem("usuario"));
    const response = await fetch(`http://localhost:5000/api/habitos`, {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    });
    return await response.json();
}

export async function agregarHabito(habito) {
    let user = JSON.parse(localStorage.getItem("usuario"));
    await fetch("http://localhost:5000/api/habitos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify(habito)
    });
}

export async function obtenerActividades() {
    const user = JSON.parse(localStorage.getItem("usuario"));
    const response = await fetch(`${API_URL}/actividades`, {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function crearActividad(actividad) {
    const user = JSON.parse(localStorage.getItem("usuario"));
    const response = await fetch(`${API_URL}/actividades`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify(actividad)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function actualizarActividad(id, actividad) {
    const user = JSON.parse(localStorage.getItem("usuario"));
    const response = await fetch(`${API_URL}/actividades/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify(actividad)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function eliminarActividad(id) {
    const user = JSON.parse(localStorage.getItem("usuario"));
    const response = await fetch(`${API_URL}/actividades/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function obtenerActividadesPorCategoria(usuarioId, categoria) {
    const user = JSON.parse(localStorage.getItem("usuario"));
    const response = await fetch(`${API_URL}/actividades/usuarios/${usuarioId}/categorias/${categoria}`, {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}
