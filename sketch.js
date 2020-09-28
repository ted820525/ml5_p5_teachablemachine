
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/yA7fYjcP5/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let question;

let questionFade = 0;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL+"model.json");
  question = loadImage("question.png");
}


function setup() {
  createCanvas(640, 480);
  // Create the video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  tint(255);
  image(flippedVideo, 0, 0);
   // console.log('qusetion');
  if ( label == 'Question'){
     questionFade = 255;
    
  }
  
 
  if (questionFade > 0){
    tint(255,questionFade);
    image(question, 0, 0);
     questionFade -= 10;
  }
  
  // Draw the label
  // fill(255);
  // textSize(16);
  // textAlign(CENTER);
  // text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}