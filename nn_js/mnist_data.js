class MnistData {
  constructor() {
    this.SHUFFLE_SEED = 1234;
  }

  async load() {
    const mnist = await tf.data.csv('https://storage.googleapis.com/tfjs-examples/mnist-data/mnist_train.csv', {
      hasHeader: true
    });

    const dataset = mnist.map(row => {
      const label = row.label;
      const xs = [];
      for (let i = 0; i < 784; i++) {
        xs.push(row[`pixel${i}`] / 255);
      }

      return {
        xs: tf.tensor(xs, [28, 28, 1]),
        ys: tf.oneHot(tf.tensor1d([label], 'int32'), 10).toFloat()
      };
    });

    const dataArray = await dataset.toArray();
    this.data = dataArray;
  }

  getTrainData(numExamples = 1000) {
    const shuffled = tf.util.shuffle(this.data);
    const selected = shuffled.slice(0, numExamples);

    const xs = tf.stack(selected.map(e => e.xs));
    const ys = tf.stack(selected.map(e => e.ys));

    return { xs, ys };
  }
}

async function loadMnistData() {
  const mnist = require('mnist'); // Ensure you have the 'mnist' package installed
  const set = mnist.set(8000, 2000);

  const trainingSet = set.training;
  const testSet = set.test;

  // Convert data to tensors
  const trainXs = tf.tensor2d(trainingSet.map(item => item.input));
  const trainYs = tf.tensor2d(trainingSet.map(item => item.output));

  const testXs = tf.tensor2d(testSet.map(item => item.input));
  const testYs = tf.tensor2d(testSet.map(item => item.output));

  return { trainXs, trainYs, testXs, testYs };
}

