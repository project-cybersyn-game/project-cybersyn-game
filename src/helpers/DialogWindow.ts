/** This class will be used to create a Dialog Window **/
export class DialogWindow {
  // parameters
  scene!: Phaser.Scene
  borderThickness!: number
  borderColor!: number
  borderAlpha!: number
  windowAlpha!: number
  windowColor!: number
  windowHeight!: number
  padding!: number
  dialogSpeed!: number
  eventCounter!: number
  visible!: boolean
  texts: Phaser.GameObjects.Text[]
  dialog: string[] = []
  graphics!: Phaser.GameObjects.Graphics
  timedEvent!: Phaser.Time.TimerEvent

  constructor (scene: Phaser.Scene, options: { borderThickness?: number, borderColor?: number, borderAlpha?: number, windowAlpha?: number, windowColor?: number, windowHeight?: number, padding?: number, dialogSpeed?: number }) {
    this.scene = scene
    this.borderThickness = options.borderThickness ?? 3
    this.borderColor = options.borderColor ?? 0x907748
    this.borderAlpha = options.borderAlpha ?? 1
    this.windowAlpha = options.windowAlpha ?? 0.8
    this.windowColor = options.windowColor ?? 0x303030
    this.windowHeight = options.windowHeight ?? 150
    this.padding = options.padding ?? 32
    this.dialogSpeed = options.dialogSpeed ?? 4

    this.eventCounter = 0
    this.visible = true
    this.texts = []

    this._create()
  }

  destroy (): void {
    if (this.timedEvent != null) this.timedEvent.remove()
    if (this.texts.length > 0) this.texts?.forEach(text => text.destroy())
  }

  // Hide/Show the Dialog Window
  toggle (): void {
    this.visible = !this.visible
    if (this.texts.length > 0) {
      this.texts.forEach(text => {
        text.visible = this.visible
      })
    }
    if (this.graphics != null) this.graphics.visible = this.visible
  }

  // Sets the text for the dialog window
  setText (text: string, characterName: string, animate: boolean = true): void {
    // Reset the dialog
    this.eventCounter = 0
    this.dialog = text.split('')
    if (this.timedEvent != null) this.timedEvent.remove()
    if (this.texts.length > 0) this.texts.forEach(text => text.destroy())
    this.texts = []

    const tempText = animate ? '' : text
    this._setText(tempText, 0, characterName)

    if (animate) {
      this.timedEvent = this.scene.time.addEvent({
        delay: 150 - (this.dialogSpeed * 30),
        callback: this._animateText,
        callbackScope: this,
        loop: true
      })
    }
  }

  setChoices (choices: Array<{text: string}>, characterName: string): void {
    // Reset the dialog
    this.eventCounter = 0
    if (this.timedEvent != null) this.timedEvent.remove()
    if (this.texts.length > 0) this.texts.forEach(text => text.destroy())
    this.texts = []

    choices.forEach((choice, index) => {
      this._setText(`${index + 1}. ${choice.text}`, index, index == 0 ? characterName : null)
    })
  }

  // Calcuate the position of the text in the dialog window
  _setText (text: string, lineOffset: integer = 0, characterName?: string | null): void {
    if (characterName != null) this._setText(`${characterName}:`)

    // Reset the dialog
    console.log(text)
    let x = this.padding + 10
    if (characterName != null) {
      console.log(1)
      const textWidth = this.texts[this.texts.length - 1].width
      x = this.texts[this.texts.length - 1].x + textWidth + this.padding + 100
    }
    console.log(2)
    console.log('----------')

    const y = +this.scene.game.config.height - this.windowHeight - this.padding + 10 + lineOffset * 22

    this.texts.push(this.scene.make.text({
      x,
      y,
      text,
      style: {
        wordWrap: { width: +this.scene.game.config.width - (this.padding * 2) - 25 }
      }
    }))
    this.texts[this.texts.length - 1].setDepth(10000)
    console.log(this.texts)
  }

  // Slowly displays the text in the window to make it appear animated
  _animateText (): void {
    const nextCharacter = this.dialog[this.eventCounter]
    if (nextCharacter == null) {
      this.timedEvent.remove()
      return
    }
    this.texts[0].setText(this.texts[0].text + nextCharacter)
    this.eventCounter++
  }

  _create (): void {
    const gameHeight = this.scene.game.config.height
    const gameWidth = this.scene.game.config.width
    const windowDimensions = this._calculateDimensions(+gameWidth, +gameHeight)
    this.graphics = this.scene.add.graphics()
    this.graphics.setDepth(9999)

    this._createOuterWindow(windowDimensions)
    this._createInnerWindow(windowDimensions)
  }

  _calculateDimensions (width: number, height: number): { x: number, y: number, width: number, height: number } {
    const x = this.padding
    const y = height - this.windowHeight - this.padding
    const rectWidth = width - (this.padding * 2)
    const rectHeight = this.windowHeight
    return { x, y, width: rectWidth, height: rectHeight }
  }

  // Creates the border rectangle of the dialog window
  _createOuterWindow (windowDimensions: { x: number, y: number, width: number, height: number }): void {
    this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha)
    this.graphics.strokeRect(windowDimensions.x, windowDimensions.y, windowDimensions.width, windowDimensions.height)
  }

  // Creates the inner dialog window (where the text is displayed)
  _createInnerWindow (windowDimensions: { x: number, y: number, width: number, height: number }): void {
    this.graphics.fillStyle(this.windowColor, this.windowAlpha)
    this.graphics.fillRect(windowDimensions.x + 1, windowDimensions.y + 1, windowDimensions.width - 1, windowDimensions.height - 1)
  }
}
