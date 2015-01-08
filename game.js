function main() {
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  //ctx.scale(2,2);
  ctx.imageSmoothingEnabled = false;

  var hero = new Hero(0, 0, 'img/hero.png', 32, 32);
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
}

window.onload = function() {
  main();
}