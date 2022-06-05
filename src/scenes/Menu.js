class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
        
    }

    preload(){
        this.load.image('rb1', '/assets/rb1.png');
        this.load.image('rb2', '/assets/rb2.png');
        this.load.image('bt1', '/assets/bt1.png');
        this.load.image('bt2', '/assets/bt2.png');
        this.load.image('black', '/assets/blackscreen.png');
        this.load.audio('bg', './assets/bg.mp3');
        this.load.audio('bg_layer', './assets/bg_layer.mp3');
        this.load.image('titletext', '/assets/titletext.png');
        this.load.audio('deathmusic2', './assets/deathmusic2.wav');
        this.load.audio('selectsound', './assets/selectsound.wav');
        this.load.audio('hit', './assets/hit.mp3');
    }

    create() {
        //for developer use to skip menu
        this.scene.start('playScene');


        this.bgmusic = this.sound.add('bg', {
            mute: false,
            volume: 0.2,
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

        this.title = this.add.sprite(game.config.width/2+300, 190, 'titletext').setOrigin(0.5).setScale(0.0);
        this.blackscreen = this.add.sprite(0, 0, 'black').setOrigin(0,0)

        this.nextButton = this.add.sprite(game.config.width/2+300, 490, 'bt1').setOrigin(0.5).setScale(0.0);
        this.nextButton.setInteractive();


        //set funcitons to run for hovering over/clicking button
        this.nextButton.on('pointerover', () => {
            this.nextButton.setTexture('bt2')
        });
        this.nextButton.on('pointerout', () => {
            this.nextButton.setTexture('bt1')
        });
        
        this.nextButton.on('pointerdown', () => {
            this.sound.play('hit');
            this.sound.play('selectsound');
            this.scene.start('playScene');
        });


        let startTween = this.tweens.add({
            targets: this.nextButton,
            alpha: { from: 0, to: 1 },
            scale: { from: 0.1, to: 0.3 },
            ease: 'Sine.easeInOut',
            duration: 2000,
            repeat: 0,
            hold: -1,
            delay: 1000,
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