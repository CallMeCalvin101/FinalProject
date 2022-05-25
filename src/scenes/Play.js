class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload(){
        this.load.spritesheet('vertroll', './assets/vertroll.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 8}); 
        this.load.spritesheet('horizroll', './assets/horizontalroll.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 8}); 
        this.load.audio('bg_music', './assets/bg_music.wav');
        this.load.spritesheet('wall', './assets/canon4.png', {frameWidth: 50, frameHeight: 50, startFrame: 0, endFrame: 7});       
    }
    create() {
        // tilemap and collision
        const map = this.make.tilemap({key:"map", tileWidth:32, tileHeight:32});
        const tileset = map.addTilesetImage("tiles1","tiles");
        
        this.floorLayer = map.createStaticLayer("floor", tileset,0, 0);
        this.wallsLayer = map.createStaticLayer("walls", tileset, 0, 0);
        this.aboveLayer = map.createStaticLayer("above_player", tileset);
        this.tpLayer = map.createStaticLayer("tpright", tileset);
        this.tpupLayer = map.createStaticLayer("tpup", tileset);
        this.tpdownLayer = map.createStaticLayer("tpdown", tileset);
        this.tpleftLayer = map.createStaticLayer("tpleft", tileset);
        this.wallsLayer.setCollisionByProperty({collides: true });
        this.tpLayer.setCollisionByProperty({collides: true });
        this.tpupLayer.setCollisionByProperty({collides: true });
        this.tpdownLayer.setCollisionByProperty({collides: true });
        this.tpleftLayer.setCollisionByProperty({collides: true });
        this.aboveLayer.setDepth(10);
        
        //this.bg_music = this.sound.add('bg_music', {mute: false, volume: 0.2, rate: 1.2, loop: true});
        //this.bg_music.play();


        //debug the wall to see if it happen 
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        this.wallsLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
        
        // create player
        const newplayer = map.findObject("Objects", obj => obj.name === "Spawn");
        //const newplayer1 = map.findObject("Objects", obj => obj.name === "Spawn1");
        this.player = new Player(this, newplayer.x, newplayer.y, "player-head");
         
        this.anims.create({
            key: 'rollup',
            frames: this.anims.generateFrameNumbers('vertroll', {start: 0, end: 7, first: 0}),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'sideroll',
            frames: this.anims.generateFrameNumbers('horizroll', {start: 0, end: 7, first: 0}),
            frameRate: 12,
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
        //const p1Spawn = map.findObject("Objects", obj => obj.name === "Spawn");
        //this.p1 = this.physics.add.sprite(p1Spawn.x, p1Spawn.y, "robot", 450);
        //this.player = new Player(this, game.config.width * 1/4, game.config.height/2);


        // Adds group to store all upgrades
        this.upgradeGroup = this.add.group({
            runChildUpdate: true
        });
        
        this.upgradeBody = new Upgrade(this, game.config.width* 7/8, game.config.height*14/9, 'upgrade:body', "body");
        this.upgradeGroup.add(this.upgradeBody);


        // Adds Pointer Down Event for Player Attacks
        this.input.on('pointerdown', () => {
            this.player.attack(gamePointer.worldX, gamePointer.worldY);
        }, this);

        this.checkUpgrade();
        
        //collide against wall
        
        this.physics.add.collider(this.player, this.wallsLayer); 
        //this.physics.add.collider(this.player, this.tpLayer); 

        //jump tile
        //right
        this.temp = new JumpTile(this, 0, 0, "player-body", "right");
        this.physics.add.collider(this.player, this.tpLayer, () => {
            this.temp.jump(this.player);
        });
        //up
        this.up = new JumpTile(this, 0, 0, "player-body", "up");
        this.physics.add.collider(this.player, this.tpupLayer, () => {
            this.up.jump(this.player);
        });
        this.down = new JumpTile(this, 0, 0, "player-body", "down");
        this.physics.add.collider(this.player, this.tpdownLayer, () => {
            this.down.jump(this.player);
        });
        this.left = new JumpTile(this, 0, 0, "player-body", "left");
        this.physics.add.collider(this.player, this.tpleftLayer, () => {
            this.left.jump(this.player);
        });
        // camera
        this.camera = this.cameras.main;
        this.camera.startFollow(this.player);
        this.camera.setBounds(0, 0, 5000, 5000);
         
        this.ind = this.physics.add.image(this, 100, 100, 'indicator', 0);
        //create groups for wall objects

        //enemy
        this.e1 = new Enemies(this, 'enemyhead', 3, true);
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