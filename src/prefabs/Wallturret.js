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
        this.range = 300;
    }

    attack(px, py, bullets) {
        // Grabs the angle by calculating this dist to x, y
        let dx = px - this.x;
        let dy =  - (py - this.y);

        let bullet = new Hitbox(this.scene, this.x, this.y, "sword-hitbox", 120, 200, dx, dy);
        bullets.add(bullet);
    }
}