async function predictFromCanvas() {
  const model = await tf.loadLayersModel('models/cnn-mnist-model.json');

  const canvas = document.getElementById('digit-canvas');
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = 28;
  tempCanvas.height = 28;

  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(canvas, 0, 0, 28, 28); // downscale to 28x28

  const imageData = tempCtx.getImageData(0, 0, 28, 28);

  const data = tf.browser.fromPixels(imageData, 1)
    .toFloat()
    .div(255.0)
    .expandDims(0);

  const prediction = model.predict(data);
  const predictedValue = prediction.argMax(1).dataSync()[0];

  document.getElementById('cnn-output').innerText = `Predicted Digit: ${predictedValue}`;
}

