async function load_model() {

  import * as tf from "@tensorflow/tfjs";
  import * as tfn from "@tensorflow/tfjs-node";
  const handler = tfn.io.fileSystem("./saved_jsmodel/model.json");
  const model = await tf.loadLayersModel(handler);

  return model;
} 

exports.load_model = load_model;
