let game;
let model;
let gameOptions = {
    // card width, in pixels
    cardWidth: 180,

    // card height, in pixels
    cardHeight: 280,

    // card scale. 1 = original size, 0.5 half size and so on
    cardScale: 1
}

window.onload =function () {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: "#618f4d",
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            height: 750,
            width: 1334
        },
        scene: playGame
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}



/**
 * Die Haupt-Szene
 */
class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }

    /**
     * load all assets
     */
    preload() {
        console.log("begin load");
        this.load.spritesheet("cards","./assets/drawing.png", {frameWidth: gameOptions.cardWidth, frameHeight: gameOptions.cardHeight}); // TODO spritesheet vs altas
        this.load.image('dropzone','assets/testdrop.png');
        console.log("load finnished");
    }


    create() {
        model = new Model();
        model.handOut();
        this.showDeck();

        var zone = this.add.image(1000,300,'dropzone').setInteractive();
        zone.setScale(2);
        zone.input.dropZone = true;

        // Show card over everything else
        this.input.on('dragstart', function(pointer, gameObject){
            this.children.bringToTop(gameObject);
        },this);

        // move card with cursor
        this.input.on('drag',function (pointer,gameObject,dragX,dragY) {
           gameObject.x = dragX;
           gameObject.y = dragY;
        });

        // recognizes if the card enters the correct dropzone
        this.input.on('dragenter',function(pointer,gameObject,dropZone){
            if(dropZone === zone) {
                zone.setScale(3);
                console.log('dragenter');
            }
        });
        this.input.on('dragleave',function(pointer,gameObject,dropZone){
            zone.setScale(2);
        });

        // center the card on drop
        this.input.on('drop', function(pointer,gameObject,dropZone){
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.setScale(0.5);
            gameObject.input.enabled = false; // disable further input on the card
            zone.setScale(2);
        });

        // reset card after unsuccesfull drop
        this.input.on('dragend',function(pointer,gameObject,dropped){
            console.log("draggend");
            if(!dropped){
                console.log("not dropped");
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

    }

    showDeck() {
        const cardWidth = gameOptions.cardWidth * gameOptions.cardScale;
        const margin_left = cardWidth; // margin left = 1 Card
        let player = model.getPlayer();
        for (let i = 0; i < player.hand.length; i++) {
            let card = this.add.sprite(margin_left+i*cardWidth,game.config.height / 2, "cards", player.hand[i].getSpriteID());
            card.setScale(gameOptions.cardScale);
            card.setInteractive();
            this.input.setDraggable(card);
        }
        console.log("showdeck");
        console.log(player.hand);
    }

}

