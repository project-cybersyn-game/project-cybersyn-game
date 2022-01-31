/* eslint-disable no-new */
// import { addNpc } from '../helpers/Characters'
import { Npcs } from '../helpers/NpcsAndObjects'
import { createDoor, updateDoors } from '../helpers/Doors'
import GameScene from '../components/GameScene'
import { basicMovement, createAnims } from '../helpers/Characters'
import globalGameState from '../components/GlobalGameState'

export default class EntelIndoorScene extends GameScene {
  constructor () {
    super('entel-indoor')

    this.imageNames = {
      Dude: 'entelindoor_dude',
      Map: 'entelindoor_Map',
      NPCs: 'entelindoor_npcs'
    }

    this.tilemapJSONPath = 'tilemaps/entel-indoor.json'
    this.imageMapDefaultPath = 'tilesets/Downtown Dungeon/Tiles 24x24/'
    this.imageMapNames = {
      DD_Exterior_A4: { name: 'DD_Exterior_A4' },
      DD_Exterior_A5: { name: 'DD_Exterior_A5' },
      DD_Exterior_B: { name: 'DD_Exterior_B' },
      DD_Exterior_C: { name: 'DD_Exterior_C' },
      DD_Exterior_D: { name: 'DD_Exterior_D' },
      DD_Exterior_E: { name: 'DD_Exterior_E' },
      DD_Exterior_Walls_Non_Auto: { name: 'DD_Exterior-Walls_Non-Auto' },
      DD_General_A2: { name: 'DD_General_A2' },
      DD_General_Non_Auto: { name: 'DD_General_Non-Auto' },
      DD_General_Walls_Non_Auto: { name: 'DD_General-Walls_Non-Auto' },
      DD_Interior_A4: { name: 'DD_Interior_A4' },
      DD_Interior_A5: { name: 'DD_Interior_A5' },
      DD_Interior_B: { name: 'DD_Interior_B' },
      DD_Interior_B2: { name: 'DD_Interior_B2' },
      DD_Interior_C: { name: 'DD_Interior_C' },
      DD_Interior_C2: { name: 'DD_Interior_C2' },
      DD_Interior_School_B: { name: 'DD_Interior-School_B' },
      DD_Interior_School_C: { name: 'DD_Interior-School_C' }
    }

    this.gridEngineSettings = {
      startPosition: {
        x: 15,
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

    super.loadMapImages()

    this.loadObjectImages()
  }

  loadObjectImages (): void {
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

    const map = super.createMap()

    // GridEngine
    super.initiateGridEngine(map)

    super.createCamera(map.widthInPixels, map.heightInPixels)

    // creating all doors / doorpositions
    createDoor(this, 15, 10, 'outdoor')

    this.createNpcs()
  }

  createNpcs (): void {
    // Add Batanero NPC
    new Npcs(this, 14, 15, this.imageNames.NPCs, 1.2,
      (
        scene: GameScene,
        name: String
      ) => {
        this.scene.run('ui-dialogue', { startDialogueId: '5' })
      }, 5)

    // Add Paulo NPC
    new Npcs(this, 26, 12, this.imageNames.NPCs, 1.2,
      (
        scene: GameScene,
        name: String
      ) => {
        this.scene.run('ui-dialogue', { startDialogueId: '9' })
        globalGameState.on('goToBasement', () => {
          globalGameState.off('goToBasement')
          this.scene.switch('entel-basement')
        })
      }, 6)
  }

  update (): void {
    super.update()
    basicMovement(this, this.playerName, this.gridEngine, this.playerSprite)
    updateDoors(this, this.playerName)
  }
}
