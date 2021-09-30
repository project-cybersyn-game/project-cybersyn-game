import GameScene from '../components/GameScene'
import { GridEngineConfig } from 'grid-engine'
import { createCharacterSprite, basicMovement } from '../helpers/Characters'

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
    // this.player = this.physics.add.sprite(100, 450, ImageNames.Dude).setScale(1.5).refreshBody()
    // const objectLayer = map.createLayer('3_Objects', tileset)
    const objectOverlayLayer = map.createLayer('4_Objects_Overlay', tileset)
    const objectOverlayOverlayLayer = map.createLayer('5_Objects_Overlay_Overlay', tileset)

    // Kollisionseigenschaft spezieller Tiles entsprechender Ebenen setzen
    // Kollision ist hierbei abhängig von der in der JSON festgelegten "collide"-Variable einzelner Tiles
    // objectLayer.setCollisionByProperty({ collides: true })

    // Playerkollision setzen
    // this.player.setCollideWorldBounds(true)
    // this.physics.add.collider(this.player, objectLayer)

    const playerSprite = createCharacterSprite(this, 50, 300, ImageNames.Dude, 1.5)

    const gridEngineConfig: GridEngineConfig = {
      characters: [
        {
          id: 'player',
          sprite: playerSprite,
          startPosition: { x: 50, y: 300 }
        }
      ]
    }

    this.gridEngine.create(map, gridEngineConfig)

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

    basicMovement(this, 'player')
  }
}
