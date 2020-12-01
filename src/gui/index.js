let game;
let ctrl; // TODO for debug
let gameOptions = {
    // card width, in pixels
    cardWidth: 180,

    // card height, in pixels
    cardHeight: 280,

    // card scale. 1 = original size, 0.5 half size and so on
    cardScale: 1,

    // props of com circle
    com_radius: 1 / 8 / 2,
    com_y: 20,
    com_x: 1 / 4,
    com_cardScale: 0.6

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
        this.load.bitmapFont('gothic','assets/fonts/gothic.png','assets/fonts/gothic.xml');
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
            if (this.cardDragEnabled && gameObject.outline !== undefined) gameObject.outline()
        },this);

        // setup player hand array
        this.playerHandCards = [];

        // draw Coms
        this.drawComs();

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
            card.outlineGraphic = this.add.graphics();
            card.outline = function() {
                this.outlineGraphic.clear();
                if (this.enableOutline) {
                    this.outlineGraphic.lineStyle(5,0x0CF2FF);
                    let b = card.getBounds();
                    this.outlineGraphic.strokeRoundedRect(b.x,b.y,b.width,b.height);
                }
            }
            card.enableOutline = false;
            //console.log("pointerover:");
            card.on('pointerover',(pointer,localX,localY,event)=>{
                //console.log(card);
                if (this.cardDragEnabled) {
                    card.enableOutline = true;
                    card.outline();
                }
                //if (this.cardDragEnabled) card.y= card.y-PlayGame.HOVEROFFSET;
            });

            // TODO isnt executed on mobile
            // hover-ende-listener
            card.on('pointerout',(pointer,localX,localY,event)=>{
                //console.log("pointerout:");
                //console.log(card);
                //if (this.cardDragEnabled) card.y= card.y+30;
                card.outlineGraphic.clear();
                card.enableOutline = false;
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
                //gameObject.y = dropZone.y - PlayGame.HOVEROFFSET;
                gameObject.y = dropZone.y;
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
        const cardWidth = gameOptions.cardWidth * gameOptions.com_cardScale;
        let x = game.config.width*gameOptions.com_x*(comID+1);
        let y = gameOptions.com_y+gameOptions.com_radius*0.5+gameOptions.cardHeight*gameOptions.com_cardScale;
        let cardSprite = this.add.sprite(x,y, "cards", card.getSpriteID());
        cardSprite.setScale(gameOptions.com_cardScale);
        //TODO y-alingnment?
    }

    /**
     * Draws the Com-Circles at the start of the game
     */
    drawComs() {
        const comDrawFunction = function(comid) {
            this.fillStyle(0x636363,1)
            this.fillCircle(game.config.width*gameOptions.com_x*(comid+1),gameOptions.com_y,game.config.width*gameOptions.com_radius);
        };
        let graphics  = this.add.graphics();

        graphics.drawCom = comDrawFunction;

        graphics.clear();
        graphics.drawCom(0);
        graphics.drawCom(1);
        graphics.drawCom(2);
/*
        this.comGraphics = [];
        this.comGraphics[0] = this.add.graphics();
        this.comGraphics[0].comid = 1;
        this.comGraphics[0].drawMyself = comDrawFunction;
        this.comGraphics[0].drawMyself();
        this.comGraphics[1] = this.add.graphics();
        this.comGraphics[1].comid = 2;
        this.comGraphics[1].drawMyself = comDrawFunction;
        this.comGraphics[1].drawMyself();
        this.comGraphics[2] = this.add.graphics();
        this.comGraphics[2].comid = 3;
        this.comGraphics[2].drawMyself = comDrawFunction;
        this.comGraphics[2].drawMyself();
*/

        let x = game.config.width * gameOptions.com_x;
        let y = gameOptions.com_y;
        this.add.bitmapText(x,y,'gothic','COM1').setOrigin(0.5,0).setFontSize(32);
        this.add.bitmapText(x*2,y,'gothic','COM2').setOrigin(0.5,0).setFontSize(32);
        this.add.bitmapText(x*3,y,'gothic','COM3').setOrigin(0.5,0).setFontSize(32);
    }

    /**
     * Displays a Message over the whole screen, that will fade out
     * You can use PlayGame.SHORT_DELAY, MEDIUM_DELAY, LONG_DELAY or a custom amount
     * @param msg {String} the message
     * @param delay {number} the delay before the message beginns to disapper (in ms)
     *  is no delay specified, SHORT_DELAY is used
     */
    displayFadeOutMessage(msg,delay= PlayGame.SHORT_DELAY) {
        let mytext = this.add.dynamicBitmapText(game.config.width / 2,game.config.height / 3,'gothic',msg).setOrigin(0.5,0.5).setFontSize(82);
        let hminus = mytext.height;
        this.tweens.add({
            targets: mytext,
            y: -hminus,
            alpha: 0,
            delay: delay,
            duration: 3000
        });
    }

    /**
     * A delay of 50ms
     * @type {number}
     */
    static SHORT_DELAY = 50;
    /**
     * a delay of a second
     * @type {number}
     */
    static MEDIUM_DELAY = 1000;
    /**
     * a delay of two seconds
     * @type {number}
     */
    static LONG_DELAY = 2000;
}

