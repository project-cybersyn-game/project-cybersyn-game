import GameScene from '../components/GameScene'

enum ImageNames {
  Dude = 'dude',
  Roof = 'roof',
  Ground = 'ground-negative',
  Door = 'door',
}

export default class HelloWorldScene extends GameScene {
  door!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody

  constructor () {
    super('second')
  }

  preload (): void {
    super.preload()

    this.load.image(ImageNames.Roof, 'images/rooftiles.png')
    this.load.image(ImageNames.Ground, 'images/soil-negativ.png')
    this.load.image(ImageNames.Door, 'images/door.png')
  }

  create (): void {
    this.add.image(400, 300, ImageNames.Ground).setScale(2)

    // Objektgruppen erstellen
    const houses = this.physics.add.staticGroup()

    // statische Objekte erstellen

    // Tür erstellen
    this.door = this.physics.add.image(250, 50, ImageNames.Door)

    // Spielfigur und deren Animationen erstellen
    super.create()
    this.player = this.physics.add.sprite(100, 450, ImageNames.Dude).setScale(1.5).refreshBody()

    // Collider für Spielfigur und Objekte
    this.physics.add.collider(this.player, houses)

    // Tür betreten
    this.physics.add.overlap(this.player, this.door)
    this.door.on('enterzone', () => {
      this.scene.switch('hello-world')
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
