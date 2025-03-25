import { agregarUsuario } from "../api.js";

document.addEventListener("DOMContentLoaded", async () => {
    console.log("eventos.js carga correctamente");

    document.getElementById("form-register").addEventListener("submit", async (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const contraseña = document.getElementById("contraseña").value;
        //console.log({ nombre, correo, contraseña });
       const response =  await agregarUsuario({ nombre, correo,contraseña });
       if(response.mensaje === "Usuario registrado correctamente"){
           alert(response.mensaje);
            window.location.href = "/login";
            window.history.pushState({}, "", "/login");
            window.location.reload();
             
       }
    });
});