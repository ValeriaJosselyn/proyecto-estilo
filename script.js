const modelURL = "./model/model.json";
const metadataURL = "./model/metadata.json";

let model, webcam, labelContainer, maxPredictions;

async function init() {
    const webcamContainer = document.getElementById("webcam-container");
    labelContainer = document.getElementById("label");

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const flip = true;
        webcam = new tmWebcam(400, 300, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);

        webcamContainer.appendChild(webcam.canvas);
    } catch (e) {
        console.error("Error al iniciar:", e);
        labelContainer.innerText = "Error al cargar el modelo o webcam.";
    }
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);

    let highestProb = 0;
    let bestClass = "";

    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability > highestProb) {
            highestProb = prediction[i].probability;
            bestClass = prediction[i].className;
        }
    }

    const formatted = bestClass.replace(/_/g, " ");
    document.getElementById("label").innerHTML = `Estilo: <strong>${formatted}</strong>`;
    document.getElementById("confidence").innerHTML = `Confianza: ${(highestProb * 100).toFixed(2)}%`;
}

window.addEventListener("load", init);
