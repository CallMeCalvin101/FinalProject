class PatrolEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureKey) {
        // call Phaser Physics Sprite constructor
        super(scene, x, y, textureKey);
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add to physics system
        //this.setVelocityX(velocity);   
        this.setImmovable();     
        // this.allowGravity = false;        
        
        //this.tint = Math.random() * 0xFFFFFF;   // randomize tint
        this.alpha = 1;
        this.setFrame(4);
        this.textureKey = textureKey
        
        //Enemy anime
        this.anims.create({
            key: 'enemyDown',            
            frames: this.anims.generateFrameNumbers(textureKey, {start: 0, end: 3, first: 0}),
            frameRate: 6,
            yoyo: false,
            repeat: -1
        });
        this.anims.create({
            key: 'enemyLeft',            
            frames: this.anims.generateFrameNumbers(textureKey, {start: 4, end: 7, first: 4}),
            frameRate: 4,
            yoyo: true,
            repeat: -1
        });
        this.anims.create({
            key: 'enemyRight',            
            frames: this.anims.generateFrameNumbers(textureKey, {start: 8, end: 11, first: 8}),
            frameRate: 4,
            yoyo: true,
            repeat: -1
        });
        this.anims.create({
            key: 'enemyUp',            
            frames: this.anims.generateFrameNumbers(textureKey, {start: 12, end: 15, first: 12}),
            frameRate: 4,
            yoyo: true,
            repeat: -1
        });
        this.anims.play('enemyDown')
        this.speed = 64
        this.body.setVelocity(0,this.speed)

        this.dir = Math.floor(Math.random() * 4)
        switch(this.dir){
            case 0:
                this.body.setVelocity(0,-this.speed) // Up
                this.anims.play('enemyUp')
                break
            case 1:
                this.body.setVelocity(-this.speed,0) //Left
                this.anims.play('enemyLeft')
                break
            case 2:
                this.body.setVelocity(0,this.speed) //Down
                this.anims.play('enemyDown')
                break
            case 3:
                this.body.setVelocity(this.speed,0) //Right
                this.anims.play('enemyRight')
                break
            default:
                break;
        }
    }
    update(){
        const enemyBlocked = this.body.blocked
        const enemyTouched = this.body.touching
        if(enemyBlocked.down || enemyBlocked.up || enemyBlocked.left || enemyBlocked.right || enemyTouched.down || enemyTouched.up || enemyTouched.right || enemyTouched.up){
            //console.log(enemyBlocked);
            this.dir += 1;
            if (this.dir >= 4) {this.dir = 0;}
            
            switch(this.dir){
                case 0:
                    this.body.setVelocity(0,-this.speed) // Up
                    this.anims.play('enemyUp')
                    break
                case 1:
                    this.body.setVelocity(-this.speed,0) //Left
                    this.anims.play('enemyLeft')
                    break
                case 2:
                    this.body.setVelocity(0,this.speed) //Down
                    this.anims.play('enemyDown')
                    break
                case 3:
                    this.body.setVelocity(this.speed,0) //Right
                    this.anims.play('enemyRight')
                    break
                default:
                    break;
            }

        }
    }

}
