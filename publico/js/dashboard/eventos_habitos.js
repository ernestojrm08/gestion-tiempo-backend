import { obtenerHabitos, agregarHabito } from "../api.js";

export function action_eventos_obtenerHabitos() {
    console.log("eventos.js carga correctamente (hábitos)");
    const crudHabitos = document.getElementById("contenido-principal");
    crudHabitos.innerHTML = `
        <h1>Gestión de Hábitos</h1>
        <form id="form-habito">
            <input type="hidden" id="habito-id">
            <input type="text" id="nombre" placeholder="Nombre" required>
            <textarea id="descripcion" placeholder="Descripción" required></textarea>
            <br/>
            <button type="submit" id="button_form">Agregar Hábito</button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="habitos-body"></tbody>
        </table>
    `;
    if (crudHabitos) {
        const tablaHabitos = document.getElementById("habitos-body");
        obtenerHabitos().then(habitos => {
            habitos.forEach(habito => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${habito._id}</td>
                    <td>${habito.nombre}</td>
                    <td>${habito.descripcion}</td>
                    <td>
                        <button class="delete_button" id_delete="${habito._id}">Eliminar</button>
                        <button class="edit_button" id_edit="${habito._id}">Editar</button>
                    </td>
                `;
                tablaHabitos.appendChild(fila);
            });
            let aux_delete_buttos = document.querySelectorAll(".delete_button");
            aux_delete_buttos.forEach((element) => {
                element.addEventListener("click", async (e) => {
                    console.log("delete", e.target.getAttribute("id_delete"));
                    await eliminarHabito(e.target.getAttribute("id_delete"));
                });
            });

            let aux_edit_buttons = document.querySelectorAll(".edit_button");
            aux_edit_buttons.forEach((element) => {
                element.addEventListener("click", async (e) => {
                    editarHabito(e.target.getAttribute("id_edit"));
                });
            });

        });

        document.getElementById("form-habito").addEventListener("submit", async (e) => {
            e.preventDefault();
            const nombre = document.getElementById("nombre").value;
            const descripcion = document.getElementById("descripcion").value;
            const habitoId = document.getElementById("habito-id").value;
            const usuario = JSON.parse(localStorage.getItem("usuario"));
            if (habitoId) {
                //editar
                await actualizarHabito({ _id: habitoId, nombre, descripcion }).then(() => {
                    actualizarTabla();
                    limpiarFormulario();
                });
            } else {
                //agregar
                let usuario = {};
                await agregarHabito({ nombre, descripcion, usuario }).then(() => {
                    actualizarTabla();
                    limpiarFormulario();
                });
            }
        });

    }
}

async function actualizarHabito(habito) {
    let user = JSON.parse(localStorage.getItem("usuario"));
    await fetch(`http://localhost:5000/api/habitos/${habito._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify(habito)
    }).then(() => console.log("Hábito actualizado"));
}

async function eliminarHabito(id) {
    if (confirm("¿Seguro que quieres eliminar este hábito?")) {
        let usuario = JSON.parse(localStorage.getItem("usuario"));

        if (!usuario || !usuario.token) {
            console.error("Token no encontrado en localStorage.");
            return; // Detener la ejecución si no hay token
        }

        try {
            await fetch(`http://localhost:5000/api/habitos/${id}`, {
                method: "DELETE", headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${usuario.token}` // Correcto header para el token
                }
            }).then(response => response.text()).then(data => {
                actualizarTabla();
            });

        } catch (error) {
            console.error("Error al eliminar hábito:", error);
        }
    }
}

function actualizarTabla() {
    const tablaHabitos = document.getElementById("habitos-body");
    tablaHabitos.innerHTML = "";
    obtenerHabitos().then(habitos => {
        habitos.forEach(habito => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${habito._id}</td>
                <td>${habito.nombre}</td>
                <td>${habito.descripcion}</td>
                <td>
                    <button class="delete_button" id_delete="${habito._id}">Eliminar</button>
                    <button class="edit_button" id_edit="${habito._id}">Editar</button>
                </td>
            `;
            tablaHabitos.appendChild(fila);
        });
        let aux_delete_buttos = document.querySelectorAll(".delete_button");
        aux_delete_buttos.forEach((element) => {
            element.addEventListener("click", async (e) => {
                console.log("delete", e.target.getAttribute("id_delete"));
                await eliminarHabito(e.target.getAttribute("id_delete"));
            });
        });
        let aux_edit_buttons = document.querySelectorAll(".edit_button");
        aux_edit_buttons.forEach((element) => {
            element.addEventListener("click", async (e) => {
                editarHabito(e.target.getAttribute("id_edit"));
            });
        });
    });
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("habito-id").value = "";
    document.getElementById("button_form").innerText = "Agregar Hábito";
    if(document.getElementById("calse_edit")){
        document.getElementById("calse_edit").remove();
    }
}

async function editarHabito(id) {
    let habitos = await obtenerHabitos();
    let habito = habitos.find(habito => habito._id === id);
    console.log("Hábito a editar:", habito);
    if (habito) {
        document.getElementById("form-habito").innerHTML += `<button id="calse_edit">Limpiar</button>`;
        document.getElementById("calse_edit").addEventListener("click", (e) => {
            e.preventDefault();
            limpiarFormulario();
        });
        document.getElementById("button_form").innerText = "Actualizar Hábito";
        document.getElementById("habito-id").value = habito._id;
        document.getElementById("nombre").value = habito.nombre;
        document.getElementById("descripcion").value = habito.descripcion;
    }
}