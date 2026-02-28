import * as ex from 'excalibur';
import { loader } from './loader';
import { bgMusic } from './resources';
import { gameState } from './state';
import { Background } from './background';
import { Enemy } from './enemy';
import { Laser } from './laser';
import { Ship } from './ship';

const game = new ex.Engine({
  width: 800,
  height: 1200,
  backgroundColor: ex.Color.Black,
  displayMode: ex.DisplayMode.FitScreen,
});

function scheduleNextEnemy() {
  if (gameState.gameOver) return;
  const minDelay = Math.max(150, 500 - gameState.elapsed * 10);
  const maxDelay = Math.max(300, 2000 - gameState.elapsed * 20);
  const delay = Math.random() * (maxDelay - minDelay) + minDelay;
  setTimeout(() => {
    if (gameState.gameOver) return;
    const x = Math.random() * (800 - 36) + 18;
    game.add(new Enemy(x));
    scheduleNextEnemy();
  }, delay);
}

function startGame() {
  gameState.gameOver = false;
  gameState.score = 0;
  gameState.elapsed = 0;

  gameState.gameOverDiv?.remove();
  gameState.gameOverDiv = null;

  for (const actor of game.currentScene.actors) {
    if (actor instanceof Enemy || actor instanceof Laser || actor instanceof Ship || actor instanceof Background) {
      actor.kill();
    }
  }

  gameState.scoreLabel!.text = 'Score: 0';
  bgMusic.loop = true;
  bgMusic.play();
  game.add(new Background(0));
  game.add(new Background(-1200));
  const ship = new Ship();
  gameState.ship = ship;
  game.add(ship);
  scheduleNextEnemy();
}

game.start(loader).then(() => {
  gameState.scoreLabel = new ex.Label({
    text: 'Score: 0',
    x: 10,
    y: 10,
    font: new ex.Font({ size: 24 }),
    color: ex.Color.White,
    anchor: ex.vec(0, 0),
  });
  game.add(gameState.scoreLabel);

  startGame();

  game.input.keyboard.on('press', (evt) => {
    if (evt.key === ex.Keys.Space) (gameState.ship as Ship)?.shoot();
  });

  let swallowNextEnterKeyup = false;
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && gameState.gameOver) {
      e.stopImmediatePropagation();
      swallowNextEnterKeyup = true;
      startGame();
    }
  }, true);
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && swallowNextEnterKeyup) {
      e.stopImmediatePropagation();
      swallowNextEnterKeyup = false;
    }
  }, true);
});
