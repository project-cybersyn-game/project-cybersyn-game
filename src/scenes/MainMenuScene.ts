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

    // preload the menu dependencies
    Menu.preload(this)
  }

  create (): void {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.selectKey = this.input.keyboard.addKey('ENTER')
    this.backKey = this.input.keyboard.addKey('ESC')

    this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, ImageNames.OpsRoom)

    // display header
    this.add.text(335, 40,
      [
        'CYBERSYN',
        'Main Menu'
      ],
      {
        fontFamily: 'Nova Mono',
        fontSize: '20px',
        color: '#000'
      })

    // display game-info
    this.add.text(665, 545, 'GAMEINFO',
      {
        fontFamily: 'Nova Mono',
        fontSize: '20px',
        color: '#000'
      })
    this.add.text(630, 580,
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
    this.add.text(395, 545, 'DEVELOPERS',
      {
        fontFamily: 'Nova Mono',
        fontSize: '20px',
        color: '#000'
      })
    this.add.text(355, 580,
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
      { leftX: 330, rightX: 570, upperY: 120, lowerY: 400 },
      [
        { text: 'Start game', scene: 'outdoor' },
        { text: 'Options', scene: 'hello-world' },
        { text: 'Credits', scene: '' },
        { text: 'Exit', scene: 'second' }
      ]
    )

    // add light effects
    this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, ImageNames.OpsRoomLight)
  }

  update (): void {
    this.menu.control()
  }
}
