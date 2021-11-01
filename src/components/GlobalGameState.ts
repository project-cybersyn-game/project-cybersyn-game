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
      hasTalkedToFlores: false,
      isTelexFound: false,
      inDialogue: false,
      isBataneroBusy: false
    }

    // define all listeners
    for (const [index] of Object.entries(this._gameProgress)) {
      console.log(index)
      this.on(index, (args: boolean) => {
        this._gameProgress[index] = args
      })
    }
  }
}

export default new GlobalGameState()
