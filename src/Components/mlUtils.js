import * as tf from "@tensorflow/tfjs";

export const trainModel = async (data) => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [1], units: 1 }));

  model.compile({
    optimizer: tf.train.sgd(0.01),
    loss: "meanSquaredError",
  });

  const xs = tf.tensor(data.map((d) => d.input));
  const ys = tf.tensor(data.map((d) => d.output));

  await model.fit(xs, ys, { epochs: 100 });
  return model;
};

export const predict = (model, input) => {
  const prediction = model.predict(tf.tensor([input]));
  return prediction.dataSync()[0];
};
