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
            //console.log({ nombre, correo, contraseña });
            await agregarUsuario({ nombre, correo,contraseña });
        });
    }
});

