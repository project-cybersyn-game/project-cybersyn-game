/* eslint-disable no-new */
import { Scene } from 'phaser'
import { DialogWindow } from '../helpers/DialogWindow'
import eventsCenter from '../helpers/EventsCenter'

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
  selectedChoice: integer = 0
  counter: integer

  constructor () {
    super('ui-dialogue')
    this.startDialogId = ''
    this.dialogData = {}

    this.isChoicesActive = false
    this.counter = 0
  }

  init (data: {startDialogId: string }): void {
  }

  preload (): void {
    this.load.json('dialogues', 'dialogs.json')
  }

  create (): void {
    // --- REASON FOR THE DOUBLE INTERACTION PROBLEM ---
    // startDialogId isn't set here yet
    // still seems to work. really needed? @Jana
    // if (this.startDialogId === '') this.scene.stop()

    this._start()
    this._displayDialogueUnit(this.startDialogId)
  }

  _start (): void {
    eventsCenter.emit('inDialogue')

    this.dialogData = this.cache.json.get('dialogues')
    this.dialogWindow = new DialogWindow(this, {})
    this.cursors = this.input.keyboard.createCursorKeys()
    this.enterKey = this.input.keyboard.addKey('ENTER')
    this.startDialogId = this.sys.getData().startDialogId
  }

  _displayDialogueUnit (dialogId: string): void {
    const dialog = this.dialogData[dialogId]
    // FIXME: with animation
    this.dialogWindow?.setText(dialog.text, dialog.character, false)

    // this.numberKeys = this.input.keyboard.addKey(49)

    // Pressing Enter
    this.enterKey.on('down', () => {
      console.log(this.counter++)

      eventsCenter.removeListener('selectedChoiceDown')
      eventsCenter.removeListener('selectedChoiceUp')
      this.cursors.up.removeListener('down')
      this.cursors.down.removeListener('down')

      // If choices are being displayed, the dialogue needs to switch to the "next" id
      if (this.isChoicesActive) {
        this.isChoicesActive = false
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        console.log('The player selected choice number ' + this.selectedChoice + '.')
        this.enterKey.removeAllListeners()
        this._displayDialogueUnit(dialog.choices[this.selectedChoice].next)

      // If it's an NPC talking, either choices need to be displayed after or the dialogue ends
      } else {
        if (dialog.choices !== undefined && dialog.choices.length > 0) {
          this.isChoicesActive = true
          this.selectedChoice = 0
          this.dialogWindow?.setChoices(dialog.choices, 'You')

          this.cursors.down.on('down', () => {
            if (this.selectedChoice < dialog.choices.length - 1) {
              this.selectedChoice++
              eventsCenter.emit('selectedChoiceDown')
            }
          })
          this.cursors.up.on('down', () => {
            if (this.selectedChoice > 0) {
              this.selectedChoice--
              eventsCenter.emit('selectedChoiceUp')
            }
          })
        } else {
          eventsCenter.emit('outOfDialogue')
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
