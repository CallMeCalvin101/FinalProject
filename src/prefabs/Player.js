class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player-head', 0);
        scene.add.existing(this);
        scene.physics.add.existing(this)

        // Set Properties
        this.walkSpeed = 500;
        this.walkAcceleration = 600;
        this.drag = 500;
        this.body.setCollideWorldBounds(true);
    }

    update() {
        if (keyW.isDown) {
            this.setAccelerationY(-this.walkAcceleration);
        } else if (keyS.isDown) {
            this.setAccelerationY(this.walkAcceleration);
        } else {
            this.setAccelerationY(0);
            this.setDragY(this.drag);
        }

        if (keyA.isDown) {
            this.setAccelerationX(-this.walkAcceleration);
        } else if (keyD.isDown) {
            this.setAccelerationX(this.walkAcceleration);
        } else {
            this.setAccelerationX(0);
            this.setDragX(this.drag);
        }
    }
}