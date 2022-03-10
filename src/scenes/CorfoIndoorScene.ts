/* eslint-disable no-new */
// import { addNpc } from '../helpers/Characters'
import { Npcs, Doors } from '../helpers/NpcsAndObjects'
import GameScene from '../components/GameScene'
import GlobalGameState from '../components/GlobalGameState'

export default class CorfoIndoorScene extends GameScene {
  constructor () {
    super('corfo-indoor')

    this.imageNames = {
      Dude: 'corfoindoor_dude',
      Map: 'corfoindoor_Map',
      NPCs: 'corfoindoor_npcs'
    }

    this.tilemapJSONPath = 'tilemaps/corfo-indoor.json'
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
        x: 19,
        y: 11
      },
      scale: 1.5,
      characterCollisionStrategy: 'BLOCK_ONE_TILE_AHEAD',
      layerOverlay: false
    }
  }

  preload (): void {
    super.preload()

    super.loadAvatarSpritesheet()

    super.loadMapImages()

    this.loadObjectImages()
    this.load.audio('office_ambience', ['sounds/office_ambience.mp3', 'sounds/office_ambience.ogg'])
  }

  loadObjectImages (): void {
    this.load.spritesheet(
      this.imageNames.NPCs,
      'character_sprites/HC_Humans4A.png',
      {
        frameWidth: 32,
        frameHeight: 64
      }
    )
  }

  create (): void {
    // Spielfiguranimationen und CursorKeys erstellen
    super.create()

    // creating all doors / doorpositions
    new Doors(this, 19, 10, 'outdoor')
    new Doors(this, 20, 10, 'outdoor')

    this.sound.play('office_ambience', {
      volume: 1,
      loop: true
    })
    this.scene.scene.events.on('wake', () => {
      this.sound.play('office_ambience', {
        volume: 1,
        loop: true
      })
    })
    this.scene.scene.events.on('start', () => {
      this.sound.play('office_ambience', {
        volume: 1,
        loop: true
      })
    })
  }

  createNpcs (): void {
    // Add Fernando Flores NPC
    new Npcs(this, 20, 15, this.imageNames.NPCs, 0.7,
      (
        scene: GameScene,
        name: String
      ) => {
        this.scene.run('ui-dialogue', { startDialogueId: '1' })
        GlobalGameState.on('winTheGame', () => {
          GlobalGameState.off('winTheGame')
          this.scene.switch('outro')
        })
      }, 3)
  }

  update (): void {
    super.update()
  }
}
