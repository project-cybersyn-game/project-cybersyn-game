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

  constructor (
    name: string
  ) {
    super(name)

    this.sceneName = name
    this.playerName = `${name}_player`
  }

  preload (): void {
  }

  create (): void {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.interactionKey = this.input.keyboard.addKey('E')
    this.backKey = this.input.keyboard.addKey('ESC')

    this.fadingRectangle = this.add.rectangle(this.cameras.main.x, this.cameras.main.y, this.cameras.main.displayHeight, this.cameras.main.displayWidth, 0x000000, 255)
    this.fadingRectangle.setZ(1000)

    this.fadingTween = this.tweens.create({
      targets: this.fadingRectangle,
      alpha: 255,
      duration: 10000,
      ease: 'Linear',
      yoyo: true,
      hold: 10000,
      onStart: console.log('tweenStart'),
      onActive: console.log('tweenActive'),
      onYoyo: console.log('tweenYoyo'),
      onStop: console.log('tweenStop')
    })
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
    keepCharacterPosition: boolean = true,
    /** If set to true or greater than 0, a black screen transition will take place. A number represents the duration in milliseconds.
     * Default duration: 1000 ms
    */
    transitionScreen: boolean | integer = true,
    /** If set to true or greater than 0, the current dialogue will be ended. A number represents the delay in milliseconds.
     * Default delay: 1000 ms
     */
    stopDialogue: boolean | integer = true
  ): void {
    const oldPosition: Position = this.gridEngine.getPosition(this.playerName)
    const oldDirection: Direction = this.gridEngine.getFacingDirection(this.playerName)

    console.log(`transitionScreen: ${transitionScreen}`)
    console.log(`(transitionScreen === true || transitionScreen >= 0) ${(transitionScreen === true || transitionScreen >= 0)}`)
    console.log(`(typeof transitionScreen === 'boolean' ? 1000 : transitionScreen) ${(typeof transitionScreen === 'boolean' ? 1000 : transitionScreen)}`)
    console.log(`stopDialogue: ${stopDialogue}`)
    console.log(`(stopDialogue === true || stopDialogue >= 0) ${(stopDialogue === true || stopDialogue >= 0)}`)
    console.log(`(typeof stopDialogue === 'boolean' ? 0 : stopDialogue) ${(typeof stopDialogue === 'boolean' ? 0 : stopDialogue)}`)

    if (transitionScreen === true || transitionScreen >= 0) {
      this.fadingTween.play()
    }

    if (stopDialogue === true || stopDialogue >= 0) {
      console.log('stop dialogue')
      setTimeout(() => {
        console.log('stopped dialogue')
        globalGameState.emit('reloadGameScene')
      }, (typeof stopDialogue === 'boolean' ? 0 : stopDialogue))
      /* this.time.delayedCall((typeof stopDialogue === 'boolean' ? 0 : stopDialogue), () => {
        console.log('stopped dialogue')
        globalGameState.emit('reloadGameScene')
      }) */
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
}
