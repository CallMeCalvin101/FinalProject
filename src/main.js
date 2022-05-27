/*******************************************************************************************
 * Collaborators: Dongling Yang, Michael Leung, Vincent Bouyssounouse, Vincent Kurniadjaja
 * Title: Spiritual Relief
 * Date Completed:
 *******************************************************************************************/

let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    backgroundColor: '#8e9490image.pngimage.png',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Load, Menu, Play]
}

let game = new Phaser.Game(config);

// Keyboard Inputs
let keyW, keyA, keyS, keyD;

// Game Pointer
let gamePointer;