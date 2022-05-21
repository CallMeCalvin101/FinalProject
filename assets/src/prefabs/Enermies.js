class Enemies extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, texture, hit_times) {        
        super(scene, texture); 
        this.hitTime = hit_times;   

        scene.add.existing(this);               
        scene.physics.add.existing(this);      
        this.setImmovable();                    
        //this.tint = Math.random() * 0xFFFFFF;   // randomize tint
        this.newBarrier = true;                 // custom property to control barrier spawning
        //this.alpha = 1;
        this.isHit = false;
        
    }

    update() {
        if (this.isHit && this.alpha > 0) {
            this.alpha -= 0.05;
            this.setAlpha(this.alpha);
            
        }


        // add new barrier when existing barrier hits center X
        if(this.newBarrier && this.x < centerX) {
            this.newBarrier = false;
            // (recursively) call parent scene method from this context
            this.scene.addEnemy(this.parent, enemySpeed, this.texture);
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}