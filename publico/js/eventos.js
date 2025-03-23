document.addEventListener("DOMContentLoaded", async () => {
    console.log("eventos.js carga correctamente");
    const tablaUsuarios = document.getElementById("usuarios-body");

    if (tablaUsuarios) {
        const usuarios = await obtenerUsuarios();
        usuarios.forEach(usuario => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${usuario._id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.correo}</td>
                <td><button onclick="eliminarUsuario('${usuario._id}')">Eliminar</button></td>
            `;
            tablaUsuarios.appendChild(fila);
        });

        document.getElementById("form-usuario").addEventListener("submit", async (e) => {
            e.preventDefault();
            const nombre = document.getElementById("nombre").value;
            const correo = document.getElementById("correo").value;
            const contraseña = document.getElementById("contraseña").value;
            await agregarUsuario({ nombre, correo });
        });
    }
});

async function eliminarUsuario(id) {
    if (confirm("¿Seguro que quieres eliminar este usuario?")) {
        try {
            await fetch(`http://localhost:5000/api/usuarios/${id}`, { method: "DELETE" });
            location.reload();
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    }
}
