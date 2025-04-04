const totalPreguntas = 45;
let actualPregunta = 1;

function mostrarPregunta(numeroPregunta) {
    pausarVideos();
    
    if (numeroPregunta < 1) numeroPregunta = 1;
    if (numeroPregunta > totalPreguntas) numeroPregunta = totalPreguntas;
    actualPregunta = numeroPregunta;

    const preguntas = document.querySelectorAll(".pregunta");
    const preguntaActual = document.querySelector(`#pregunta${numeroPregunta - 1}`);

    if (preguntaActual) {
        const respuestas = preguntaActual.querySelectorAll("input[type='radio'], input[type='checkbox'], select, textarea, input[type='number'], input[type='time']");
        let todasRespondidas = true;

        respuestas.forEach(respuesta => {
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
            } else if (respuesta.tagName === 'TEXTAREA') {
                if (respuesta.value.trim() === "") {
                    todasRespondidas = false;
                }
            } else if (respuesta.type === 'number' || respuesta.type === 'time') {
                if (respuesta.value === "00:00" || respuesta.value === "") {
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

function calcularResultado() {
    const respuestasCorrectas = {
        p1: "B",
        p2_1: "Si", p2_2: "No", p2_3: "Si", p2_4: "No",
        p3: "D",
        p4: "D",
        p5: "A",
        p6: "D",
        p8_1: "Si", p8_2: "No",
        p9: "D",
        p10: "C",
        p11_1: "No", p11_2: "No", p11_3: "Si",
        p14: "B",
        p15: "A",
        p16: "28",
        p17: "D",
        p18: "B",
        p20: "17:00",
        p21: "B",
        p22: "B",
        p25: "B",
        p26: "A",
        p28_2: "hecho", p28_3: "opinion", p28_4: "opinion",
        p29: "F",
        p30: "E",
        p31: "G",
        p32: "A",
        p33: "C",
        p34: "C",
        p35: "B",
        p36: "A",
        p37: "D",
        p38: "B",
        p39: "C",
        p40: "A",
        p41: "A",
        p42: "B",
        p43: "B",
    };

    let puntajeTotal3 = 0;

    for (const pregunta in respuestasCorrectas) {
        const respuestaCorrecta = respuestasCorrectas[pregunta];
        let elemento = document.querySelector(`input[name="${pregunta}"]:checked`) ||
            document.querySelector(`select[name="${pregunta}"]`) ||
            document.querySelector(`input[type="time"][name="${pregunta}"]`) ||
            document.querySelector(`input[type="number"][name="${pregunta}"]`);
            
        if (elemento) {
            if(elemento.value)
            {
                const valor = elemento.value || elemento.options[elemento.selectedIndex]?.value;
                if (valor === respuestaCorrecta) {
                    puntajeTotal3 += 1;
                }
            }
        }
    }

    localStorage.setItem("puntajeTotalFinal", puntajeTotal3);
    localStorage.setItem("nivelActual", "3");
    window.location.href = "./Resultados.html";
}

function scrollToTop() {
    actualizarBarraDeProgreso();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function pausarVideos() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
}

crearBarraDeProgreso();
mostrarPregunta(1);
