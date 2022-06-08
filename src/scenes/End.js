class End extends Phaser.Scene {
    constructor() {
        super('End');
        
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('end', 'end.png');

    }
    update(){
        this.wallpaper = this.add.sprite(0, 0, 'end').setOrigin(0,0);
    }
}