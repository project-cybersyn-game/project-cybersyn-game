import GameScene from '../components/GameScene'

enum ImageNames {
  Roof = 'roof',
  Ground = 'ground',
  Sign = 'sign',
  Door = 'door',
}

export default class HelloWorldScene extends GameScene {
  door!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody

  constructor () {
    super('hello-world')
  }

  preload (): void {
    super.preload()

    this.load.image(ImageNames.Roof, 'images/rooftiles.png')
    this.load.image(ImageNames.Ground, 'http://labs.phaser.io/assets/textures/soil.png')
    this.load.image(ImageNames.Sign, 'http://labs.phaser.io/assets/sets/objects/sign1.png')
    this.load.image(ImageNames.Door, 'images/door.png')
  }

  create (): void {
    this.add.image(400, 300, ImageNames.Ground).setScale(2)

    // Objektgruppen erstellen
    const signs = this.physics.add.staticGroup()
    const houses = this.physics.add.staticGroup()

    // statische Objekte erstellen
    signs.create(300, 400, ImageNames.Sign)

    // Tür erstellen
    this.door = this.physics.add.image(250, 50, ImageNames.Door)

    // Spielfigur und deren Animationen erstellen
    super.create()

    // Collider für Spielfigur und Objekte
    this.physics.add.collider(this.player, signs)
    this.physics.add.collider(this.player, houses)

    // Tür betreten
    this.physics.add.overlap(this.player, this.door)
    this.door.on('enterzone', () => {
      this.scene.switch('second')
      this.player.setY(this.player.y + 30)
    })
  }

  update (): void {
    super.update()

    const touching = this.door.body.touching
    const wasTouching = this.door.body.wasTouching

    if (touching.none && !wasTouching.none) {
      this.door.emit('leavezone')
    } else if (!touching.none && wasTouching.none) {
      this.door.emit('enterzone')
    }
  }
}
