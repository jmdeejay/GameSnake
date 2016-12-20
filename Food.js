function Food(parent){
  this.x = floor(random(cols)) * scl;
  this.y = floor(random(rows)) * scl;
  this.parent = parent;
  
  this.Update = function(){
    this.Show();
  }
  
  this.Show = function(){
    fill(255, 0, 100);
    // pushMatrix();
    // translate(scl / 2, scl / 2);  
    // rotate(radians(1));
    rect(this.x, this.y, scl, scl);
    // popMatrix();
  }
}