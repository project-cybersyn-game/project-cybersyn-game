/* eslint-disable no-new */
import { Scene } from 'phaser'
import { DialogueWindow } from '../helpers/DialogueWindow'
import globalGameState from '../components/GlobalGameState'

export default class HelloWorldScene extends Scene {
  dialogueWindow?: DialogueWindow
  startDialogueId: string

  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  enterKey!: Phaser.Input.Keyboard.Key
  numberKeys?: Phaser.Input.Keyboard.Key
  dialogueData: {
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
    this.startDialogueId = ''
    this.dialogueData = {}

    this.isChoicesActive = false
    this.counter = 0
  }

  init (data: {startDialogueId: string }): void {
  }

  preload (): void {
    this.load.json('dialogues', 'dialogues.json')
  }

  create (): void {
    this._start()
    this._displayDialogueUnit(this.startDialogueId)
  }

  _start (): void {
    globalGameState.emit('inDialogue', true)

    this.dialogueData = this.cache.json.get('dialogues')
    this.dialogueWindow = new DialogueWindow(this, {})
    this.cursors = this.input.keyboard.createCursorKeys()
    this.enterKey = this.input.keyboard.addKey('ENTER')
    this.startDialogueId = this.sys.getData().startDialogueId
  }

  _displayDialogueUnit (dialogueId: string): void {
    const dialogue = this.dialogueData[dialogueId]
    this.dialogueWindow?.setText(dialogue.text, dialogue.character, false)

    // this.numberKeys = this.input.keyboard.addKey(49)

    // Pressing Enter
    this.enterKey.on('down', () => {
      console.log(this.counter++)

      globalGameState.removeListener('selectedChoiceDown')
      globalGameState.removeListener('selectedChoiceUp')
      this.cursors.up.removeListener('down')
      this.cursors.down.removeListener('down')

      // If choices are being displayed, the dialogue needs to switch to the "next" id
      if (this.isChoicesActive) {
        this.isChoicesActive = false
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        console.log('The player selected choice number ' + this.selectedChoice + '.')
        this.enterKey.removeAllListeners()
        this._displayDialogueUnit(dialogue.choices[this.selectedChoice].next)

      // If it's an NPC talking, either choices need to be displayed after or the dialogue ends
      } else {
        if (dialogue.choices !== undefined && dialogue.choices.length > 0) {
          this.isChoicesActive = true
          this.selectedChoice = 0
          this.dialogueWindow?.setChoices(dialogue.choices, 'You')

          this.cursors.down.on('down', () => {
            if (this.selectedChoice < dialogue.choices.length - 1) {
              this.selectedChoice++
              globalGameState.emit('selectedChoiceDown')
            }
          })
          this.cursors.up.on('down', () => {
            if (this.selectedChoice > 0) {
              this.selectedChoice--
              globalGameState.emit('selectedChoiceUp')
            }
          })
        } else {
          globalGameState.emit('inDialogue', false)
          this.scene.stop()
        }
      }
    })
  }

  // _displayChoices (): void {
  //   if (this.dialogueWindow == null) return
  // }

  update (): void {

  }
}
