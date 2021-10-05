import GameScene from '../components/GameScene'

/** A door with its coordinates from GridEngine and the name of the scene to switch to. */
export interface Door {
  x: integer
  y: integer
  nextScene: string
}

/** This function is used to add a door to the doors array of the scene. */
export function createDoor (
  scene: GameScene,
  x: integer,
  y: integer,
  nextScene: string
): void {
  scene.doors.push({ x: x, y: y, nextScene: nextScene })
}

/** This function is used to make the doors useable by the player. */
export function updateDoors (
  scene: GameScene
): void {
  scene.doors.forEach(door => {
    console.debug(scene.gridEngine.getFacingPosition('player').equals({ x: door.x, y: door.y }) === true &&
    scene.interactionKey.isDown)
    if (
      scene.gridEngine.getFacingPosition('player').equals({ x: door.x, y: door.y }) === true &&
      scene.interactionKey.isDown
    ) {
      scene.scene.switch(door.nextScene)
    }
  })
}
