/* eslint-disable no-new */
// import { addNpc } from '../helpers/Characters'
import { createCharacterSprite, Npcs, NpcsAndObjects, Objects } from '../helpers/NpcsAndObjects'
import { createDoor } from '../helpers/Doors'
import { createMap } from '../helpers/Tilemaps'
import GameScene from '../components/GameScene'
import GlobalGameState from '../components/GlobalGameState'

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
  Door = 'door',
  NPCs = 'npcs'
}

export default class HelloWorldScene extends GameScene {
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

    this.load.image(ImageNames.Door, 'images/door.png')

    // Tilemap-JSON laden
    this.load.tilemapTiledJSON('map', 'tilemaps/TestTilemap.json')

    // sonstige Bilder laden
    this.load.spritesheet(
      ImageNames.NPCs,
      'character_sprites/characters.png',
      {
        frameWidth: 26,
        frameHeight: 36
      }
    )
  }

  create (): void {
    // Spielfiguranimationen und CursorKeys erstellen
    super.create()

    // Tilemap erstellen
    const map = createMap(
      this,
      'map',
      [
        { tilesetName: 'tilea1', image: (ImageNames.TileA1) },
        { tilesetName: 'tilea2', image: (ImageNames.TileA2) },
        { tilesetName: 'tilea3', image: (ImageNames.TileA3) },
        { tilesetName: 'tilea4', image: (ImageNames.TileA4) },
        { tilesetName: 'tilea5', image: (ImageNames.TileA5) },
        { tilesetName: 'tileb', image: (ImageNames.TileB) },
        { tilesetName: 'tilec', image: (ImageNames.TileC) },
        { tilesetName: 'tiled', image: (ImageNames.TileD) },
        { tilesetName: 'tilee', image: (ImageNames.TileE) }
      ],
      ['1_Ground', '2_Ground_Overlay', '3_Objects', '4_Objects_Overlay', '5_Objects_Overlay_hs', '6_Objects_Overlay_Overlay']
    ).tilemap

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

    // creating all doors / doorpositions
    createDoor(this, 19, 17, 'second')

    // adding NPCs and pushable objects
    new Npcs(this, 2, 2, ImageNames.NPCs, 1.2,
      (
        scene: GameScene,
        name: string
      ) => {
        this.scene.run('ui-dialogue', { startDialogId: '1' })
      })
    new Npcs(this, 10, 10, ImageNames.NPCs, 1.2,
      (
        scene: GameScene,
        name: String
      ) => {
        scene.gridEngine.moveRandomly(name, 3, 5)
      }, 3)
    new Objects(this, 5, 10, ImageNames.Door, 0.5)

    // example of setting and accessing GlobalGameState
    GlobalGameState.setGameProgress('isTelexFound', true)
    console.log(GlobalGameState.getGameProgress('isTelexFound'))

    NpcsAndObjects.interaction(this)
  }

  update (): void {
    super.update()
  }
}
