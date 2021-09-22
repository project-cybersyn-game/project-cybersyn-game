import Phaser from 'phaser'

enum ImageNames {
  Roof = 'roof',
  Ground = 'ground',
  Dude = 'dude',
  Sign = 'sign',
}

export default class HelloWorldScene extends Phaser.Scene {
  // Klassenvariablen festlegen
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

  constructor () {
    super('hello-world')
  }

  preload (): void {
    this.load.image(ImageNames.Roof, 'images/rooftiles.png')
    this.load.image(ImageNames.Ground, 'http://labs.phaser.io/assets/textures/soil.png')
    this.load.image(ImageNames.Sign, 'http://labs.phaser.io/assets/sets/objects/sign1.png')
    this.load.spritesheet(
      ImageNames.Dude,
      'http://labs.phaser.io/assets/sprites/dude.png',
      {
        frameWidth: 32,
        frameHeight: 48
      }
    )
  }

  create (): void {
    this.add.image(400, 300, ImageNames.Ground).setScale(2)

    // Objektgruppen erstellen
    const signs = this.physics.add.staticGroup()
    const houses = this.physics.add.staticGroup()

    // statische Objekte erstellen
    signs.create(300, 400, ImageNames.Sign)

    // Spielfigur erstellen
    this.player = this.physics.add.sprite(100, 450, ImageNames.Dude).setScale(2).refreshBody()
    this.player.setCollideWorldBounds(true)

    // Animationen für Spielfigur
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(ImageNames.Dude, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'front',
      frames: [{ key: ImageNames.Dude, frame: 4 }],
      frameRate: 20,
      repeat: -1
    })
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers(ImageNames.Dude, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    })

    // Collider für Spielfigur und Objekte
    this.physics.add.collider(this.player, signs)
    this.physics.add.collider(this.player, houses)

    // Pfeiltasten "erstellen"
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update (): void {
    // Aktionen bei Pfeiltastendruck festlegen
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)

      this.player.anims.play('left', true)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)

      this.player.anims.play('right', true)
    } else {
      this.player.setVelocityX(0)

      this.player.anims.play('front')
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160)
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160)
    } else {
      this.player.setVelocityY(0)
    }
  }
}
