import GameScene from '../components/GameScene'
import { WalkingAnimationMapping } from 'grid-engine'
import Phaser from 'phaser'
import globalGameState from '../components/GlobalGameState'

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

export class NpcsAndObjects {
  static number: integer = 0
  name: String
  type: 'object' | 'npc'
  scene: GameScene
  /** default action if no action-parameter is assigned when creating the object */
  protected action: Function = (): void => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    console.log(this.name + ' has no action assigned.')
  }

  constructor (
    scene: GameScene,
    type: 'object' | 'npc',
    xPos: integer,
    yPos: integer,
    texture: string,
    scale: number,
    action?: Function,
    walkingAnimationMapping?: number | WalkingAnimationMapping
  ) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    this.name = type + NpcsAndObjects.number
    NpcsAndObjects.number++
    this.type = type
    this.scene = scene

    // adding object to the scene
    const npcSprite = createCharacterSprite(scene, 0, 0, texture, scale)
    this.addCharacter(npcSprite, xPos, yPos, walkingAnimationMapping)

    // adding action to execute when player interacts with the object
    if (action !== undefined) {
      this.action = action
    }

    scene.npcsAndObjectsArray.push(this)
  }

  /** This function is used for interacting with NPCs and objects and then executing the action set in the associated NPC object. */
  static interaction (
    scene: GameScene,
    playerId: string
  ): void {
    scene.npcsAndObjectsArray.forEach(object => {
      scene.interactionKey.on('down', () => {
        if (
          scene.gridEngine.getFacingPosition(playerId).equals(scene.gridEngine.getPosition(object.name)) === true
        ) {
          object.action(object.scene, object.name)
        }
      })
    })

    globalGameState.on('inDialogue', (value: boolean) => {
      if (value) {
        scene.interactionKey.removeAllListeners()
      } else {
        NpcsAndObjects.interaction(scene, playerId)
      }
    })
  }

  /** This function is used for adding a character to the GridEngine plugin. */
  addCharacter (
    npcSprite: Phaser.Physics.Arcade.Sprite,
    xPos: integer,
    yPos: integer,
    walkingAnimationMapping?: number | WalkingAnimationMapping
  ): void {
    this.scene.gridEngine.addCharacter(
      {
        id: (this.name),
        sprite: npcSprite,
        startPosition: { x: xPos, y: yPos },
        facingDirection: 'down'
      }
    )
  }
}

/**
 * Class for all pushable objects
 */
export class Objects extends NpcsAndObjects {
  playerId: string = 'player'

  protected action: Function = (): void => {
    if (this.scene.gridEngine.isMoving(this.name) === false) {
      this.scene.gridEngine.move(this.name, this.scene.gridEngine.getFacingDirection(this.playerId))
    }
  }

  constructor (
    /** The scene the NPC should be added to. */
    scene: GameScene,
    /** X-coordinate of GridEngine the NPC should be spawned at. */
    xPos: integer,
    /** Y-coordinate of GridEngine the NPC should be spawned at. */
    yPos: integer,
    /**
     * The name assigned to the image that should be used to represent the NPC.
     * For NPCs spritesheets can be used as well.
     */
    texture: string,
    /** A simple scaling factor to resize the image. Default: 1 */
    scale: number = 1,
    playerId: string
  ) {
    super(scene, 'object', xPos, yPos, texture, scale, undefined)
    this.playerId = playerId
  }
}

/**
 * Class for all NPCs
 */
export class Npcs extends NpcsAndObjects {
  constructor (
    /** The scene the NPC should be added to. */
    scene: GameScene,
    /** X-coordinate of GridEngine the NPC should be spawned at. */
    xPos: integer,
    /** Y-coordinate of GridEngine the NPC should be spawned at. */
    yPos: integer,
    /**
     * The name assigned to the image that should be used to represent the NPC.
     * For NPCs spritesheets can be used as well.
     */
    texture: string,
    /** A simple scaling factor to resize the image. Default: 1 */
    scale: number = 1,
    /** The action that should be performed when the player interacts with the NPC. */
    action?: Function,
    /**
     * Used to assign each frame of the spritesheet to a different animation step.
     * More information here: https://annoraaq.github.io/grid-engine/api/config.html#characterdata
     */
    walkingAnimationMapping?: number | WalkingAnimationMapping
  ) {
    super(scene, 'npc', xPos, yPos, texture, scale, action, walkingAnimationMapping)
  }

  /** This function is used for adding a character to the GridEngine plugin. */
  addCharacter (
    npcSprite: Phaser.Physics.Arcade.Sprite,
    xPos: integer,
    yPos: integer,
    walkingAnimationMapping: number | WalkingAnimationMapping = 1
  ): void {
    this.scene.gridEngine.addCharacter(
      {
        id: (this.name),
        sprite: npcSprite,
        startPosition: { x: xPos, y: yPos },
        walkingAnimationMapping: walkingAnimationMapping,
        facingDirection: 'down'
      }
    )
  }
}