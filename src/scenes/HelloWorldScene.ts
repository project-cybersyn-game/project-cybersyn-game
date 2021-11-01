/* eslint-disable no-new */
// import { addNpc } from '../helpers/Characters'
import { createCharacterSprite, Npcs, NpcsAndObjects, Objects } from '../helpers/NpcsAndObjects'
import { createDoor, updateDoors } from '../helpers/Doors'
import { createMap } from '../helpers/Tilemaps'
import GameScene from '../components/GameScene'
import { basicMovement, createAnims } from '../helpers/Characters'
import GlobalGameState from '../components/GlobalGameState'

export default class HelloWorldScene extends GameScene {
  constructor () {
    super('hello-world')

    this.imageNames = {
      Dude: 'helloworld_dude',
      Map: 'helloworld_Map',
      TileA1: 'tilea1',
      TileA2: 'tilea2',
      TileA3: 'tilea3',
      TileA4: 'tilea4',
      TileA5: 'tilea5',
      TileB: 'tileb',
      TileC: 'tilec',
      TileD: 'tiled',
      TileE: 'tilee',
      Door: 'helloworld_door',
      NPCs: 'helloworld_npcs'
    }
  }

  preload (): void {
    super.preload()

    this.load.spritesheet(
      this.imageNames.Dude,
      'character_sprites/char.png',
      {
        frameWidth: 25,
        frameHeight: 25
      }
    )

    // Tilemap-Bilder laden
    this.load.image(this.imageNames.TileA1, 'tilesets/tilea1.png')
    this.load.image(this.imageNames.TileA2, 'tilesets/tilea2.png')
    this.load.image(this.imageNames.TileA3, 'tilesets/tilea3.png')
    this.load.image(this.imageNames.TileA4, 'tilesets/tilea4.png')
    this.load.image(this.imageNames.TileA5, 'tilesets/tilea5.png')
    this.load.image(this.imageNames.TileB, 'tilesets/tileb.png')
    this.load.image(this.imageNames.TileC, 'tilesets/tilec.png')
    this.load.image(this.imageNames.TileD, 'tilesets/tiled.png')
    this.load.image(this.imageNames.TileE, 'tilesets/tilee.png')

    this.load.image(this.imageNames.Door, 'images/door.png')

    // Tilemap-JSON laden
    this.load.tilemapTiledJSON(this.imageNames.Map, 'tilemaps/TestTilemap.json')

    // sonstige Bilder laden
    this.load.spritesheet(
      this.imageNames.NPCs,
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

    createAnims(this, this.imageNames.Dude)

    // Tilemap erstellen
    const map = createMap(
      this,
      this.imageNames.Map,
      [
        { tilesetName: 'tilea1', image: (this.imageNames.TileA1) },
        { tilesetName: 'tilea2', image: (this.imageNames.TileA2) },
        { tilesetName: 'tilea3', image: (this.imageNames.TileA3) },
        { tilesetName: 'tilea4', image: (this.imageNames.TileA4) },
        { tilesetName: 'tilea5', image: (this.imageNames.TileA5) },
        { tilesetName: 'tileb', image: (this.imageNames.TileB) },
        { tilesetName: 'tilec', image: (this.imageNames.TileC) },
        { tilesetName: 'tiled', image: (this.imageNames.TileD) },
        { tilesetName: 'tilee', image: (this.imageNames.TileE) }
      ],
      ['1_Ground', '2_Ground_Overlay', '3_Objects', '4_Objects_Overlay', '5_Objects_Overlay_hs', '6_Objects_Overlay_Overlay']
    ).tilemap

    // Hier kommt die bescheuerte Grid-Engine zum Einsatz. Sie hasst mich zutiefst. Bitte funktionier dieses Mal.
    // Na geht doch! >:)
    this.playerSprite = createCharacterSprite(this, 0, 0, this.imageNames.Dude, 1.5)
    const gridEngineConfig = {
      characters: [
        {
          id: 'helloworld_player',
          sprite: this.playerSprite
        }
      ]
    }
    this.gridEngine.create(map, gridEngineConfig)

    // add camera that follows the character
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.startFollow(this.playerSprite, true)

    // creating all doors / doorpositions
    createDoor(this, 19, 17, 'second')

    // adding NPCs and pushable objects
    new Npcs(this, 2, 2, ImageNames.NPCs, 1.2,
      (
        scene: GameScene,
        name: string
      ) => {
        this.scene.run('ui-dialogue', { startDialogueId: '1', scene: this })
      })
    new Npcs(this, 10, 10, ImageNames.NPCs, 1.2,
      (
        scene: GameScene,
        name: String
      ) => {
        scene.gridEngine.moveRandomly(name, 3, 5)
      }, 3)

    new Objects(this, 5, 10, this.imageNames.Door, 0.5, 'helloworld_player')

    // example of setting and accessing GlobalGameState
    GlobalGameState.setGameProgress('isTelexFound', true)
    console.log(GlobalGameState.getGameProgress('isTelexFound'))

    NpcsAndObjects.interaction(this)
  }

  update (): void {
    super.update()
    basicMovement(this, 'helloworld_player', this.gridEngine, this.playerSprite)
    updateDoors(this, 'helloworld_player')
    NpcsAndObjects.interaction(this, 'helloworld_player')
  }
}
