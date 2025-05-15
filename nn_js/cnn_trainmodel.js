async function trainCNNModel() {
  const model = tf.sequential();

  model.add(tf.layers.conv2d({
    inputShape: [28, 28, 1],
    filters: 8,
    kernelSize: 3,
    activation: 'relu'
  }));
  model.add(tf.layers.maxPooling2d({ poolSize: [2, 2] }));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ units: 10, activation: 'softmax' }));

  model.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  });

  const mnist = new MnistData();
  await mnist.load();

  const { xs, ys } = mnist.getTrainData(1000); // small sample for speed

  await model.fit(xs, ys, {
    epochs: 5,
    batchSize: 64,
    validationSplit: 0.1,
    callbacks: tf.callbacks.earlyStopping({ monitor: 'val_loss', patience: 1 })
  });

  // Save locally for download — to be hosted later
  await model.save('downloads://cnn-mnist-model');
}
