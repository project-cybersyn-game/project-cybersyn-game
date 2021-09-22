import Phaser from 'phaser'

import StandardScene from './scenes/HelloWorldScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 900,
  height: 800,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [StandardScene]
}

export default new Phaser.Game(config)
