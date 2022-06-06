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
    }

    create() {
        //anim not working :(
        this.end = this.add.sprite(0, 0, 'b6').setOrigin(0,0);
        this.anims.create({
            key: 'd',
            frames: [
                { key: 'b1' },
                { key: 'b2' },
                { key: 'b3' },
                { key: 'b4' },
                { key: 'b5' },
                { key: 'b6' },,
               
            ],
            frameRate: 5,
            repeat: 0
        });
    
        
        this.end.play('d');
        

       
    }


}