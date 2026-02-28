import * as ex from 'excalibur';
import { ship0Image, ship1Image, laserSound, bgMusic, gameOverImgUrl } from './resources';
import { gameState } from './state';
import { Laser } from './laser';
import { Enemy } from './enemy';

export class Ship extends ex.Actor {
  private readonly speed = 300;

  constructor() {
    super({
      pos: ex.vec(400, 1140),
      anchor: ex.vec(0.5, 0.5),
      collisionType: ex.CollisionType.Passive,
      collider: ex.Shape.Box(45, 60),
    });
  }

  override onInitialize() {
    const s0 = ship0Image.toSprite();
    const s1 = ship1Image.toSprite();
    s0.destSize = { width: 78, height: 120 };
    s1.destSize = { width: 78, height: 120 };
    const anim = new ex.Animation({
      frames: [
        { graphic: s0, duration: 80 },
        { graphic: s1, duration: 80 },
      ],
      strategy: ex.AnimationStrategy.Loop,
    });
    this.graphics.use(anim);
  }

  override onCollisionStart(_self: ex.Collider, other: ex.Collider) {
    if (other.owner instanceof Enemy && !gameState.gameOver) {
      gameState.gameOver = true;
      this.kill();
      bgMusic.stop();

      const div = document.createElement('div');
      div.style.cssText = `
        position: fixed;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        pointer-events: none;
      `;
      div.innerHTML = `
        <div style="font: bold 64px sans-serif; color: red;">GAME OVER</div>
        <img src="${gameOverImgUrl}" style="width: 392px; height: 268px;">
        <div style="font: 24px sans-serif; color: white;">Tap or press ENTER to play again</div>
      `;
      document.body.appendChild(div);
      gameState.gameOverDiv = div;
    }
  }

  override onPreUpdate(engine: ex.Engine) {
    if (gameState.gameOver) return;
    gameState.elapsed += engine.clock.elapsed() / 1000;
    this.vel = ex.vec(0, 0);
    if (gameState.pointerDown && gameState.pointerX !== undefined) {
      this.pos.x = gameState.pointerX;
    } else {
      if (engine.input.keyboard.isHeld(ex.Keys.Left)) {
        this.vel.x = -this.speed;
      }
      if (engine.input.keyboard.isHeld(ex.Keys.Right)) {
        this.vel.x = this.speed;
      }
    }
    this.pos.x = ex.clamp(this.pos.x, this.width / 2, engine.drawWidth - this.width / 2);
  }

  shoot() {
    if (gameState.gameOver) return;
    const laser = new Laser(this.pos.clone());
    this.scene!.add(laser);
    laserSound.play().catch(() => {});
  }
}
