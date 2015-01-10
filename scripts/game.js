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

    // Hero
    var hero = new Hero(100, 100, 'img/hero.png', 32, 32);

    // Monsters
    var monsters = [];
    monsters.push(new Monster(0, 0, JSON.parse(skeleton)));
    monsters.push(new Monster(250, 250, JSON.parse(skeleton)));
    monsters.push(new Monster(430, 250, JSON.parse(skeleton)));
    monsters.push(new Monster(350, 640, JSON.parse(skeleton)));
    monsters.push(new Monster(650, 640, JSON.parse(skeleton)));
    monsters.push(new Monster(720, 120, JSON.parse(skeleton)));

    var texture = new Texture('img/grass.png', 240, 120, 40, 40);
    var world = new World(45, 45, texture);
    world.generate();
    var keyboardListener = new Keyboard(hero);

    var lastTime = Date.now();
    var delta = 0;

    function draw() {
      var now = Date.now();
      delta = (now - lastTime) / 1000.0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);


      world.render(ctx);
      for(var i = 0; i < monsters.length; i++)
        monsters[i].render(ctx, delta);
      hero.control(ctx, delta);


      lastTime = now;
      window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
});