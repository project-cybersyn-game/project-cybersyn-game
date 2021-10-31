import Phaser from 'phaser'
import { GridEngine } from 'grid-engine'
import { WebFontLoaderPlugin } from '../node_modules/phaser3-webfont-loader/src/webfont-loader'
import MainMenuScene from './scenes/MainMenuScene'
import StandardScene from './scenes/HelloWorldScene'
import SecondScene from './scenes/SecondScene'
import DialogueScene from './scenes/DialogueScene'

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
  scene: [StandardScene, MainMenuScene, SecondScene, DialogueScene],
  title: 'Cybersyn: The Game',
  version: '0.1',
  url: 'https://project-cybersyn-game.github.io/project-cybersyn-game/'
}

export default new Phaser.Game(config)
