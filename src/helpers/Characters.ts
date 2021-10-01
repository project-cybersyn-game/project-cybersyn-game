import GameScene from '../components/GameScene'
import { Direction } from 'grid-engine'

export function createCharacterSprite (
  scene: GameScene,
  x: number,
  y: number,
  texture: string,
  scale: number
): Phaser.GameObjects.Sprite {
  const sprite = scene.add.sprite(x, y, texture)
  sprite.scale = scale

  return sprite
}

export function basicMovement (
  scene: GameScene,
  id: string = 'player',
  gridEngine: any,
  playerSprite: any
): void {
  const cursors = scene.input.keyboard.createCursorKeys()

  // Aktionen bei Pfeiltastendruck festlegen
  // up/down
  if (cursors.up.isDown) {
    gridEngine.move(id, Direction.UP)
    scene.movementState.type = 'walk'
    scene.movementState.direction = 'up'
  } else if (cursors.down.isDown) {
    gridEngine.move(id, Direction.DOWN)
    scene.movementState.type = 'walk'
    scene.movementState.direction = 'down'
  } else {
    scene.movementState.type = 'idle'
  }
  // left/right
  if (cursors.left.isDown) {
    gridEngine.move(id, Direction.LEFT)
    scene.movementState.type = 'walk'
    scene.movementState.direction = 'left'
  } else if (cursors.right.isDown) {
    gridEngine.move(id, Direction.RIGHT)
    scene.movementState.type = 'walk'
    scene.movementState.direction = 'right'
  }

  // Animationen abhängig von movement type und direction abspielen
  playerSprite.anims.play(scene.movementState.type + '_' + scene.movementState.direction, true)
}

export function createAnims (
  scene: GameScene,
  imageName: string
): void {
  // Animationen für Spielfigur
  // walk animations
  scene.anims.create({
    key: 'walk_left',
    frames: scene.anims.generateFrameNumbers(imageName, {
      start: 40,
      end: 47
    }),
    frameRate: 10,
    repeat: -1
  })
  scene.anims.create({
    key: 'walk_right',
    frames: scene.anims.generateFrameNumbers(imageName, {
      start: 32,
      end: 39
    }),
    frameRate: 10,
    repeat: -1
  })
  scene.anims.create({
    key: 'walk_up',
    frames: scene.anims.generateFrameNumbers(imageName, {
      start: 24,
      end: 31
    }),
    frameRate: 10,
    repeat: -1
  })
  scene.anims.create({
    key: 'walk_down',
    frames: scene.anims.generateFrameNumbers(imageName, {
      start: 16,
      end: 23
    }),
    frameRate: 10,
    repeat: -1
  })
  // idle animations
  scene.anims.create({
    key: 'idle_left',
    frames: scene.anims.generateFrameNumbers(imageName, {
      start: 14,
      end: 12
    }),
    frameRate: 5,
    repeat: -1
  })
  scene.anims.create({
    key: 'idle_right',
    frames: scene.anims.generateFrameNumbers(imageName, {
      start: 8,
      end: 11
    }),
    frameRate: 5,
    repeat: -1
  })
  scene.anims.create({
    key: 'idle_up',
    frames: scene.anims.generateFrameNumbers(imageName, {
      start: 4,
      end: 7
    }),
    frameRate: 5,
    repeat: -1
  })
  scene.anims.create({
    key: 'idle_down',
    frames: scene.anims.generateFrameNumbers(imageName, {
      start: 0,
      end: 3
    }),
    frameRate: 5,
    repeat: -1
  })
}
