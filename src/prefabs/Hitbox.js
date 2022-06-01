class Hitbox extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, duration = 0) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);

        this.fade = true;
        if (duration == 0) {
            this.fade = false;
        }
        this.duration = duration;
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