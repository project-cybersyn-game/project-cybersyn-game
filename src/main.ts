import Phaser from 'phaser'
import { GridEngine } from 'grid-engine'
import { WebFontLoaderPlugin } from '../node_modules/phaser3-webfont-loader/src/webfont-loader'
import MainMenuScene from './scenes/MainMenuScene'
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
    ],
    global: [
      {
        key: 'WebFontLoader',
        plugin: WebFontLoaderPlugin,
        start: true
      }
    ]
  },
  parent: 'game-canvas',
  scene: [MainMenuScene, StandardScene, SecondScene]
}

export default new Phaser.Game(config)
