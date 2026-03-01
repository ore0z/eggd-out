import * as ex from 'excalibur';

export const gameState = {
  gameOver: false,
  score: 0,
  elapsed: 0,
  highScore: parseInt(localStorage.getItem('highScore') ?? '0', 10),
  scoreLabel: null as ex.Label | null,
  highScoreLabel: null as ex.Label | null,
  ship: null as ex.Actor | null,
  gameOverDiv: null as HTMLDivElement | null,
  pointerDown: false,
  pointerX: undefined as number | undefined,
  restartCallback: null as (() => void) | null,
};
