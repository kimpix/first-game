var texture = TextureCache["img/link-walking-no-weapons.png"];
var sprite = new Sprite(texture);

loader
.add(["img/link-walking-no-weapons.png"])
.on("progress", loadProgressHandler)
.load(setup);

function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress: " + loader.progress + "%")
}    

function setup() {
    var linkWalking = new Sprite(
        resources["img/link-walking-no-weapons.png"].texture
    );

    console.log("all files loaded");
    stage.addChild(linkWalking);
    renderer.render(stage);
    //This code will run when the loader has finished loading the image
}

