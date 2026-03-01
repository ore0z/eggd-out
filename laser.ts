import * as ex from 'excalibur';
import { Enemy } from './enemy';
import { PowerEgg } from './power-egg';
import { spawnExplosion } from './explosion';
import { gameState } from './state';

export class Laser extends ex.Actor {
  constructor(pos: ex.Vector) {
    super({
      pos,
      width: 4,
      height: 16,
      color: ex.Color.Yellow,
      anchor: ex.vec(0.5, 0.5),
      collisionType: ex.CollisionType.Active,
    });
    this.vel = ex.vec(0, -600);
  }

  override onCollisionStart(_self: ex.Collider, other: ex.Collider) {
    if (other.owner instanceof PowerEgg) {
      const enemies = this.scene!.actors.filter(a => a instanceof Enemy);
      for (const enemy of enemies) {
        spawnExplosion(enemy.pos, this.scene!);
        enemy.kill();
        gameState.score++;
      }
      spawnExplosion(other.owner.pos, this.scene!);
      other.owner.kill();
      this.kill();
      gameState.scoreLabel!.text = `Score: ${gameState.score}`;
    } else if (other.owner instanceof Enemy) {
      spawnExplosion(other.owner.pos, this.scene!);
      other.owner.kill();
      this.kill();
      gameState.score++;
      gameState.scoreLabel!.text = `Score: ${gameState.score}`;
    }
  }

  override onPreUpdate(_engine: ex.Engine) {
    if (this.pos.y < -this.height) {
      this.kill();
    }
  }
}
