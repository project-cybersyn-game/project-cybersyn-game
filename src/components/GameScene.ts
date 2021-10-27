import Phaser from 'phaser'
import { basicMovement, createAnims } from '../helpers/Characters'
import { Door, updateDoors } from '../helpers/Doors'
import { NpcsAndObjects } from '../helpers/NpcsAndObjects'

enum ImageNames {
  Dude = 'dude',
}

export default class GameScene extends Phaser.Scene {
  // Klassenvariablen festlegen
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  interactionKey!: Phaser.Input.Keyboard.Key
  gridEngine: any
  playerSprite!: Phaser.Physics.Arcade.Sprite
  doors: Door[] = []
  npcsAndObjectsArray: NpcsAndObjects[] = []

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
    this.cursors = this.input.keyboard.createCursorKeys()
    this.interactionKey = this.input.keyboard.addKey('E')
    createAnims(this, ImageNames.Dude)
  }

  update (): void {
    basicMovement(this, 'player', this.gridEngine, this.playerSprite)
    updateDoors(this)
    // npcInteraction(this)
    NpcsAndObjects.interaction(this)
  }
}
