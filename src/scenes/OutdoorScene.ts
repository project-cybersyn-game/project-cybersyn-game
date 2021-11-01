/* eslint-disable no-new */
import { createCharacterSprite, Npcs, NpcsAndObjects } from '../helpers/NpcsAndObjects'
import { createDoor, updateDoors } from '../helpers/Doors'
import { createMap } from '../helpers/Tilemaps'
import GameScene from '../components/GameScene'
import { basicMovement, createAnims } from '../helpers/Characters'

export default class OutdoorScene extends GameScene {
  constructor () {
    super('outdoor')

    this.imageNames = {
      Dude: 'outdoor_dude',
      Map: 'outdoor_Map',
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
      NPCs: 'outdoor_npcs'
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
    this.load.tilemapTiledJSON(this.imageNames.Map, 'tilemaps/outdoor.json')

    // sonstige Bilder laden
    this.load.spritesheet(
      this.imageNames.NPCs,
      'character_sprites/characters.png',
      {
        frameWidth: 26,
        frameHeight: 36
      }
    )
    console.log(this.scene.key)
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
      ['1_Ground', '2_Ground_Overlay', '3_Objects', '4_Objects_Overlay', '5_Objects_Overlay_hs', '6_Objects_Overlay_Overlay']
    ).tilemap

    // GridEngine
    this.playerSprite = createCharacterSprite(this, 0, 0, this.imageNames.Dude, 1.5)
    const gridEngineConfig = {
      characters: [
        {
          id: 'outdoor_player',
          sprite: this.playerSprite,
          startPosition: { x: 10, y: 20 }
        }
      ]
    }
    this.gridEngine.create(map, gridEngineConfig)

    // add camera that follows the character
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.startFollow(this.playerSprite, true)

    // creating all doors / doorpositions
    createDoor(this, 21, 6, 'entel-indoor')
    createDoor(this, 36, 6, 'entel-basement')
    createDoor(this, 37, 6, 'entel-basement')
    createDoor(this, 47, 28, 'corfo-indoor')
    createDoor(this, 48, 28, 'corfo-indoor')

    NpcsAndObjects.interaction(this, 'outdoor_player')
  }

  update (): void {
    super.update()
    basicMovement(this, 'outdoor_player', this.gridEngine, this.playerSprite)
    updateDoors(this, 'outdoor_player')
  }
}
