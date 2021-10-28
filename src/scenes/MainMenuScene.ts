import Phaser from 'phaser'

export default class MainMenuScene extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  selectKey!: Phaser.Input.Keyboard.Key
  backKey!: Phaser.Input.Keyboard.Key
  numberOfOptions: integer = 7
  distanceOfOptions!: integer

  preload (): void {
    this.distanceOfOptions = (this.sys.game.canvas.height * 9 / 10) / this.numberOfOptions

    // load font for symbols
    this.load.webfont({
      font: 'Nova Mono',
      variants: ['normal']
    }, 'https://fonts.googleapis.com/css2?family=Nova+Mono&display=swap')
  }

  create (): void {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.selectKey = this.input.keyboard.addKey('ENTER')
    this.backKey = this.input.keyboard.addKey('ESC')

    const emptySymbols = ['\u25CB', '\u25A1', '\u25BD', '\u25B3', '\u2B20']
    const fullSymbols = ['\u25CF', '\u25A0', '\u25BC', '\u25B2', '\u2B1F']

    const text: Phaser.GameObjects.Text[][] = []

    for (let y: integer = 0; y < this.numberOfOptions; y++) {
      text.push([])
      const binaryI = (y + 1).toString(2).split('').reverse().join('')
      let symbol: string

      for (let x: integer = 0; x < 2; x++) {
        if (binaryI[4 - x] === '1') {
          symbol = fullSymbols[x]
        } else {
          symbol = emptySymbols[x]
        }

        text[y][x] = this.add.text(40 * x + 40, this.distanceOfOptions * y + 20, symbol, {
          fontFamily: 'Nova Mono',
          fontSize: '70px',
          color: '#00ff00'
        })
      }
      for (let x: integer = 2; x < 5; x++) {
        if (binaryI[4 - x] === '1') {
          symbol = fullSymbols[x]
        } else {
          symbol = emptySymbols[x]
        }

        text[y][x] = this.add.text(40 * x + 40, this.distanceOfOptions * y + 40, symbol, {
          fontFamily: 'Nova Mono',
          fontSize: '50px',
          color: '#00ff00'
        })
      }
    }

    const options = ['Start game', 'Options']
    for (let y: integer = 0; y < this.numberOfOptions; y++) {
      text[y][5] = this.add.text(300, this.distanceOfOptions * y + 40, options[y], {
        fontFamily: 'Nova Mono',
        fontSize: '50px',
        color: '#00ff00'
      })
    }
  }

  update (): void {

  }
}
