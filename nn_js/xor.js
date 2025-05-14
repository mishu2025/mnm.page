let model;

async function createXORModel() {
  model = tf.sequential();
  model.add(tf.layers.dense({ units: 4, activation: 'sigmoid', inputShape: [2] }));
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

  model.compile({
    optimizer: tf.train.adam(0.1),
    loss: tf.losses.meanSquaredError
  });

  const xs = tf.tensor2d([[0,0],[0,1],[1,0],[1,1]]);
  const ys = tf.tensor2d([[0],[1],[1],[0]]);

  await model.fit(xs, ys, {
    epochs: 100,
    shuffle: true
  });

  console.log("XOR model trained.");
}

async function predictXOR(a, b) {
  const input = tf.tensor2d([[a, b]]);
  const output = model.predict(input);
  const prediction = await output.data();
  document.getElementById("prediction").innerText = prediction[0].toFixed(2);
}

createXORModel();
