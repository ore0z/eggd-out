import * as ex from 'excalibur';
import { bgImage } from './resources';
import { gameState } from './state';

export class Background extends ex.Actor {
  private readonly scrollSpeed = 60;

  constructor(y: number) {
    super({ x: 0, y, z: -1, anchor: ex.vec(0, 0) });
  }

  override onInitialize() {
    const sprite = bgImage.toSprite();
    sprite.destSize = { width: 800, height: 1200 };
    this.graphics.use(sprite);
  }

  override onPreUpdate(engine: ex.Engine) {
    if (gameState.gameOver) return;
    this.pos.y += this.scrollSpeed * engine.clock.elapsed() / 1000;
    if (this.pos.y >= 1200) {
      this.pos.y -= 2400;
    }
  }
}
