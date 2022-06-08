class Boss extends Phaser.Physics.Arcade.Sprite {
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
        this.setFrame(4);
        this.textureKey = textureKey
        this.alive = true
        //Enemy anime
        this.anims.create({
            key: 'bossDown',            
            frames: this.anims.generateFrameNumbers(textureKey, {start: 9, end: 17, first: 9, last:9}),
            frameRate: 4,
            yoyo: true,
            repeat: -1
        });
        this.anims.create({
            key: 'bossUp',            
            frames: this.anims.generateFrameNumbers(textureKey, {start: 9, end: 17, first: 9, last:9}),
            frameRate: 4,
            yoyo: true,
            repeat: -1
        });
        this.anims.create({
            key: 'bossLeft',            
            frames: this.anims.generateFrameNumbers(textureKey, {start: 9, end: 17, first: 9, last:9}),
            frameRate: 4,
            yoyo: true,
            repeat: -1
        });
        this.anims.create({
            key: 'bossRight',            
            frames: this.anims.generateFrameNumbers(textureKey, {start: 1, end: 8, first: 8, last:8}),
            frameRate: 4,
            yoyo: true,
            repeat: -1
        });
        this.anims.create({
            key: 'bossIddle',            
            frames: this.anims.generateFrameNumbers(textureKey, {start: 11, end: 11, first: 11}),
            frameRate: 1,
            yoyo: false,
            repeat: -1
        });
        this.anims.play('bossIddle')
        this.speed = 64
        this.body.setVelocity(0,this.speed)

        this.dir = Math.floor(Math.random() * 4)
        switch(this.dir){
            case 0:
                this.body.setVelocity(0,-this.speed) // Up
                this.anims.play('bossUp')
                break
            case 1:
                this.body.setVelocity(-this.speed,0) //Left
                this.anims.play('bossLeft')
                break
            case 2:
                this.body.setVelocity(0,this.speed) //Down
                this.anims.play('bossDown')
                break
            case 3:
                this.body.setVelocity(this.speed,0) //Right
                this.anims.play('bossRight')
                break
            default:
                break;
        }
        
    }
    update(){
        const enemyBlocked = this.body.blocked
        const enemyTouched = this.body.touching
        if(enemyBlocked.down || enemyBlocked.up || enemyBlocked.left || enemyBlocked.right || enemyTouched.down || enemyTouched.up || enemyTouched.right || enemyTouched.up){
            this.dir += 1;
            if (this.dir >= 4) {this.dir = 0;}
            switch(this.dir){
                case 0:
                    this.body.setVelocity(0,-this.speed) // Up
                    this.anims.play('bossUp')
                    break
                case 1:
                    this.body.setVelocity(-this.speed,0) //Left
                    this.anims.play('bossLeft')
                    break
                case 2:
                    this.body.setVelocity(0,this.speed) //Down
                    this.anims.play('bossDown')
                    break
                case 3:
                    this.body.setVelocity(this.speed,0) //Right
                    this.anims.play('bossRight')
                    break
                default:
                    break;
            }

        }
    }
}