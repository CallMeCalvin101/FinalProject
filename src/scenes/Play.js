class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload(){
        this.load.spritesheet('teleport', './assets/teleportanim.png', {frameWidth: 224, frameHeight: 32, startFrame: 0, endFrame: 4}); 
        this.load.spritesheet('vertroll', './assets/player/h-v.png', {frameWidth: 34, frameHeight: 32, startFrame: 0, endFrame: 3}); 
        this.load.spritesheet('horizroll', './assets/player/h-s.png', {frameWidth: 34, frameHeight: 32, startFrame: 0, endFrame: 3}); 
        this.load.spritesheet('f-jump', './assets/player/front-ani.png', {frameWidth: 50, frameHeight: 80, startFrame: 0, endFrame: 5}); 
        this.load.spritesheet('b-jump', './assets/player/back-ani.png', {frameWidth: 50, frameHeight: 80, startFrame: 0, endFrame: 5}); 
        this.load.spritesheet('l-jump', './assets/player/s-l.png', {frameWidth: 50, frameHeight: 80, startFrame: 0, endFrame: 5}); 
        this.load.spritesheet('r-jump', './assets/player/s-r.png', {frameWidth: 50, frameHeight: 80, startFrame: 0, endFrame: 5}); 

        this.load.audio('bg_music', './assets/bg_music.wav');
        this.load.audio('bg', './assets/bg.mp3');
        this.load.audio('fizz', './assets/fizz.mp3');
        this.load.audio('softbell', './assets/softbell.mp3');
        this.load.audio('hit', './assets/hit.mp3');
        this.load.audio('bg_layer', './assets/bg_layer.mp3');
        this.load.audio('upgrade', './assets/upgrade.mp3');
        this.load.audio('wind', './assets/wind.mp3');
        this.load.audio('upgrade', './assets/upgrade.mp3');
        this.load.spritesheet('wall', './assets/canon4.png', {frameWidth: 50, frameHeight: 50, startFrame: 0, endFrame: 7});       
    }
    create() {
        this.sound.play('bg_layer', {volume:0.4, loop: true});
        // tilemap and collision
        const map = this.make.tilemap({key:"map", tileWidth:32, tileHeight:32});
        const tileset = map.addTilesetImage("tiles1","tiles");
        this.floorLayer = map.createLayer("floor", tileset,0, 0);
        this.wallsLayer = map.createLayer("walls", tileset, 0, 0);
        this.aboveLayer = map.createLayer("above_player", tileset);
        this.tprightlayer = map.createLayer("tpright", tileset);
        this.tpupLayer = map.createLayer("tpup", tileset);
        this.tpdownLayer = map.createLayer("tpdown", tileset);
        this.tpleftLayer = map.createLayer("tpleft", tileset);
        this.wallsLayer.setCollisionByProperty({collides: true });
        this.aboveLayer.setDepth(10);
    
        //this.bg_music = this.sound.add('bg_music', {mute: false, volume: 0.2, rate: 1.2, loop: true});
        //this.bg_music.play();


        //debug the wall to see if it happen 
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        // this.wallsLayer.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });
        
        // create player
        const newplayer = map.findObject("Objects", obj => obj.name === "Spawn");
        this.player = new Player(this, newplayer.x, newplayer.y);

        //this.player = new PlayerSword(this, newplayer.x, newplayer.y);

        //this.player = new Player(this, 1119, 1187, "player-head"); //for starting player head right at body upgrade
        this.dummy = this.physics.add.sprite(this.player.x, this.player.y, 'teleport').setOrigin(0.07,0.45);
        this.dummy.setAlpha(0);
        // dummy.body.setCollideWorldBounds(true);
        //create Enemy
        this.enemies = this.add.group({
            runChildUpdate: true            // make sure update runs on group children
        });
        
        let newEnemy1 = map.filterObjects("Objects", obj => obj.name === "EnemySpawn");
        newEnemy1.map((tile) => {
            this.enemy = new PatrolEnemy(this, tile.x,tile.y, 'enemy1')
            this.enemies.add(this.enemy);
        });
        this.enemies.children.iterate((child) => {
            child.setScale(0.75, 0.75);
          });
        //const newEnemy2 = map.findObject("Objects", obj => obj.name === "Enemy1");
        //this.enemy = new BasicEnemy(this, newEnemy2.x,newEnemy2.y,'newenemy');

        this.particleManager = this.add.particles('cross');
        this.emitterconfig = 
        { 
            x: this.player.x,
            y: this.player.y,
            lifespan: 100, 
            speed: 90,
            scale: { start: 1, end: 0.5 },
            alpha: { start: 1, end: 0 },
            // higher steps value = more time to go btwn min/max
            lifespan: { min: 10, max: 7000, steps: 500 }}
        this.fromEmitter = this.particleManager.createEmitter(this.emitterconfig);
        this.fromEmitter.explode();

        // var angleConfig = {min: 83, max: 97};
        // var speedConfig = {min: 0, max: 110};
        // var scaleConfig = {start: 0.2, end: 0, ease: 'Linear'};
        // var alphaConfig = {start: 1, end: 0, ease: 'Linear'};
        this.robotEmitConfig = 
        {
            x: this.player.x,
            y: this.player.y,
            lifespan: 120,
            gravityY: 700,
            speed: {min: 90, max: 120},
            angle: {min: 85, max: 95},
            scale: {start: 0.3, end: 0, ease: 'Linear'},
            alpha: {start: 1, end: 0.5, ease: 'Linear'},
            blendMode: 'SCREEN'
        }
        this.robotEmitter = this.add.particles('particleblue').createEmitter(this.robotEmitConfig);
        this.robotEmitter.pause();

        
       // const newEnemy2 = map.findObject("Objects", obj => obj.type === "Enemy");
       // this.enemies = this.add.group();
        //for (let i = 0; i < 4; i++){
        //    const e = new PatrolEnemy(this, newEnemy2.x, newEemy2.y, 'enemy1');
         //   this.enemies.add(e)
        //}
        
        //this.player = new PlayerSword(this, 200, 200);
         

        //player anims
        //head animation
        this.anims.create({
            key: 'rollup',
            frames: this.anims.generateFrameNumbers('vertroll', {start: 0, end: 3, first: 0}),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'sideroll',
            frames: this.anims.generateFrameNumbers('horizroll', {start: 0, end: 3, first: 0}),
            frameRate: 12,
            repeat: -1
        });
        //player body
        this.anims.create({
            key: 'frontjump',
            frames: this.anims.generateFrameNumbers('f-jump', {start: 0, end: 5, first: 0}),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'bcakjump',
            frames: this.anims.generateFrameNumbers('b-jump', {start: 0, end: 5, first: 0}),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'leftjump',
            frames: this.anims.generateFrameNumbers('l-jump', {start: 0, end: 5, first: 0}),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'rightjump',
            frames: this.anims.generateFrameNumbers('r-jump', {start: 0, end: 5, first: 0}),
            frameRate: 12,
            repeat: -1
        });
        
        //teleport 
        this.anims.create({
            key: 'teleport',
            frames: this.anims.generateFrameNumbers('teleport', {start: 0, end: 4, first: 0}),
            frameRate: 19,
            repeat: 0
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
        
        const newbody = map.findObject("Objects", obj => obj.name === "Body");
        this.upgradeBody = new Upgrade(this, newbody.x, newbody.y, 'upgrade:body', "body");
        this.upgradeGroup.add(this.upgradeBody);

        //turret
        this.turrets = this.add.group({
            runChildUpdate: true            // make sure update runs on group children
        });
        const turret = map.findObject("Objects", obj => obj.type === "gun");
        this.turret1 = new Wallturret(this, turret.x,turret.y, 'Gun');
        this.turrets.add(this.turret1);
        
        
        this.upgradeSword = new Upgrade(this, 500, 500, 'upgrade:sword', "sword");
        this.upgradeGroup.add(this.upgradeSword);

        // Player Attack Handeling
        this.playerAttacks = this.add.group({
            runChildUpdate: true
        });

        // Adds Pointer Down Event for Player Attacks
        this.input.on('pointerdown', () => {
            this.player.attack(gamePointer.worldX, gamePointer.worldY, this.playerAttacks);
        }, this);

        // Implements collisions between player attacks and enemies
        this.physics.add.overlap(this.playerAttacks, this.enemies, attackHit, null, this);
        function attackHit (attack, enemy) {
            enemy.destroy();
        }     

        // Jump Implementation
        this.jumpTiles = this.add.group();

        // Reads from object jump tiles based on direction and adds to the group
        let rightJTLocations = map.filterObjects("Objects", obj => obj.name === "right");
        rightJTLocations.map((tile) => {
            let rightTile = new JumpTile(this, tile.x, tile.y, "player-head", "right");
            this.jumpTiles.add(rightTile);
        });

        let leftJTLocations = map.filterObjects("Objects", obj => obj.name === "left");
        leftJTLocations.map((tile) => {
            let leftTile = new JumpTile(this, tile.x, tile.y, "player-head", "left");
            this.jumpTiles.add(leftTile);
        });

        let upJTLocations = map.filterObjects("Objects", obj => obj.name === "up");
        upJTLocations.map((tile) => {
            let upTile = new JumpTile(this, tile.x, tile.y, "player-head", "up");
            this.jumpTiles.add(upTile);
        });

        let downJTLocations = map.filterObjects("Objects", obj => obj.name === "down");
        downJTLocations.map((tile) => {
            let downTile = new JumpTile(this, tile.x, tile.y, "player-head", "down");
            this.jumpTiles.add(downTile);
        });


        // camera
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, 5000, 5000);

        this.resetPlayer();

        this.HP = new HpUi(this);

        //enemy
        // this.e1 = new Enemies(this, 'enemyhead', 3, true);

        this.obstacleGroup = this.add.group({
            runChildUpdate: true            // make sure update runs on group children
        })

        
    }
    
    
    update() {
        this.dummy.setPosition(this.player.x, this.player.y); //dummy sprite used for telport anim - should track where player is
        this.fromEmitter.setPosition(this.player.x, this.player.y);
        this.robotEmitter.setPosition(this.player.x, this.player.y+25);
        if(this.player.isteleport){ 
            this.dummy.play('teleport', true);
            this.robotEmitter.setAlpha(0);
        }
        else{
            this.dummy.play('teleport', false)
            this.robotEmitter.setAlpha(1);
        }

        //this.updateIndicator();
        this.player.update();
        this.enemy.update();
        // enemy kill player
        //let distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemy.x, this.enemy.y);
        //if (this.player.body.speed > 0){
        //if (distance < 300)
        //    {
            //this.enemy.body.reset(this.player.x, this.player.y);
        //      this.physics.moveToObject(this.enemy, this.player, 300);
            //this.player.body.reset(50,50);
        //    }
        //};
       
        //turret bullet
        let distance1 = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.turrets.x, this.turrets.y);
        if (distance1 < 300)
    {
        if ( this.nextFire && this.bullets.countDead() > 0)
        {
            this.nextFire = this.game.time.now + this.fireRate;

            var bullet = this.bullets.getFirstDead();

            bullet.reset(this.turret.x, this.turret.y);

            bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
        }
    }


        //////////////////
    }

    /*updateIndicator() {
        this.attackIndicator.setPosition(this.player.x, this.player.y);

        // Gets Angle for Cursor
        this.dx = gamePointer.worldX - this.player.x;
        this.dy = gamePointer.worldY - this.player.y;
        this.angle = Math.atan(this.dy/this.dx);

        if (this.dx < 0) {
            this.angle += Math.PI;
        }

        this.attackIndicator.setRotation(this.angle);
    }*/


    checkUpgrade() {
        for (let type of this.upgradeGroup.getChildren()) {
            this.physics.add.collider(this.player, type, () => {
                this.robotEmitter.resume();
                this.upgradeEvent(type);
            }, null, this);
        }
    }

    upgradeEvent(elem) {
        this.spawnX = this.player.x;
        this.spawnY = this.player.y;
        if (elem.getType() == 'body') {
            this.player.destroy();
            this.player = new PlayerBody(this, this.spawnX, this.spawnY);
            this.resetPlayer();
            elem.destroy();
            this.sound.play('upgrade');
        } else if (elem.getType() == 'sword') {
            this.player.destroy();
            this.player = new PlayerSword(this, this.spawnX, this.spawnY);
            this.resetPlayer();
            elem.destroy();
            this.sound.play('upgrade');
        }
        this.HP.gainHP(1);
    }

    resetPlayer() {
        this.camera.startFollow(this.player);
        this.physics.add.collider(this.player, this.wallsLayer);


        // Adds Collisions to Walls & Enemies
        this.physics.add.collider(this.player, this.wallsLayer); 
        this.physics.add.collider(this.enemies, this.wallsLayer);
        for (let enemy of this.enemies.getChildren()) {
            this.physics.add.collider(this.player, enemy, () => {
                this.player.collideWithEnemy(enemy);
                this.HP.lowerHP(2);
            }, null, this);
        }
        this.physics.add.collider(this.enemies, this.enemies);

        // Adds Collisions to Jumptiles
        this.physics.add.overlap(this.player, this.jumpTiles, playerJump, null, this);
        function playerJump (player, tile) {
            this.player.setAlpha(0);
            this.dummy.setAlpha(0.7);
            player.isteleport = true;
            if (tile.direction == "left") {
                this.dummy.setAngle(180)
            } else if (tile.direction == "right") {
                this.dummy.setAngle(0)
            } else if (tile.direction == "up") {
                this.dummy.setAngle(270)
            } else if (tile.direction == "down") {
                this.dummy.setAngle(90)
            }
            //set position of from emitter and make explode
            this.fromEmitter.setPosition(tile.x + 16, tile.y-16);
            this.fromEmitter.frequency = 1;
            this.fromEmitter.explode();
            this.time.delayedCall(200, ()=>{tile.jump(player);});
        }

        this.checkUpgrade();
    }

    
    
}