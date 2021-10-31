import { DialogWindow } from '../helpers/DialogWindow'

export class Dialog {
  scene!: Phaser.Scene
  currentDialogWindow?: DialogWindow

  constructor (scene: Phaser.Scene, startDialogID: string) {
    this.scene = scene
    this._start(startDialogID)
  }

  _start (startDialogID: string): void {
    const dialogData = this.scene.game.cache.json.get('dialogs')
    const dialog = dialogData[startDialogID]
    this.currentDialogWindow = new DialogWindow(this.scene, {})
    this.currentDialogWindow.setText(dialog.text, true)
  }
}
