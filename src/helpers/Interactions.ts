import GameScene from '../components/GameScene'

/** A door with its coordinates from GridEngine and the name of the scene to switch to. */
export interface Door {
  readonly x: integer
  readonly y: integer
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
    if (
      scene.gridEngine.getFacingPosition('player').equals({ x: door.x, y: door.y }) === true &&
      scene.interactionKey.isDown
    ) {
      scene.scene.switch(door.nextScene)
    }
  })
}

/** This function is for interacting with NPCs and then executing the action set in the associated NPC object. */
export function npcInteraction (
  scene: GameScene
): void {
  scene.npcs.forEach(npc => {
    if (
      scene.gridEngine.getFacingPosition('player').equals(scene.gridEngine.getPosition(npc.name)) === true &&
      scene.interactionKey.isDown
    ) {
      npc.action(scene, npc.name)
    }
  })
}
