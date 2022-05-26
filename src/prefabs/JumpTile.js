class JumpTile extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, texture, direction) {
        super(scene, x, y, texture, 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setImmovable(true);
        this.direction = direction;
        this.distance = 7 * 32;
    }

    jump(player) {
        this.newX = player.x;
        this.newY = player.y;

        if (this.direction == "left") {
            this.newX -= this.distance;
        } else if (this.direction == "right") {
            this.newX += this.distance;
        } else if (this.direction == "up") {
            this.newY -= this.distance;
        } else if (this.direction == "down") {
            this.newY += this.distance;
        }

        
        player.setPosition(this.newX, this.newY);
        player.setVelocity(0);
    }
}