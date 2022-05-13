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

        // Temp Background
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0xf2f2f2).setOrigin(0);
        this.player = new Player(this, game.config.width * 1/4, game.config.height/2);

        // Adds group to store all upgrades
        this.upgradeGroup = this.add.group({
            runChildUpdate: true
        });

        this.upgradeBody = new Upgrade(this, game.config.width* 3/4, game.config.height/2, 'upgrade:body', "body");
        this.upgradeGroup.add(this.upgradeBody);

        // Adds Pointer Down Event for Player Attacks
        this.input.on('pointerdown', () => {
            this.player.attack(gamePointer.x, gamePointer.y);
        }, this);

        this.checkUpgrade();
    }

    update() {
        this.player.update();
    }

    checkUpgrade() {
        for (let type of this.upgradeGroup.getChildren()) {
            this.physics.add.collider(this.player, type, () => {
                this.upgradeEvent(type);
            }, null, this);
        }
    }

    upgradeEvent(elem) {
        if (elem.getType() == 'body') {
            this.spawnX = this.player.x;
            this.spawnY = this.player.y;
            this.player.destroy();
            this.player = new PlayerBody(this, this.spawnX, this.spawnY);
            elem.destroy();
        }
    }
}