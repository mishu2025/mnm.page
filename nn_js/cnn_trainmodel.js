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

  const data = new MnistData();
  await data.load();
  const { xs: trainXsFull, labels: trainYsFull } = data.getTrainData();
  const { xs: testXs, labels: testYs } = data.getTestData();
  
  const NUM_SAMPLES = 1000;
  const trainXs = trainXsFull.slice([0, 0, 0], [NUM_SAMPLES, 28, 28, 1]);
  const trainYs = trainYsFull.slice([0, 0], [NUM_SAMPLES, 10]);

  await model.fit(trainXsFull, trainYsFull, {
    epochs: 5,
    batchSize: 64,
    validationSplit: 0.1,
    callbacks: tf.callbacks.earlyStopping({ monitor: 'val_loss', patience: 1 })
  });


  // Save locally for download — to be hosted later
  await model.save('downloads://cnn-mnist-model');
}
