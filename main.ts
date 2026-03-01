import * as ex from 'excalibur';
import { loader } from './loader';
import { bgMusic } from './resources';
import { gameState } from './state';
import { Background } from './background';
import { Enemy } from './enemy';
import { EggSplat } from './explosion';
import { PowerEgg } from './power-egg';
import { Laser } from './laser';
import { Ship } from './ship';

const game = new ex.Engine({
  width: 800,
  height: 1200,
  backgroundColor: ex.Color.Black,
  displayMode: ex.DisplayMode.FitScreen,
});

function scheduleNextPowerEgg() {
  if (gameState.gameOver) return;
  const delay = Math.random() * 15000 + 15000; // 15–30 seconds
  setTimeout(() => {
    if (gameState.gameOver) return;
    const x = Math.random() * (800 - 92) + 46;
    game.add(new PowerEgg(x));
    scheduleNextPowerEgg();
  }, delay);
}

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
  gameState.pointerDown = false;
  gameState.pointerX = undefined;

  gameState.gameOverDiv?.remove();
  gameState.gameOverDiv = null;

  for (const actor of game.currentScene.actors) {
    if (actor instanceof Enemy || actor instanceof EggSplat || actor instanceof PowerEgg || actor instanceof Laser || actor instanceof Ship || actor instanceof Background) {
      actor.kill();
    }
  }

  document.body.style.cursor = 'none';
  gameState.scoreLabel!.text = 'Score: 0';
  bgMusic.loop = true;
  bgMusic.play();
  game.add(new Background(0));
  game.add(new Background(-1200));
  const ship = new Ship();
  gameState.ship = ship;
  game.add(ship);
  scheduleNextEnemy();
  scheduleNextPowerEgg();
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

  gameState.highScoreLabel = new ex.Label({
    text: `Best: ${gameState.highScore}`,
    x: 10,
    y: 40,
    font: new ex.Font({ size: 24 }),
    color: ex.Color.White,
    anchor: ex.vec(0, 0),
  });
  game.add(gameState.highScoreLabel);

  startGame();

  game.input.keyboard.on('press', (evt) => {
    if (evt.key === ex.Keys.Space) (gameState.ship as Ship)?.shoot();
  });

  game.input.pointers.primary.on('down', (evt) => {
    if (gameState.gameOver) return;
    gameState.pointerDown = true;
    gameState.pointerX = evt.worldPos.x;
    (gameState.ship as Ship)?.shoot();
  });
  game.input.pointers.primary.on('move', (evt) => {
    if (gameState.pointerDown) gameState.pointerX = evt.worldPos.x;
  });
  game.input.pointers.primary.on('up', () => {
    gameState.pointerDown = false;
    gameState.pointerX = undefined;
  });

  gameState.restartCallback = startGame;

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
