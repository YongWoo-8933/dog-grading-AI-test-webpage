'use strict';

let image, model, imageName, imageShow, image_pixels, resultContainer, executeButton;


document.addEventListener('DOMContentLoaded', run);

// Load and plot the original input data that we are going to train on.
async function run() {
  resultContainer = document.getElementById("resultContainer");
  imageName = document.getElementById('imageName');
  imageShow = document.getElementById('imageShow');
  executeButton = document.getElementById('executeButton');

  }
  
  
  async function loadModel(input) {
    
    model = await tf.loadGraphModel( './saved_jsmodel/model.json' );
    
    image = input.files[0];
    
    let nameNode = document.createTextNode( image.name );
    imageName.appendChild( nameNode );
    
    let reader = new FileReader();
    
    reader.addEventListener("load", function () {
      imageShow.src = reader.result;
    }, false);
    if ( image ) {
      reader.readAsDataURL( image );
    }

  }
  
  async function execute() {

  image_pixels = tf.browser.fromPixels( imageShow );
  image_pixels = tf.image.resizeBilinear(image_pixels, [300, 300]).div(tf.scalar(300));
  image_pixels = tf.expandDims( image_pixels, 0 );

  let res = await model.execute( image_pixels );  
  
  let res_values = res.dataSync();
  let res_array = Array.from(res_values);

  res_array.forEach( ( item, index ) => {
    let res_Node = document.createTextNode( String(item) + ' // ' + String(index) + ' \n ' );
    resultContainer.appendChild( res_Node );
  } )
}

