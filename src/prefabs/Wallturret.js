class Wallturret extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureKey) {
        // call Phaser Physics Sprite constructor
        super(scene, x, y, textureKey);
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add to physics system 
        this.setImmovable();     
        // this.allowGravity = false;        
        //this.tint = Math.random() * 0xFFFFFF;   // randomize tint
        this.alpha = 1;
        this.textureKey = textureKey;



    }

    update() {
    }
}