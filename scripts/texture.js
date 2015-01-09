function Texture(src, width, height, frameWidth, frameHeight) {
  this.img = new Image();
  this.img.src = src;
  this.width = width;
  this.height = height;
  this.frameWidth = frameWidth;
  this.frameHeight = frameHeight;
  this.scale = 1.4;

  this.frameCount = (this.width / this.frameWidth) * (this.height / this.frameHeight);
  this.frameX = this.width / this.frameWidth;
  this.frameY = this.height / this.frameHeight;

  this.render = function(ctx, x, y, frame) {
    var h = Math.floor(frame / this.frameX);
    var w = frame - (h*this.frameX);

    ctx.drawImage( this.img
                 , this.frameWidth*w
                 , this.frameHeight*h
                 , this.frameWidth
                 , this.frameHeight
                 , x*this.frameWidth*this.scale
                 , y*this.frameHeight*this.scale
                 , this.frameWidth*this.scale
                 , this.frameHeight*this.scale
                 );
  }
}