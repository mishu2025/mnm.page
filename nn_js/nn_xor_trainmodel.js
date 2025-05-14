async function trainAndSaveModel() {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 16, activation: 'relu', inputShape: [2] }));
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

  model.compile({
    optimizer: tf.train.adam(),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
  });

  // Example XOR-like data
  const xs = tf.tensor2d([[0,0], [0,1], [1,0], [1,1]]);
  const ys = tf.tensor2d([[0], [1], [1], [0]]);

  await model.fit(xs, ys, {
    epochs: 200,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        if (epoch % 50 === 0) console.log(`Epoch ${epoch}: loss = ${logs.loss}`);
      }
    }
  });

  document.getElementById('output').innerText = 'Training complete. Saving model...';

  // Save to IndexedDB or downloadable files
  await model.save('downloads://xor-model'); // for download and hosting in `/models`
  // or use: await model.save('localstorage://xor-model');
  document.getElementById('output').innerText = 'Model saved.';
}
