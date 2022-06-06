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
        this.attackCooldown = 300
        this.curCooldown = 0;
    }

    attack(px, py, bullets) {
        if (this.curCooldown > 0) {return;}

        // Grabs the angle by calculating this dist to x, y
        let dx = px - this.x;
        let dy =  - (py - this.y);

        let bullet = new Hitbox(this.scene, this.x, this.y, "bullet", 1000, 200, dx, dy);
        bullets.add(bullet);
        this.curCooldown = this.attackCooldown;
    }

    update() {
        if (this.curCooldown > 0) {
            this.curCooldown -= 1;
        }
    }
}