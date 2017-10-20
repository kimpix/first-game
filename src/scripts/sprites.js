let u = new SpriteUtilities(PIXI);
let linkWalkingBack03 = TextureCache["linkWalk-back-03.png"];
let linksWalking = new Sprite(linkWalkingBack03);
linksWalking.x = 62;
linksWalking.y = 32;
linksWalking.vx = 0;

loader
  .add(["/sprites/links-walk.json"])
  .on("progress", loadProgressHandler)
  .load(setup);


function loadProgressHandler(loader, resource) {
  console.log("loading: " + resource.url);
  console.log("progress: " + loader.progress + "%")
}

function play() {
  //Use the cat's velocity to make it move
  linksWalking.x += linksWalking.vx;
  linksWalking.y += linksWalking.vy
}

function gameLoop(sprite) {

  //Loop this function at 60 frames per second
  requestAnimationFrame(gameLoop);

  //Update the current game state:
  play(sprite);

  //Render the stage to see the animation
  renderer.render(stage);
}


function setup() {
  console.log("all files loaded");
  linksWalking = new Sprite(
    resources["/sprites/links-walk.json"].textures["linkWalk-back-03.png"]
  );
  linksWalking.x = 162;
  linksWalking.y = 162;
  linksWalking.vx = 0;
  linksWalking.vy = 0;

  stage.addChild(linksWalking);
  //This code will run when the loader has finished loading the image

  //Left arrow key `press` method
  left.press = function () {

    //Change the cat's velocity when the key is pressed
    linksWalking.vx = -5;
    linksWalking.vy = 0;
  };

  //Left arrow key `release` method
  left.release = function () {

    //If the left arrow has been released, and the right arrow isn't down,
    //and the cat isn't moving vertically:
    //Stop the cat
    if (!right.isDown && linksWalking.vy === 0) {
      linksWalking.vx = 0;
    }
  };

  //Up
  up.press = function () {
    linksWalking.vy = -5;
    linksWalking.vx = 0;
  };
  up.release = function () {
    if (!down.isDown && linksWalking.vx === 0) {
      linksWalking.vy = 0;
    }
  };

  //Right
  right.press = function () {
    linksWalking.vx = 5;
    linksWalking.vy = 0;
  };
  right.release = function () {
    if (!left.isDown && linksWalking.vy === 0) {
      linksWalking.vx = 0;
    }
  };

  //Down
  down.press = function () {
    linksWalking.vy = 5;
    linksWalking.vx = 0;
  };
  down.release = function () {
    if (!up.isDown && linksWalking.vx === 0) {
      linksWalking.vy = 0;
    }
  };
  gameLoop();
}