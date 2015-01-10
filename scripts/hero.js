function Hero(x, y, src, width, height) {
  this.hp = 100;
  this.mp = 100;
  this.x = x;
  this.y = y;
  this.img = new Image();
  this.img.src = src;  
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
  this.spell.src = 'img/nova.png';
  this.spellCounter = 0;
  this.spellFrame = 0;
  this.timeForSpellFrame = 4;

  this.spellWidth = 154;
  this.spellHeight = 138;
  this.spellDamage = 1;

  this.control = function(ctx, delta) {
    this.counter++;
    if(this.counter === this.timeForFrame) {
      this.counter = 0;
      this.changeFrame();
    }

    ctx.font = "16px Times New Roman";
    ctx.fillStyle = "white";
    ctx.fillText("spell: "+ this.castSpell, 120, window.innerHeight - 50);

    if(this.move) {
      this.movement(delta);
    }

    this.draw(ctx);

    if(this.castSpell) {
      var spell_x = this.x + (this.width * this.scale / 2) - this.spellWidth / 2,
          spell_y = this.y + (this.height * this.scale / 2) - this.spellHeight / 2;
      ctx.drawImage(this.spell
        , this.spellWidth*this.spellFrame
        , this.spellHeight*0
        , this.spellWidth
        , this.spellHeight
        , spell_x
        , spell_y
        , this.spellWidth
        , this.spellHeight
      );
      this.spellCounter++;
      if(this.spellCounter === this.timeForSpellFrame) {
        this.spellCounter = 0;
        this.spellFireCircle();
      }
      for(var i = 0; i < window.monsters.length; i++)
      {
        var mob_x = window.monsters[i].x,
            mob_y = window.monsters[i].y,
            mob_x2 = window.monsters[i].x + window.monsters[i].mob.width * window.monsters[i].scale,
            mob_y2 = window.monsters[i].y + window.monsters[i].mob.height * window.monsters[i].scale;

        if( (spell_x < mob_x
          && spell_x + this.spellWidth > mob_x
          && spell_y < mob_y
          && spell_y + this.spellHeight > mob_y)
          || (spell_x < mob_x2
          && spell_x + this.spellWidth > mob_x2
          && spell_y < mob_y2
          && spell_y + this.spellHeight > mob_y2)
          ) {
          window.monsters[i].hp -= this.spellDamage;
          if(window.monsters[i].hp <= 0)
          {
            var nMonsters = [];
            for(var j = 0; j < window.monsters.length; j++)
            {
              if(i != j)
                nMonsters.push(window.monsters[j]);
            }
            window.monsters = nMonsters;
          }
        }
      }
    }
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
    if(this.spellFrame == 6) {
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