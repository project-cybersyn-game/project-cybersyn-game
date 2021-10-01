import { createCharacterSprite } from '~/helpers/Characters'
import GameScene from '../components/GameScene'

enum ImageNames {
  Dude = 'dude',
  TileA1 = 'tilea1',
  TileA2 = 'tilea2',
  TileA3 = 'tilea3',
  TileA4 = 'tilea4',
  TileA5 = 'tilea5',
  TileB = 'tileb',
  TileC = 'tilec',
  TileD = 'tiled',
  TileE = 'tilee',
  Door = 'door'
}

export default class HelloWorldScene extends GameScene {
  door!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody

  constructor () {
    super('hello-world')
  }

  preload (): void {
    super.preload()

    // Tilemap-Bilder laden
    this.load.image(ImageNames.TileA1, 'tilesets/tilea1.png')
    this.load.image(ImageNames.TileA2, 'tilesets/tilea2.png')
    this.load.image(ImageNames.TileA3, 'tilesets/tilea3.png')
    this.load.image(ImageNames.TileA4, 'tilesets/tilea4.png')
    this.load.image(ImageNames.TileA5, 'tilesets/tilea5.png')
    this.load.image(ImageNames.TileB, 'tilesets/tileb.png')
    this.load.image(ImageNames.TileC, 'tilesets/tilec.png')
    this.load.image(ImageNames.TileD, 'tilesets/tiled.png')
    this.load.image(ImageNames.TileE, 'tilesets/tilee.png')

    // Tilemap-JSON laden
    this.load.tilemapTiledJSON('map', 'tilemaps/TestTilemap.json')

    // sonstige Bilder laden
    this.load.image(ImageNames.Door, 'images/door.png')
  }

  create (): void {
    // Spielfiguranimationen und CursorKeys erstellen
    super.create()

    // Tilemap erstellen
    const map: Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: 'map' })

    // Tileset-Bilder einem Array hinzufügen
    const tileset = [map.addTilesetImage('tilea1', ImageNames.TileA1)]
    tileset.push(map.addTilesetImage('tilea2', ImageNames.TileA2))
    tileset.push(map.addTilesetImage('tilea3', ImageNames.TileA3))
    tileset.push(map.addTilesetImage('tilea4', ImageNames.TileA4))
    tileset.push(map.addTilesetImage('tilea5', ImageNames.TileA5))
    tileset.push(map.addTilesetImage('tileb', ImageNames.TileB))
    tileset.push(map.addTilesetImage('tilec', ImageNames.TileC))
    tileset.push(map.addTilesetImage('tiled', ImageNames.TileD))
    tileset.push(map.addTilesetImage('tilee', ImageNames.TileE))

    // Layer, Objekte und Player in der richtigen Reihenfolge erstellen
    const groundLayer = map.createLayer('1_Ground', tileset)
    const groundOverlayLayer = map.createLayer('2_Ground_Overlay', tileset)
    this.door = this.physics.add.image(250, 50, ImageNames.Door)
    const objectLayer = map.createLayer('3_Objects', tileset)
    const objectOverlayLayer = map.createLayer('4_Objects_Overlay', tileset)
    const objectOverlayOverlayLayer = map.createLayer('5_Objects_Overlay_Overlay', tileset)

    // Hier kommt die bescheuerte Grid-Engine zum Einsatz. Sie hasst mich zutiefst. Bitte funktionier dieses Mal.
    // Na geht doch! >:)
    this.playerSprite = createCharacterSprite(this, 0, 0, ImageNames.Dude, 1.5)
    const gridEngineConfig = {
      characters: [
        {
          id: 'player',
          sprite: this.playerSprite
        }
      ]
    }
    this.gridEngine.create(map, gridEngineConfig)

    // Tür betreten
    this.physics.add.overlap(this.playerSprite, this.door)
    this.door.on('enterzone', () => {
      this.scene.switch('second')
      this.playerSprite.setY(this.playerSprite.y + 30)
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
