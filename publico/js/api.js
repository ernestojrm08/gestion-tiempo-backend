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
        await fetch(`${API_URL}/auth/registro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });
        location.reload();
    } catch (error) {
        console.error("Error al agregar usuario:", error);
    }
}

async function login(usuario){
    try {
        let aux = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        }).then(response => response.json()).then(data => {
            localStorage.setItem("usuario", JSON.stringify(data));
            dashboard();
        });
        
        //location.reload();
    } catch (error) {
        console.error("Error al logearse:", error);
    }
}

async function dashboard() {
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
        });


        //location.reload(); // Si es necesario, pero probablemente no aquí.

    } catch (error) {
        console.error("Error al obtener el dashboard:", error);
    }
}