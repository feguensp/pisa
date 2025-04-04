const totalPreguntas = 16;
let actualPregunta = 1;

function calcularResultado() {

    localStorage.setItem("nivelActual", "1");

    const respuestasCorrectas = {
        q1: "D",
        q2_1: "V", q2_2: "V", q2_3: "F", q2_4: "F", 
        q3: "C", 
        q4_1: "S", q4_2: "S", q4_3: "N", q4_4: "N", q4_5: "S", 
        q5_1: "S", q5_2: "S", q5_3: "N", q5_4: "N",
        q6: "B", 
        q7: "D", 
        q8: "A", 
        q9: "D", 
        q10: "A", 
        q11: "B", 
        q12: "A", 
        q13_1: "f", q13_2: "v", q13_3: "v", q13_4: "f", q13_5: "v", 
        q14_3: "S", q14_4: "S", q14_5: "N", q14_6: "S", q14_7: "S",
        q15_1: "spiders", q15_2: "legs", q15_3: "tail", q15_4: "trees", q15_5: "sand", 
        q16_2: "a nurse", q16_3: "tea", q16_4: "a city", q16_5: "a sandwich", q16_6: "a field"
    };

    let puntajeTotal = 0;

    for (const pregunta in respuestasCorrectas) {
        const respuestaCorrecta = respuestasCorrectas[pregunta];
        let elemento = document.querySelector(`input[name="${pregunta}"]:checked`) || 
                      document.querySelector(`select[name="${pregunta}"]`);

        if (elemento) {
            const valor = elemento.value || elemento.options[elemento.selectedIndex]?.value;
            if (valor === respuestaCorrecta) {
                puntajeTotal += 1;
            }
        }
    }

    localStorage.setItem("puntajeTotal", puntajeTotal);
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