import Phaser, { Tilemaps } from 'phaser'
import { Door } from '../helpers/Doors'
import { createMap } from '../helpers/Tilemaps'
import { NpcsAndObjects, createCharacterSprite } from '../helpers/NpcsAndObjects'
import globalGameState from '../components/GlobalGameState'
// @ts-expect-error
import { GridEngine, Position, Direction, CollisionStrategy } from 'grid-engine'

export default class GameScene extends Phaser.Scene {
  // Klassenvariablen festlegen
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  interactionKey!: Phaser.Input.Keyboard.Key
  backKey!: Phaser.Input.Keyboard.Key
  gridEngine!: GridEngine
  playerSprite!: Phaser.Physics.Arcade.Sprite
  playerName!: string
  sceneName!: string
  doors: Door[] = []
  npcsAndObjectsArray: NpcsAndObjects[] = []
  inDialogue: boolean = false
  // TODO: typing
  fadingRectangle!: any
  fadingTween!: Phaser.Tweens.Tween
  imageNames!: {
    [index: string]: string
  }

  imageMapDefaultPath: string
  tilemapJSONPath!: string
  layerNames: string[]
  imageMapNames!: {
    [index: string]: {
      name: string
      path?: string
    }
  }

  gridEngineSettings: {
    startPosition: {
      x: number
      y: number
    }
    scale: number
    characterCollisionStrategy: CollisionStrategy
    layerOverlay: boolean
  }

  constructor (
    name: string
  ) {
    super(name)

    this.sceneName = name
    this.playerName = `${name}_player`
    this.imageMapDefaultPath = 'tilesets/'
    this.layerNames = ['1_Ground', '2_Ground_Overlay', '3_Objects', '4_Objects_Overlay_Edge', '5_Objects_Overlay', '6_Objects_Overlay_Overlay']

    this.gridEngineSettings = {
      startPosition: {
        x: 1,
        y: 1
      },
      scale: 1,
      characterCollisionStrategy: 'BLOCK_TWO_TILES',
      layerOverlay: false
    }
  }

  preload (): void {
    this.load.image('eKey', 'images/keys/eKey.png')
  }

  create (): void {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.interactionKey = this.input.keyboard.addKey('E')
    this.backKey = this.input.keyboard.addKey('ESC')
  }

  update (): void {
    // switch to main menu when pressing ESC key
    // --- TODO: DEFINITELY CHANGE LATER ---
    if (this.backKey.isDown && !globalGameState._gameProgress.inDialogue) {
      this.scene.switch('main-menu')
    }
    NpcsAndObjects.interaction(this, this.playerName)
  }

  /** Not a standard method of Phaser.Scene.
   * Resets the scene completely.
   * Needed because of own implementations like the npcsAndObjectsArray.
   */
  reset (
    /** If set to true, the position and orientation of the player character will be kept. */
    keepCharacterPosition: boolean = true,
    /** If set to true or greater than 0, a black screen transition will take place. A number represents the duration in milliseconds.
     * Default duration: 1000 ms
    */
    transitionScreen: boolean | integer = true
  ): void {
    const oldPosition: Position = this.gridEngine.getPosition(this.playerName)
    const oldDirection: Direction = this.gridEngine.getFacingDirection(this.playerName)

    if (transitionScreen === true || transitionScreen >= 0) {
      // TO-DO
    }

    this.npcsAndObjectsArray = []
    this.doors = []
    this.gridEngine.removeAllCharacters()
    this.scene.restart()
    /* updates scene manager to restart immediately
       (always restarts with next scene manager update)
      */
    this.scene.manager.update(0, 0)
    if (keepCharacterPosition) {
      this.gridEngine.setPosition(this.playerName, oldPosition)
      this.gridEngine.turnTowards(this.playerName, oldDirection)
    }
  }

  loadAvatarSpritesheet (): void {
    this.load.spritesheet(
      this.imageNames.Dude,
      'character_sprites/char.png',
      {
        frameWidth: 25,
        frameHeight: 25
      }
    )
  }

  loadMapImages (): void {
    // Tilemap-Bilder laden
    Object.keys(this.imageMapNames).forEach(key => {
      // Use image-specific path, if defined; otherwise use default path
      const path = (this.imageMapNames[key].path != null) ? this.imageMapNames[key].path : this.imageMapDefaultPath

      this.load.image(
        this.imageMapNames[key].name,
        `${path ?? ''}${this.imageMapNames[key].name}.png`)
    })

    // Tilemap-JSON laden
    this.load.tilemapTiledJSON(this.imageNames.Map, this.tilemapJSONPath)
  }

  createMap (): Tilemaps.Tilemap {
    const tilesetInfo = Object.keys(this.imageMapNames).map(key => {
      return {
        tilesetName: this.imageMapNames[key].name,
        image: (this.imageMapNames[key].name)
      }
    })

    // Tilemap erstellen
    const map = createMap(
      this,
      this.imageNames.Map,
      tilesetInfo,
      this.layerNames
    ).tilemap

    return map
  }

  initiateGridEngine (map: Tilemaps.Tilemap): void {
    // GridEngine
    this.playerSprite = createCharacterSprite(this, 0, 0, this.imageNames.Dude, this.gridEngineSettings.scale)
    const gridEngineConfig = {
      characters: [
        {
          id: this.playerName,
          sprite: this.playerSprite,
          startPosition: this.gridEngineSettings.startPosition
        }
      ],
      layerOverlay: this.gridEngineSettings.layerOverlay,
      characterCollisionStrategy: this.gridEngineSettings.characterCollisionStrategy
    }
    this.gridEngine.create(map, gridEngineConfig)
  }

  createCamera (boundLimitX: number, boundLimitY: number): void {
    // add camera that follows the character
    this.cameras.main.setBounds(0, 0, boundLimitX, boundLimitY)
    this.cameras.main.startFollow(this.playerSprite, true)
  }
}
