import Phaser from 'phaser'
import { Menu } from '../helpers/Menu'

enum ImageNames {
  OpsRoom = 'opsroom',
  OpsRoomLight = 'opsroom-light'
}

export default class MainMenuScene extends Phaser.Scene {
  constructor () {
    super('main-menu')
  }

  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  selectKey!: Phaser.Input.Keyboard.Key
  backKey!: Phaser.Input.Keyboard.Key
  menu!: Menu

  preload (): void {
    // load background image
    this.load.image(ImageNames.OpsRoom, 'images/main-menu-ops-room.png')
    this.load.image(ImageNames.OpsRoomLight, 'images/main-menu-ops-room-lighteffect.png')

    this.load.audio('title_music', ['sounds/title_music.mp3', 'sounds/title_music.ogg'])
    this.load.audio('click', ['sounds/click.mp3', 'sounds/click.ogg'])

    // preload the menu dependencies
    Menu.preload(this)
  }

  create (): void {
    const halfCanvasWidth = this.game.canvas.width / 2
    const halfCanvasHeight = this.game.canvas.height / 2
    this.cursors = this.input.keyboard.createCursorKeys()
    this.selectKey = this.input.keyboard.addKey('ENTER')
    this.backKey = this.input.keyboard.addKey('ESC')

    this.add.image(halfCanvasWidth, halfCanvasHeight, ImageNames.OpsRoom)

    // display header
    this.add.text(halfCanvasWidth - 115, halfCanvasHeight - 287,
      [
        'CYBERSYN',
        'Main Menu'
      ],
      {
        fontFamily: 'Nova Mono',
        fontSize: '20px',
        color: '#fff'
      })

    // display game-info
    this.add.text(halfCanvasWidth - 305, halfCanvasHeight + 220, 'GRAPHICS',
      {
        fontFamily: 'Nova Mono',
        fontSize: '20px',
        color: '#fff'
      })
    this.add.text(halfCanvasWidth - 335, halfCanvasHeight + 255,
      [
        'By Darby Machin',
        'freely available',
        'on itch.io'
      ],
      {
        fontFamily: 'Nova Mono',
        fontSize: '14px',
        color: '#fff'
      })

    // display game-info
    this.add.text(halfCanvasWidth + 210, halfCanvasHeight + 220, 'GAME INFO',
      {
        fontFamily: 'Nova Mono',
        fontSize: '20px',
        color: '#fff'
      })
    this.add.text(halfCanvasWidth + 180, halfCanvasHeight + 255,
      [
        'Version: ' + this.game.config.gameVersion,
        'Engine: Phaser 3.55.2'
      ],
      {
        fontFamily: 'Nova Mono',
        fontSize: '14px',
        color: '#fff'
      })

    // display creator-info
    this.add.text(halfCanvasWidth - 55, halfCanvasHeight + 220, 'DEVELOPERS',
      {
        fontFamily: 'Nova Mono',
        fontSize: '20px',
        color: '#fff'
      })
    this.add.text(halfCanvasWidth - 92, halfCanvasHeight + 255,
      [
        'Jana Deppe, Lucas Hardt,',
        'Sofía Rodriguez,',
        'Lucas Lindstedt'
      ],
      {
        fontFamily: 'Nova Mono',
        fontSize: '14px',
        color: '#fff'
      })

    // create menu options
    this.menu = new Menu(
      this,
      this.cursors,
      this.selectKey,
      this.backKey,
      {
        leftX: halfCanvasWidth - 120,
        rightX: halfCanvasWidth - 120 + 240, // menu width = 240
        upperY: halfCanvasHeight - 200,
        lowerY: halfCanvasHeight - 200 + 300 // menu height = 300
      },
      [
        { text: 'Start game', scene: 'intro' },
        { text: 'Options', scene: 'hello-world' },
        { text: 'Credits', scene: '' },
        { text: 'Exit', scene: 'second' }
      ]
    )

    // add light effects
    this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, ImageNames.OpsRoomLight)

    const music = this.sound.add('title_music')
    music.play({
      loop: true
    })
  }

  update (): void {
    this.menu.control()
  }
}
