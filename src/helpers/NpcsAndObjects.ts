import GameScene from '../components/GameScene'
import { WalkingAnimationMapping, Direction } from 'grid-engine'
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
  static npcsAndObjectsArray: NpcsAndObjects[] = []
  texture!: string
  name: string
  type: 'object' | 'npc'
  scene: GameScene
  startX: integer = 0
  startY: integer = 0
  speed: integer = 4
  eKey!: Phaser.GameObjects.Image
  container!: Phaser.GameObjects.Container
  interactionCounter: integer = 0
  /** default action if no action-parameter is assigned when creating the object */
  protected action: Function = (): void => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    console.warn(this.name + ' has no action assigned.')
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
    NpcsAndObjects.npcsAndObjectsArray.push(this)
    this.type = type
    this.scene = scene

    this.startX = xPos
    this.startY = yPos
    this.texture = texture

    // higher speed for problems with pushing boxes
    if (this.type === 'object') {
      this.speed = 2.6
    }

    // adding object to the scene
    const npcSprite = createCharacterSprite(scene, 0, 0, texture, scale)
    this.eKey = scene.add.image(0, 10, 'eKey')
    this.eKey.depth = 9999
    this.eKey.setVisible(false)
    this.container = scene.add.container(0, 0, [npcSprite, this.eKey])
    this.addCharacter(npcSprite, xPos, yPos, this.container, walkingAnimationMapping)

    // adding action to execute when player interacts with the object
    if (action !== undefined) {
      this.action = action
    }

    scene.npcsAndObjectsArray.push(this)
  }

  /** This function is used for interacting with NPCs and objects and then executing the action set in the associated NPC object. */
  static interaction (
    scene: GameScene
  ): void {
    const movementStartListener = scene.gridEngine.movementStarted()
    const movementStopListener = scene.gridEngine.movementStopped()
    const directionListener = scene.gridEngine.directionChanged()

    movementStopListener.subscribe((observer) => {
      scene.gridEngine.setSpeed(scene.playerName, 4)
      this.interactionChange(scene)
    })

    // Called everytime the character wants to move but doesn't.
    // Doesn't even need to rotate / change the direction.
    directionListener.subscribe((observer) => {
      if (observer.charId === scene.playerName) {
        this.interactionChange(scene)
        // object movement
        if (
          !globalGameState._gameProgress.inDialogue &&
          (
            (scene.cursors.up.isDown && observer.direction === Direction.UP) ||
            (scene.cursors.left.isDown && observer.direction === Direction.LEFT) ||
            (scene.cursors.down.isDown && observer.direction === Direction.DOWN) ||
            (scene.cursors.right.isDown && observer.direction === Direction.RIGHT)
          )
        ) {
          scene.npcsAndObjectsArray.forEach(object => {
            if (
              scene.gridEngine.getFacingPosition(scene.playerName).x === scene.gridEngine.getPosition(object.name.toString()).x &&
              scene.gridEngine.getFacingPosition(scene.playerName).y === scene.gridEngine.getPosition(object.name.toString()).y &&
              !object.name.toUpperCase().startsWith('NPC')
            ) {
              scene.gridEngine.setSpeed(scene.playerName, 2.5)
              object.action(scene, object.name)
            }
          })
        }
      }
    })

    movementStartListener.subscribe((observer) => {
      scene.npcsAndObjectsArray.forEach(object => {
        object.eKey.setVisible(false)
      })
      scene.interactionKey.removeAllListeners('down')
      scene.cursors.up.off('down')
      scene.cursors.left.off('down')
      scene.cursors.down.off('down')
      scene.cursors.right.off('down')
    })

    globalGameState.on('inDialogue', (value: boolean) => {
      this.interactionChange(scene)
    })
  }

  private static interactionChange (
    scene: GameScene
  ): void {
    scene.interactionKey.removeAllListeners('down')
    if (!globalGameState._gameProgress.inDialogue) {
      scene.npcsAndObjectsArray.forEach(object => {
        if (
          scene.gridEngine.getFacingPosition(scene.playerName).x === scene.gridEngine.getPosition(object.name.toString()).x &&
          scene.gridEngine.getFacingPosition(scene.playerName).y === scene.gridEngine.getPosition(object.name.toString()).y &&
          object.name.toUpperCase().startsWith('NPC')
        ) {
          object.eKey.setVisible(true)
          scene.interactionKey.once('down', () => {
            object.eKey.setVisible(false)
            object.action(scene, object.name)
          })
        }
      })
    }
  }

  /** This function is used for adding a character to the GridEngine plugin. */
  addCharacter (
    npcSprite: Phaser.Physics.Arcade.Sprite,
    xPos: integer,
    yPos: integer,
    container: Phaser.GameObjects.Container,
    walkingAnimationMapping?: number | WalkingAnimationMapping
  ): void {
    this.scene.gridEngine.addCharacter(
      {
        id: (this.name),
        sprite: npcSprite,
        container,
        startPosition: { x: xPos, y: yPos },
        facingDirection: Direction.DOWN,
        speed: this.speed
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
    if (!this.scene.gridEngine.isMoving(this.name)) {
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
    container: Phaser.GameObjects.Container,
    walkingAnimationMapping: number | WalkingAnimationMapping = 1
  ): void {
    this.scene.gridEngine.addCharacter(
      {
        id: (this.name),
        sprite: npcSprite,
        container,
        startPosition: { x: xPos, y: yPos },
        walkingAnimationMapping: walkingAnimationMapping,
        facingDirection: Direction.DOWN
      }
    )
  }
}
