require(
  [ "hero"
  , "monster"
  , "keyboard"
  , "world"
  , "texture"
  , "text"
  , "text!../data/monster/skeleton.json"
  ]
  , function (hero, monster, keyboard, world, texture, text, skeleton) {    

    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.imageSmoothingEnabled = false;

    var hero = new Hero(100, 100, 'img/hero.png', 32, 32);
    var monsters = [];
    monsters.push(new Monster(0, 0, JSON.parse(skeleton)));
    monsters.push(new Monster(250, 250, JSON.parse(skeleton)));

    var texture = new Texture('img/grass.png', 240, 120, 40, 40);
    var world = new World(45, 45, texture);
    world.generate();
    var keyboardListener = new Keyboard(hero);

    var lastTime = Date.now();
    var delta = 0;
    var fps = 0;

    function draw() {
      var now = Date.now();
      delta = (now - lastTime) / 1000.0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      world.render(ctx);
      hero.control(ctx, delta);

      for(var i = 0; i < monsters.length; i++)
        monsters[i].control(ctx, delta);

      lastTime = now;

      showFPS();

      window.requestAnimationFrame(draw);
    }

    function showFPS() {    
      ctx.font = "16px Times New Roman";
      ctx.fillStyle = "white";
      ctx.fillText("FPS: "+ fps, 20, canvas.height - 50);
    }

    setInterval(function() {
      fps = Math.floor(1 / delta);
    }, 100);
    window.requestAnimationFrame(draw); 

});