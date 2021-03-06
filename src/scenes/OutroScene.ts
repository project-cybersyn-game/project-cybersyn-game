import Phaser from 'phaser'

export default class OutroScene extends Phaser.Scene {
  constructor () {
    super('outro')
  }

  preload (): void {
    this.load.audio('outro_music', ['sounds/outro.mp3', 'sounds/outro.ogg'])
  }

  create (): void {
    // display header
    this.add.text(+this.game.config.width / 2 - 200, +this.game.config.height / 2 - 200,
      'The End',
      {
        fontFamily: 'Nova Mono',
        fontSize: '100px',
        color: '#FFFFFF',
        align: 'center'
      })

    this.add.text(+this.game.config.width / 2 - 300, +this.game.config.height / 2 - 350,
      `Thank you for playing prototype version ${this.game.config.gameVersion} of Cybersyn - The Game`,
      {
        fontFamily: 'Nova Mono',
        fontSize: '30px',
        color: '#FFFFFF',
        align: 'center',
        wordWrap: { width: 600 }
      })

    const music = this.sound.add('outro_music')
    music.play({
      volume: 0.5,
      loop: true
    })
  }
}
