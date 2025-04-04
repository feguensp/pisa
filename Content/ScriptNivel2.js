const totalPreguntas = 16;
let actualPregunta = 1;

function calcularResultado() {
    const respuestasCorrectas = {
        q1: "A",
        q2: "A",
        q3: "A",
        q4_1: "S", q4_2: "N",
        q5: "C",
        q6: "A",
        q7_1: "N", q7_2: "N",
        q8: "C",
        q9: "B",
        q10: "B",
        q11: "C",
        q12_1: "N", q12_2: "S", q12_3: "N", q12_4: "N",
        q13: "C",
        q14: "C",
        q15: "C",
        q16_1: "subject", q16_2: "trying", q16_3: "way", q16_4: "opened", q16_5: "became"
    };

    let puntajeTotal2 = 0;

    for (const pregunta in respuestasCorrectas) {
        const respuestaCorrecta = respuestasCorrectas[pregunta];
        let elemento = document.querySelector(`input[name="${pregunta}"]:checked`) ||
            document.querySelector(`select[name="${pregunta}"]`);

        if (elemento) {
            const valor = elemento.value || elemento.options[elemento.selectedIndex]?.value;
            if (valor === respuestaCorrecta) {
                puntajeTotal2 += 1;
            }
        }
    }

    localStorage.setItem("puntajeTotal2", puntajeTotal2);
    localStorage.setItem("nivelActual", "2");  
    window.location.href = "./Resultados.html";
}

function mostrarPregunta(numeroPregunta) {

    if (numeroPregunta < 1) numeroPregunta = 1;
    if (numeroPregunta > totalPreguntas) numeroPregunta = totalPreguntas;
    actualPregunta = numeroPregunta;

    const preguntas = document.querySelectorAll(".pregunta");
    const preguntaActual = document.querySelector(`#pregunta${numeroPregunta - 1}`);

     if (preguntaActual) {
         const respuestas = preguntaActual.querySelectorAll("input[type='radio'], input[type='checkbox'], select");
         let todasRespondidas = true;

         respuestas.forEach(respuesta => {
            if (respuesta.name === "q13_x" || respuesta.name === "q16_X") {
                 return;
             }

             if (respuesta.type === 'radio' || respuesta.type === 'checkbox') {
                const name = respuesta.name;
                 const seleccionados = preguntaActual.querySelectorAll(`input[name="${name}"]:checked`);
                 if (seleccionados.length === 0) {
                     todasRespondidas = false;
                 }
             } else if (respuesta.tagName === 'SELECT') {
                 if (respuesta.value === "") {
                    todasRespondidas = false;
                }
             }
        });

         if (!todasRespondidas) {
            alert("Por favor, responde todas las preguntas antes de avanzar.");
            return;
        }
     }

    preguntas.forEach((pregunta, index) => {
        if (index + 1 === numeroPregunta) {
            pregunta.classList.add("activa");
            scrollToTop();
        } else {
            pregunta.classList.remove("activa");
            scrollToTop();
        }
    });

    if (numeroPregunta === null || numeroPregunta === undefined) {
        calcularResultado();
    }
}

function scrollToTop() {
    actualizarBarraDeProgreso();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function crearBarraDeProgreso() {
    const container = document.getElementById("progressBarContainer");
    container.innerHTML = "";
    for (let i = 1; i <= totalPreguntas; i++) {
      const stepDiv = document.createElement("div");
      stepDiv.classList.add("step");
      stepDiv.id = "step-" + i;
      container.appendChild(stepDiv);
    }
  }

  function actualizarBarraDeProgreso() {
    for (let i = 1; i <= totalPreguntas; i++) {
      const stepDiv = document.getElementById("step-" + i);
      stepDiv.classList.remove("passed", "current");
      if (i < actualPregunta) {
        stepDiv.classList.add("passed");
      } else if (i === actualPregunta) {
        stepDiv.classList.add("current");
      }
    }
  }

crearBarraDeProgreso();
mostrarPregunta(1);