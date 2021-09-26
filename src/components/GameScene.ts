import Phaser from 'phaser'

enum ImageNames {
  Dude = 'dude',
}

export default class GameScene extends Phaser.Scene {
  // Klassenvariablen festlegen
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  movementState = { 'type': 'idle', 'direction': 'down' }

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
    // Spielfigur erstellen
    //this.player = this.physics.add.sprite(100, 450, ImageNames.Dude).setScale(2).refreshBody()
    //this.player.setCollideWorldBounds(true)

    // Animationen für Spielfigur
    // walk animations
    this.anims.create({
      key: 'walk_left',
      frames: this.anims.generateFrameNumbers(ImageNames.Dude, {
        start: 40, 
        end: 47
      }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'walk_right',
      frames: this.anims.generateFrameNumbers(ImageNames.Dude, {
        start: 32, 
        end: 39
      }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'walk_up',
      frames: this.anims.generateFrameNumbers(ImageNames.Dude, {
        start: 24, 
        end: 31
      }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'walk_down',
      frames: this.anims.generateFrameNumbers(ImageNames.Dude, {
        start: 16, 
        end: 23
      }),
      frameRate: 10,
      repeat: -1
    })
    // idle animations
    this.anims.create({
      key: 'idle_left',
      frames: this.anims.generateFrameNumbers(ImageNames.Dude, {
        start: 14, 
        end: 12
      }),
      frameRate: 5,
      repeat: -1
    })
    this.anims.create({
      key: 'idle_right',
      frames: this.anims.generateFrameNumbers(ImageNames.Dude, {
        start: 8, 
        end: 11
      }),
      frameRate: 5,
      repeat: -1
    })
    this.anims.create({
      key: 'idle_up',
      frames: this.anims.generateFrameNumbers(ImageNames.Dude, {
        start: 4, 
        end: 7
      }),
      frameRate: 5,
      repeat: -1
    })
    this.anims.create({
      key: 'idle_down',
      frames: this.anims.generateFrameNumbers(ImageNames.Dude, {
        start: 0, 
        end: 3
      }),
      frameRate: 5,
      repeat: -1
    })

    // Pfeiltasten "erstellen"
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update (): void {
    // Aktionen bei Pfeiltastendruck festlegen
    // up/down
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160)
      this.movementState.type = 'walk'
      this.movementState.direction = 'up'
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160)
      this.movementState.type = 'walk'
      this.movementState.direction = 'down'
    } else {
      this.player.setVelocityY(0)
      this.movementState.type = 'idle'
    }
    // left/right
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)
      this.movementState.type = 'walk'
      this.movementState.direction = 'left'
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)
      this.movementState.type = 'walk'
      this.movementState.direction = 'right'
    } else {
      this.player.setVelocityX(0)
    }
    
    // Animationen abhängig von movement type und direction abspielen
    this.player.anims.play( this.movementState.type + '_' + this.movementState.direction, true )
  }
}
