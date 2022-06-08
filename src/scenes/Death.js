class Death extends Phaser.Scene {
    constructor() {
        super('deathScene');
        
    }

    preload(){
        this.load.path = './assets/death/';
        this.load.image('b1', 'b1.png');      
        this.load.image('b2', 'b2.png');      
        this.load.image('b3', 'b3.png');      
        this.load.image('b4', 'b4.png');      
        this.load.image('b5', 'b5.png');      
        this.load.image('b6', 'b6.png');  
        this.load.image('b7', 'b7.png');    
        this.load.image('re1', 're1.png');
        this.load.image('re2', 're2.png');  
        this.load.image('c1', 'c1.png');
        this.load.image('c2', 'c2.png');  
    }

    create() {
        
        //anim not working :(
        this.end = this.add.sprite(0, 0, 'b7').setOrigin(0,0);
        this.anims.create({
            key: 'd',
            frames: [
                { key: 'b1' },
                { key: 'b2' },
                { key: 'b3' },
                { key: 'b4' },
                { key: 'b5' },
                { key: 'b6' },
                { key: 'b7' },
               
            ],
            frameRate: 6,
            repeat: 2,
        });          
        this.end.play('d');
        this.anims.create({
            key: 'a',
            frames: [                
                { key: 'b2' },                
                { key: 'b4' },
                { key: 'b5' },
                { key: 'b6' },             
               
            ],
            frameRate: 6,
            repeat: -1,
        });        
        this.end.play('a');
        gamePointer = this.input.activePointer;
        
        this.re = this.add.sprite(350, game.config.height/3, 're1').setOrigin(0.5).setScale(0.0);
        this.re.setInteractive();
        this.cr = this.add.sprite(350, game.config.height*2/3, 'credit1').setOrigin(0.5).setScale(0.0);
        this.cr.setInteractive();

        //set funcitons to run for hovering over/clicking button
        this.re.on('pointerover', () => {
            this.re.setTexture('re2')
        });
        this.re.on('pointerout', () => {
            this.re.setTexture('re1')
        });
        
        this.re.on('pointerdown', () => {            
            this.scene.start('playScene');
        });


        this.cr.on('pointerover', () => {
            this.cr.setTexture('credit2')
        });
        this.cr.on('pointerout', () => {
            this.cr.setTexture('credit1')
        });
        
        this.cr.on('pointerdown', () => {            
            this.scene.start('creditScene');
        });

        let reTween= this.tweens.add({
            targets: this.re,
            alpha: { from: 0, to: 1 },
            scale: { from: 0.1, to: 0.3 },
            ease: 'Sine.easeInOut',
            duration: 2000,
            repeat: 0,
            hold: -1,
            delay: 1000,
            onCompleteScope: this
        });
        let crTween= this.tweens.add({
            targets: this.cr,
            alpha: { from: 0, to: 1 },
            scale: { from: 0.1, to: 0.2 },
            ease: 'Sine.easeInOut',
            duration: 2000,
            repeat: 0,
            hold: -1,
            delay: 1000,
            onCompleteScope: this
        });
 
        



        

       
    }


}