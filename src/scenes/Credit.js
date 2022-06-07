class Credit extends Phaser.Scene {
    constructor() {
        super('creditScene');
        
    }

    preload(){
        this.load.path = './assets/death/';
        
        this.load.image('b7', 'b7.png');    
        this.load.image('w1', 'w1.png');
        this.load.image('w2', 'w2.png');  
        this.load.image('w3', 'w3.png');  
        this.load.image('m2', 'm2.png');  
        this.load.image('m1', 'm1.png');  
    }

    create() {
        
        //anim not working :(
        this.wallpaper = this.add.sprite(0, 0, 'b7').setOrigin(0,0);
        this.credit = this.add.sprite(0, 0, 'w1').setOrigin(0,0);
        this.anims.create({
            key: 'c',
            frames: [
                { key: 'w1' },
                { key: 'w2' },
                { key: 'w3' },
                { key: 'w2' },              
               
            ],
            frameRate: 6,
            repeat: -1,
        });          
        this.credit.play('c');        
        gamePointer = this.input.activePointer;
        
        this.bm = this.add.sprite(320, game.config.height*3/4, 'm1').setOrigin(0.5).setScale(0.0);
        this.bm.setInteractive();
        this.bm.on('pointerover', () => {
            this.bm.setTexture('m2')
        });
        this.bm.on('pointerout', () => {
            this.bm.setTexture('m1')
        });
        
        this.bm.on('pointerdown', () => {            
            this.scene.start('menuScene');
        });

        let reTween= this.tweens.add({
            targets: this.bm,
            alpha: { from: 0, to: 1 },
            scale: { from: 0.1, to: 0.3 },
            ease: 'Sine.easeInOut',
            duration: 2000,
            repeat: 0,
            hold: -1,
            delay: 1000,
            onCompleteScope: this
        });
        



        

       
    }


}