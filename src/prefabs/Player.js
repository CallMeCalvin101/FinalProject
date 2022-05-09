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
        this.body.setCollideWorldBounds(true);
        this.setDamping(true);

    }

    update() {
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

    attack(gamePointer) {
        //this.dash.x = gamePointer.x;
        //this.dash.y = gamePointer.y;
        
    }
}