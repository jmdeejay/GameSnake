function Snake(parent){
  this.parent = parent;
  this.x = 0;
  this.y = 0;
  this.xDir = 1;
  this.yDir = 0;
  this.dir = "x";
  this.total = 1;
  this.tail =[];
  
  this.keyPressed = function(){  
    if(keyCode === UP_ARROW || key.toLowerCase() == 'w'){
      this.ChangeDir(0, -1);
    } else if(keyCode === DOWN_ARROW || key.toLowerCase() == 's'){
      this.ChangeDir(0, 1);
    }else if(keyCode === RIGHT_ARROW || key.toLowerCase() == 'd'){
      this.ChangeDir(1, 0);
    } else if(keyCode === LEFT_ARROW || key.toLowerCase() == 'a'){
      this.ChangeDir(-1, 0);
    }
  }
  
  this.ChangeDir = function(x, y){  
    var prevDir = this.dir;
    if(x != 0){ this.dir = "x"; }else{ this.dir = "y"; }
    if(prevDir != this.dir){
      this.xDir = x;
      this.yDir = y;
    }
  }
  
  this.Eat = function(pos){
    var d = dist(this.x, this.y, pos.x, pos.y);
    return (d < 1);
  }
  
  this.Death = function(){
    var collided = false;
    for(var i = 1; i < this.tail.length; i++){
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if(d < 1){
        collided = true;
        break;
      }
    }
    
    return (collided || this.x < 0 || this.x > width - scl || this.y < 0 || this.y > height - scl);
  }
  
  this.Update = function(){
    // For oldschool sake, fake low framerate.
    if(frameCount % 6 == 0){ // 60 % 6 = 10 fps
      // Update keypressed
      this.keyPressed();
      // Update snake position
      if(this.total === this.tail.length){
        for(var i = 0; i < this.tail.length - 1; i++){
          this.tail[i] = this.tail[i+1];
        }
      }
      this.tail[this.total - 1] = createVector(this.x, this.y);
      // Move
      this.x += this.xDir * scl;
      this.y += this.yDir * scl;
      
      if(this.Eat(food)){
        this.total++;
        Score++;
        food = new Food();
      }
      
      if(this.Death()){ 
        console.log("Game Over!");
        GameOver = true;
        s = null;
        return; 
      }
    }
    
    this.Show();
    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }
  
  this.Show = function(){
    fill(40, 180, 20);
    // tail
    for(var i = 0; i < this.tail.length; i++){
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    
    // head
    rect(this.x, this.y, scl, scl);
    
    // eyes
    fill(0);
    var eyeSize = 2;
    if(this.dir == "x"){
      var tmpX = this.x + 2;
      if(this.xDir == 1){ tmpX = this.x + scl - 2 - eyeSize; }
      rect(tmpX, this.y + 2, eyeSize, eyeSize);
      rect(tmpX, this.y + scl - 2 - eyeSize, eyeSize, eyeSize);
    }else{
      var tmpY = this.y + 2;
      if(this.yDir == 1){ tmpY = this.y + scl - 2 - eyeSize; }
      rect(this.x + 2, tmpY, eyeSize, eyeSize);
      rect(this.x + scl - 2 - eyeSize, tmpY, eyeSize, eyeSize);
    }
  }
}