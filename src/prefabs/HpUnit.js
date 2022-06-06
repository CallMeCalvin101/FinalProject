class HpUnit extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'heart', 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        

        this.setOrigin(0.5);
        this.setImmovable(true);
        this.setScrollFactor(0);
        this.play('healthblink',true);
        this.state = 1              // Let 1 = full & 0 = empty
    }
    
    removeHeart() {
        this.play('healthgone',true); 
        //this.setAlpha(0);
    }

    gainHeart() {
        this.play('healthon',true);
        this.play('healthblink',true);
        this.setAlpha(1);
    }
}