let module = require ('pixi-sprite-utilities');

let u = new module.SpriteUtilities(PIXI);

let LinkWalkingFrontArray = TextureCache["/sprites/linkWalk-front-01.png", "/sprites/linkWalk-front-02.png", "/sprites/linkWalk-front-03.png", "/sprites/linkWalk-front-04.png", "/sprites/linkWalk-front-05.png", "/sprites/linkWalk-front-06.png", "/sprites/linkWalk-front-07.png"];

let LinkWalkingFrontArraySprite = u.sprite(LinkWalkingFrontArray);

let LinkWalkingFrontAnimatedSprite = PIXI.extras.MovieClip(LinkWalkingFrontArraySprite);

LinkWalkingFrontAnimatedSprite.x = 62;
LinkWalkingFrontAnimatedSprite.y = 32;
LinkWalkingFrontAnimatedSprite.vx = 0;

loader
  .on("progress", loadProgressHandler)
  .load(setup);


function loadProgressHandler(loader, resource) {
  console.log("loading: " + resource.url);
  console.log("progress: " + loader.progress + "%")
}

function play() {
  //Use the cat's velocity to make it move
  LinkWalkingFrontAnimatedSprite.x += LinkWalkingFrontAnimatedSprite.vx;
  LinkWalkingFrontAnimatedSprite.y += LinkWalkingFrontAnimatedSprite.vy
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
  LinkWalkingFrontAnimatedSprite = new Sprite(
    resources["/sprites/links-walk.json"].textures["linkWalk-back-03.png"]
  );
  LinkWalkingFrontAnimatedSprite.x = 162;
  LinkWalkingFrontAnimatedSprite.y = 162;
  LinkWalkingFrontAnimatedSprite.vx = 0;
  LinkWalkingFrontAnimatedSprite.vy = 0;

  stage.addChild(LinkWalkingFrontAnimatedSprite);
  //This code will run when the loader has finished loading the image

  //Left arrow key `press` method
  left.press = function () {

    //Change the cat's velocity when the key is pressed
    LinkWalkingFrontAnimatedSprite.vx = -5;
    LinkWalkingFrontAnimatedSprite.vy = 0;
  };

  //Left arrow key `release` method
  left.release = function () {

    //If the left arrow has been released, and the right arrow isn't down,
    //and the cat isn't moving vertically:
    //Stop the cat
    if (!right.isDown && LinkWalkingFrontAnimatedSprite.vy === 0) {
      LinkWalkingFrontAnimatedSprite.vx = 0;
    }
  };

  //Up
  up.press = function () {
    LinkWalkingFrontAnimatedSprite.vy = -5;
    LinkWalkingFrontAnimatedSprite.vx = 0;
  };
  up.release = function () {
    if (!down.isDown && LinkWalkingFrontAnimatedSprite.vx === 0) {
      LinkWalkingFrontAnimatedSprite.vy = 0;
    }
  };

  //Right
  right.press = function () {
    LinkWalkingFrontAnimatedSprite.vx = 5;
    LinkWalkingFrontAnimatedSprite.vy = 0;
  };
  right.release = function () {
    if (!left.isDown && LinkWalkingFrontAnimatedSprite.vy === 0) {
      LinkWalkingFrontAnimatedSprite.vx = 0;
    }
  };

  //Down
  down.press = function () {
    LinkWalkingFrontAnimatedSprite.vy = 5;
    LinkWalkingFrontAnimatedSprite.vx = 0;
  };
  down.release = function () {
    if (!up.isDown && LinkWalkingFrontAnimatedSprite.vx === 0) {
      LinkWalkingFrontAnimatedSprite.vy = 0;
    }
  };
  gameLoop();
}