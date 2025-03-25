import { obtenerUsuarios, agregarUsuario } from "../api.js";

export function action_eventos_obtenerUsuarios() {
    console.log("eventos.js carga correctamente");
    const crudUsuarios = document.getElementById("contenido-principal");
    crudUsuarios.innerHTML = `
        <h1>Gestión de Usuarios</h1>
        <form id="form-usuario">
            <input type="hidden" id="usuario-id">
            <input type="text" id="nombre" placeholder="Nombre" required>
            <input type="email" id="correo" placeholder="Correo" required>
            <input type="password" id="contraseña" placeholder="Contraseña" required>
            <button type="submit" id="button_form">Agregar Usuario</button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="usuarios-body"></tbody>
        </table>
    `;
    if (crudUsuarios) {
        const tablaUsuarios = document.getElementById("usuarios-body");
        obtenerUsuarios().then(usuarios => {
            usuarios.forEach(usuario => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${usuario._id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.correo}</td>
                    <td>
                        <button class="delete_button" id_delete="${usuario._id}">Eliminar</button>
                        <button class="edit_button" id_edit="${usuario._id}">Editar</button>
                    </td>
                `;
                tablaUsuarios.appendChild(fila);
            });
            let aux_delete_buttos = document.querySelectorAll(".delete_button");
            aux_delete_buttos.forEach((element) => {
                element.addEventListener("click", async (e) => {
                    console.log("delete", e.target.getAttribute("id_delete"));
                    await eliminarUsuario(e.target.getAttribute("id_delete"));
                });
            });

            let aux_edit_buttons = document.querySelectorAll(".edit_button");
            aux_edit_buttons.forEach((element)=>{
                element.addEventListener("click", async (e) =>{
                    editarUsuario(e.target.getAttribute("id_edit"));
                });
            });

        });

        document.getElementById("form-usuario").addEventListener("submit", async (e) => {
            e.preventDefault();
            const nombre = document.getElementById("nombre").value;
            const correo = document.getElementById("correo").value;
            const contraseña = document.getElementById("contraseña").value;
            const usuarioId = document.getElementById("usuario-id").value;

            if (usuarioId) {
                //editar
                await updateUsuario({_id: usuarioId, nombre, correo}).then(() => {
                    actualizarTabla();
                    limpiarFormulario();
                })
            } else {
                //agregar
                await agregarUsuario({ nombre, correo, contraseña }).then(() => {
                    actualizarTabla();
                    limpiarFormulario();
                });
            }
        });

    }
}

async function updateUsuario(usuario){
    let user = JSON.parse(localStorage.getItem("usuario"));
    await fetch(`http://localhost:5000/api/usuarios/${usuario._id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify(usuario)
    }).then(()=>console.log("Usuario actualizado"));
}

async function eliminarUsuario(id) {
    if (confirm("¿Seguro que quieres eliminar este usuario?")) {
        let usuario = JSON.parse(localStorage.getItem("usuario"));

        if (!usuario || !usuario.token) {
            console.error("Token no encontrado en localStorage.");
            return; // Detener la ejecución si no hay token
        }

        try {
            await fetch(`http://localhost:5000/api/usuarios/${id}`, {
                method: "DELETE", headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${usuario.token}` // Correcto header para el token
                }
            }).then(response => response.text()).then(data => {
                actualizarTabla();
            });

        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    }
}

function actualizarTabla() {
    const tablaUsuarios = document.getElementById("usuarios-body");
    tablaUsuarios.innerHTML = "";
    obtenerUsuarios().then(usuarios => {
        usuarios.forEach(usuario => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${usuario._id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.correo}</td>
                <td>
                    <button class="delete_button" id_delete="${usuario._id}">Eliminar</button>
                    <button class="edit_button" id_edit="${usuario._id}">Editar</button>
                </td>
            `;
            tablaUsuarios.appendChild(fila);
        });
        let aux_delete_buttos = document.querySelectorAll(".delete_button");
        aux_delete_buttos.forEach((element) => {
            element.addEventListener("click", async (e) => {
                console.log("delete", e.target.getAttribute("id_delete"));
                await eliminarUsuario(e.target.getAttribute("id_delete"));
            });
        });
        let aux_edit_buttons = document.querySelectorAll(".edit_button");
            aux_edit_buttons.forEach((element)=>{
                element.addEventListener("click", async (e) =>{
                    editarUsuario(e.target.getAttribute("id_edit"));
                });
            });
    });
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("contraseña").value = "";
    document.getElementById("usuario-id").value = "";
    document.getElementById("button_form").innerText = "Agregar Usuario";
    document.getElementById("calse_edit").remove();
    document.getElementById("contraseña").setAttribute("required", "true");
}

async function editarUsuario(id) {
    let usuarios = await obtenerUsuarios();
    let usuario = usuarios.find(user => user._id === id);
    console.log("Usuario a editar:", usuario);
    if (usuario) {
        document.getElementById("form-usuario").innerHTML += `<button id="calse_edit">Limpiar</button>`;
        document.getElementById("calse_edit").addEventListener("click", (e) => {
            e.preventDefault();
            limpiarFormulario();
        });
        document.getElementById("button_form").innerText = "Actualizar Usuario";
        document.getElementById("usuario-id").value = usuario._id;
        document.getElementById("nombre").value = usuario.nombre;
        document.getElementById("correo").value = usuario.correo;
        document.getElementById("contraseña").removeAttribute("required");
    }
}