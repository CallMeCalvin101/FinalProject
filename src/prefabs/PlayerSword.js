class PlayerSword extends Player {
    constructor(scene, x, y) {
        super(scene, x, y, 'player-sword');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Set Properties for Player
        this.walkAcceleration = 900;
        this.maxSpeed = 350;
        this.setMaxVelocity(this.maxSpeed);
        this.drag = 0.01;
        this.dashSpeed = 50;
        this.isAttack = false;
        this.attackDuration = 0;
        this.attackDuration_MAX = 25;
        this.scene = scene;
        //this.body.setCollideWorldBounds(true);
        this.setDamping(true);

        // Set Properties for Sword Attack
        this.swordOffset = 100;
        this.rotate = 32;
        this.numHitbox = 7;
        this.hitboxDur = this.attackDuration_MAX;
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
        } else if (keyS.isDown) {
            this.setAccelerationY(this.walkAcceleration);
        }

        if (keyA.isDown) {
            this.setAccelerationX(-this.walkAcceleration);
        } else if (keyD.isDown) {
            this.setAccelerationX(this.walkAcceleration);
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

    attack(px, py, hitbox) {
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
        this.dy =  - (py - this.y);
        if (this.dy > 0) {
            this.dirY = -1;
        }

        this.angle = Math.atan(this.dy/this.dx);

        this.isAttack = true;
        this.attackDuration = this.attackDuration_MAX;
        this.setMaxVelocity(this.dashSpeed);
        this.setVelocityX(this.dirX * this.dashSpeed * Math.cos(this.angle));
        this.setVelocityY((-1) * this.dirX * this.dashSpeed * Math.sin(this.angle));
        
        // Handles the attack hitbox
        let dTheta = 2 * Math.PI / this.rotate;
        let curAngle = this.angle - (this.numHitbox / 2 * dTheta);

        for (let i = 0; i < this.numHitbox; i++) {
            let swordCenterX = this.dirX * this.swordOffset * Math.cos(curAngle);
            let swordCenterY = (-1) * this.dirX * this.swordOffset * Math.sin(curAngle);
            curAngle += dTheta;
            let attack = new Hitbox(this.scene, this.x + swordCenterX, this.y + swordCenterY, "sword-hitbox", this.hitboxDur);
            hitbox.add(attack);
        }
    }
}