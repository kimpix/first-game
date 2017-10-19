
loader
.add(["/sprites/links-walk.json"])
.on("progress", loadProgressHandler)
.load(setup);

function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress: " + loader.progress + "%")
}    

function setup() {
    console.log("all files loaded");
    const linksWalking = new Sprite(
      resources["/sprites/links-walk.json"].textures["linkWalk-back-03.png"]
    );

    linksWalking.x = 62;
    linksWalking.y = 32;

    stage.addChild(linksWalking);
    renderer.render(stage);
    //This code will run when the loader has finished loading the image
}

