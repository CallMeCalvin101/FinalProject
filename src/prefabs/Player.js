class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture = 'player-head') {
        super(scene, x, y, texture, 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Set Properties
        this.walkAcceleration = 600;
        this.maxSpeed = 300;
        this.setMaxVelocity(this.maxSpeed);
        this.drag = 0.25;
        this.dash = new Phaser.Math.Vector2();
        this.dashSpeed = 700;
        this.isAttack = false;
        this.attackDuration = 0;
        this.attackDuration_MAX = 50;
        //this.body.setCollideWorldBounds(true);
        this.setDamping(true);
    }

    preload(){
        this.load.audio('sound', './assets/sound.wav');      
    }

    update() {

        // Controls Attack Logic
        if (this.isAttack == true && this.attackDuration > 0) {
            this.attackDuration -= 1;
        }

        if (this.attackDuration <= 0) {
            this.isAttack = false
            this.setMaxVelocity(this.maxSpeed);
        }
        
        // Controls Player Movement
        if (keyW.isDown) {
            this.setAccelerationY(-this.walkAcceleration);
            //this if/else chooses which animation to play based on if player is upside down or not
            if((-1.5 < this.rotation) && (this.rotation < 1.5)){ 
                this.play('rollup', true);
            }
            else{this.play('rolldown', true);}
    
        } else if (keyS.isDown) {
            this.setAccelerationY(this.walkAcceleration);
            //this if/else chooses which animation to play based on if player is upside down or not
            if((-1.5 < this.rotation) && (this.rotation < 1.5)){
                this.play('rolldown', true);
            }
            else{this.play('rollup', true);}

            // this.play('rolldown', true);

        } else {
            //both uprolling and downrolling animation are stopped 
            //if key is W or S key is not being pressed down
            this.play('rollup', false);    
            this.play('rolldown', false); 
        }


        if (keyA.isDown) {
            this.setAccelerationX(-this.walkAcceleration);
            this.setRotation(this.rotation - (5.5*(Math.PI/180)));


        } else if (keyD.isDown) {
            this.setAccelerationX(this.walkAcceleration);
            this.setRotation(this.rotation + (5.5*(Math.PI/180)));
        }

        if (keyW.isUp && keyS.isUp) {
            this.setAccelerationY(0);
            this.setDragY(this.drag);
        }

        if (keyA.isUp && keyD.isUp) {
            this.setAccelerationX(0);
            this.setDragX(this.drag);
        }
    }

    attack(px, py) {
        if (this.isAttack != false) {
            return;
        }
        // this.sound.play('sound');
        // Grabs the angle by calculating this dist to x, y
        this.dirX = 1;
        this.dx = px - this.x;
        if (this.dx < 0) {
            this.dirX = -1;
        }

        this.dirY = 1;
        this.dy = py - this.y;
        if (this.dy < 0) {
            this.dirY = -1;
        }

        this.angle = Math.atan(this.dy/this.dx);

        this.isAttack = true;
        this.attackDuration = this.attackDuration_MAX;
        this.setMaxVelocity(this.dashSpeed);
        this.setVelocityX(this.dirX * this.dashSpeed * Math.cos(this.angle));
        this.setVelocityY(this.dirX * this.dashSpeed * Math.sin(this.angle));
    }
}