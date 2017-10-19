import './plugins/pixi.min';
import './utils/scaleToWindow';
import './global';
import './sprites';
import './stage';

if (module.hot) {
  module.hot.accept();
}