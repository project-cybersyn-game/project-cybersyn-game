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

const windowWidth = window.innerWidth
const widthWithoutMargins = windowWidth - 2 * 100

// Canvas is between 900 and 1400 pixel wide
let canvasWidth = widthWithoutMargins < 900 ? widthWithoutMargins : 900
canvasWidth = widthWithoutMargins > 1400 ? 1400 : widthWithoutMargins

// 4:3 aspect ratio
const canvasHeight = canvasWidth / 16 * 9

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: canvasWidth,
  height: canvasHeight,
  pixelArt: true,
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
  scene: [
    MainMenuScene,
    OutdoorScene,
    CorfoIndoorScene,
    EntelIndoorScene,
    EntelBasementScene,
    DialogueScene,
    OutroScene,
    IntroScene],
  title: 'Cybersyn: The Game',
  version: '0.1',
  url: 'https://project-cybersyn-game.github.io/project-cybersyn-game/'
}

// Disable hot module replacement and do a hard reload instead
/* eslint-disable */
const hot = (module as any)?.hot
if (hot) {
  hot.dispose(() => {
    window.location.reload()
    throw 'hotReload'
  })
}
/* eslint-enable */

export default new Phaser.Game(config)
