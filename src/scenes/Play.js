class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // Define Keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Enables Pointer
        gamePointer = this.input.activePointer;

        //Temp Background
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0xf2f2f2).setOrigin(0);
        this.player = new Player(this, game.config.width/2, game.config.height/2);

        // Adds Pointer Down Event for Player Attacks
        this.input.on('pointerdown', function(gamePointer) {
            //this.player.attack(gamePointer);
            this.physics.moveToObject(this.player, gamePointer, 500);
        }, this);
    }

    update() {
        this.player.update();
    }
}