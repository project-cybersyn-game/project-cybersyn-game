import Phaser from 'phaser'

class GlobalGameState extends Phaser.Events.EventEmitter {
  _gameProgress: {
    [index: string]: boolean
  }

  test: integer = 0

  constructor () {
    super()

    // define all gameState objects
    this._gameProgress = {
      isTelexFound: false,
      inDialogue: false,
      isBataneroBusy: false
    }

    // define all listeners
    for (const [index] of Object.entries(this._gameProgress)) {
      this.on(index, (args: boolean) => {
        this._gameProgress[index] = args
      })
      this.test++
    }
    console.log(this.test)
  }
}

export default new GlobalGameState()
