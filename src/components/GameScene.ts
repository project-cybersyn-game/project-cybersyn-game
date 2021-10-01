import Phaser from 'phaser'
import { basicMovement, createAnims } from '~/helpers/Characters'

enum ImageNames {
  Dude = 'dude',
}

export default class GameScene extends Phaser.Scene {
  // Klassenvariablen festlegen
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  movementState = { type: 'idle', direction: 'down' }
  gridEngine: any
  playerSprite!: Phaser.GameObjects.Sprite

  preload (): void {
    this.load.spritesheet(
      ImageNames.Dude,
      'character_sprites/char.png',
      {
        frameWidth: 25,
        frameHeight: 25
      }
    )
  }

  create (): void {
    createAnims(this, ImageNames.Dude)
  }

  update (): void {
    basicMovement(this, 'player', this.gridEngine, this.playerSprite)
  }
}
