import Phaser from 'phaser'
import { GridEngine } from 'grid-engine'
import { WebFontLoaderPlugin } from '../node_modules/phaser3-webfont-loader/src/webfont-loader'
import MainMenuScene from './scenes/MainMenuScene'
import OutdoorScene from './scenes/OutdoorScene'
import DialogueScene from './scenes/DialogueScene'
import CorfoIndoorScene from './scenes/CorfoIndoorScene'
import EntelIndoorScene from './scenes/EntelIndoorScene'
import EntelBasementScene from './scenes/EntelBasementScene'
import OutroScene from './scenes/OutroScene'
import IntroScene from './scenes/IntroScene'

// comment for testing github

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
  scene: [MainMenuScene, OutdoorScene, CorfoIndoorScene, EntelIndoorScene, EntelBasementScene, DialogueScene, OutroScene, IntroScene],
  title: 'Cybersyn: The Game',
  version: '0.1',
  url: 'https://project-cybersyn-game.github.io/project-cybersyn-game/'
}

export default new Phaser.Game(config)
