let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);


renderer.backgroundColor = 0x489648;
//Tell the `renderer` to `render` the `stage`
renderer.render(stage);

scaleToWindow(document.getElementsByTagName('canvas')[0]);