document.addEventListener("DOMContentLoaded", async () => {
    const tablaUsuarios = document.getElementById("usuarios-body");
    const usuarios = await obtenerUsuarios();

    usuarios.forEach(usuario => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.email}</td>
            <td><button onclick="eliminarUsuario(${usuario.id})">Eliminar</button></td>
        `;
        tablaUsuarios.appendChild(fila);
    });

    document.getElementById("form-usuario").addEventListener("submit", async (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;

        await agregarUsuario({ nombre, email });
        location.reload();
    });
});