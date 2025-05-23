async function loadAndPredict() {
  const input1 = parseFloat(document.getElementById('input1').value);
  const input2 = parseFloat(document.getElementById('input2').value);

  if (isNaN(input1) || isNaN(input2)) {
    document.getElementById('output').innerText = 'Please enter valid numbers.';
    return;
  }

  try {
    document.getElementById('output').innerText = 'Loading model...';
    
    const model = await tf.loadLayersModel('models/xor-model.json'); // fix path if needed
    document.getElementById('output').innerText = 'Model Loaded. Predicting...';

    const inputTensor = tf.tensor2d([[input1, input2]]);
    const outputTensor = model.predict(inputTensor);
    const prediction = outputTensor.dataSync()[0];

    document.getElementById('output').innerText =
      `Prediction for [${input1}, ${input2}] is ${prediction.toFixed(4)}`;
  } catch (err) {
    console.error(err);
    document.getElementById('output').innerText = 'Failed to load model or predict.';
  }
}
