import * as ex from 'excalibur';
import { eggImages } from './resources';
import { gameState } from './state';

export class Enemy extends ex.Actor {
  constructor(x: number) {
    super({
      pos: ex.vec(x, -30),
      anchor: ex.vec(0.5, 0.5),
      collisionType: ex.CollisionType.Passive,
      collider: ex.Shape.Circle(20),
    });
    this.vel = ex.vec(0, 150 + gameState.elapsed * 10);
  }

  override onInitialize() {
    const img = eggImages[Math.floor(Math.random() * eggImages.length)];
    const sprite = img.toSprite();
    sprite.destSize = { width: 46, height: 60 };
    this.graphics.use(sprite);
  }

  override onPreUpdate(engine: ex.Engine) {
    if (this.pos.y > engine.drawHeight + this.height) {
      this.kill();
    }
  }
}
