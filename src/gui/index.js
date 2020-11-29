let game;
let ctrl; // TODO for debug
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
     * The Controller
     */
    controller;

    /**
     * The DropZone for the player Cards
     * @type Phaser.GameObjects.Zone
     */
    dropZone;
    /**
     * The Graphic of the DropZone
     * @see playerDrop
     * @type Phaser.GameObjects.Graphics
     */
    dropZoneGraphic;

    /**
     * Is the CardDrag enabled?
     * @type boolean
     */
    cardDragEnabled;

    /**
     * The cards in the hand of the player
     * @type Phaser.GameObjects.Sprite[]
     */
    playerHandCards;

    comGraphics;

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
        this.load.spritesheet("cards","./assets/cardsheet_big.png", {frameWidth: gameOptions.cardWidth, frameHeight: gameOptions.cardHeight}); // TODO spritesheet vs altas
        this.load.image('dropzone','assets/testdrop.png');
        console.log("load finnished");
    }


    create() {
        // setup some listeners
        // Show card over everything else
        this.input.on('dragstart', function(pointer, gameObject){
            this.children.bringToTop(gameObject);
        },this);
        // move card with cursor
        this.input.on('drag',function (pointer,gameObject,dragX,dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // setup player hand array
        this.playerHandCards = [];


        // set-up Com Graphics
        this.comGraphics = [];
        this.comGraphics[0] = this.add.graphics();
        this.comGraphics[0].drawMyself = function() {
            let y = 20;
            let radius = game.config.width / 8 / 2;
            let x = game.config.width / 4;
            this.clear();
            //this.lineStyle(10,0x636363,1);
            this.fillStyle(0x636363,1)
            this.fillCircle(x,y,radius);
            //this.strokeCircle(x,y,radius);
        }
        this.comGraphics[0].drawMyself();
        this.comGraphics[1] = this.add.graphics();
        this.comGraphics[1].drawMyself = function() {
            let y = 20;
            let radius = game.config.width / 8 / 2;
            let x = game.config.width / 4 *2;
            this.clear();
            //this.lineStyle(10,0x636363,1);
            this.fillStyle(0x636363,1)
            this.fillCircle(x,y,radius);
            //this.strokeCircle(x,y,radius);
        }
        this.comGraphics[1].drawMyself();
        this.comGraphics[2] = this.add.graphics();
        this.comGraphics[2].drawMyself = function() {
            let y = 20;
            let radius = game.config.width / 8 / 2;
            let x = game.config.width / 4 * 3;
            this.clear();
            //this.lineStyle(10,0x636363,1);
            this.fillStyle(0x636363,1)
            this.fillCircle(x,y,radius);
            //this.strokeCircle(x,y,radius);
        }
        this.comGraphics[2].drawMyself();
        // old code
        //this.model = new Model();
        //this.model.handOut();
        //this.showHand();
        //this.displayDropzones();

        // Start a Game
        // Game { * Plays { 5 Rounds { 4 Runs
        this.controller = new Controller(this);
        ctrl = this.controller;
        this.controller.playGame();
    }


    /**
     * Displays all the cards from the Hand
     *  on the bottom of the screen
     * Also enables the CardDrag
     * @see setCardDragEnabled
     *  @param hand {Array<Card>} ein Array mit den Handkarten
     */
    showHand(hand) {
        const cardWidth = gameOptions.cardWidth * gameOptions.cardScale;
        const handLength = 5 * cardWidth; // max total length of hand
        const margin_left = game.config.width / 2 - handLength / 2 + cardWidth/2; // center Hand
        const handHeight = game.config.height;
        console.log("ML: "+margin_left);
        for (let i = 0; i < hand.length; i++) {
            let card = this.add.sprite(margin_left+i*cardWidth,handHeight, "cards", hand[i].getSpriteID());
            card.setData('ID',hand[i].getSpriteID()); // add the SpriteID to be queried with getData('ID')
            card.setData('object',hand[i]);
            card.setScale(gameOptions.cardScale);
            card.setInteractive();
            //this.input.setDraggable(card);
            this.playerHandCards.push(card);

            // hover-listener
            card.on('pointerover',(pointer,localX,localY,event)=>{
                //console.log("pointerover:");
                //console.log(card);
                if (this.cardDragEnabled) card.y= card.y-PlayGame.HOVEROFFSET;
            });

            // TODO isnt executed on mobile
            // hover-ende-listener
            card.on('pointerout',(pointer,localX,localY,event)=>{
                //console.log("pointerout:");
                //console.log(card);
                if (this.cardDragEnabled) card.y= card.y+30;
            });
        }
        this.setCardDragEnabled(true);
    }

    /**
     * Displays the DropZone and adds the listeners
     *  also waits for the player input
     *
     */
    createDropzones(dropCallback) {
        let zoneWidth=gameOptions.cardWidth*gameOptions.cardScale;
        let zoneHeight=gameOptions.cardHeight*gameOptions.cardScale;
        let zoneX = game.config.width/2;
        let zoneY = game.config.height/2 + game.config.height*0.1;
        // Graphic Origin is in the upper left corner
        let zoneXg = zoneX - zoneWidth/2;
        let zoneYg = zoneY - zoneHeight/2;

        // the player drop-zone
        this.dropZone = this.add.zone(zoneX,zoneY,zoneWidth,zoneHeight).setRectangleDropZone(zoneWidth,zoneHeight);
        this.dropZone.input.dropZone = true;

        // the visual representation
        this.dropZoneGraphic = this.add.graphics();
        // methods to easily draw the visual
        this.dropZoneGraphic.drawMyself = function () {
            this.clear();
            this.lineStyle(4,0x636363);
            this.strokeRoundedRect(zoneXg,zoneYg,zoneWidth,zoneHeight);
        }
        this.dropZoneGraphic.drawMyselfHighlighted = function () {
            this.clear();
            this.lineStyle(5,0x00FF28);
            this.strokeRoundedRect(zoneXg,zoneYg,zoneWidth,zoneHeight);

        }

        // recognizes if the card enters the correct dropzone
        this.input.on('dragenter',function(pointer,gameObject,dropZone){
            if(dropZone === this.dropZone) {
                //console.log('dragenter');
                this.dropZoneGraphic.drawMyselfHighlighted();
            }
        },this);

        this.input.on('dragleave',function(pointer,gameObject,dropZone){
            //console.log("dragleave");
            if (dropZone === this.dropZone) this.dropZoneGraphic.drawMyself();
        },this);

        // center the card on drop
        this.input.on('drop', function(pointer,gameObject,dropZone){
            if (dropZone === this.dropZone) {
                gameObject.input.enabled = false; // disable further input on the card
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y - PlayGame.HOVEROFFSET;
                this.controller.playCard(gameObject.getData('object'));
            }
        },this);

        // reset card after unsuccesfull drop
        this.input.on('dragend',function(pointer,gameObject,dropped){
            console.log("draggend");
            if(!dropped){
                console.log("not dropped");
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
            this.dropZoneGraphic.drawMyself();
        },this);

        this.hideDropzone();
    }

    /**
     * Enables the DropZone
     */
    showDropzone() {
        this.dropZoneGraphic.drawMyself();
        this.input.enable(this.dropZone);
    }

    /**
     * Disables the DropZone
     */
    hideDropzone() {
        this.input.disable(this.dropZone);
        this.dropZoneGraphic.clear();
    }

    /**
     * Enables the Card Drag and the Hover -Effect
     * @param enable {boolean} enable or disable?
     */
    setCardDragEnabled(enable) {
        this.cardDragEnabled = enable;
        for (let i = 0; i < this.playerHandCards.length; i++) {
            this.input.setDraggable(this.playerHandCards[i],enable);
        }
    }

    /**
     * Shows that a com plays a card
     * @param card {Card} the Card that the com plays
     * @param comID {int} the comID from 0-2
     */
    comPlayCard(comID,card) {

    }
}

