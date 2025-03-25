

document.addEventListener("DOMContentLoaded", async () => {
    console.log("eventos.js carga correctamente");
    document.getElementById("form-login").addEventListener("submit", async (e) => {
        e.preventDefault();
        const correo = document.getElementById("correo").value;
        const contraseña = document.getElementById("contraseña").value;
 
        await login({ correo,contraseña });
    });
});