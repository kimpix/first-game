let SpriteUtilities = require('pixi-sprite-utilities').default;
let LinkWalkingFrontAnimatedSprite = {};
let LinkWalkingBackAnimatedSprite = {};
let isUp = false;
let isDown = false;
let isLeft = false;
let isRight = false;
let currentFrame = 0;
let flipped = false;

loader
  .on("progress", loadProgressHandler)
  .add("/sprites/links-walk.json")
  .load(setup);

let u = new SpriteUtilities(PIXI);


function loadProgressHandler(loader, resource) {
  console.log("loading: " + resource.url);
  console.log("progress: " + loader.progress + "%")
}

function play(sprite) {
  currentFrame = sprite.currentFrame;
  if (isUp === true && currentFrame === 13) {
    sprite.gotoAndPlay(7);
  }

  if (isDown === true && currentFrame === 6) {
    sprite.gotoAndPlay(1);
  }

  if (isRight === true && currentFrame === 20) {
    sprite.gotoAndPlay(14);
  }

  if (isLeft === true && currentFrame === 27) {
    sprite.gotoAndPlay(21);
  }

  //Use the cat's velocity to make it move
  sprite.x += sprite.vx;
  sprite.y += sprite.vy
}

function gameLoop() {

  //Loop this function at 60 frames per second
  requestAnimationFrame(gameLoop);
  //Update the current game state:
  play(LinkWalkingFrontAnimatedSprite);

  //Render the stage to see the animation
  renderer.render(stage);
}


function setup() {
  let linkFront = ["linkWalk-front-01.png", "linkWalk-front-02.png", "linkWalk-front-03.png", "linkWalk-front-04.png", "linkWalk-front-05.png", "linkWalk-front-06.png", "linkWalk-front-07.png", "linkWalk-back-01.png", "linkWalk-back-02.png", "linkWalk-back-03.png", "linkWalk-back-04.png", "linkWalk-back-05.png", "linkWalk-back-06.png", "linkWalk-back-07.png", "linkWalk-right-01.png", "linkWalk-right-02.png", "linkWalk-right-03.png", "linkWalk-right-04.png", "linkWalk-right-05.png", "linkWalk-right-06.png", "linkWalk-right-07.png", "linkWalk-left-01.png", "linkWalk-left-02.png", "linkWalk-left-03.png", "linkWalk-left-04.png", "linkWalk-left-05.png", "linkWalk-left-06.png", "linkWalk-left-07.png"];
  let linkFrontTextureArray = [];

  for (let i = 0; i < 28; i++) {
    let linkFrontTexture = PIXI.Texture.fromImage(linkFront[i]);
    linkFrontTextureArray.push(linkFrontTexture);
  }

  LinkWalkingFrontAnimatedSprite = new PIXI.extras.AnimatedSprite(linkFrontTextureArray);

  LinkWalkingFrontAnimatedSprite.x = 62;
  LinkWalkingFrontAnimatedSprite.y = 32;
  LinkWalkingFrontAnimatedSprite.vx = 0;
  console.log("all files loaded");
  LinkWalkingFrontAnimatedSprite.x = 162;
  LinkWalkingFrontAnimatedSprite.y = 162;
  LinkWalkingFrontAnimatedSprite.vx = 0;
  LinkWalkingFrontAnimatedSprite.vy = 0;

  LinkWalkingBackAnimatedSprite.vx = 0;
  LinkWalkingBackAnimatedSprite.vy = 0;

  stage.addChild(LinkWalkingFrontAnimatedSprite);
  //This code will run when the loader has finished loading the image

  //Left arrow key `press` method
  left.press = function () {


    //Change the cat's velocity when the key is pressed
    LinkWalkingFrontAnimatedSprite.vx = -5;
    LinkWalkingFrontAnimatedSprite.vy = 0;
    LinkWalkingFrontAnimatedSprite.gotoAndPlay(13);
    isLeft = true;
  };

  //Left arrow key `release` method
  left.release = function () {

    //If the left arrow has been released, and the right arrow isn't down,
    //and the cat isn't moving vertically:
    //Stop the cat
    if (!right.isDown && LinkWalkingFrontAnimatedSprite.vy === 0) {
      LinkWalkingFrontAnimatedSprite.vx = 0;
    }
    LinkWalkingFrontAnimatedSprite.stop();
    isLeft=  false
  };

  //Up
  up.press = function () {
    LinkWalkingFrontAnimatedSprite.vy = -5;
    LinkWalkingFrontAnimatedSprite.vx = 0;
    LinkWalkingFrontAnimatedSprite.gotoAndPlay(7);
    isUp = true;

  };

  up.release = function () {
    if (!down.isDown && LinkWalkingFrontAnimatedSprite.vx === 0) {
      LinkWalkingFrontAnimatedSprite.vy = 0;
    }
    LinkWalkingFrontAnimatedSprite.stop();
    isUp = false;
  };

  //Right
  right.press = function () {
    LinkWalkingFrontAnimatedSprite.vx = 5;
    LinkWalkingFrontAnimatedSprite.vy = 0;
    LinkWalkingFrontAnimatedSprite.gotoAndPlay(14);
    isRight = true;
  };
  right.release = function () {
    if (!left.isDown && LinkWalkingFrontAnimatedSprite.vy === 0) {
      LinkWalkingFrontAnimatedSprite.vx = 0;
    }
    LinkWalkingFrontAnimatedSprite.stop();
    isRight = false;
  };

  //Down
  down.press = function () {
    LinkWalkingFrontAnimatedSprite.vy = 5;
    LinkWalkingFrontAnimatedSprite.vx = 0;
    LinkWalkingFrontAnimatedSprite.play();
    isDown = true;
  };
  down.release = function () {
    if (!up.isDown && LinkWalkingFrontAnimatedSprite.vx === 0) {
      LinkWalkingFrontAnimatedSprite.vy = 0;
      LinkWalkingFrontAnimatedSprite.stop();
    }
    isDown = false;
  };
  gameLoop(LinkWalkingFrontAnimatedSprite);
}