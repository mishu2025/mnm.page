let model, canvas, ctx, isDrawing = false;

async function loadModel() {
  model = await tf.loadLayersModel('cnn_model.json');
  console.log("CNN model loaded.");
}

function setupCanvas() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  canvas.addEventListener("mousedown", () => isDrawing = true);
  canvas.addEventListener("mouseup", () => isDrawing = false);
  canvas.addEventListener("mousemove", draw);
}

function draw(event) {
  if (!isDrawing) return;
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(event.offsetX, event.offsetY, 10, 0, 2 * Math.PI);
  ctx.fill();
}

function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.getElementById("digit-prediction").innerText = "?";
}

async function predictDigit() {
  const imageData = ctx.getImageData(0, 0, 280, 280);
  const input = tf.tidy(() => {
    let img = tf.browser.fromPixels(imageData, 1); // grayscale
    img = tf.image.resizeBilinear(img, [28, 28]);  // resize to 28x28
    img = tf.cast(img, 'float32').div(255.0);
    img = img.expandDims(0); // add batch dimension
    return img;
  });

  const prediction = model.predict(input);
  const predictedValue = (await prediction.argMax(1).data())[0];
  document.getElementById("digit-prediction").innerText = predictedValue;
  tf.dispose([input, prediction]);
}

window.onload = async () => {
  await loadModel();
  setupCanvas();
};
