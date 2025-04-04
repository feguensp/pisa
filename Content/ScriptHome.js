document.getElementById("formulario").addEventListener("submit", function (event) {
    event.preventDefault();

    let nombreUsuario = document.getElementById("nombre").value.trim();

    if (nombreUsuario !== "") {
      localStorage.setItem("nombreUsuario", nombreUsuario);

      window.location.href = "./Content/MenuPrincipal.html";
    } else {
      alert("Por favor, ingresa tu nombre antes de continuar.");
    }
  });