/* eslint-disable no-new */
import { Npcs, Objects } from '../helpers/NpcsAndObjects'
import GameScene from '../components/GameScene'
import globalGameState from '../components/GlobalGameState'

export default class EntelBasementScene extends GameScene {
  constructor () {
    super('entel-basement')

    this.imageNames = {
      Dude: 'entelbasement_dude',
      Map: 'entelbasement_Map',
      NPCs: 'entelbasement_npcs',
      Box1: 'box1',
      Box2: 'box2',
      Box3: 'box3',
      Box4: 'box4',
      Telex: 'telex'
    }

    this.tilemapJSONPath = 'tilemaps/entel-basement.json'
    this.imageMapDefaultPath = 'tilesets/Horror City/Horror City - Sewer Tileset/'
    this.imageMapNames = {
      HC_FactoryA5: { name: 'HC_FactoryA5' },
      HC_FactoryB: { name: 'HC_FactoryB' },
      HC_SewerFactoryA4: { name: 'HC_Sewer&FactoryA4' },
      HC_SewerA1: { name: 'HC_SewerA1' },
      HC_SewerA5: { name: 'HC_SewerA5' },
      HC_SewerB: { name: 'HC_SewerB' },
      HC_SewerC: { name: 'HC_SewerC' },
      Fade: {
        name: 'fade',
        path: 'tilesets/'
      },
      Telex: {
        name: 'telex',
        path: 'tilesets/'
      }
    }

    this.gridEngineSettings = {
      startPosition: {
        x: 21,
        y: 9
      },
      scale: 1,
      characterCollisionStrategy: 'BLOCK_ONE_TILE_AHEAD',
      layerOverlay: false
    }
  }

  preload (): void {
    super.preload()

    super.loadAvatarSpritesheet()

    super.loadMapImages()

    this.loadObjectImages()
    this.load.audio('basement_ambience', ['sounds/basement_ambience.mp3', 'sounds/basement_ambience.ogg'])
  }

  loadObjectImages (): void {
    this.load.spritesheet(
      this.imageNames.NPCs,
      'character_sprites/HC_Humans3B.png',
      {
        frameWidth: 32,
        frameHeight: 64
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

    // creating all doors / doorpositions
    // new Doors(this, 21, 8, 'outdoor')
    this.sound.play('basement_ambience', {
      volume: 0.5,
      loop: true
    })
    this.scene.scene.events.on('wake', () => {
      this.sound.play('basement_ambience', {
        volume: 0.5,
        loop: true
      })
    })
    this.scene.scene.events.on('start', () => {
      this.sound.play('basement_ambience', {
        volume: 0.5,
        loop: true
      })
    })
  }

  createNpcs (): void {
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
    // Add Paulo NPC
    new Npcs(this, 26, 12, this.imageNames.NPCs, 0.5,
      (
        scene: GameScene,
        name: String
      ) => {
        this.scene.run('ui-dialogue', { startDialogueId: '12' })
        globalGameState.off('teleportToCorfor')
        globalGameState.on('teleportToCorfor', () => {
          globalGameState.off('teleportToCorfor')
          this.switch('corfo-indoor')
        })
        globalGameState.off('resetBoxPuzzle')
        globalGameState.on('resetBoxPuzzle', () => {
          globalGameState.off('resetBoxPuzzle')
          this.reset(true, false)
        })
      }, 0)
    new Objects(this, 22, 20, this.imageNames.Box1, 1)
    new Objects(this, 23, 20, this.imageNames.Box1, 1)
    new Objects(this, 27, 20, this.imageNames.Box2, 1)
    new Objects(this, 30, 20, this.imageNames.Box4, 1)
    new Objects(this, 24, 21, this.imageNames.Box3, 1)
    new Objects(this, 29, 21, this.imageNames.Box2, 1)
    new Objects(this, 27, 22, this.imageNames.Box3, 1)
    new Objects(this, 27, 23, this.imageNames.Box2, 1)
    new Objects(this, 26, 25, this.imageNames.Box3, 1)
    new Objects(this, 27, 25, this.imageNames.Box1, 1)
    new Objects(this, 21, 25, this.imageNames.Box1, 1)
    new Objects(this, 26, 26, this.imageNames.Box4, 1)
    new Objects(this, 30, 26, this.imageNames.Box2, 1)
    new Objects(this, 23, 28, this.imageNames.Box1, 1)
    new Objects(this, 29, 27, this.imageNames.Box1, 1)
  }

  update (): void {
    super.update()
  }
}
