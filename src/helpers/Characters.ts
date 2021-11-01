import GameScene from '../components/GameScene'
import { Direction } from 'grid-engine'
import Phaser from 'phaser'

/** This function is used for grid-based movement of a character sprite in four directions.
 *  It also prevents positioning errors that come with the GridEngine plugin and plays movement animations.
 */
export function basicMovement (
  /** The scene the player is in. */
  scene: GameScene,
  id: string = 'player',
  gridEngine: any,
  playerSprite: Phaser.Physics.Arcade.Sprite
): void {
  if (!scene.inDialogue) {
  // testen, ob die Grid-Engine-Koordinaten noch im richtigen Verhältnis zu den echten stehen
    if (
      gridEngine.isMoving(id) === false &&
    (
      gridEngine.getPosition(id).y !== ((gridEngine.getSprite(id).getBottomCenter().y / 32) - 1) ||
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      gridEngine.getPosition(id).x !== (((gridEngine.getSprite(id).getBottomCenter().x + 15.25) / 32) - 1)
    )
    ) {
    // Position neu setzen
      const x = (((Math.round(gridEngine.getSprite(id).getBottomCenter().x) + 15) / 32) - 1)
      const y = ((Math.round(gridEngine.getSprite(id).getBottomCenter().y) / 32) - 1)
      gridEngine.setPosition(id, { x: x, y: y })
    }

    // I know that it seems unnecessary to have multiple if-statements that do the same.
    // It just works better like this. Don't change it please. :)

    // actual movement
    if (gridEngine.isMoving(id) === false) {
    // Movement itself
      if (scene.cursors.up.isDown) {
        gridEngine.move(id, Direction.UP)
      } else if (scene.cursors.down.isDown) {
        gridEngine.move(id, Direction.DOWN)
      } else if (scene.cursors.left.isDown) {
        gridEngine.move(id, Direction.LEFT)
      } else if (scene.cursors.right.isDown) {
        gridEngine.move(id, Direction.RIGHT)
      }
    }

    // switch to main menu when pressing ESC key
    // --- DEFINITELY CHANGE LATER ---
    if (scene.backKey.isDown) {
      scene.scene.switch('main-menu')
    }
  }

  // movement animations according to movement and direction
  if (gridEngine.isMoving(id) === false) {
    playerSprite.anims.play('idle_' + String(gridEngine.getFacingDirection(id)), true)
  } else {
    playerSprite.anims.play('walk_' + String(gridEngine.getFacingDirection(id)), true)
  }
}

/** This functions creates movement animations. */
export function createAnims (
  /** The scene the player is in. */
  scene: GameScene,
  /** The name that got assigned to the spritesheet when it was loaded. */
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
