import GameScene from '../components/GameScene'
import { Direction } from 'grid-engine'
import globalGameState from '../components/GlobalGameState'

/** This function is used for grid-based movement of a character sprite in four directions.
 *  It also prevents positioning errors that come with the GridEngine plugin.
 */
export function basicMovement (
  /** The scene the player is in. */
  scene: GameScene
): void {
  const movementStartListener = scene.gridEngine.positionChangeStarted()
  const movementStopListener = scene.gridEngine.positionChangeFinished()

  const movementListener = new MovementListener(scene)

  movementStartListener.subscribe((observer) => {
    if (observer.charId === scene.playerName) {
      movementListener.off()
    } else if (observer.charId.toLowerCase().includes('object')) {
      // objects can't move on it's own, so this will make the character follow a box when pushing it for example
      manualMovement(scene)
    }
  })

  movementStopListener.subscribe((observer) => {
    scene.characterMoved = true
    if (observer.charId === scene.playerName) {
      manualMovement(scene)
      movementListener.on()
    }
  })

  globalGameState.on('inDialogue', (value: boolean) => {
    if (value) {
      movementListener.off()
    } else {
      movementListener.on()
    }
  })
}

/** manually checks if a key is down without events */
function manualMovement (
  scene: GameScene
): void {
  if (scene.cursors.up.isDown) {
    scene.gridEngine.move(scene.playerName, Direction.UP)
  } else if (scene.cursors.left.isDown) {
    scene.gridEngine.move(scene.playerName, Direction.LEFT)
  } else if (scene.cursors.down.isDown) {
    scene.gridEngine.move(scene.playerName, Direction.DOWN)
  } else if (scene.cursors.right.isDown) {
    scene.gridEngine.move(scene.playerName, Direction.RIGHT)
  }
}

/** This class manages the movement Listeners of a scene. */
class MovementListener {
  scene!: GameScene

  constructor (
    scene: GameScene
  ) {
    this.scene = scene
    if (!globalGameState._gameProgress.inDialogue) {
      this.on()
    }
  }

  /** Enables listeners for all directions. */
  on (): void {
    this.correctPosition()
    this.scene.cursors.up.on('down', () => {
      this.scene.gridEngine.move(this.scene.playerName, Direction.UP)
    })
    this.scene.cursors.left.on('down', () => {
      this.scene.gridEngine.move(this.scene.playerName, Direction.LEFT)
    })
    this.scene.cursors.down.on('down', () => {
      this.scene.gridEngine.move(this.scene.playerName, Direction.DOWN)
    })
    this.scene.cursors.right.on('down', () => {
      this.scene.gridEngine.move(this.scene.playerName, Direction.RIGHT)
    })
  }

  /** Diables all listeners. */
  off (): void {
    this.scene.cursors.up.off('down')
    this.scene.cursors.left.off('down')
    this.scene.cursors.down.off('down')
    this.scene.cursors.right.off('down')
  }

  /** This method corrects if the GridEngine position fits the Phaser position. */
  private correctPosition (): void {
    if (
      !this.scene.gridEngine.isMoving(this.scene.playerName) &&
      (
        this.scene.gridEngine.getPosition(this.scene.playerName).y !== Math.floor(((this.scene.gridEngine.getSprite(this.scene.playerName).getBottomCenter().y - 1.5) / this.scene.map.tileHeight)) ||
        this.scene.gridEngine.getPosition(this.scene.playerName).x !== Math.floor(((this.scene.gridEngine.getSprite(this.scene.playerName).getBottomCenter().x) / this.scene.map.tileWidth))
      )
    ) {
      // Position neu setzen
      console.log('correctPosition!')
      this.scene.gridEngine.setPosition(this.scene.playerName, this.scene.gridEngine.getPosition(this.scene.playerName))
    }
  }
}
