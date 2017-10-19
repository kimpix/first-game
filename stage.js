//Create the renderer
var renderer = autoDetectRenderer(800, 500,  {antialias: false, transparent: false, resolution: 1});

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new Container();

//Tell the `renderer` to `render` the `stage`
renderer.render(stage);

scaleToWindow(document.getElementsByTagName('canvas')[0]);