import Phaser from 'phaser'
import { Door } from '../helpers/Doors'
import { NpcsAndObjects } from '../helpers/NpcsAndObjects'
import globalGameState from '../components/GlobalGameState'
import { GridEngine, Position, Direction } from 'grid-engine'

export default class GameScene extends Phaser.Scene {
  // Klassenvariablen festlegen
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  interactionKey!: Phaser.Input.Keyboard.Key
  backKey!: Phaser.Input.Keyboard.Key
  gridEngine!: GridEngine
  playerSprite!: Phaser.Physics.Arcade.Sprite
  playerName!: string
  doors: Door[] = []
  npcsAndObjectsArray: NpcsAndObjects[] = []
  inDialogue: boolean = false
  imageNames!: {
    [index: string]: string
  }

  constructor (
    name: string
  ) {
    super(name)

    this.playerName = `${name}_player`
  }

  preload (): void {
  }

  create (): void {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.interactionKey = this.input.keyboard.addKey('E')
    this.backKey = this.input.keyboard.addKey('ESC')
  }

  update (): void {
    // switch to main menu when pressing ESC key
    // --- DEFINITELY CHANGE LATER ---
    if (this.backKey.isDown && !globalGameState._gameProgress.inDialogue) {
      this.scene.switch('main-menu')
    }
  }

  /** Not a standard method of Phaser.Scene.
   * Resets the scene completely.
   * Needed because of own implementations like the npcsAndObjectsArray.
   */
  reset (
    /** If set to true, the position and orientation of the player character will be kept. */
    keepCharacterPosition: boolean = false,
    transitionScreen: boolean = true
  ): void {
    console.log(this.gridEngine.getAllCharacters())
    const oldPosition: Position = this.gridEngine.getPosition(this.playerName)
    const oldDirection: Direction = this.gridEngine.getFacingDirection(this.playerName)
    this.npcsAndObjectsArray = []
    this.doors = []
    this.gridEngine.removeAllCharacters()
    this.scene.restart()
    if (keepCharacterPosition) {
      setTimeout(() => {
        console.log(this.gridEngine.getAllCharacters())
        this.gridEngine.setPosition(this.playerName, oldPosition)
        this.gridEngine.turnTowards(this.playerName, oldDirection)
      }, 5000)
    }
  }
}
