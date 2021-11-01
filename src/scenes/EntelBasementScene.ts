/* eslint-disable no-new */
import { createCharacterSprite, Npcs, NpcsAndObjects, Objects } from '../helpers/NpcsAndObjects'
import { createDoor, updateDoors } from '../helpers/Doors'
import { createMap } from '../helpers/Tilemaps'
import GameScene from '../components/GameScene'
import { basicMovement, createAnims } from '../helpers/Characters'

export default class EntelBasementScene extends GameScene {
  constructor () {
    super('entel-basement')

    this.imageNames = {
      Dude: 'entelbasement_dude',
      Map: 'entelbasement_Map',
      Fade: 'fade',
      HC_FactoryA5: 'HC_FactoryA5',
      HC_FactoryB: 'HC_FactoryB',
      HC_SewerFactoryA4: 'HC_Sewer&FactoryA4',
      HC_SewerA1: 'HC_SewerA1',
      HC_SewerA5: 'HC_SewerA5',
      HC_SewerB: 'HC_SewerB',
      HC_SewerC: 'HC_SewerC',
      Telex: 'telex',
      NPCs: 'entelbasement_npcs',
      Box1: 'box1',
      Box2: 'box2',
      Box3: 'box3',
      Box4: 'box4'
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
    this.load.image(this.imageNames.Fade, 'tilesets/fade.png')
    this.load.image(this.imageNames.HC_FactoryA5, 'tilesets/Horror City/Horror City - Sewer Tileset/HC_FactoryA5.png')
    this.load.image(this.imageNames.HC_FactoryB, 'tilesets/Horror City/Horror City - Sewer Tileset/HC_FactoryB.png')
    this.load.image(this.imageNames.HC_SewerFactoryA4, 'tilesets/Horror City/Horror City - Sewer Tileset/HC_Sewer&FactoryA4.png')
    this.load.image(this.imageNames.HC_SewerA1, 'tilesets/Horror City/Horror City - Sewer Tileset/HC_SewerA1.png')
    this.load.image(this.imageNames.HC_SewerA5, 'tilesets/Horror City/Horror City - Sewer Tileset/HC_SewerA5.png')
    this.load.image(this.imageNames.HC_SewerB, 'tilesets/Horror City/Horror City - Sewer Tileset/HC_SewerB.png')
    this.load.image(this.imageNames.HC_SewerC, 'tilesets/Horror City/Horror City - Sewer Tileset/HC_SewerC.png')
    this.load.image(this.imageNames.Telex, 'tilesets/telex.png')

    // Tilemap-JSON laden
    this.load.tilemapTiledJSON(this.imageNames.Map, 'tilemaps/entel-basement.json')

    // sonstige Bilder laden
    this.load.spritesheet(
      this.imageNames.NPCs,
      'character_sprites/characters.png',
      {
        frameWidth: 26,
        frameHeight: 36
      }
    )
    this.load.image(this.imageNames.Box1, 'images/boxes_16x32/box1.png')
    this.load.image(this.imageNames.Box2, 'images/boxes_16x32/box2.png')
    this.load.image(this.imageNames.Box3, 'images/boxes_16x32/box3.png')
    this.load.image(this.imageNames.Box4, 'images/boxes_16x32/box4.png')
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
        { tilesetName: this.imageNames.Fade, image: (this.imageNames.Fade) },
        { tilesetName: this.imageNames.HC_FactoryA5, image: (this.imageNames.HC_FactoryA5) },
        { tilesetName: this.imageNames.HC_FactoryB, image: (this.imageNames.HC_FactoryB) },
        { tilesetName: this.imageNames.HC_SewerFactoryA4, image: (this.imageNames.HC_SewerFactoryA4) },
        { tilesetName: this.imageNames.HC_SewerA1, image: (this.imageNames.HC_SewerA1) },
        { tilesetName: this.imageNames.HC_SewerA5, image: (this.imageNames.HC_SewerA5) },
        { tilesetName: this.imageNames.HC_SewerB, image: (this.imageNames.HC_SewerB) },
        { tilesetName: this.imageNames.HC_SewerC, image: (this.imageNames.HC_SewerC) },
        { tilesetName: this.imageNames.Telex, image: (this.imageNames.Telex) }
      ],
      ['1_Ground', '2_Ground_Overlay', '3_Objects', '4_Objects_Overlay', '5_Objects_Overlay_hs', '6_Objects_Overlay_Overlay']
    ).tilemap

    // GridEngine
    this.playerSprite = createCharacterSprite(this, 0, 0, this.imageNames.Dude, 1)
    const gridEngineConfig = {
      characters: [
        {
          id: 'entelbasement_player',
          sprite: this.playerSprite,
          startPosition: { x: 21, y: 9 }
        }
      ]
    }
    this.gridEngine.create(map, gridEngineConfig)

    // add camera that follows the character
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.startFollow(this.playerSprite, true)

    // creating all doors / doorpositions
    createDoor(this, 21, 8, 'outdoor')

    // adding NPCs and pushable objects
    // new Npcs(this, 19, 10, this.imageNames.NPCs, 0.8, () => {
    //   this.scene.run('ui-dialogue', { startDialogueId: '1' })
    // })
    new Npcs(this, 23, 34, this.imageNames.Telex, 1, () => {
      this.scene.run('ui-dialogue', { startDialogueId: '18' })
    })
    new Npcs(this, 18, 34, this.imageNames.Telex, 1, () => {
      this.scene.run('ui-dialogue', { startDialogueId: '18' })
    })
    new Npcs(this, 38, 37, this.imageNames.Telex, 1, () => {
      this.scene.run('ui-dialogue', { startDialogueId: '18' })
    })
    new Objects(this, 22, 20, this.imageNames.Box1, 1, 'entelbasement_player')
    new Objects(this, 23, 20, this.imageNames.Box1, 1, 'entelbasement_player')
    new Objects(this, 27, 20, this.imageNames.Box2, 1, 'entelbasement_player')
    new Objects(this, 30, 20, this.imageNames.Box4, 1, 'entelbasement_player')
    new Objects(this, 24, 21, this.imageNames.Box3, 1, 'entelbasement_player')
    new Objects(this, 29, 21, this.imageNames.Box2, 1, 'entelbasement_player')
    new Objects(this, 21, 22, this.imageNames.Box2, 1, 'entelbasement_player')
    new Objects(this, 27, 22, this.imageNames.Box3, 1, 'entelbasement_player')
    new Objects(this, 27, 23, this.imageNames.Box2, 1, 'entelbasement_player')
    new Objects(this, 26, 25, this.imageNames.Box3, 1, 'entelbasement_player')
    new Objects(this, 27, 25, this.imageNames.Box1, 1, 'entelbasement_player')
    new Objects(this, 21, 26, this.imageNames.Box1, 1, 'entelbasement_player')
    new Objects(this, 26, 26, this.imageNames.Box4, 1, 'entelbasement_player')
    new Objects(this, 30, 26, this.imageNames.Box2, 1, 'entelbasement_player')
    new Objects(this, 22, 27, this.imageNames.Box2, 1, 'entelbasement_player')
    new Objects(this, 23, 27, this.imageNames.Box1, 1, 'entelbasement_player')
    new Objects(this, 29, 27, this.imageNames.Box1, 1, 'entelbasement_player')

    NpcsAndObjects.interaction(this, 'entelbasement_player')
  }

  update (): void {
    super.update()
    basicMovement(this, 'entelbasement_player', this.gridEngine, this.playerSprite)
    updateDoors(this, 'entelbasement_player')
  }
}
