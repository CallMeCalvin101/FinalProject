class End extends Phaser.Scene {
    constructor() {
        super('endScene');
        
    }
    preload(){
        this.load.path = './assets/death/';
        this.load.image('end', 'end.png');
        this.load.image('m3','m1.png');
        this.load.image('m4','m2.png');
    }

    create(){
        gamePointer = this.input.activePointer;
        this.wallpaper = this.add.sprite(0, 0, 'end').setOrigin(0,0);
        this.bm = this.add.sprite(840, game.config.height*3/4, 'm3').setOrigin(0.3).setScale(0.0);
        this.bm.setInteractive();
        this.bm.on('pointerover', () => {
            this.bm.setTexture('m4')
        });
        this.bm.on('pointerout', () => {
            this.bm.setTexture('m3')
        });
        
        this.bm.on('pointerdown', () => {            
            this.scene.start('menuScene');
        });
        let deathTween= this.tweens.add({
            targets: this.bm,
            alpha: { from: 0, to: 1 },
            scale: { from: 0.1, to: 0.3 },
            ease: 'Sine.easeInOut',
            duration: 2000,
            repeat: 0,
            hold: -1,
            delay: 500,
            onCompleteScope: this
        });
    }
   
}