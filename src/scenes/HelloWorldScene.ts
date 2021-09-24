import Phaser from 'phaser'


enum ImageNames
{
    Dude = 'dude',
    TileA1 = 'tilea1',
    TileA2 = 'tilea2',
    TileA3 = 'tilea3',
    TileA4 = 'tilea4',
    TileA5 = 'tilea5',
    TileB = 'tileb',
    TileC = 'tilec',
    TileD = 'tiled',
    TileE = 'tilee'
}

export default class HelloWorldScene extends Phaser.Scene
{
	
    //Klassenvariablen festlegen
    cursors
    player
    movementState = { 'type': 'idle', 'direction': 'down' }
    
    constructor()
	{
		super('hello-world')
	}

	preload()
    {
        // Tilemap-Bilder laden
        this.load.image(ImageNames.TileA1, 'tilesets/tilea1.png')
        this.load.image(ImageNames.TileA2, 'tilesets/tilea2.png')
        this.load.image(ImageNames.TileA3, 'tilesets/tilea3.png')
        this.load.image(ImageNames.TileA4, 'tilesets/tilea4.png')
        this.load.image(ImageNames.TileA5, 'tilesets/tilea5.png')
        this.load.image(ImageNames.TileB, 'tilesets/tileb.png')
        this.load.image(ImageNames.TileC, 'tilesets/tilec.png')
        this.load.image(ImageNames.TileD, 'tilesets/tiled.png')
        this.load.image(ImageNames.TileE, 'tilesets/tilee.png')

        // Tilemap-JSON laden
        this.load.tilemapTiledJSON('map', 'tilemaps/TestTilemap.json')

        // Spielfigur laden
        this.load.spritesheet(
            ImageNames.Dude, 
            'character_sprites/char.png', 
            {
                frameWidth: 25, 
                frameHeight: 25
            })
    }

    create()
    {
        
        // Tilemap erstellen
        const map = this.make.tilemap( {key: 'map'} )

        // Tileset-Bilder einem Array hinzufügen
        var tileset = [map.addTilesetImage( 'tilea1', ImageNames.TileA1 )]
        tileset.push(map.addTilesetImage( 'tilea2', ImageNames.TileA2 ))
        tileset.push(map.addTilesetImage( 'tilea3', ImageNames.TileA3 ))
        tileset.push(map.addTilesetImage( 'tilea4', ImageNames.TileA4 ))
        tileset.push(map.addTilesetImage( 'tilea5', ImageNames.TileA5 ))
        tileset.push(map.addTilesetImage( 'tileb', ImageNames.TileB ))
        tileset.push(map.addTilesetImage( 'tilec', ImageNames.TileC ))
        tileset.push(map.addTilesetImage( 'tiled', ImageNames.TileD ))
        tileset.push(map.addTilesetImage( 'tilee', ImageNames.TileE ))
        
        

        // Layer und Player in der richtigen Reihenfolge erstellen
        const groundLayer = map.createLayer( '1_Ground', tileset )
        const groundOverlayLayer = map.createLayer( '2_Ground_Overlay', tileset )
        this.player = this.physics.add.sprite(100, 450, ImageNames.Dude).setScale(1.5).refreshBody()
        const objectLayer = map.createLayer( '3_Objects', tileset)
        const objectOverlayLayer = map.createLayer( '4_Objects_Overlay', tileset)
        const objectOverlayOverlayLayer = map.createLayer( '5_Objects_Overlay_Overlay', tileset)

        
        // Kollisionseigenschaft spezieller Tiles entsprechender Ebenen setzen
        // Kollision ist hierbei abhängig von der in der JSON festgelegten "collide"-Variable einzelner Tiles
        objectLayer.setCollisionByProperty({ collides: true })

        // Playerkollision setzen
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, objectLayer)
        
        
        // Animationen für Spielfigur
        // walk animations
        this.anims.create({
            key: 'walk_left',
            frames: this.anims.generateFrameNumbers(ImageNames.Dude, {
                start: 40, 
                end: 47
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'walk_right',
            frames: this.anims.generateFrameNumbers(ImageNames.Dude, {
                start: 32, 
                end: 39
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'walk_up',
            frames: this.anims.generateFrameNumbers(ImageNames.Dude, {
                start: 24, 
                end: 31
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'walk_down',
            frames: this.anims.generateFrameNumbers(ImageNames.Dude, {
                start: 16, 
                end: 23
            }),
            frameRate: 10,
            repeat: -1
        })
        // idle animations
        this.anims.create({
            key: 'idle_left',
            frames: this.anims.generateFrameNumbers(ImageNames.Dude, {
                start: 14, 
                end: 12
            }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'idle_right',
            frames: this.anims.generateFrameNumbers(ImageNames.Dude, {
                start: 8, 
                end: 11
            }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'idle_up',
            frames: this.anims.generateFrameNumbers(ImageNames.Dude, {
                start: 4, 
                end: 7
            }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'idle_down',
            frames: this.anims.generateFrameNumbers(ImageNames.Dude, {
                start: 0, 
                end: 3
            }),
            frameRate: 5,
            repeat: -1
        })

        
        //Pfeiltasten "erstellen"
        this.cursors = this.input.keyboard.createCursorKeys()

        
    }

    update() 
    {
        
        //Aktionen bei Pfeiltastendruck festlegen
        // up/down
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160)
            this.movementState.type = 'walk'
            this.movementState.direction = 'up'
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160)
            this.movementState.type = 'walk'
            this.movementState.direction = 'down'
        } else {
            this.player.setVelocityY(0)

            this.movementState.type = 'idle'
        }
        // left/right
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160)
            this.movementState.type = 'walk'
            this.movementState.direction = 'left'
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160)
            this.movementState.type = 'walk'
            this.movementState.direction = 'right'
        } else {
            this.player.setVelocityX(0)
        }
        
        
        this.player.anims.play( this.movementState.type + '_' + this.movementState.direction, true )
        

    }

    

}
