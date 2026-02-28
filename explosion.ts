import * as ex from 'excalibur';
import { explosionSound } from './resources';

export function spawnExplosion(pos: ex.Vector, scene: ex.Scene) {
  const emitter = new ex.ParticleEmitter({
    pos: pos.clone(),
    emitterType: ex.EmitterType.Circle,
    radius: 5,
    minVel: 100,
    maxVel: 300,
    minAngle: 0,
    maxAngle: Math.PI * 2,
    emitRate: 300,
    opacity: 1,
    fadeFlag: true,
    particleLife: 250,
    minSize: 2,
    maxSize: 8,
    startSize: 0,
    endSize: 0,
    beginColor: ex.Color.Yellow,
    endColor: ex.Color.Red,
    isEmitting: true,
  });
  scene.add(emitter);
  setTimeout(() => emitter.kill(), 80);
  explosionSound.play().catch(() => {});
}
