import { obtenerActividades, crearActividad, actualizarActividad, eliminarActividad, obtenerUsuarios, obtenerHabitos } from "../api.js";

export async function action_eventos_obtenerActividades() {
    console.log("eventosActividades.js carga correctamente");
    const crudActividades = document.getElementById("contenido-principal");
    crudActividades.innerHTML = `
     <h1>Gestión de Actividades</h1>
    <form id="form-actividad">
    <input type="hidden" id="actividad-id">
   
    <div>
        <label for="usuario">Usuario:</label>
        <select class="input_select" id="usuario" required></select>
    </div>

    <div>
        <label for="habito">Hábito (opcional):</label>
        <select class="input_select" id="habito"></select>
    </div>

    <div>
        <label for="proyecto">Proyecto (opcional):</label>
         <input type="text" id="proyecto" placeholder="Nombre del proyecto">
    </div>

    <div>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" placeholder="Nombre de la actividad" required>
    </div>

    <div>
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" placeholder="Descripción de la actividad"></textarea>
    </div>

    <div>
        <label for="categoria">Categoría:</label>
        <input type="text" id="categoria" placeholder="Categoría de la actividad" required>
    </div>

    <div>
        <label for="fecha_inicio">Fecha de Inicio:</label>
        <input type="date" id="fecha_inicio" required>
    </div>

    <div>
        <label for="fecha_fin">Fecha de Fin (opcional):</label>
        <input type="date" id="fecha_fin">
    </div>

    <label class="check_from">
        Completada:<input type="checkbox" id="completada" class="input_check"> 
    </label>

    <div>
        <button class="button_primary" type="button" id="button_buscar">Buscar Actividad</button>
        <button class="button_primary" type="submit" id="button_form">Agregar Actividad</button>
        <button class="button_primary" type="button" id="button_limpiar">Limpiar Formulario</button>
    </div>
</form>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Hábito</th>
                    <th>Proyecto</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Categoría</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Completada</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="actividades-body"></tbody>
        </table>
    `;

    if (crudActividades) {
        await cargarUsuariosYHabitos();
        actualizarTabla();

        document.getElementById("form-actividad").addEventListener("submit", async (e) => {
            e.preventDefault();
            const usuario = document.getElementById("usuario").value;
            const habito = document.getElementById("habito").value;
            const proyecto = document.getElementById("proyecto").value;
            const nombre = document.getElementById("nombre").value;
            const descripcion = document.getElementById("descripcion").value;
            const categoria = document.getElementById("categoria").value;
            const fecha_inicio = document.getElementById("fecha_inicio").value;
            const fecha_fin = document.getElementById("fecha_fin").value;
            const completada = document.getElementById("completada").checked;
            const actividadId = document.getElementById("actividad-id").value;

            const actividadData = {
                usuario,
                habito: habito || null,
                proyecto: proyecto || null,
                nombre,
                descripcion,
                categoria,
                fecha_inicio,
                fecha_fin: fecha_fin || null,
                completada,
            };

            if (actividadId) {
                await actualizarActividad(actividadId, actividadData);
            } else {
                await crearActividad(actividadData);
            }
            actualizarTabla();
            limpiarFormulario();
        });

        document.getElementById("button_limpiar").addEventListener("click", limpiarFormulario);
    }
}

async function cargarUsuariosYHabitos() {
    const usuarios = await obtenerUsuarios();
    const habitos = await obtenerHabitos();
    console.log(usuarios);
    console.log(habitos);
    
    const usuarioSelect = document.getElementById("usuario");
    usuarios.forEach(user => {
        const option = document.createElement("option");
        option.value = user._id;
        option.textContent = user.nombre;
        usuarioSelect.appendChild(option);
    });
    
    const habitoSelect = document.getElementById("habito");
    const defaultOption = document.createElement("option");
    
    defaultOption.value = "";
    defaultOption.textContent = "Ninguno";
    habitoSelect.appendChild(defaultOption);
    habitos.forEach(habito => {
        const option = document.createElement("option");
        option.value = habito._id;
        option.textContent = habito.nombre;
        habitoSelect.appendChild(option);
    });
    
}

async function actualizarTabla() {
    const tablaActividades = document.getElementById("actividades-body");
    tablaActividades.innerHTML = "";
    const actividades = await obtenerActividades();
    console.log(actividades);
    
    actividades.forEach(actividad => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${actividad._id}</td>
            <td>${actividad.usuario ? actividad.usuario.nombre : "N/A"}</td>
            <td>${actividad.habito ? actividad.habito.nombre : "N/A"}</td>
            <td>${actividad.proyecto || "N/A"}</td>
            <td>${actividad.nombre}</td>
            <td>${actividad.descripcion || "N/A"}</td>
            <td>${actividad.categoria}</td>
            <td>${actividad.fecha_inicio}</td>
            <td>${actividad.fecha_fin || "N/A"}</td>
            <td>${actividad.completada ? "Sí" : "No"}</td>
            <td>
                <button class="delete_button" id_delete="${actividad._id}">Eliminar</button>
                <button class="edit_button" id_edit="${actividad._id}">Editar</button>
            </td>
        `;
        tablaActividades.appendChild(fila);
    });
    
    document.querySelectorAll(".delete_button").forEach(button => {
        button.addEventListener("click", async (e) => {
            await eliminarActividad(e.target.getAttribute("id_delete"));
            actualizarTabla();
        });
    });

    document.querySelectorAll(".edit_button").forEach(button => {
        button.addEventListener("click", (e) => editarActividad(e.target.getAttribute("id_edit")));
    });
}

function limpiarFormulario() {
    document.getElementById("actividad-id").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("habito").value = "";
    document.getElementById("proyecto").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("fecha_inicio").value = "";
    document.getElementById("fecha_fin").value = "";
    document.getElementById("completada").checked = false;
    document.getElementById("button_form").innerText = "Agregar Actividad";
}

async function editarActividad(id) {
    const actividades = await obtenerActividades();
    const actividad = actividades.find(act => act._id === id);
    if (actividad) {
        document.getElementById("actividad-id").value = actividad._id;
        document.getElementById("usuario").value = actividad.usuario._id;
        document.getElementById("habito").value = actividad.habito ? actividad.habito._id : "";
        document.getElementById("proyecto").value = actividad.proyecto || "";
        document.getElementById("nombre").value = actividad.nombre;
        document.getElementById("descripcion").value = actividad.descripcion || "";
        document.getElementById("categoria").value = actividad.categoria;
        document.getElementById("fecha_inicio").value = actividad.fecha_inicio;
        document.getElementById("fecha_fin").value = actividad.fecha_fin || "";
        document.getElementById("completada").checked = actividad.completada;
        document.getElementById("button_form").innerText = "Actualizar Actividad";
    }
}