import Phaser from 'phaser'

export default class IntroScene extends Phaser.Scene {
  constructor () {
    super('intro')
  }

  preload (): void {
    this.load.audio('intro_music', ['sounds/intro.mp3'])
  }

  create (): void {
    const text = this.add.text(+this.game.config.width / 2 - 300, +this.game.config.height / 2 - 200,
      'You are Alba García, assistant to Fernando Flores. Sr. Flores is the head of CORFO, the State Development Corporation of Chile. You are on your way to work. The year is 1971. Welcome to Santiago de Chile!',
      {
        fontFamily: 'Nova Mono',
        fontSize: '30px',
        color: '#FFFFFF',
        align: 'center',
        wordWrap: { width: 600 }
      })

    const music = this.sound.add('intro_music')
    music.play({
      volume: 0.5
    })

    this.time.delayedCall(20000, () => {
      text.destroy()
      this.tweens.add({
        targets: music,
        ease: 'Linear',
        duration: 10000,
        volume: 0
      })
      this.scene.run('outdoor')
    }, [], this)
  }
}
