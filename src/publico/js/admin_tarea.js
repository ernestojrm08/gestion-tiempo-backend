
document.addEventListener('DOMContentLoaded', async () => {
    const tareasBody = document.getElementById('tareas-body');
    const formTarea = document.getElementById('form-tarea');

    const selectUsuario = document.getElementById('usuario');
    const selectActividad = document.getElementById('actividad');

    // 📡 Obtener usuarios y llenar el select correspondiente
    const cargarUsuarios = async () => {
        try {
            const res = await fetch('/api/usuarios');
            if (!res.ok) throw new Error("Error al cargar usuarios");

            const usuarios = await res.json();
            usuarios.forEach(usuario => {
                const option = document.createElement('option');
                option.value = usuario._id;
                option.textContent = usuario.nombre;
                selectUsuario.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }
    };

    // 📡 Obtener actividades y llenar el select correspondiente
    const cargarActividades = async () => {
        try {
            const res = await fetch('/api/actividades');
            if (!res.ok) throw new Error("Error al cargar actividades");

            const actividades = await res.json();

            // Opción por defecto "Ninguna"
            const optionVacio = document.createElement('option');
            optionVacio.value = '';
            optionVacio.textContent = 'Ninguna';
            selectActividad.appendChild(optionVacio);

            actividades.forEach(act => {
                const option = document.createElement('option');
                option.value = act._id;
                option.textContent = act.nombre;
                selectActividad.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar actividades:', error);
        }
    };

    function limpiarFormulario() {
        document.getElementById("nombre").value = "";
        document.getElementById("descripcion").value = "";
        document.getElementById("fecha_inicio").value = "";
        document.getElementById("fecha_fin").value = "";
        document.getElementById("estado").value = "";
        document.getElementById("actividad").value = "";
        document.getElementById("prioridad").value = "";
    }
    

    // 📡 Obtener tareas y llenar la tabla
    const cargarTareas = async () => {
        try {
            const res = await fetch('/api/tareas');
            if (!res.ok) throw new Error("Error al cargar tareas");

            const tareas = await res.json();
            tareasBody.innerHTML = '';

            tareas.forEach(t => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${t.nombre}</td>
                    <td>${t.descripcion}</td>
                    <td>${new Date(t.fecha_inicio).toLocaleDateString()}</td>
                    <td>${t.fecha_fin ? new Date(t.fecha_fin).toLocaleDateString() : 'En curso'}</td>
                    <td>${t.completada ? 'Completada' : 'Pendiente'}</td>
                    <td>${t.usuario?.nombre || 'Desconocido'}</td>
                    <td>${t.actividad?.nombre || 'Ninguna'}</td>
                    <td>${t.prioridad || 'Media'}</td>
                    <td>
                        <button class="edit_button" title="editar" data-id="${t._id}">✏️</button>
                        <button class="delete_button" title="eliminar" data-id="${t._id}">🗑️</button>
                    </td>
                `;
                tareasBody.appendChild(tr);

                tr.querySelector('.edit_button').addEventListener('click', () => {
                    document.getElementById('tarea-id').value = t._id;
                    document.getElementById('nombre').value = t.nombre;
                    document.getElementById('descripcion').value = t.descripcion;
                    document.getElementById('fecha_inicio').value = t.fecha_inicio.slice(0, 16);
                    document.getElementById('fecha_fin').value = t.fecha_fin ? t.fecha_fin.slice(0, 16) : '';
                    document.getElementById('estado').value = t.completada ? 'completada' : 'pendiente';
                    document.getElementById('prioridad').value = t.prioridad || 'Media';
                    selectUsuario.value = t.usuario?._id;
                    selectActividad.value = t.actividad?._id || '';
                });
            
                // Botón eliminar
                tr.querySelector('.delete_button').addEventListener('click', async () => {
                    if (!confirm("¿Estás seguro de eliminar esta tarea?")) return;
            
                    try {
                        const res = await fetch(`/api/tareas/${t._id}`, {
                            method: 'DELETE',
                        });
                        if (!res.ok) throw new Error("Error al eliminar");
            
                        await cargarTareas();
                    } catch (err) {
                        console.error(err);
                        alert("Error al eliminar la tarea");
                    }
                });

            });
        } catch (error) {
            console.error('Error al cargar tareas:', error);
        }
    };

    // 📤 Enviar nueva tarea
    formTarea.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const tareaId = document.getElementById('tarea-id').value;
        const tarea = {
            nombre: document.getElementById('nombre').value,
            descripcion: document.getElementById('descripcion').value,
            fecha_inicio: document.getElementById('fecha_inicio').value,
            fecha_fin: document.getElementById('fecha_fin').value || null,
            completada: document.getElementById('estado').value === 'completada',
            prioridad: document.getElementById('prioridad').value,
            usuario: selectUsuario.value,
            actividad: selectActividad.value || null
        };
    
        const url = tareaId ? `/api/tareas/${tareaId}` : '/api/tareas';
        const method = tareaId ? 'PUT' : 'POST';
    
        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tarea),
            });
    
            if (!res.ok) {
                const err = await res.json();
                alert("Error: " + (err.error || 'No se pudo guardar la tarea'));
                return;
            }
    
            formTarea.reset();
            document.getElementById('tarea-id').value = ''; // limpiar id
            await cargarTareas();
        } catch (error) {
            console.error('Error al guardar tarea:', error);
            alert("Error inesperado al guardar la tarea.");
        }
    });    

    // Inicializar la carga de datos
    await cargarUsuarios();
    await cargarActividades();
    await cargarTareas();

    document.getElementById("button_limpiar").addEventListener("click", ()=>{
        limpiarFormulario();
    });
});
