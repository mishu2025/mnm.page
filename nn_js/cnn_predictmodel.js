async function predictFromCanvas() {
  const model = await tf.loadLayersModel('models/cnn-mnist-model.json'); // path to saved model

  const canvas = document.getElementById('digit-canvas');
  const ctx = canvas.getContext('2d');

  const imageData = ctx.getImageData(0, 0, 28, 28);
  const data = tf.browser.fromPixels(imageData, 1).toFloat().div(255.0).expandDims(0);

  const prediction = model.predict(data);
  const predictedValue = prediction.argMax(1).dataSync()[0];

  document.getElementById('cnn-output').innerText = `Predicted Digit: ${predictedValue}`;
}
