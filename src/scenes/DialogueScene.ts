/* eslint-disable no-new */
import { Scene } from 'phaser'
import { DialogWindow } from '../helpers/DialogWindow'

export default class HelloWorldScene extends Scene {
  currentDialogWindow?: DialogWindow
  startDialogId?: string

  constructor () {
    super('ui-dialogue')
  }

  init (data: {startDialogId: string}): void {
    this.startDialogId = data.startDialogId
  }

  preload (): void {
    this.load.json('dialogues', 'dialogs.json')
  }

  create (): void {
    this._start(this.startDialogId)
  }

  _start (startDialogId: string | undefined): void {
    if (startDialogId == null) startDialogId = '1'
    const dialogData = this.cache.json.get('dialogues')
    const dialog = dialogData[startDialogId]

    this.currentDialogWindow = new DialogWindow(this, {})
    this.currentDialogWindow.setText(dialog.text, true)

    const enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    enterKey.on('down', () => {
      this.scene.stop()
    })
  }

  update (): void {

  }
}
