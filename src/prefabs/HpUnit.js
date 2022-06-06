class HpUnit extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'heart', 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.5);
        this.setImmovable(true);
        this.setScrollFactor(0);
        this.state = 1              // Let 1 = full & 0 = empty
    }
    
    removeHeart() {
        this.setAlpha(0);
    }

    gainHeart() {
        this.setAlpha(1);
    }
}