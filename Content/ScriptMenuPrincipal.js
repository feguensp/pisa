document.addEventListener("DOMContentLoaded", function () {
    let nombreUsuario = localStorage.getItem("nombreUsuario") || "Usuario";

    document.getElementById("mensajeBienvenida").innerHTML =
      `¡Bienvenido a tu prueba de nivel, <span style="color:#154360;">${nombreUsuario}</span>!`;
  });

  function seleccionarPrueba(nivel) {
    if (nivel === "principiante") {
      window.location.href = "PruebaNivel1.html";
    }
    if (nivel === "intermedio") {
      window.location.href = "PruebaNivel2.html";
    }
    if (nivel === "final") {
      window.location.href = "PruebaFinal.html";
    }
  }

  function volverHome() {
    window.location.href = "../EvaluacionDeNivel.html";
  }