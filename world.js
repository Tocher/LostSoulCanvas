function World(xsize, ysize, texture) {
  this.xsize = xsize;
  this.ysize = ysize;
  this.world = [];
  this.texture = texture;

  for (var i = 0; i < this.xsize; i++) {
    this.world[i] = [];
  };

  this.generate = function() {
    for(var i = 0; i < this.xsize; i++) {
      for(var j = 0; j < this.ysize; j++) {
        this.world[i][j] = this.getRandomArbitrary(1, this.texture.frameCount-1);
      }
    }
  }

  this.render = function(ctx) {
    for(var i = 0; i < this.xsize; i++) {
      for(var j = 0; j < this.ysize; j++) {        
        this.texture.render(ctx, i, j, this.world[i][j]);
      }
    }
  }

  this.getRandomArbitrary = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}