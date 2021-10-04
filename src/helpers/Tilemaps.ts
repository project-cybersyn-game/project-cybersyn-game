import Phaser from 'phaser'

interface TilesetInfo {
  tilesetName: string
  image: string
}

interface tileMapAndSet {
  tilemap: Phaser.Tilemaps.Tilemap
  tileset: Phaser.Tilemaps.Tileset[]
}

/** This function is used to create an array of tilesets used for a tilemap. */
export function createTileset (
  tilemap: Phaser.Tilemaps.Tilemap,
  tilesetInfo: TilesetInfo[]
): Phaser.Tilemaps.Tileset[] {
  const tilesetArray: Phaser.Tilemaps.Tileset[] = []

  tilesetInfo.forEach(infoObject =>
    tilesetArray.push(tilemap.addTilesetImage(infoObject.tilesetName, infoObject.image))
  )

  return tilesetArray
}

/** This function is used to create multiple layers for a tilemap. */
export function createAllLayers (
  tilemap: Phaser.Tilemaps.Tilemap,
  tileset: Phaser.Tilemaps.Tileset[],
  layerNames: string[]
): void {
  layerNames.forEach(layerName =>
    tilemap.createLayer(layerName, tileset)
  )
}

/** This function is used to create an array of tilesets used for a scene and a tilemap. */
export function createMap (
  scene: Phaser.Scene,
  tilemapTiledJSONKey: string,
  tilesetInfo: TilesetInfo[],
  layerNames: string[]
): tileMapAndSet {
  const tilemap: Phaser.Tilemaps.Tilemap = scene.make.tilemap({ key: tilemapTiledJSONKey })

  const tileset = createTileset(tilemap, tilesetInfo)

  createAllLayers(tilemap, tileset, layerNames)

  return { tilemap: tilemap, tileset: tileset }
}
