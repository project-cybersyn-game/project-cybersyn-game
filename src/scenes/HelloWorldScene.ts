import Phaser from 'phaser'


enum ImageNames
{
    Roof = 'roof',
    Ground = 'ground',
    Dude = 'dude',
    Sign = 'sign',
    TestTiles = 'testTiles'
}

export default class HelloWorldScene extends Phaser.Scene
{
	
    //Klassenvariablen festlegen
    cursors
    player
    
    constructor()
	{
		super('hello-world')
	}

	preload()
    {
        this.load.image(ImageNames.Roof, 'images/rooftiles.png')
        this.load.image(ImageNames.Ground, 'http://labs.phaser.io/assets/textures/soil.png')
        this.load.image(ImageNames.Sign, 'http://labs.phaser.io/assets/sets/objects/sign1.png')
        this.load.spritesheet(
            ImageNames.Dude, 
            'http://labs.phaser.io/assets/sprites/dude.png', 
            {
                frameWidth: 32, 
                frameHeight: 48
            })
        this.load.image(ImageNames.TestTiles, "https://labs.phaser.io/assets/tilemaps/tiles/ground_1x1.png")
    }

    create()
    {
        
        // Karte anhand der Tile-Indizes laden
        const level = [
            [ 0, 0, 0, 10, 6, 0, 0, 0, 0, 0, 0, 10, 6, 0, 0, 0, 0, 0, 0, 10, 6, 0, 0, 0 ],
            [ 0, 0, 0, 12, 7, 2, 0, 0, 0, 0, 0, 12, 7, 2, 0, 0, 0, 0, 0, 12, 7, 2, 0, 0 ]
        ]
        const map = this.make.tilemap({ data: level, tileWidth: 32, tileHeight: 32})
        const tiles = map.addTilesetImage(ImageNames.TestTiles)
        const layer = map.createLayer(0, tiles, 0, 0)
        
        
        //this.add.image(400, 300, ImageNames.Ground).setScale(2)

        //Objektgruppen erstellen
        const signs = this.physics.add.staticGroup()
        const houses = this.physics.add.staticGroup()
        
        //statische Objekte erstellen
        signs.create(300, 400, ImageNames.Sign)

        
        //Spielfigur erstellen
        this.player = this.physics.add.sprite(100, 450, ImageNames.Dude)
        this.player.setCollideWorldBounds(true)
        
        //Animationen für Spielfigur
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(ImageNames.Dude, {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'front',
            frames: [{ key: ImageNames.Dude, frame: 4}],
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(ImageNames.Dude, {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        })

        //Collider für Spielfigur und Objekte
        this.physics.add.collider(this.player, signs)
        this.physics.add.collider(this.player, houses)

        //Pfeiltasten "erstellen"
        this.cursors = this.input.keyboard.createCursorKeys()

        
    }

    update() 
    {
        
        //Aktionen bei Pfeiltastendruck festlegen
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160)

            this.player.anims.play('left', true)
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160)

            this.player.anims.play('right', true)
        }
        else {
            this.player.setVelocityX(0)

            this.player.anims.play('front')
        }
        
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160)
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160)
        } else {
            this.player.setVelocityY(0)
        }

    }

    

}
