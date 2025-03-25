import {action_eventos_obtenerUsuarios} from "./eventos_usuario.js";
import {action_eventos_obtenerHabitos} from "./eventos_habitos.js";
import {action_eventos_obtenerActividades} from "./eventos_actividades.js";

export function action_dashboard() {
    console.log("eventos.js carga correctamente A");
    document.querySelector(".menu").addEventListener("click", async (e) => {
        console.log("menu",e.target.id);
        switch (e.target.id) {
            case "crud_user":
                action_eventos_obtenerUsuarios();
                break;
            case "crud_actividades":
                action_eventos_obtenerActividades();
                break;
            case "crud_habitos":
                action_eventos_obtenerHabitos();
                break;
            default:
                console.log("default");
                break;
        }
    });
    document.getElementById("salir").addEventListener("click", async (e) => {
        console.log("salir");
        localStorage.removeItem("usuario");
        window.location.href = "/home";
    });
}
