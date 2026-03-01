import * as ex from 'excalibur';
import { powerEggImage } from './resources';
import { gameState } from './state';

export class PowerEgg extends ex.Actor {
  constructor(x: number) {
    super({
      pos: ex.vec(x, -60),
      anchor: ex.vec(0.5, 0.5),
      collisionType: ex.CollisionType.Passive,
      collider: ex.Shape.Circle(46),
    });
    this.vel = ex.vec(0, 140);
  }

  override onInitialize() {
    const sprite = powerEggImage.toSprite();
    sprite.destSize = { width: 92, height: 86 };
    this.graphics.use(sprite);
  }

  override onPreUpdate(engine: ex.Engine) {
    if (this.pos.y > engine.drawHeight + this.height) {
      this.kill();
    }
  }
}
