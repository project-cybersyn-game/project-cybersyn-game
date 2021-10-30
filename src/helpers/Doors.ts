import GameScene from '../components/GameScene'

/** A door with its coordinates from GridEngine and the name of the scene to switch to. */
export interface Door {
  readonly x: integer
  readonly y: integer
  nextScene: string
}

/** This function is used to add a door to the doors array of the scene. */
export function createDoor (
  /** The scene the door should be in. */
  scene: GameScene,
  /** The x-coordinate the door is at. */
  x: integer,
  /** The y-coordinate the door it at. */
  y: integer,
  /** The scene the game should switch to when the player is interacting with the door. */
  nextScene: string
): void {
  scene.doors.push({ x: x, y: y, nextScene: nextScene })
}

/** This function is used to make the doors useable by the player. */
export function updateDoors (
  scene: GameScene
): void {
  scene.doors.forEach(door => {
    if (
      scene.gridEngine.getFacingPosition('player').equals({ x: door.x, y: door.y }) === true &&
      scene.interactionKey.isDown
    ) {
      scene.scene.switch(door.nextScene)
    }
  })
}
