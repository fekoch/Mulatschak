let game;
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
        scene: PlayGame
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}



/**
 * Die Haupt-Szene
 */
class PlayGame extends Phaser.Scene {
    /**
     * The Offset, if you hover over cards
     */
    static HOVEROFFSET = 30;

    /**
     * The Mulatschak-model
     */
    model;

    /**
     * generate Scene
     */
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
        this.model = new Model();

        // Rundenbegin
        this.model.handOut();
        this.showHand();
        this.displayDropzones();


        // Show card over everything else
        this.input.on('dragstart', function(pointer, gameObject){
            this.children.bringToTop(gameObject);
        },this);

        // move card with cursor
        this.input.on('drag',function (pointer,gameObject,dragX,dragY) {
           gameObject.x = dragX;
           gameObject.y = dragY;
        });


    }

    /**
     * Displays all the cards from the Hand
     *  on the bottom of the screen
     */
    showHand(hand) {
        const cardWidth = gameOptions.cardWidth * gameOptions.cardScale;
        const handLength = 5 * cardWidth; // max total length of hand
        const margin_left = game.config.width / 2 - handLength / 2 + cardWidth/2; // center Hand
        const handHeight = game.config.height;
        console.log("ML: "+margin_left);
        for (let i = 0; i < hand.length; i++) {
            let card = this.add.sprite(margin_left+i*cardWidth,handHeight, "cards", hand[i].getSpriteID());
            card.setScale(gameOptions.cardScale);
            card.setInteractive();
            this.input.setDraggable(card);

            // hover-listener
            card.on('pointerover',(pointer,localX,localY,event)=>{
                //console.log("pointerover:");
                //console.log(card);
                card.y= card.y-PlayGame.HOVEROFFSET;
            });

            // TODO isnt executed on mobile
            // hover-ende-listener
            card.on('pointerout',(pointer,localX,localY,event)=>{
                //console.log("pointerout:");
                //console.log(card);
                card.y= card.y+30;
            });
        }
    }

    /**
     * Displays the DropZone and adds the listeners
     */
    displayDropzones() {
        let zoneWidth=gameOptions.cardWidth*gameOptions.cardScale;
        let zoneHeight=gameOptions.cardHeight*gameOptions.cardScale;
        let zoneX = game.config.width/2;
        let zoneY = game.config.height/2 + game.config.height*0.1;
        // Graphic Origin is in the upper left corner
        let zoneXg = zoneX - zoneWidth/2;
        let zoneYg = zoneY - zoneHeight/2;

        // the player drop-zone
        //this.playerDropZone = this.add.image(1000,300,'dropzone').setInteractive();
        /**
         * The DropZone for the player Cards
         */
        let playerDropZone = this.add.zone(zoneX,zoneY,zoneWidth,zoneHeight).setRectangleDropZone(zoneWidth,zoneHeight);
        /**
         * The Graphic of the DropZone
         * @see playerDrop        let zoneWidth=gameOptions.cardWidth*gameOptions.cardScale;
        let zoneHeight=gameOptions.cardHeight*gameOptions.cardScale;Zone
         */
        let playerDropZoneGraphic = this.add.graphics();
        console.log(playerDropZoneGraphic);
        playerDropZoneGraphic.lineStyle(4,0x636363);
        playerDropZoneGraphic.strokeRoundedRect(zoneXg,zoneYg,zoneWidth,zoneHeight);
        playerDropZone.input.dropZone = true;

        // recognizes if the card enters the correct dropzone
        this.input.on('dragenter',function(pointer,gameObject,dropZone){
            if(dropZone === playerDropZone) {
                console.log('dragenter');
                playerDropZoneGraphic.clear();
                playerDropZoneGraphic.lineStyle(5,0x00FF28);
                playerDropZoneGraphic.strokeRoundedRect(zoneXg,zoneYg,zoneWidth,zoneHeight);
            }
        });

        this.input.on('dragleave',function(pointer,gameObject,dropZone){
            console.log("dragleave");
            playerDropZoneGraphic.clear();
            playerDropZoneGraphic.lineStyle(4,0x636363);
            playerDropZoneGraphic.strokeRoundedRect(zoneXg,zoneYg,zoneWidth,zoneHeight);
        });

        // center the card on drop
        this.input.on('drop', function(pointer,gameObject,dropZone){
            gameObject.input.enabled = false; // disable further input on the card
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y - PlayGame.HOVEROFFSET;
            // TODO continue game
        },this);

        // reset card after unsuccesfull drop
        this.input.on('dragend',function(pointer,gameObject,dropped){
            console.log("draggend");
            if(!dropped){
                console.log("not dropped");
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
            playerDropZoneGraphic.clear();
            playerDropZoneGraphic.lineStyle(4,0x636363);
            playerDropZoneGraphic.strokeRoundedRect(zoneXg,zoneYg,zoneWidth,zoneHeight);
        });
    }
}

