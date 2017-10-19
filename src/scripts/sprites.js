
const texture = TextureCache["/images/link-walking-no-weapons.png"];
const sprite = new Sprite(texture);

loader
.add(["/images/link-walking-no-weapons.png"])
.on("progress", loadProgressHandler)
.load(setup);

function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress: " + loader.progress + "%")
}    

function setup() {
    const linkWalking = new Sprite(
        resources["/images/link-walking-no-weapons.png"].texture
    );

    console.log("all files loaded");
    stage.addChild(linkWalking);
    renderer.render(stage);
    //This code will run when the loader has finished loading the image
}

