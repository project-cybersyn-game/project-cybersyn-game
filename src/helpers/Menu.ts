import Phaser from 'phaser'

/** This object represents the dimensions and position of a textbox. */
class Bounds {
  leftX: integer = 0
  rightX: integer = 0
  upperY: integer = 0
  lowerY: integer = 0
}

class Option {
  text: string = ''
  /** This defines the scene to switch to. */
  scene: Phaser.Scene | string = 'main-menu'
}

/** This class can be used to create menu interfaces in a specific area of the game canvas. */
export class Menu {
  // parameters
  scene!: Phaser.Scene
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  selectKey!: Phaser.Input.Keyboard.Key
  backKey!: Phaser.Input.Keyboard.Key
  bounds!: Bounds
  options: Option[] = []

  // constants
  protected emptySymbols: string[] = ['\u25CB', '\u25A1', '\u25BD', '\u25B3', '\u2B20']
  protected fullSymbols: string[] = ['\u25CF', '\u25A0', '\u25BC', '\u25B2', '\u2B1F']

  // calculated / changing variables
  protected fontSize: integer = 50
  protected xSymbolDistance: integer = 40
  protected yLineDistance: integer = 40
  text: Phaser.GameObjects.Text[][] = []
  selectedOption: integer = 0
  pressed: integer = 0
  cursorLine!: Phaser.GameObjects.Line
  cursorLineCounter: integer = 0

  constructor (
    scene: Phaser.Scene,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys,
    selectKey: Phaser.Input.Keyboard.Key,
    backKey: Phaser.Input.Keyboard.Key,
    bounds: Bounds,
    menuOptions: Option[]
  ) {
    this.scene = scene
    this.cursors = cursors
    this.selectKey = selectKey
    this.backKey = backKey
    this.bounds = bounds
    this.options = menuOptions

    // defining fontSize depending on the longest option name
    let maxOptionLength = 0
    this.options.forEach(element => {
      if (element.text.length > maxOptionLength) {
        maxOptionLength = element.text.length
      }
    })
    this.fontSize = Math.min(
      (this.bounds.rightX - this.bounds.leftX) / (6 + maxOptionLength / 2 + 1),
      (this.bounds.lowerY - this.bounds.upperY) / this.options.length
    )

    // defining xSymbolDistance depending on fontSize
    this.xSymbolDistance = this.fontSize * 3 / 4

    // defining yLineDistance depending on fonSize and/or y-bounds
    this.yLineDistance = Math.max(
      this.fontSize * 3 / 4,
      (this.bounds.lowerY - this.bounds.upperY) / this.options.length
    )

    // writing symbols
    for (let y: integer = 0; y < this.options.length; y++) {
      this.text.push([])
      const binaryI = (y + 1).toString(2).split('').reverse().join('')
      let symbol: string
      let color: string = '#fff'

      for (let x: integer = 0; x < 2; x++) {
        if (binaryI[4 - x] === '1') {
          symbol = this.fullSymbols[x]
          color = '#e89356'
        } else {
          symbol = this.emptySymbols[x]
          color = '#fff'
        }

        this.text[y][x] = this.scene.add.text(this.xSymbolDistance * x + this.bounds.leftX, this.yLineDistance * y + this.bounds.upperY - (this.fontSize * 2 / 5), symbol, {
          fontFamily: 'Nova Mono',
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          fontSize: (this.fontSize * 7 / 5) + 'px',
          color: color
        })
      }
      for (let x: integer = 2; x < 5; x++) {
        if (binaryI[4 - x] === '1') {
          symbol = this.fullSymbols[x]
          color = '#e89356'
        } else {
          symbol = this.emptySymbols[x]
          color = '#fff'
        }

        this.text[y][x] = this.scene.add.text(this.xSymbolDistance * x + this.bounds.leftX, this.yLineDistance * y + this.bounds.upperY, symbol, {
          fontFamily: 'Nova Mono',
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          fontSize: this.fontSize + 'px',
          color: color
        })
      }
    }

    // writing options
    for (let y: integer = 0; y < this.options.length; y++) {
      this.text[y][5] = this.scene.add.text(this.bounds.leftX + 6 * this.xSymbolDistance, this.yLineDistance * y + this.bounds.upperY, this.options[y].text, {
        fontFamily: 'Nova Mono',
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        fontSize: this.fontSize + 'px',
        color: '#fff'
      })
    }

    // writing numbers
    for (let y: integer = 0; y < this.options.length; y++) {
      this.text[y][5] = this.scene.add.text(this.bounds.rightX - this.xSymbolDistance, this.yLineDistance * y + this.bounds.upperY, (y + 1).toString(), {
        fontFamily: 'Nova Mono',
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        fontSize: this.fontSize + 'px',
        color: '#fff'
      })
      if (y + 1 < this.options.length) {
        this.scene.add.line(
          (this.bounds.rightX + this.bounds.leftX) / 2,
          (y + 1 / 2) * this.yLineDistance + this.bounds.upperY,
          0,
          0,
          this.bounds.rightX - this.bounds.leftX,
          0,
          0xffffff
        )
      }
    }

    // create cursor to symbolise the selected option
    this.cursorLine = this.scene.add.line(
      this.bounds.rightX - this.xSymbolDistance * 2 / 3,
      this.selectedOption * this.yLineDistance + this.bounds.upperY + (this.fontSize * 1.3),
      0,
      0,
      this.xSymbolDistance * 1.2,
      0,
      0xffffff
    )
  }

  /** This method is used for choosing one of the menu options and indicating which one is selected at the moment. */
  control (): void {
    // change / choose selected option
    if (this.cursors.up.isDown && this.pressed === 0 && this.selectedOption > 0) {
      this.pressed = 20

      this.cursorLine.setVisible(true)

      this.selectedOption--
    } else if (this.cursors.down.isDown && this.pressed === 0 && this.selectedOption < (this.options.length - 1)) {
      this.pressed = 20

      this.cursorLine.setVisible(true)

      this.selectedOption++
    } else if (this.selectKey.isDown && this.pressed === 0) {
      this.pressed = 20

      this.cursorLine.setVisible(true)

      this.scene.scene.switch(this.options[this.selectedOption].scene)
    } else if (this.pressed > 0) {
      this.pressed--
    }

    // set cursor line if selected option changed
    this.cursorLine.setY(this.selectedOption * this.yLineDistance + this.bounds.upperY + (this.fontSize * 1.3))

    // blinking of cursor line
    if (this.cursorLineCounter === 0) {
      this.cursorLineCounter = 60
      this.cursorLine.setVisible(!this.cursorLine.visible)
    } else {
      this.cursorLineCounter--
    }
  }

  static preload (
    scene: Phaser.Scene
  ): void {
    // preload font
    scene.load.webfont({
      font: 'Nova Mono',
      variants: ['normal']
    }, 'https://fonts.googleapis.com/css2?family=Nova+Mono&display=swap')
  }
}
