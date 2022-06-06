class Hitbox extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, duration = 0, speed = 0, directionX = 0, directionY = 0) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);

        this.fade = true;
        if (duration == 0) {
            this.fade = false;
        }
        this.duration = duration;

        this.speed = 0;

        if (directionX != 0 || directionY != 0) {
            let dirX = 1;
            if (directionX < 0) {
                dirX = -1;
            }

            this.speed = speed;
            let angle = Math.atan(directionY/directionX);
            this.setVelocityX(dirX * this.speed * Math.cos(angle));
            this.setVelocityY((-1) * dirX * this.speed * Math.sin(angle));
        }
    }

    update() {
        // Controls Hitbox Lingering Logic
        if (this.fade == true && this.duration > 0) {
            this.duration -= 1;
        }

        if (this.fade == true && this.duration <= 0) {
            this.destroy();
        }
    }
}