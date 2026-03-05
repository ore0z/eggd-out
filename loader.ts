import * as ex from 'excalibur';
import { laserSound, bgMusic, explosionSound, shipImage, ship0Image, ship1Image, bgImage, eggImages, powerEggImage, logoUrl } from './resources';
import { gameState } from './state';

export function buildDifficultyToggle(): HTMLDivElement {
  const options: Array<'easy' | 'normal' | 'hard'> = ['easy', 'normal', 'hard'];
  const labels = { easy: 'Easy', normal: 'Normal', hard: 'Hard' };

  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;gap:8px;justify-content:center;margin-bottom:12px;pointer-events:auto;';

  options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.textContent = labels[opt];
    btn.dataset.diff = opt;
    btn.style.cssText = `font:bold 16px sans-serif;padding:6px 16px;border-radius:6px;border:2px solid white;cursor:pointer;background:${gameState.difficulty === opt ? 'white' : 'transparent'};color:${gameState.difficulty === opt ? '#222' : 'white'};`;
    btn.onclick = () => {
      gameState.difficulty = opt;
      wrap.querySelectorAll('button').forEach((b) => {
        const active = (b as HTMLButtonElement).dataset.diff === opt;
        b.style.background = active ? 'white' : 'transparent';
        b.style.color = active ? '#222' : 'white';
      });
    };
    wrap.appendChild(btn);
  });

  return wrap;
}

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
    button.parentElement?.insertBefore(buildDifficultyToggle(), button);
    const hint = document.createElement('p');
    hint.textContent = 'tap or press space to pew';
    hint.style.cssText = 'color:white;font-family:sans-serif;font-size:18px;margin:12px 0 0;text-align:center';
    button.parentElement?.appendChild(hint);
  }, 0);

  return button;
};
