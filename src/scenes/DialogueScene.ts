/* eslint-disable no-new */
import { Scene } from 'phaser'
import { DialogWindow } from '../helpers/DialogWindow'

export default class HelloWorldScene extends Scene {
  dialogWindow?: DialogWindow
  startDialogId: string

  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  enterKey!: Phaser.Input.Keyboard.Key
  numberKeys?: Phaser.Input.Keyboard.Key
  dialogData: {
    [index: string]: {
      character: string
      text: string
      choices: Array<{
        text: string
        next: string
        condition: string
      }>
      effect: string
      condition: string
    }
  }

  isChoicesActive: boolean
  activeChoice: integer
  counter: integer

  constructor () {
    super('ui-dialogue')
    this.startDialogId = ''
    this.dialogData = {}

    this.isChoicesActive = false
    this.activeChoice = 0
    this.counter = 0
  }

  init (data: {startDialogId: string}): void {
  }

  preload (): void {
    this.load.json('dialogues', 'dialogs.json')
  }

  create (): void {
    if (this.startDialogId === '') this.scene.stop()

    this._start()
    this._displayDialogueUnit(this.startDialogId)
  }

  _start (): void {
    this.dialogData = this.cache.json.get('dialogues')
    this.dialogWindow = new DialogWindow(this, {})
    this.cursors = this.input.keyboard.createCursorKeys()
    this.enterKey = this.input.keyboard.addKey('ENTER')
    this.startDialogId = this.sys.getData().startDialogId
  }

  _displayDialogueUnit (dialogId: string): void {
    const dialog = this.dialogData[dialogId]
    this.dialogWindow?.setText(dialog.text, dialog.character)

    // this.numberKeys = this.input.keyboard.addKey(49)

    // Pressing Enter
    this.enterKey.on('down', () => {
      console.log(this.counter++)
      // If choices are being displayed, the dialogue needs to switch to the "next" id
      if (this.isChoicesActive) {
        this.isChoicesActive = false
        this.enterKey.removeAllListeners()
        this._displayDialogueUnit(dialog.choices[this.activeChoice].next)

      // If it's an NPC talking, either choices need to be displayed after or the dialogue ends
      } else {
        if (dialog.choices !== undefined && dialog.choices.length > 0) {
          this.isChoicesActive = true
          this.dialogWindow?.setChoices(dialog.choices)
        } else {
          this.scene.stop()
        }
      }
    })
  }

  // _displayChoices (): void {
  //   if (this.dialogWindow == null) return
  // }

  update (): void {

  }
}
