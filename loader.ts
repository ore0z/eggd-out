import * as ex from 'excalibur';
import { laserSound, bgMusic, explosionSound, shipImage, ship0Image, ship1Image, bgImage, eggImages, powerEggImage, logoUrl } from './resources';

export const loader = new ex.Loader([
  laserSound, bgMusic, explosionSound,
  shipImage, ship0Image, ship1Image,
  bgImage, ...eggImages, powerEggImage,
]);

loader.logo = logoUrl;
loader.logoWidth = 490;
loader.logoHeight = 441;
loader.backgroundColor = 'rgb(61, 20, 74)';
loader.startButtonFactory = () => {
  const button = document.createElement('button');
  button.id = 'excalibur-play';
  button.textContent = 'Play game';

  setTimeout(() => {
    const hint = document.createElement('p');
    hint.textContent = 'tap or press space to pew';
    hint.style.cssText = 'color:white;font-family:sans-serif;font-size:18px;margin:12px 0 0;text-align:center';
    button.parentElement?.appendChild(hint);
  }, 0);

  return button;
};
