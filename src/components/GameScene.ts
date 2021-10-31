import Phaser from 'phaser'
import { Door } from '../helpers/Doors'
import { NpcsAndObjects } from '../helpers/NpcsAndObjects'

export default class GameScene extends Phaser.Scene {
  // Klassenvariablen festlegen
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  interactionKey!: Phaser.Input.Keyboard.Key
  backKey!: Phaser.Input.Keyboard.Key
  gridEngine: any
  playerSprite!: Phaser.Physics.Arcade.Sprite
  doors: Door[] = []
  npcsAndObjectsArray: NpcsAndObjects[] = []
  imageNames!: {
    [index: string]: string
  }

  preload (): void {
  }

  create (): void {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.interactionKey = this.input.keyboard.addKey('E')
    this.backKey = this.input.keyboard.addKey('ESC')
  }

  update (): void {
    // switch to main menu when pressing ESC key
    // --- DEFINITELY CHANGE LATER ---
    if (this.backKey.isDown) {
      this.scene.switch('main-menu')
    }
  }
}
