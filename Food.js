function Food(parent){
  this.t = 0;
  this.x = floor(random(cols)) * scl;
  this.y = floor(random(rows)) * scl;
  this.parent = parent;
  
  this.Update = function(){
    this.Show();
  }
  
  this.Show = function(){
    push();
    fill(255, 0, 100);
    rectMode(CENTER);
    translate(this.x + (scl / 2), this.y + (scl / 2));  
    rotate(radians(this.t));
    rect(0, 0, scl, scl);
    pop();
    this.t += 1;
    if(this.t >= 360){ this.t = 0; }
  }
}