function Hero(x, y, src, width, height) {
  this.x = x;
  this.y = y;
  this.img = new Image();
  this.img.src = src;
  this.width = width;
  this.height = height;
  this.scale = 3;
  this.currentFrame = 0;
  this.currentFrameLine = 0;
  this.counter = 0;
  this.speed = 100;
  this.timeForFrame = 5;

  this.mirror = false;
  this.direction = 2; // 1 - up, 2 - right, 3 - down, 4 - left
  this.move = false;

  this.control = function(ctx, delta) {
    this.counter++;
    if(this.counter === this.timeForFrame) {
      this.counter = 0;
      this.changeFrame();
    }

    this.movement(delta);

    this.draw(ctx);
  }

  this.movement = function(delta) {
    if(this.move) {
      switch(this.direction) {
        case 1:
          this.y -= this.speed * delta;
          if(this.y < 0)
            this.y = 0;
        break;
        case 2:
          this.x += this.speed * delta;
          if(this.x > window.innerWidth - this.width*this.scale)
            this.x = window.innerWidth - this.width*this.scale;
        break;
        case 3:
          this.y += this.speed * delta;
          if(this.y > window.innerHeight - this.height*this.scale)
            this.y = window.innerHeight - this.height*this.scale;
        break;
        case 4:
          this.x -= this.speed * delta;
          if(this.x < 0)
            this.x = 0;
        break;
      }
    }
  }

  this.draw = function(ctx) {
    if(this.mirror) {
      ctx.save();
      ctx.scale(-1,1);
      ctx.drawImage(this.img
        , this.width*this.currentFrame
        , this.height*this.currentFrameLine
        , this.width
        , this.height
        , -this.x
        , this.y
        , this.width*this.scale*-1
        , this.height*this.scale
      );
      ctx.restore();
    }
    else
      ctx.drawImage(this.img
        , this.width*this.currentFrame
        , this.height*this.currentFrameLine
        , this.width
        , this.height
        , this.x
        , this.y
        , this.width*this.scale
        , this.height*this.scale
      );
    
  }

  this.changeFrame = function() {
    this.mirror = false;
    if(this.move) {
      this.timeForFrame = 5;
      switch(this.direction) {
        case 1: // up
          this.currentFrameLine = 4;
          this.currentFrame++;
          if(this.currentFrame > 7)
            this.currentFrame = 0;
        break;
        case 2: // right
          this.currentFrameLine = 1;
          this.currentFrame++;
          if(this.currentFrame > 3)
            this.currentFrame = 0;
        break;
        case 3: // down
          this.currentFrameLine = 7;
          this.currentFrame++;
          if(this.currentFrame > 3)
            this.currentFrame = 0;
        break;
        case 4: // left
          this.mirror = true;
          this.currentFrameLine = 1;
          this.currentFrame++;
          if(this.currentFrame > 3)
            this.currentFrame = 0;
        break;
      }
    }
    else {
      this.timeForFrame = 10;
      switch(this.direction) {
        case 1: // up
          this.currentFrameLine = 5;
          this.currentFrame++;
          if(this.currentFrame > 1)
            this.currentFrame = 0;
        break;
        case 2: // right
          this.currentFrameLine = 2;
          this.currentFrame++;
          if(this.currentFrame > 4)
            this.currentFrame = 0;
        break;
        case 3: // down
          this.currentFrameLine = 8;
          this.currentFrame++;
          if(this.currentFrame > 1)
            this.currentFrame = 0;
        break;
        case 4: // left
          this.mirror = true;
          this.currentFrameLine = 2;
          this.currentFrame++;
          if(this.currentFrame > 4)
            this.currentFrame = 0;
        break;
      }
    }
  }
  
}