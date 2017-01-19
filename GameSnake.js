var scl = 16;
var s;
var food;
var fnt;
var GameOver;
var Score;
var cols;
var rows;

function preload(){
  soundFormats('mp3', 'ogg');
  // mySound = loadSound('../sounds/beatbox.mp3');
  fnt = loadFont("data/asimov.otf");
}

function setup() {
  createCanvas(320, 320);
  smooth();
  frameRate(60);
  cols = floor(width / scl);
  rows = floor(height / scl);
  newGame();
  // mySound.play();
}

function newGame(){
  print("Snake game started!");
  Score = 0;
  GameOver = false;
  s = new Snake(this);
  food = new Food(this);
}

function keyPressed(){
  if(GameOver && (key.toLowerCase() == 'r')){
    newGame();
  }
}

function draw() { 
  // Draw bg
  background(51);
  
  // Game over!
  if(GameOver){
    textFont(fnt, 32);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Game Over!", width / 2, (height / 2) - 16);
    textFont(fnt, 16);
    text("Press \"R\" to restart the game.", width / 2, (height / 2) + 16);
  }else{
    // Update / Draw food
    if(food!=null){food.Update();}
    
    // Update / Draw snake
    if(s!=null){s.Update();}
    
    // Draw grid
    drawGrid();
    
    // Draw Score
    textFont(fnt, 16);
    fill(255);
    textAlign(RIGHT, TOP);
    text("Score : " + Score, width - 8, 2);
  }
  
  // Draw Framerate
  textFont(fnt, 16);
  fill(255);
  textAlign(LEFT, TOP);
  text("FPS : " + int(frameRate()), 2, 2);
}

function drawGrid(){
  stroke(31);
  for(var i = 0; i < cols; i++){
    line(i * scl, 0, i * scl, height);
  }
  for(var j = 0; j < rows; j++){
    line(0, j * scl, width, j * scl);
  }
}