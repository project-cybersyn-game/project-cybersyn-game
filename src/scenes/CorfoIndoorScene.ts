/* eslint-disable no-new */
// import { addNpc } from '../helpers/Characters'
import { Npcs } from '../helpers/NpcsAndObjects'
import { createDoor, updateDoors } from '../helpers/Doors'
import { createMap } from '../helpers/Tilemaps'
import GameScene from '../components/GameScene'
import { basicMovement, createAnims } from '../helpers/Characters'
import GlobalGameState from '../components/GlobalGameState'
import { Tilemaps } from 'phaser'

export default class CorfoIndoorScene extends GameScene {
  constructor () {
    super('corfo-indoor')

    this.imageNames = {
      Dude: 'corfoindoor_dude',
      Map: 'corfoindoor_Map',
      DD_Exterior_A4: 'DD_Exterior_A4',
      DD_Exterior_A5: 'DD_Exterior_A5',
      DD_Exterior_B: 'DD_Exterior_B',
      DD_Exterior_C: 'DD_Exterior_C',
      DD_Exterior_D: 'DD_Exterior_D',
      DD_Exterior_E: 'DD_Exterior_E',
      DD_Exterior_Walls_Non_Auto: 'DD_Exterior-Walls_Non-Auto',
      DD_General_A2: 'DD_General_A2',
      DD_General_Non_Auto: 'DD_General_Non-Auto',
      DD_General_Walls_Non_Auto: 'DD_General-Walls_Non-Auto',
      DD_Interior_A4: 'DD_Interior_A4',
      DD_Interior_A5: 'DD_Interior_A5',
      DD_Interior_B: 'DD_Interior_B',
      DD_Interior_B2: 'DD_Interior_B2',
      DD_Interior_C: 'DD_Interior_C',
      DD_Interior_C2: 'DD_Interior_C2',
      DD_Interior_School_B: 'DD_Interior-School_B',
      DD_Interior_School_C: 'DD_Interior-School_C',
      NPCs: 'corfoindoor_npcs'
    }

    this.gridEngineSettings = {
      startPosition: {
        x: 19,
        y: 11
      },
      scale: 1.5,
      characterCollisionStrategy: 'BLOCK_TWO_TILES',
      layerOverlay: false
    }
  }

  preload (): void {
    super.preload()

    super.loadAvatarSpritesheet()

    this.loadMapImages()

    this.loadObjectImages()
  }

  loadMapImages (): void {
    // Tilemap-Bilder laden
    this.load.image(this.imageNames.DD_Exterior_A4, 'tilesets/Downtown Dungeon/Tiles 24x24/DD_Exterior_A4.png')
    this.load.image(this.imageNames.DD_Exterior_A5, 'tilesets/Downtown Dungeon/Tiles 24x24/DD_Exterior_A5.png')
    this.load.image(this.imageNames.DD_Exterior_B, 'tilesets/Downtown Dungeon/Tiles 24x24/DD_Exterior_B.png')
    this.load.image(this.imageNames.DD_Exterior_C, 'tilesets/Downtown Dungeon/Tiles 24x24/DD_Exterior_C.png')
    this.load.image(this.imageNames.DD_Exterior_D, 'tilesets/Downtown Dungeon/Tiles 24x24/DD_Exterior_D.png')
    this.load.image(this.imageNames.DD_Exterior_E, 'tilesets/Downtown Dungeon/Tiles 24x24/DD_Exterior_E.png')
    this.load.image(this.imageNames.DD_Exterior_Walls_Non_Auto, 'tilesets/Downtown Dungeon/Tiles 24x24/DD_Exterior-Walls_Non-Auto.png')
    this.load.image(this.imageNames.DD_General_A2, 'tilesets/Downtown Dungeon/Tiles 24x24/DD_General_A2.png')
    this.load.image(this.imageNames.DD_General_Non_Auto, 'tilesets/Downtown Dungeon/Tiles 24x24/DD_General_Non-Auto.png')
    this.load.image(this.imageNames.DD_General_Walls_Non_Auto, 'tilesets/Downtown Dungeon/Tiles 24x24/DD_General-Walls_Non-Auto.png')
    this.load.image(this.imageNames.DD_Interior_A4, 'tilesets/Downtown Dungeon/Tiles 24x24/DD_Interior_A4.png')
    this.load.image(this.imageNames.DD_Interior_A5, 'tilesets/Downtown Dungeon/Tiles 24x24/DD_Interior_A5.png')
    this.load.image(this.imageNames.DD_Interior_B, 'tilesets/Downtown Dungeon/Tiles 24x24/DD_Interior_B.png')
    this.load.image(this.imageNames.DD_Interior_B2, 'tilesets/Downtown Dungeon/Tiles 24x24/DD_Interior_B2.png')
    this.load.image(this.imageNames.DD_Interior_C, 'tilesets/Downtown Dungeon/Tiles 24x24/DD_Interior_C.png')
    this.load.image(this.imageNames.DD_Interior_C2, 'tilesets/Downtown Dungeon/Tiles 24x24/DD_Interior_C2.png')
    this.load.image(this.imageNames.DD_Interior_School_B, 'tilesets/Downtown Dungeon/Tiles 24x24/DD_Interior-School_B.png')
    this.load.image(this.imageNames.DD_Interior_School_C, 'tilesets/Downtown Dungeon/Tiles 24x24/DD_Interior-School_C.png')

    // Tilemap-JSON laden
    this.load.tilemapTiledJSON(this.imageNames.Map, 'tilemaps/corfo-indoor.json')
  }

  loadObjectImages (): void {
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

    const map = this.createMap()

    super.initiateGridEngine(map)

    super.createCamera(map.widthInPixels, map.heightInPixels)

    // creating all doors / doorpositions
    createDoor(this, 19, 10, 'outdoor')
    createDoor(this, 20, 10, 'outdoor')

    this.createNpcs()
  }

  createMap (): Tilemaps.Tilemap {
    // Tilemap erstellen
    const map = createMap(
      this,
      this.imageNames.Map,
      [
        { tilesetName: this.imageNames.DD_Exterior_A4, image: (this.imageNames.DD_Exterior_A4) },
        { tilesetName: this.imageNames.DD_Exterior_A5, image: (this.imageNames.DD_Exterior_A5) },
        { tilesetName: this.imageNames.DD_Exterior_B, image: (this.imageNames.DD_Exterior_B) },
        { tilesetName: this.imageNames.DD_Exterior_C, image: (this.imageNames.DD_Exterior_C) },
        { tilesetName: this.imageNames.DD_Exterior_D, image: (this.imageNames.DD_Exterior_D) },
        { tilesetName: this.imageNames.DD_Exterior_E, image: (this.imageNames.DD_Exterior_E) },
        { tilesetName: this.imageNames.DD_Exterior_Walls_Non_Auto, image: (this.imageNames.DD_Exterior_Walls_Non_Auto) },
        { tilesetName: this.imageNames.DD_General_A2, image: (this.imageNames.DD_General_A2) },
        { tilesetName: this.imageNames.DD_General_Non_Auto, image: (this.imageNames.DD_General_Non_Auto) },
        { tilesetName: this.imageNames.DD_General_Walls_Non_Auto, image: (this.imageNames.DD_General_Walls_Non_Auto) },
        { tilesetName: this.imageNames.DD_Interior_A4, image: (this.imageNames.DD_Interior_A4) },
        { tilesetName: this.imageNames.DD_Interior_A5, image: (this.imageNames.DD_Interior_A5) },
        { tilesetName: this.imageNames.DD_Interior_B, image: (this.imageNames.DD_Interior_B) },
        { tilesetName: this.imageNames.DD_Interior_B2, image: (this.imageNames.DD_Interior_B2) },
        { tilesetName: this.imageNames.DD_Interior_C, image: (this.imageNames.DD_Interior_C) },
        { tilesetName: this.imageNames.DD_Interior_C2, image: (this.imageNames.DD_Interior_C2) },
        { tilesetName: this.imageNames.DD_Interior_School_B, image: (this.imageNames.DD_Interior_School_B) },
        { tilesetName: this.imageNames.DD_Interior_School_C, image: (this.imageNames.DD_Interior_School_C) }
      ],
      ['1_Ground', '2_Ground_Overlay', '3_Objects', '4_Objects_Overlay_Edge', '5_Objects_Overlay', '6_Objects_Overlay_Overlay']
    ).tilemap

    return map
  }

  createNpcs (): void {
    // Add Fernando Flores NPC
    new Npcs(this, 20, 15, this.imageNames.NPCs, 1.2,
      (
        scene: GameScene,
        name: String
      ) => {
        this.scene.run('ui-dialogue', { startDialogueId: '1' })
        GlobalGameState.on('winTheGame', () => {
          GlobalGameState.off('winTheGame')
          this.scene.switch('outro')
        })
      }, 0)
  }

  update (): void {
    super.update()
    basicMovement(this, this.playerName, this.gridEngine, this.playerSprite)
    updateDoors(this, this.playerName)
  }
}
