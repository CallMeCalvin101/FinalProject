class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player-head', 0);
        scene.add.existing(this);
        scene.physics.add.existing(this)

        // Set Properties
        //this.walkSpeed = 500;
        this.walkAcceleration = 600;
        this.drag = 0.25;
        this.dash = new Phaser.Math.Vector2();
        this.dashSpeed = 750;
        this.isAttack = false;
        this.attackDuration = 0;
        this.attackDuration_MAX = 50;
        this.body.setCollideWorldBounds(true);
        this.setDamping(true);

    }

    update() {
        // Controls Attack Logic
        if (this.isAttack == true && this.attackDuration > 0) {
            this.attackDuration -= 1;
        }
        
        if (this.attackDuration <= 0) {
            this.isAttack = false
        }

        // Controls Player Movement
        if (keyW.isDown) {
            this.setAccelerationY(-this.walkAcceleration);
        } else if (keyS.isDown) {
            this.setAccelerationY(this.walkAcceleration);
        }

        if (keyA.isDown) {
            this.setAccelerationX(-this.walkAcceleration);
        } else if (keyD.isDown) {
            this.setAccelerationX(this.walkAcceleration);
        }

        if (keyW.isUp && keyA.isUp && keyS.isUp && keyD.isUp) {
            this.setAcceleration(0);
            this.setDrag(this.drag);
        }
    }

    attack(px, py) {
        if (this.isAttack != false) {
            return;
        }
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
        this.setVelocityX(this.dirX * this.dashSpeed * Math.cos(this.angle));
        this.setVelocityY(this.dirX * this.dashSpeed * Math.sin(this.angle));
    }
}