import GameScene from '../components/GameScene'
import { Direction, WalkingAnimationMapping } from 'grid-engine'
import Phaser from 'phaser'

/** Interface to identify NPCs and to store the action to perform when the player interarcts with them. */
export interface NPC {
  readonly name: string
  readonly action: (scene: GameScene, npcName: string) => void
}

/** this functions creates a character sprite at the given coordinates on the map and scales the sprite. */
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

/** This function is used for grid-based movement of a character sprite in four directions.
 *  It also prevents positioning errors that come with the GridEngine plugin and plays movement animations.
 */
export function basicMovement (
  scene: GameScene,
  id: string = 'player',
  gridEngine: any,
  playerSprite: Phaser.Physics.Arcade.Sprite
): void {
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

  // movement animations according to movement and direction
  if (gridEngine.isMoving(id) === false) {
    playerSprite.anims.play('idle_' + String(gridEngine.getFacingDirection(id)), true)
  } else {
    playerSprite.anims.play('walk_' + String(gridEngine.getFacingDirection(id)), true)
  }
}

/** This functions creates movement animations. */
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

/** This function is used to create an NPC using a spritesheet.
 *  For addional information on walkingAnimationMapping check https://annoraaq.github.io/grid-engine/api/config.html
 */
export function addNpc (
  scene: GameScene,
  xPos: integer,
  yPos: integer,
  texture: string,
  scale: number,
  walkingAnimationMapping?: number | WalkingAnimationMapping,
  action?: (scene: GameScene, npcName: string) => void
): void {
  const npcSprite = createCharacterSprite(scene, 0, 0, texture, scale)

  if (typeof walkingAnimationMapping === 'undefined') {
    walkingAnimationMapping = {
      up: {
        leftFoot: 36,
        standing: 37,
        rightFoot: 38
      },
      right: {
        leftFoot: 24,
        standing: 25,
        rightFoot: 26
      },
      down: {
        leftFoot: 0,
        standing: 1,
        rightFoot: 2
      },
      left: {
        leftFoot: 12,
        standing: 13,
        rightFoot: 14
      }
    }
  }

  scene.gridEngine.addCharacter(
    {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      id: ('NPC' + scene.npcs.length),
      sprite: npcSprite,
      startPosition: { x: xPos, y: yPos },
      walkingAnimationMapping: walkingAnimationMapping,
      facingDirection: 'down'
    }
  )

  if (typeof action === 'undefined') {
    action = (scene: GameScene): void => {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      console.debug('NPC' + scene.npcs.length + ' has no assigned action.')
    }
  }

  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  scene.npcs.push({ name: ''.concat('NPC' + scene.npcs.length), action: action })
}
