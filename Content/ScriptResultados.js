function initResultados() {
    const nivel = localStorage.getItem("nivelActual") || "1";
    const nombreUsuario = localStorage.getItem("nombreUsuario") || "Estudiante";

    let puntajeKey, totalPreguntas, nivelNombre;
    switch (nivel) {
        case "1":
            puntajeKey = "puntajeTotal";
            totalPreguntas = 42;
            nivelNombre = "Principiante";
            break;
        case "2":
            puntajeKey = "puntajeTotal2";
            totalPreguntas = 25;
            nivelNombre = "Intermedio";
            break;
        case "3":
            puntajeKey = "puntajeTotalFinal";
            totalPreguntas = 45;
            nivelNombre = "Final";
            break;
        default:
            puntajeKey = "puntajeTotal";
            totalPreguntas = 42;
            nivelNombre = "Principiante";
            break;
    }

    document.getElementById("tituloResultado").textContent =
        `¡Resultados - Nivel ${nivelNombre}!`;

    const puntaje = parseInt(localStorage.getItem(puntajeKey)) || 0;
    const porcentaje = (puntaje / totalPreguntas) * 100;

    let mensaje = `¡Hola, ${nombreUsuario}!\n\n`;
    mensaje += `Has completado la prueba ${nivelNombre} `;
    mensaje += `con un ${porcentaje.toFixed(2)}%.\n`;

    if (porcentaje < 50) {
        mensaje += "Esta vez no alcanzaste la calificación mínima. ¡Sigue intentando!";
    } else if (porcentaje < 75) {
        mensaje += "Alcanzaste la calificación necesaria, pero te recomendamos practicar más.";
    } else {
        mensaje += "¡Excelente trabajo, superaste el 75%!";
    }

    document.getElementById("mensajeCalificacion").textContent = mensaje;
    document.getElementById("barraProgreso").style.width = `${porcentaje}%`;
}