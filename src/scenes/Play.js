class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload(){
        this.load.spritesheet('teleport', './assets/teleportanim.png', {frameWidth: 224, frameHeight: 32, startFrame: 0, endFrame: 4}); 
        this.load.spritesheet('vertroll', './assets/player/newroll.png', {frameWidth: 34, frameHeight: 32, startFrame: 0, endFrame: 9}); 
        this.load.spritesheet('horizroll', './assets/player/h-s.png', {frameWidth: 34, frameHeight: 32, startFrame: 0, endFrame: 3}); 
        this.load.spritesheet('f-jump', './assets/player/front-ani.png', {frameWidth: 50, frameHeight: 80, startFrame: 0, endFrame: 5}); 
        this.load.spritesheet('b-jump', './assets/player/back-ani.png', {frameWidth: 50, frameHeight: 80, startFrame: 0, endFrame: 5}); 
        this.load.spritesheet('l-jump', './assets/player/s-l.png', {frameWidth: 50, frameHeight: 80, startFrame: 0, endFrame: 5}); 
        this.load.spritesheet('r-jump', './assets/player/s-r.png', {frameWidth: 50, frameHeight: 80, startFrame: 0, endFrame: 5}); 
        this.load.spritesheet('atk-f', './assets/player/atk-f.png', {frameWidth: 50, frameHeight: 80, startFrame: 0, endFrame: 5}); 
        this.load.spritesheet('atk-b', './assets/player/atk-b.png', {frameWidth: 50, frameHeight: 80, startFrame: 0, endFrame: 5}); 
        this.load.spritesheet('atk-l', './assets/player/atk-l.png', {frameWidth: 50, frameHeight: 80, startFrame: 0, endFrame: 5}); 
        this.load.spritesheet('atk-r', './assets/player/atk-r.png', {frameWidth: 50, frameHeight: 80, startFrame: 0, endFrame: 5}); 
        this.load.spritesheet('m', './assets/player/m.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 3}); 
        this.load.spritesheet('health-blink', './assets/health/health-blink.png', {frameWidth: 50, frameHeight: 50, startFrame: 0, endFrame: 5}); 
        this.load.spritesheet('health-gone', './assets/health/health-gone.png', {frameWidth: 50, frameHeight: 50, startFrame: 0, endFrame: 4});
        this.load.spritesheet('health-on', './assets/health/health-on.png', {frameWidth: 50, frameHeight: 50, startFrame: 0, endFrame: 3});
        this.load.spritesheet('hit', './assets/b8.png', {frameWidth: 40, frameHeight: 40, startFrame: 0, endFrame: 3});       
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
        this.wallsLayer.setCollisionByProperty({collides: true });
        this.aboveLayer.setDepth(10);
         
        //this.bg_music = this.sound.add('bg_music', {mute: false, volume: 0.2, rate: 1.2, loop: true});
        //this.bg_music.play();


        //debug the wall to see if it happen 
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        
        // create player
        const newplayer = map.findObject("Objects", obj => obj.name === "Spawn");
        this.wasd= this.add.sprite(newplayer.x, newplayer.y, 'wasd');
        this.player = new Player(this, newplayer.x, newplayer.y);


        this.dummy = this.physics.add.sprite(this.player.x, this.player.y, 'teleport').setOrigin(0.07,0.45);
        this.dummy.setAlpha(0);

        //create Enemy
        this.enemies = this.add.group({
            runChildUpdate: true            // make sure update runs on group children
        });
        
        let newEnemy1 = map.filterObjects("Objects", obj => obj.name === "EnemySpawn");
        newEnemy1.map((tile) => {
            let enemy = new PatrolEnemy(this, tile.x,tile.y, 'enemy1')
            enemy.setScale(0.75, 0.75);
            this.enemies.add(enemy);
        });

        let newBoss = map.filterObjects("Objects", obj => obj.name === "bossSpawn");
        newBoss.map((tile) => {
            this.boss = new Boss(this, tile.x,tile.y, 'boss1');
            this.boss.setScale(0.25, 0.25);
            this.enemies.add(this.boss);
        });

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
         

        //player anims
        //head animation
        this.anims.create({
            key: 'rollup',
            frames: this.anims.generateFrameNumbers('vertroll', {start: 0, end: 9, first: 0}),
            frameRate: 13,
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
            key: 'backjump',
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
        this.anims.create({
            key: 'a-f',
            frames: this.anims.generateFrameNumbers('atk-f', {start: 0, end: 5, first: 0}),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'a-b',
            frames: this.anims.generateFrameNumbers('atk-b', {start: 0, end: 5, first: 0}),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'a-l',
            frames: this.anims.generateFrameNumbers('atk-l', {start: 0, end: 5, first: 0}),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'a-r',
            frames: this.anims.generateFrameNumbers('atk-r', {start: 0, end: 5, first: 0}),
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

        //health
        this.anims.create({
            key: 'healthblink',
            frames: this.anims.generateFrameNumbers('health-blink', {start: 0, end: 5, first: 0}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'healthgone',
            frames: this.anims.generateFrameNumbers('health-gone', {start: 0, end: 4, first: 0}),
            frameRate: 5,
            repeat: 0
        });
        this.anims.create({
            key: 'healthon',
            frames: this.anims.generateFrameNumbers('health-on', {start: 0, end: 3, first: 0}),
            frameRate: 5,
            repeat: 0
        });
        this.anims.create({
            key: 'hitb',
            frames: this.anims.generateFrameNumbers('hit', {start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });     
        this.anims.create({
            key: 'mouse',
            frames: this.anims.generateFrameNumbers('m', {start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });     



        
        // Define Keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Enables Pointer
        gamePointer = this.input.activePointer;



        // Adds group to store all upgrades
        this.upgradeGroup = this.add.group({
            runChildUpdate: true
        });
        
        const newbody = map.findObject("Objects", obj => obj.name === "Body");
        this.upgradeBody = new Upgrade(this, newbody.x, newbody.y, 'upgrade:body', "body");
        this.upgradeGroup.add(this.upgradeBody);

        const newsword = map.findObject("Objects", obj => obj.name === "sword1");
        this.upgradeSword = new Upgrade(this, newsword.x, newsword.y, 'upgrade:sword', "sword");
        this.upgradeGroup.add(this.upgradeSword);


        //turret
        this.turrets = this.add.group({
            runChildUpdate: true            // make sure update runs on group children
        });

        let turretLocations = map.filterObjects("Objects", obj => obj.name === "gun");
        turretLocations.map((tile) => {
            let turret = new Wallturret(this, tile.x, tile.y, "Gun");
            this.turrets.add(turret);
        });


        this.enemyAttacks = this.add.group({
            runChildUpdate: true
        });
        

        // Player Attack Handeling
        this.playerAttacks = this.add.group({
            runChildUpdate: true
        });

        // Adds Pointer Down Event for Player Attacks
        this.input.on('pointerdown', () => {
            this.player.attack(gamePointer.worldX, gamePointer.worldY, this.playerAttacks);
        }, this);

        this.physics.add.overlap(this.playerAttacks, this.boss, () => {
            this.boss.alive = false;
        }, null, this);

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


        this.obstacleGroup = this.add.group({
            runChildUpdate: true            // make sure update runs on group children
        })

        
    }
    
    
    update() {
        if (this.HP.getDead() == true) {
            this.player.alive = false;
            this.time.delayedCall(3000, () => {
                this.scene.start('deathScene');
            });
        }

        // if boss is dead return endScene
        if(this.boss.alive == false){
            this.player.alive = false;
            this.time.delayedCall(3000, () => {
                this.scene.start('endScene');
            });
        }

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

        this.player.update();

        for (let turret of this.turrets.getChildren()) {
            if (Phaser.Math.Distance.Between(this.player.x, this.player.y, turret.x, turret.y) < turret.range) {
                turret.attack(this.player.x, this.player.y, this.enemyAttacks);
                for (let hitbox of this.enemyAttacks.getChildren()) {
                    this.physics.add.collider(this.player, hitbox, () => {
                        this.player.collideWithEnemy(hitbox);
                        this.HP.lowerHP(2);
                        hitbox.destroy();
                    }, null, this);

                    this.physics.add.collider(this.wallsLayer, hitbox, () => {
                        hitbox.destroy();
                    }, null, this);
                }
            }   
        }  
    }


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
            // play attack insturction on the ground, but something went wrong. 
            // sprite key 'm1', animation key 'mouse'
            //this.mouse = this.add.sprite(this,this.spawnX,this.spawnY,'m1');
            //this.mouse.play('mouse',true);
            //
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


        // Adds Collisions to Walls & Enemies
        // this.physics.add.collider(this.player, this.wallsLayer); 
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