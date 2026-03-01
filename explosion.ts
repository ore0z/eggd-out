import * as ex from 'excalibur';
import { explosionSound } from './resources';

export class EggSplat extends ex.Actor {
  constructor(pos: ex.Vector) {
    super({ pos: pos.clone(), vel: ex.vec(0, 75), z: 1 });
  }
  override onInitialize() {
    this.actions.delay(1000).fade(0, 1000).die();
    this.graphics.onPostDraw = (ctx: ex.ExcaliburGraphicsContext) => {
      ctx.drawCircle(ex.vec(0, 8), 20, ex.Color.White);
      ctx.drawCircle(ex.vec(-10, -4), 14, ex.Color.White);
      ctx.drawCircle(ex.vec(10, -2), 12, ex.Color.White);
      ctx.drawCircle(ex.vec(0, 4), 10, ex.Color.fromHex('#cc9900'));
    };
  }
}

export function spawnExplosion(pos: ex.Vector, scene: ex.Scene) {
  scene.add(new EggSplat(pos));
  explosionSound.play().catch(() => {});
}
