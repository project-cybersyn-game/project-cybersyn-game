/* eslint-disable no-new */
import { Npcs, Doors } from '../helpers/NpcsAndObjects'
import GameScene from '../components/GameScene'

export default class OutdoorScene extends GameScene {
  constructor () {
    super('outdoor')

    this.imageNames = {
      Dude: 'outdoor_dude',
      Map: 'outdoor_Map',
      NPCs: 'outdoor_npcs'
    }

    this.tilemapJSONPath = 'tilemaps/outdoor.json'
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
        x: 52,
        y: 30
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

    // Sonstige Assets laden
    this.load.audio('easter_egg', ['sounds/easter_egg.mp3', 'sounds/easter_egg.ogg'])
    this.load.image('eg', 'images/easter_egg.png')
    this.load.audio('city_ambience', ['sounds/city_ambience.mp3', 'sounds/city_ambience.ogg'])
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

    this.time.delayedCall(10000, () => {
      this.scene.sleep('intro')
    })

    // adding texts on buildings
    this.add.text(20.5 * 24, 4 * 24, 'ENTEL').setDepth(9998)
    this.add.text(46.8 * 24, 26.2 * 24, 'CORFO', {
      fontSize: '20px'
    }).setDepth(9998)
    this.add.text(36.2 * 24, 4.2 * 24, 'EMCO', {
      color: '#000'
    }).setDepth(9998)

    // creating all doors / doorpositions
    new Doors(this, 21, 6, 'entel-indoor')
    // new Doors(this, 36, 6, 'entel-basement')
    // new Doors(this, 37, 6, 'entel-basement')
    new Doors(this, 47, 28, 'corfo-indoor')
    new Doors(this, 48, 28, 'corfo-indoor')

    this.sound.play('city_ambience', {
      volume: 0.5,
      loop: true
    })
    this.scene.scene.events.on('wake', () => {
      this.sound.play('city_ambience', {
        volume: 0.5,
        loop: true
      })
    })
    this.scene.scene.events.on('start', () => {
      this.sound.play('city_ambience', {
        volume: 0.5,
        loop: true
      })
    })
  }

  createNpcs (): void {
    // Add Easteregg NPC
    new Npcs(this, 40, 22, this.imageNames.NPCs, 1.2,
      (
        scene: GameScene,
        name: String
      ) => {
        const music = this.sound.add('easter_egg')
        music.play({
          loop: true,
          volume: 6.0
        })
        this.add.image(
          +this.gridEngine.getFacingPosition(this.playerName).x * 32 - 120,
          +this.gridEngine.getFacingPosition(this.playerName).y * 32 - 190,
          'eg'
        ).setDepth(9999)
      })
  }

  update (): void {
    super.update()
  }
}
