class JumpTile extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, texture, direction) {
        super(scene, x, y, texture, 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0, 1);
        this.setAlpha(0);
        this.setImmovable(true);
        this.direction = direction;
        this.distance = 7 * 32;
    }

    returnDirection(){
        return this.direction;
    }
    jump(player) {
        this.scene.sound.play('fizz', {volume:0.05})
        this.newX = this.x;
        this.newY = this.y;

        if (this.direction == "left") {
            this.newX -= this.distance;
            player.setAccelerationX(-50);
        } else if (this.direction == "right") {
            this.newX += this.distance;
            player.setAccelerationX(50);
        } else if (this.direction == "up") {
            this.newY -= this.distance;
            player.setAccelerationY(50);
        } else if (this.direction == "down") {
            this.newY += this.distance;
            player.setAccelerationY(-50);
        }

        // if(this.scene.player.y>20){this.scene.sound.play('wind', {volume: 0.01, loop: true})}
        player.setPosition(this.newX, this.newY);
        player.setAlpha(1);
        player.setVelocity(0);
        this.scene.player.isteleport = false;
        this.scene.dummy.setAlpha(0)
    }
}