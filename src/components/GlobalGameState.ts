class GlobalGameState {
  _gameProgress: {
    [index: string]: boolean
  }

  constructor () {
    this._gameProgress = {
      isTelexFound: false
    }
  }

  getGameProgress (name: string): boolean {
    return this._gameProgress[name]
  }

  setGameProgress (name: string, value: boolean): void {
    this._gameProgress[name] = value
  }
}

export default new GlobalGameState()
