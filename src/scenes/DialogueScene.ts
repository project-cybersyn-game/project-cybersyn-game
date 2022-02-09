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
      conditionAlternative: string
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

    globalGameState.on('reloadGameScene', () => {
      globalGameState.emit('inDialogue', false)
      this.scene.stop()
    })

    this.dialogueData = this.cache.json.get('dialogues')
    this.dialogueWindow = new DialogueWindow(this, {})
    this.cursors = this.input.keyboard.createCursorKeys()
    this.enterKey = this.input.keyboard.addKey('ENTER')
    this.startDialogueId = this.sys.getData().startDialogueId
  }

  _displayDialogueUnit (dialogueId: string): void {
    const dialogue = { ...this.dialogueData[dialogueId] }
    const choices: Array<{
      text: string
      next: string
      condition: string
    }> = (dialogue.choices !== undefined && dialogue.choices.length > 0) ? [...dialogue.choices] : []

    // check for conditions
    if (dialogue.condition != null && globalGameState._gameProgress[dialogue.condition]) {
      this._displayDialogueUnit(dialogue.conditionAlternative)
      return
    }

    this.dialogueWindow?.setText(dialogue.text, dialogue.character, true)

    // if an effect exists on the dialogue, the variable is set to true
    if (dialogue.effect != null) {
      globalGameState.emit(dialogue.effect, true)
    }

    // Pressing Enter
    this.enterKey.on('down', () => {
      globalGameState.removeListener('selectedChoiceDown')
      globalGameState.removeListener('selectedChoiceUp')
      this.cursors.up.removeListener('down')
      this.cursors.down.removeListener('down')

      // If choices are being displayed, the dialogue needs to switch to the "next" id
      if (this.isChoicesActive) {
        this.isChoicesActive = false
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        this.enterKey.removeAllListeners()

        this._displayDialogueUnit(choices[this.selectedChoice].next)

      // If it's an NPC talking, either choices need to be displayed after or the dialogue ends
      } else {
        // check for conditions
        if (choices !== undefined && choices.length > 0) {
          choices.forEach((choice, index) => {
            if (choice.condition != null && !globalGameState._gameProgress[choice.condition]) {
              choices.splice(index, 1)
            }
          })
        }

        if (choices !== undefined && choices.length > 0) {
          this.isChoicesActive = true
          this.selectedChoice = 0
          this.dialogueWindow?.setChoices(choices, 'You')

          this.cursors.down.on('down', () => {
            if (this.selectedChoice < choices.length - 1) {
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
