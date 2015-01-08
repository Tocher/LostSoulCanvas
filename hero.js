function Hero(x, y, src, width, height) {
  this.hp = 100;
  this.mp = 100;
  this.x = x;
  this.y = y;
  this.img = new Image();
  this.img.src = src;  
  this.img.width = width;
  this.img.height = height;
  //console.log(this.img);
  //this.img = resize(this.img, 2);
  //console.log(this.img);
  this.width = width;
  this.height = height;
  this.scale = 2;
  this.currentFrame = 0;
  this.currentFrameLine = 0;
  this.counter = 0;
  this.speed = 100;
  this.timeForFrame = 5;

  this.mirror = false;
  this.direction = 2; // 1 - up, 2 - right, 3 - down, 4 - left
  this.move = false;

  // spell
  this.castSpell = false;
  this.spell = new Image();
  this.spell.src = 'img/spell.png';
  this.spellCounter = 0;
  this.spellFrame = 0;
  this.timeForSpellFrame = 5;

  this.control = function(ctx, delta) {
    this.counter++;
    if(this.counter === this.timeForFrame) {
      this.counter = 0;
      this.changeFrame();
    }

    if(this.castSpell) {
      ctx.drawImage(this.spell
        , this.width*this.spellFrame
        , this.height*0
        , this.width
        , this.height
        , this.x - this.width*this.scale
        , this.y - this.height*this.scale
        , this.width*this.scale*3
        , this.height*this.scale*3
      );
      this.spellCounter++;
      if(this.spellCounter === this.timeForSpellFrame) {
        this.spellCounter = 0;
        this.spellFireCircle();
      }
    }

    ctx.font = "16px Times New Roman";
    ctx.fillStyle = "white";
    ctx.fillText("spell: "+ this.castSpell, 120, window.innerHeight - 50);

    if(this.move) {
      this.movement(delta);
    }

    this.draw(ctx);
  }

  this.movement = function(delta) {
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

  this.spellFireCircle = function() {
    this.spellFrame++;
    if(this.spellFrame == 4) {
      this.castSpell = false;
      this.spellFrame = 0;
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
      this.timeForFrame = 25;
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




var resize = function( img, scale ) {
    // Takes an image and a scaling factor and returns the scaled image
    
    // The original image is drawn into an offscreen canvas of the same size
    // and copied, pixel by pixel into another offscreen canvas with the 
    // new size.
    
    var widthScaled = img.width * scale;
    var heightScaled = img.height * scale;
    
    var orig = document.createElement('canvas');
    orig.width = img.width;
    orig.height = img.height;
    var origCtx = orig.getContext('2d');
    origCtx.drawImage(img, 0, 0);
    var origPixels = origCtx.getImageData(0, 0, img.width, img.height);
    
    var scaled = document.createElement('canvas');
    scaled.width = widthScaled;
    scaled.height = heightScaled;
    var scaledCtx = scaled.getContext('2d');
    var scaledPixels = scaledCtx.getImageData( 0, 0, widthScaled, heightScaled );
    
    for( var y = 0; y < heightScaled; y++ ) {
        for( var x = 0; x < widthScaled; x++ ) {
            var index = (Math.floor(y / scale) * img.width + Math.floor(x / scale)) * 4;
            var indexScaled = (y * widthScaled + x) * 4;
            scaledPixels.data[ indexScaled ] = origPixels.data[ index ];
            scaledPixels.data[ indexScaled+1 ] = origPixels.data[ index+1 ];
            scaledPixels.data[ indexScaled+2 ] = origPixels.data[ index+2 ];
            scaledPixels.data[ indexScaled+3 ] = origPixels.data[ index+3 ];
        }
    }
    scaledCtx.putImageData( scaledPixels, 0, 0 );
    return scaled;
}