document.addEventListener("DOMContentLoaded", async () => {
    console.log("eventos.js carga correctamente");

    document.getElementById("form-register").addEventListener("submit", async (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const contraseña = document.getElementById("contraseña").value;
        //console.log({ nombre, correo, contraseña });
        await agregarUsuario({ nombre, correo,contraseña });
    });
});