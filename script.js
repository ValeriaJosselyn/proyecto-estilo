// URL donde se encuentran los archivos de tu modelo
const URL = "./model/";

let model, webcam, labelContainer, maxPredictions;

// Función principal asíncrona para iniciar todo
async function init() {
    // Referencias a los elementos del HTML
    const webcamContainer = document.getElementById("webcam-container");
    labelContainer = document.getElementById("label");
    const confidenceContainer = document.getElementById("confidence");

    // Cargar el modelo y los metadatos
    // IMPORTANTE: Reemplaza "model.json" si tu archivo tiene otro nombre
    const modelURL = "./model/model.json";
    const metadataURL = "./model/metadata.json";    

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Configurar la webcam
        const flip = true; // si quieres que la imagen se vea como un espejo
        const width = 400;
        const height = 300;
        webcam = new tmWebcam(width, height, flip); // tmWebcam es parte de la librería de Teachable Machine
        await webcam.setup(); // pide permiso al usuario para la cámara
        await webcam.play();
        window.requestAnimationFrame(loop); // Inicia el bucle de predicción

        // Añade el canvas de la webcam al contenedor
        webcamContainer.appendChild(webcam.canvas);
    } catch (e) {
        console.error("Error al cargar el modelo o la webcam:", e);
        labelContainer.innerText = "Error al cargar el modelo. Revisa la consola.";
    }
}

// Bucle que se ejecuta continuamente para hacer predicciones
async function loop() {
    webcam.update(); // actualiza el frame de la webcam
    await predict();
    window.requestAnimationFrame(loop); // pide el siguiente frame
}

// Función para hacer la predicción y actualizar la interfaz
async function predict() {
    // Predice usando el canvas de la webcam
    const prediction = await model.predict(webcam.canvas);
    
    // Encuentra la clase con la mayor probabilidad
    let highestProb = 0;
    let bestClass = "";

    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability > highestProb) {
            highestProb = prediction[i].probability;
            bestClass = prediction[i].className;
        }
    }

    // Formatea el nombre de la clase para que se vea mejor (ej: "Formal" en lugar de "Class 1")
    const formattedClassName = bestClass.replace(/_/g, ' '); // Reemplaza guiones bajos con espacios

    // Actualiza el HTML con el resultado
    document.getElementById("label").innerHTML = `Estilo: <strong>${formattedClassName}</strong>`;
    document.getElementById("confidence").innerHTML = `Confianza: ${(highestProb * 100).toFixed(2)}%`;
}

// Inicia la aplicación cuando la página se carga

window.addEventListener("load", init);
