function Monster(x, y, json) {
  this.hp = 100;
  this.mp = 100;
  this.x = x;
  this.y = y;

  this.mob = json;

  this.img = new Image();
  this.img.src = this.mob.img;  
  this.scale = 2;
  this.currentFrame = 0;
  this.currentFrameLine = 0;
  this.counter = 0;
  this.speed = 100;
  this.timeForFrame = 5;

  this.mirror = false;
  this.direction = Math.floor(Math.random() * (4)) + 1; // 1 - up, 2 - right, 3 - down, 4 - left
  this.move = false;

  this.control = function(ctx, delta) {
    this.counter++;
    if(this.counter === this.timeForFrame) {
      this.counter = 0;
      this.changeFrame();
    }

    if(this.move) {
      this.movement(delta);
    }

    this.draw(ctx);
  }

  this.movement = function(delta) {
    var w = this.mob.width,
        h = this.mob.height,
        s = this.scale,
        sp = this.speed;
    switch(this.direction) {
      case 1:
        this.y -= sp * delta;
        if(this.y < 0)
          this.y = 0;
      break;
      case 2:
        this.x += sp * delta;
        if(this.x > window.innerWidth - w * s)
          this.x = window.innerWidth - w * s;
      break;
      case 3:
        this.y += sp * delta;
        if(this.y > window.innerHeight - h * s)
          this.y = window.innerHeight - h * s;
      break;
      case 4:
        this.x -= sp * delta;
        if(this.x < 0)
          this.x = 0;
      break;
    }    
  }

  this.draw = function(ctx) {
    var w = this.mob.width,
        h = this.mob.height,
        s = this.scale;
    if(this.mirror) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(this.img
        , w * this.currentFrame
        , h * this.currentFrameLine
        , w
        , h
        , -this.x
        , this.y
        , w * this.scale * -1
        , h * this.scale
      );
      ctx.restore();
    }
    else {
      ctx.drawImage(this.img
        , w * this.currentFrame
        , h * this.currentFrameLine
        , w
        , h
        , this.x
        , this.y
        , w * this.scale
        , h * this.scale
      );
    }
    this.drawHP(ctx);
  }

  this.drawHP = function(ctx) {
    var w = parseInt(this.mob.width);
    var c = this.x + w;
    ctx.fillStyle = '#000';
    ctx.fillRect(c - 20, this.y, 40, 8);
    ctx.fillStyle = '#F00';
    ctx.fillRect(c - 19, this.y + 1, 39 * this.hp / 100 , 7);
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
      this.timeForFrame = 25;
      switch(this.direction) {
        case 1: // up
          this.currentFrameLine = this.mob.stay.up.line;
          this.currentFrame++;
          if(this.currentFrame == this.mob.stay.up.length)
            this.currentFrame = 0;
        break;
        case 2: // right
          this.currentFrameLine = this.mob.stay.right.line;
          this.currentFrame++;
          if(this.currentFrame == this.mob.stay.right.length)
            this.currentFrame = 0;
        break;
        case 3: // down
          this.currentFrameLine = this.mob.stay.down.line;
          this.currentFrame++;
          if(this.currentFrame == this.mob.stay.down.length)
            this.currentFrame = 0;
        break;
        case 4: // left
          this.mirror = true;
          this.currentFrameLine = this.mob.stay.right.line;
          this.currentFrame++;
          if(this.currentFrame == this.mob.stay.right.length)
            this.currentFrame = 0;
        break;
      }
    }
  }
  
}