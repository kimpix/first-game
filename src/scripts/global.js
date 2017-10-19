//Aliases
window.Container = PIXI.Container;
window.autoDetectRenderer = PIXI.autoDetectRenderer;
window.loader = PIXI.loader;
window.resources = PIXI.loader.resources;
window.Sprite = PIXI.Sprite;
window.TextureCache = PIXI.utils.TextureCache;
window.Rectangle = PIXI.Rectangle;


//Create a container object called the `stage`
window.stage = new Container();

//Create the renderer
window.renderer = autoDetectRenderer(800, 500,  {antialias: false, transparent: false, resolution: 1});