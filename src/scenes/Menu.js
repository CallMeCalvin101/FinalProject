class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    preload(){
        this.load.image('the', './assets/the.png');
        this.load.image('credit1', './assets/credit1.png');
        this.load.image('credit2', './assets/credit2.png');
        this.load.image('rb1', './assets/rb1.png');
        this.load.image('rb2', './assets/rb2.png');
        this.load.image('bt1', './assets/bt1.png');
        this.load.image('bt2', './assets/bt2.png');
        this.load.image('black', './assets/blackscreen.png');
        this.load.audio('bg', './assets/bg.mp3');
        this.load.audio('bg_layer', './assets/bg_layer.mp3');
        this.load.audio('softbell', './assets/softbell.mp3');
        this.load.image('titletext1', './assets/lr1.png');
        this.load.image('titletext2', './assets/lr2.png');
        this.load.audio('hit', './assets/hit.mp3');
    }

    create() {
        this.bgmusic = this.sound.add('bg', {
            mute: false,
            volume: 0.1,
            rate: 1,
            loop: true 
        });
        this.bgmusic.play();

        //anim not working :(
        this.anims.create({
            key: 'tsanim',
            frames: [
                { key: 'rb1' },
                { key: 'rb2' },
            ],
            frameRate: 5,
            repeat: -1
        });
    
        this.robot = this.add.sprite(0, 0, 'rb1').setOrigin(0,0)
        this.robot.play('tsanim');
        

        gamePointer = this.input.activePointer;

        this.the = this.add.sprite(game.config.width/2+300, 85, 'the').setOrigin(0.5).setScale(0.19);

        this.title = this.add.sprite(game.config.width/2+300, 190, 'titletext1').setOrigin(0.5).setScale(0.0);
        this.title2 = this.add.sprite(game.config.width/2+300, 190, 'titletext2').setOrigin(0.5).setScale(0.3).setAlpha(0.0);
        this.blackscreen = this.add.sprite(0, 0, 'black').setOrigin(0,0)

        this.nextButton = this.add.sprite(game.config.width/2+300, 490, 'bt1').setOrigin(0.5).setScale(0.0);
        this.creditButton = this.add.sprite(game.config.width/2+300, 290, 'credit1').setOrigin(0.5).setScale(0.0);
        this.creditButton.setInteractive();
        this.nextButton.setInteractive();


        //set funcitons to run for hovering over/clicking button
        this.creditButton.on('pointerover', () => {
            this.creditButton.setTexture('credit2')
        });

        this.creditButton.on('pointerout', () => {
            this.creditButton.setTexture('credit1')
        });

        this.nextButton.on('pointerover', () => {
            this.nextButton.setTexture('bt2')
        });
        this.nextButton.on('pointerout', () => {
            this.nextButton.setTexture('bt1')
        });
        this.creditButton.on('pointerdown', () => {
            this.scene.start('creditScene')});
        
        this.nextButton.on('pointerdown', () => {
            this.sound.play('hit');
            this.sound.play('softbell',{volume: 0.3});
            this.scene.start('playScene');
        });


        this.title.on('pointerover', () => {
            this.title.setTexture('titletext2')
        });
        this.title.on('pointerout', () => {
            this.title.setTexture('titletext1')
        });
        
        this.title.on('pointerdown', () => {            
            this.scene.start('creditScene');
        });


        let startTween = this.tweens.add({
            targets: this.nextButton,
            alpha: { from: 0, to: 1 },
            scale: { from: 0.1, to: 0.2 },
            ease: 'Sine.easeInOut',
            duration: 1000,
            repeat: 0,
            hold: -1,
            delay: 1600,
            onCompleteScope: this
        });

        let titleTween = this.tweens.add({
            targets: this.title,
            alpha: { from: 0, to: 1 },
            scale: { from: 0.1, to: 0.3 },
            ease: 'Sine.easeInOut',
            duration: 2000,
            repeat: 0,
            hold: -1,
            delay: 100,
            onCompleteScope: this
        });

        let title2Tween = this.tweens.add({
            targets: this.title2,
            alpha: { from: 0, to: 1 },
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1,
            delay: 2200,
            onCompleteScope: this
        });

        let creditTween = this.tweens.add({
            targets: this.creditButton,
            alpha: { from: 0, to: 1 },
            scale: { from: 0.0, to: 0.15 },
            ease: 'Sine.easeInOut',
            duration: 1000,
            repeat: 0,
            hold: -1,
            delay: 2500,
            onCompleteScope: this
        });

        let blackTween = this.tweens.add({
            targets: this.blackscreen,
            alpha: { from: 1, to: 0 },
            ease: 'Sine.easeInOut',
            duration: 600,
            repeat: 0,
            hold: -1,
            delay: 0,
            onCompleteScope: this
        });


    }


}