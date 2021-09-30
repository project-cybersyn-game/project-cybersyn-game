import { GridEngine } from 'grid-engine'
import Phaser from 'phaser'

import StandardScene from './scenes/HelloWorldScene'
import SecondScene from './scenes/SecondScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 900,
  height: 650,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  plugins: {
    scene: [
      {
        key: 'gridEngine',
        plugin: GridEngine,
        mapping: 'gridEngine'
      }
    ]
  },
  parent: 'game-canvas',
  scene: [StandardScene, SecondScene]
}

export default new Phaser.Game(config)
