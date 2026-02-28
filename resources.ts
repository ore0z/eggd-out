import * as ex from 'excalibur';
import laserUrl from 'url:./assets/laser.wav';
import shipUrl from 'url:./assets/ship.png';
import ship0Url from 'url:./assets/ship0.png';
import ship1Url from 'url:./assets/ship1.png';
import bgUrl from 'url:./assets/play-bg.jpg';
import eggRedUrl from 'url:./assets/egg-red.png';
import eggGreenUrl from 'url:./assets/egg-green.png';
import eggGoldUrl from 'url:./assets/egg-gold.png';
import bgMusicUrl from 'url:./assets/background.wav';
import explosionUrl from 'url:./assets/explosion.wav';

export { default as logoUrl } from 'url:./assets/logo.png';
export { default as gameOverImgUrl } from 'url:./assets/game-over-eggs.png';

export const laserSound = new ex.Sound(laserUrl);
export const bgMusic = new ex.Sound(bgMusicUrl);
export const explosionSound = new ex.Sound(explosionUrl);

export const shipImage = new ex.ImageSource(shipUrl);
export const ship0Image = new ex.ImageSource(ship0Url);
export const ship1Image = new ex.ImageSource(ship1Url);
export const bgImage = new ex.ImageSource(bgUrl);
export const eggImages = [
  new ex.ImageSource(eggRedUrl),
  new ex.ImageSource(eggGreenUrl),
  new ex.ImageSource(eggGoldUrl),
];
