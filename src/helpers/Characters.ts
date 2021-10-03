import GameScene from '../components/GameScene'
import { Direction } from 'grid-engine'
import Phaser from 'phaser'

export function createCharacterSprite (
  scene: GameScene,
  x: number,
  y: number,
  texture: string,
  scale: number
): Phaser.Physics.Arcade.Sprite {
  const sprite: Phaser.Physics.Arcade.Sprite = scene.physics.add.sprite(x, y, texture)
  sprite.scale = scale

  return sprite
}

export function basicMovement (
  scene: GameScene,
  id: string = 'player',
  gridEngine: any,
  playerSprite: Phaser.Physics.Arcade.Sprite
): void {
  const cursors = scene.input.keyboard.createCursorKeys()

  console.log(gridEngine.isMoving(id))
  // Aktionen bei Pfeiltastendruck festlegen
  if (gridEngine.isMoving(id) === false) {
    // testen, ob die Grid-Engine-Koordinaten noch im richtigen Verhältnis zu den echten stehen
    if (
      gridEngine.getPosition(id).y !== ((gridEngine.getSprite(id).getBottomCenter().y / 32) - 1) ||
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      gridEngine.getPosition(id).x !== (((gridEngine.getSprite(id).getBottomCenter().x + 15.25) / 32) - 1)
    ) {
      console.log('bad shit happening')
      gridEngine.setPosition(id, gridEngine.getPosition(id))
    }
    console.log(gridEngine.getPosition(id))
    console.log(gridEngine.getSprite(id).getBottomCenter())

    // Movement itself
    if (cursors.up.isDown) {
      gridEngine.move(id, Direction.UP)
    } else if (cursors.down.isDown) {
      gridEngine.move(id, Direction.DOWN)
    } else if (cursors.left.isDown) {
      gridEngine.move(id, Direction.LEFT)
    } else if (cursors.right.isDown) {
      gridEngine.move(id, Direction.RIGHT)
    }
  }

  // Animationen abhängig von Bewegung und Blickrichtung abspielen
  if (gridEngine.isMoving(id) === false) {
    playerSprite.anims.play('idle_' + String(gridEngine.getFacingDirection(id)), true)
  } else {
    playerSprite.anims.play('walk_' + String(gridEngine.getFacingDirection(id)), true)
  }
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
