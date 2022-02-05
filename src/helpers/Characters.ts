import GameScene from '../components/GameScene'
import { Direction } from 'grid-engine'
import globalGameState from '../components/GlobalGameState'

/** This function is used for grid-based movement of a character sprite in four directions.
 *  It also prevents positioning errors that come with the GridEngine plugin and plays movement animations.
 */
export function basicMovement (
  /** The scene the player is in. */
  scene: GameScene
): void {
  const movementStartListener = scene.gridEngine.positionChangeStarted()
  const movementStopListener = scene.gridEngine.positionChangeFinished()
  const directionListener = scene.gridEngine.directionChanged()

  const movementListener = new MovementListener(scene)

  movementStartListener.subscribe((observer) => {
    if (observer.charId === scene.playerName) {
      movementAnimations(scene)
      movementListener.off()
    } else if (observer.charId.toLowerCase().includes('object')) {
      // objects can't move on it's own, so this will make the character follow a box when pushing it for example
      manualMovement(scene)
    }
  })

  movementStopListener.subscribe((observer) => {
    if (observer.charId === scene.playerName) {
      manualMovement(scene)
      movementListener.on()
    }
  })

  directionListener.subscribe((observer) => {
    movementAnimations(scene)
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
  } else {
    movementAnimations(scene)
  }
}

/** Plays player character animations according to the movement and direction. */
function movementAnimations (
  scene: GameScene
): void {
  if (!scene.gridEngine.isMoving(scene.playerName)) {
    scene.playerSprite.anims.play('idle_' + String(scene.gridEngine.getFacingDirection(scene.playerName)), true)
  } else {
    scene.playerSprite.anims.play('walk_' + String(scene.gridEngine.getFacingDirection(scene.playerName)), true)
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
        this.scene.gridEngine.getPosition(this.scene.playerName).y !== ((this.scene.gridEngine.getSprite(this.scene.playerName).getBottomCenter().y / 32) - 1) ||
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        this.scene.gridEngine.getPosition(this.scene.playerName).x !== (((this.scene.gridEngine.getSprite(this.scene.playerName).getBottomCenter().x + 15.25) / 32) - 1)
      )
    ) {
      // Position neu setzen
      this.scene.gridEngine.setPosition(this.scene.playerName, this.scene.gridEngine.getPosition(this.scene.playerName))
    }
  }
}

/** This functions creates movement animations. */
export function createAnims (
  /** The scene the player is in. */
  scene: GameScene,
  /** The name that got assigned to the spritesheet when it was loaded. */
  imageName: string
): void {
  // Animationen für Spielfigur
  // walk animations
  scene.anims.create({
    key: 'walk_left',
    frames: scene.anims.generateFrameNumbers(imageName, {
      start: 40,
      end: 47
    }),
    frameRate: 10,
    repeat: -1
  })
  scene.anims.create({
    key: 'walk_right',
    frames: scene.anims.generateFrameNumbers(imageName, {
      start: 32,
      end: 39
    }),
    frameRate: 10,
    repeat: -1
  })
  scene.anims.create({
    key: 'walk_up',
    frames: scene.anims.generateFrameNumbers(imageName, {
      start: 24,
      end: 31
    }),
    frameRate: 10,
    repeat: -1
  })
  scene.anims.create({
    key: 'walk_down',
    frames: scene.anims.generateFrameNumbers(imageName, {
      start: 16,
      end: 23
    }),
    frameRate: 10,
    repeat: -1
  })
  // idle animations
  scene.anims.create({
    key: 'idle_left',
    frames: scene.anims.generateFrameNumbers(imageName, {
      start: 14,
      end: 12
    }),
    frameRate: 5,
    repeat: -1
  })
  scene.anims.create({
    key: 'idle_right',
    frames: scene.anims.generateFrameNumbers(imageName, {
      start: 8,
      end: 11
    }),
    frameRate: 5,
    repeat: -1
  })
  scene.anims.create({
    key: 'idle_up',
    frames: scene.anims.generateFrameNumbers(imageName, {
      start: 4,
      end: 7
    }),
    frameRate: 5,
    repeat: -1
  })
  scene.anims.create({
    key: 'idle_down',
    frames: scene.anims.generateFrameNumbers(imageName, {
      start: 0,
      end: 3
    }),
    frameRate: 5,
    repeat: -1
  })
}
