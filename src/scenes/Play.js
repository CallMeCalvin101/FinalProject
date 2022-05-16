class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload(){
        this.load.spritesheet('vertroll', './assets/vertroll.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 8}); 
        this.load.spritesheet('vertroll2', './assets/vertroll2.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 8}); 
        this.load.spritesheet('horizroll', './assets/horizontalroll.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 8}); 
        this.load.audio('sound', './assets/sound.wav');      

    }
    create() {
        // tilemap and collision
        const map = this.make.tilemap({key:"map", tileWidth:32, tileHeight:32});
        const tileset = map.addTilesetImage("tiles1","tiles");
        this.layer = map.createStaticLayer("toplayer", tileset,0, 0);
        this.wallLayer = map.createStaticLayer("wall", tileset, 0, 0);
        this.objectLayer = map.createStaticLayer("object",tileset, 0,0);
        this.wallLayer.setCollisionByProperty({collides: true });
        //this botom 5 lines have some problem that causes the player unable to move
        //this.physics.add.collider(this.player, wallLayer); 
        // 0,2,9,11,18,20 are the IDs for the walls.
        //wallLayer.setCollisionBetween(0,2);
        //wallLayer.setCollisionBetween(9);
        //wallLayer.setCollisionBetween(11);
        // wallLayer.setCollisionBetween(18,20);
        
        //debug the wall to see if it happen 
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        this.wallLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
        
        this.anims.create({
            key: 'rollup',
            frames: this.anims.generateFrameNumbers('vertroll', {start: 0, end: 8, first: 0}),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'sideroll',
            frames: this.anims.generateFrameNumbers('horizroll', {start: 0, end: 8, first: 0}),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'rolldown',
            frames: this.anims.generateFrameNumbers('vertroll2', {start: 0, end: 8, first: 0}),
            frameRate: 8,
            repeat: -1
        });




        // Define Keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Enables Pointer
        gamePointer = this.input.activePointer;

        // Temp Background
        //this.add.rectangle(0, 0, game.config.width, game.config.height, 0xf2f2f2).setOrigin(0);
        this.player = new Player(this, game.config.width * 1/4, game.config.height/2);

        // Adds group to store all upgrades
        this.upgradeGroup = this.add.group({
            runChildUpdate: true
        });

        this.upgradeBody = new Upgrade(this, game.config.width* 9/8, game.config.height*17/9, 'upgrade:body', "body");
        this.upgradeGroup.add(this.upgradeBody);

        // Adds Pointer Down Event for Player Attacks
        this.input.on('pointerdown', () => {
            this.player.attack(gamePointer.worldX, gamePointer.worldY);
        }, this);

        this.checkUpgrade();
        
        //collide against wall
        this.physics.add.collider(this.player, this.wallLayer); 

        // camera
        this.camera = this.cameras.main;
        this.camera.startFollow(this.player);
        this.camera.setBounds(0, 0, 3000, 3000);

         
    }


    update() {
        this.player.update();
    }

    checkUpgrade() {
        for (let type of this.upgradeGroup.getChildren()) {
            this.physics.add.collider(this.player, type, () => {
                this.upgradeEvent(type);
            }, null, this);
        }
    }

    upgradeEvent(elem) {
        if (elem.getType() == 'body') {
            this.spawnX = this.player.x;
            this.spawnY = this.player.y;
            this.player.destroy();
            this.player = new PlayerBody(this, this.spawnX, this.spawnY);
            this.resetPlayer();
            elem.destroy();
        }
    }

    resetPlayer() {
        this.camera.startFollow(this.player);
        this.physics.add.collider(this.player, this.wallLayer);
    }
}