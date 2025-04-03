console.log("eventosActividades.js carga correctamente");

async function obtenerActividades() {
    try {
        const response = await fetch('/api/actividades');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener actividades:", error);
        return [];
    }
}

async function obtenerUsuarios() {
    try {
        const response = await fetch('/api/usuarios');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return [];
    }
}

async function obtenerHabitos() {
    try {
        const response = await fetch('/api/habitos');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener hábitos:", error);
        return [];
    }
}

async function cargarUsuariosYHabitos() {
    const usuarios = await obtenerUsuarios();
    const habitos = await obtenerHabitos();
    console.log("Usuarios:", usuarios);
    console.log("Hábitos:", habitos);

    const defaultUserOption = document.createElement("option");
    defaultUserOption.value = "";
    defaultUserOption.textContent = "N/A";

    const usuarioSelect = document.getElementById("usuario");
    usuarioSelect.innerHTML = ''; // Limpiar opciones existentes
    usuarioSelect.appendChild(defaultUserOption);
    usuarios.forEach(user => {
        const option = document.createElement("option");
        option.value = user._id;
        option.textContent = user.nombre;
        usuarioSelect.appendChild(option);
    });

    const habitoSelect = document.getElementById("habito");
    habitoSelect.innerHTML = ''; // Limpiar opciones existentes
    const defaultHabitoOption = document.createElement("option");
    defaultHabitoOption.value = "";
    defaultHabitoOption.textContent = "Ninguno";
    habitoSelect.appendChild(defaultHabitoOption);
    habitos.forEach(habito => {
        const option = document.createElement("option");
        option.value = habito._id;
        option.textContent = habito.nombre;
        habitoSelect.appendChild(option);
    });
}
async function consultarRuta(url){
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener hábitos:", error);
        return [];
    }
}
function validarFechas(inicioId, finId) {
    const fechaInicioInput = document.getElementById(inicioId);
    const fechaFinInput = document.getElementById(finId);
  
    const fechaInicio = new Date(fechaInicioInput.value);
    const fechaFin = new Date(fechaFinInput.value);
  
    if (fechaInicio > fechaFin) {
      alert("La fecha de inicio debe ser menor o igual a la fecha final.");
      fechaInicioInput.value = ''; // Opcional: limpiar el campo de inicio
      return false; // Indica que la validación falló
    }
    return true; // Indica que la validación fue exitosa
  }
async function buscarActividad(){
   const usuario = document.getElementById("usuario").value;
   const habito = document.getElementById("habito").value;
   const actividadId = document.getElementById("id_actividad").value;
   const categoria = document.getElementById("categoria").value;
   const proyecto = document.getElementById("proyecto").value;
   const fecha_inicio = document.getElementById("fecha_inicio").value;
   const fecha_fin = document.getElementById("fecha_fin").value;
   const nombre = document.getElementById("nombre").value;
   let list_url = [];

   if(actividadId) list_url.push({url:`/api/actividades/${actividadId}`,status:undefined,resp:[]});
   if(nombre)   list_url.push({url:`/api/actividades/buscar/${nombre}`,status:undefined,resp:[]});
   if(proyecto) list_url.push({url:`/api/actividades/proyectos/${proyecto}/actividades`,status:undefined,resp:[]});
   if(usuario)  list_url.push({url:`/api/actividades/usuarios/${usuario}/ultimas-actividades`,status:undefined,resp:[]});
   if(usuario && categoria) list_url.push({url:`/api/actividades/usuarios/${usuario}/categorias/${categoria}`,status:undefined,resp:[]});
   if(habito && fecha_fin && fecha_fin){
        if(!validarFechas("fecha_inicio", "fecha_fin")){
            alert("La fecha final incorrecta, fecha final menor a fecha inicial");
            return
        }
        list_url.push({url:`/api/actividades/habitos/${habito}/actividades/${fecha_inicio}/${fecha_fin}`,status:undefined,resp:[]});
   } 

   console.log(list_url)
   list_url.forEach((consulta)=>{
    consultarRuta(consulta.url)
    .then(r => {
        consulta.resp = r
        consulta.status = true;
    })
     .catch(error => {
        console.log(error,consulta.url);
        consulta.status = false;
     })
     .finally(()=>{
        let statusR = list_url.filter((el)=> typeof el.status == "boolean" ).length;
        if(statusR == list_url.length){
          //console.log("final consulta");
           //console.log(list_url);
           let aux_list = list_url.map((el)=>{
            return el.resp
           }).flat()
           let resp_final = [...new Map(aux_list.map(objeto => [objeto._id, objeto])).values()];
           dibujarTabla(resp_final);
        }
     })
   })
}


async function actualizarTabla() {
    const tablaActividades = document.getElementById("actividades-body");
    tablaActividades.innerHTML = "";
    const actividades = await obtenerActividades();
    dibujarTabla(actividades);
}

function dibujarTabla(actividades){
    const tablaActividades = document.getElementById("actividades-body");
    tablaActividades.innerHTML = "";
    actividades.reverse();
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
            <td>${new Date(actividad.fecha_inicio).toLocaleString()}</td>
            <td>${actividad.fecha_fin ? new Date(actividad.fecha_fin).toLocaleString() : "N/A"}</td>
            <td>${actividad.completada ? "Sí" : "No"}</td>
        `;
        tablaActividades.appendChild(fila);
    });
}

function limpiarFormulario() {
    document.getElementById("id_actividad").value = "";
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
}

document.addEventListener('DOMContentLoaded', async () => {
    await cargarUsuariosYHabitos();
    await actualizarTabla();
    
    document.getElementById("button_buscar").addEventListener("click",(event)=>{
        event.preventDefault();
        buscarActividad();
    });

    document.getElementById("button_limpiar").addEventListener("click", ()=>{
        actualizarTabla();
        limpiarFormulario();
    });
});