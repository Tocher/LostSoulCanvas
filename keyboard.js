function Keyboard(hero) {
  window.performAction = false;
  window.hero = hero;

  document.onkeydown = function(e) {
      switch(e.keyCode) {
        case 87: // w
          window.hero.move = true;
          window.hero.direction = 1;    
          //window.hero.changeFrame();  
        break;
        case 83: // s
          window.hero.move = true;
          window.hero.direction = 3;
          //window.hero.changeFrame(); 
        break;
        case 65: // a
          window.hero.move = true;
          window.hero.direction = 4;
          //window.hero.changeFrame(); 
        break;
        case 68: // d
          window.hero.move = true;
          window.hero.direction = 2;
          //window.hero.changeFrame();   
        break;
        case 70: // F - Fire spell
          window.hero.castSpell = true;
        break;
      }
    //}
  }

  document.onkeyup = function(e) {
    switch(e.keyCode) {
      case 87: // w
        if(window.hero.direction == 1) {
          window.hero.move = false;
          window.performAction = false;
        }
      break;
      case 83: // s
        if(window.hero.direction == 3) {
          window.hero.move = false;
          window.performAction = false;
        }
      break;
      case 65: // a
        if(window.hero.direction == 4) {
          window.hero.move = false;
          window.performAction = false;
        }
      break;
      case 68: // d
        if(window.hero.direction == 2) {
          window.hero.move = false;
          window.performAction = false;
        }
      break;
    }
  }
}