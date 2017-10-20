//Aliases
window.Container = PIXI.Container;
window.autoDetectRenderer = PIXI.autoDetectRenderer;
window.loader = PIXI.loader;
window.resources = PIXI.loader.resources;
window.Sprite = PIXI.Sprite;
window.TextureCache = PIXI.utils.TextureCache;

//Keyboard
//Capture the keyboard arrow keys

function keyboard(keyCode) {
  const key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

window.left = keyboard(37);
window.up = keyboard(38);
window.right = keyboard(39);
window.down = keyboard(40);

//Create a container object called the `stage`
window.stage = new Container();

//Create the renderer
window.renderer = autoDetectRenderer(800, 500,  {antialias: false, transparent: false, resolution: 1});