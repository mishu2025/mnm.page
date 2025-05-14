async function loadAndPredict() {
  const model = await tf.loadLayersModel('models/model.json'); // hosted version
  // or: const model = await tf.loadLayersModel('localstorage://xor-model');

  const input = tf.tensor2d([[0, 1]]); // XOR input
  const output = model.predict(input);
  const prediction = output.dataSync()[0];

  document.getElementById('output').innerText = `Prediction for [0,1]: ${prediction.toFixed(2)}`;
}
