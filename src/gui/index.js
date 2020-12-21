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
    com_x: 1 / 4

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
        //this.load.image('dropzone','assets/testdrop.png');
        this.load.bitmapFont('gothic','assets/fonts/gothic.png','assets/fonts/gothic.xml');
        this.load.image('nuss-icon','assets/eichel_icon.png');
        this.load.image('herz-icon','assets/herz_icon.png');
        this.load.image('blatt-icon','assets/blatt_icon.png');
        this.load.image('glocke-icon','assets/glocke_icon.png');
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

        this.setUpGraphics();

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
        for (let i = 0; i < this.playerHandCards.length; i++) {
            this.playerHandCards[i].destroy();
        }
        this.playerHandCards = [];

        const cardWidth = gameOptions.cardWidth * gameOptions.cardScale;
        const handLength = 5 * cardWidth; // max total length of hand
        const margin_left = game.config.width / 2 - handLength / 2 + cardWidth/2; // center Hand
        const handHeight = game.config.height;
        //console.log("ML: "+margin_left);
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
                    this.outlineGraphic.lineStyle(2,0x0CF2FF);
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
            this.lineStyle(2,0x636363);
            this.strokeRoundedRect(zoneXg,zoneYg,zoneWidth,zoneHeight);
        }
        this.dropZoneGraphic.drawMyselfHighlighted = function () {
            this.clear();
            this.lineStyle(2,0x00FF28);
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
            //console.log("draggend");
            if(!dropped){
                //console.log("not dropped");
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
            this.dropZoneGraphic.drawMyself();
            if (gameObject.outline !== undefined) {
                //console.log("outline");
                gameObject.enableOutline = gameObject.getBounds().contains(pointer.x, pointer.y);
                gameObject.outline();
            }
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
     * @param comID {int} the comID from 1-3
     */
    comPlayCard(comID,card) {
        const com_cardScale = 0.8;
        const cardWidth = gameOptions.cardWidth * com_cardScale;
        let x = game.config.width*gameOptions.com_x*(comID);
        let y = gameOptions.com_y+gameOptions.com_radius*game.config.width-30;
        let cardSprite = this.add.sprite(x,y, "cards", card.getSpriteID()).setOrigin(0.5,0);
        cardSprite.setScale(com_cardScale);
    }

    /**
     * Draws the Com-Circles at the start of the game
     */
    drawComs() {
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

    /**
     * The text which displays the remaining Points for the player
     * @type Phaser.GameObjects.BitmapText
     */
    pptxt;

    /**
     * Sets the remaining Points-Display for the Player
     * @param punkte {number} the remaining points
     */
    setPlayerVerbleibendePunkte(punkte) {
        this.pptxt.text=punkte.toString();
    }

    /**
     * PlayerDeclaredTrickstext
     * @type Phaser.GameObjects.BitmapText
     */
    pdtt;

    /**
     * Sets the tricks (=Stiche) that the player declared
     * @param tricks {number} declared tricks
     */
    setPlayerDeclaredTricks(tricks) {
        this.pdtt.text = tricks.toString();
    }

    /**
     * Indicates that someone still has to do Tricks
     * @type {number}
     */
    static TRICKS_TODO = 0;

    /**
     * Indicates that someone has the declared amount of tricks
     * @type {number}
     */
    static TRICKS_CORRECT = 1;

    /**
     * Indicates that someone has more tricks than declared
     * @type {number}
     */
    static TRICKS_TOO_MUCH = -1;

    static DEFAULT_BLUE_COLOR = 0x1B1BAA;
    /**
     * PlayerDoneTricksText
     * @type Phaser.GameObjects.BitmapText
     */
    pdtt2;

    /**
     * Sets the tricks (=Stiche) that the player has done
     * @param tricks {number} the tricks that the player did
     * @param state {number} Has the player done enough Tricks?
     *  one of {@link TRICKS_TODO}, {@link TRICKS_CORRECT} and {@link TRICKS_TOO_MUCH}
     */
    setPlayerDoneTricks(tricks,state=PlayGame.TRICKS_TODO) {
        const TRICKS_TOO_MUCH_COLOR = 0xE40100;
        const TRICKS_CORRECT_COLOR = 0x47E400;
        const TRICKS_TODO_COLOR = 0xE48F12;

        this.pdtt2.text = tricks.toString();
        if (state == PlayGame.TRICKS_TODO) {
            this.pdtt2.setTintFill(TRICKS_TODO_COLOR);
        }
        else if (state == PlayGame.TRICKS_TOO_MUCH) {
            this.pdtt2.setTintFill(TRICKS_TOO_MUCH_COLOR);
        }
        else if (state == PlayGame.TRICKS_CORRECT) {
            this.pdtt2.setTintFill(TRICKS_CORRECT_COLOR);
        }
        else {
            this.pdtt2.setTintFill(PlayGame.DEFAULT_BLUE_COLOR);
        }
    }


    /**
     * Sets up all the static graphics
     * called by create()
     */
    setUpGraphics() {
        const PURPLE_COLOR = 0x7430AA;
        const gheight = game.config.height;
        const gwidth = game.config.width;

        let gr = this.add.graphics();

        // player pts-display
        gr.fillStyle(PURPLE_COLOR,1);
        gr.fillRect(20,gheight/2,160,80);
        this.pptxt = this.add.bitmapText(100,gheight/2,'gothic','-').setOrigin(0.5,0);

        this.pdtt = this.add.bitmapText(gwidth-75,gheight/2,'gothic','-').setOrigin(0.5,0);
        this.pdtt.setTintFill(PlayGame.DEFAULT_BLUE_COLOR);

        this.add.bitmapText(gwidth-110,gheight/2,'gothic','/').setOrigin(0.5,0);

        this.pdtt2 = this.add.bitmapText(gwidth-145,gheight/2,'gothic','-').setOrigin(0.5,0);
        this.pdtt2.setTintFill(PlayGame.DEFAULT_BLUE_COLOR);

        // draw coms
        gr.drawCom = function (comid) {
            this.fillStyle(0x636363, 1)
            this.fillCircle(game.config.width * gameOptions.com_x * (comid + 1), gameOptions.com_y, game.config.width * gameOptions.com_radius);
            this.fillStyle(PURPLE_COLOR);
            let xoffset = 70+gameOptions.com_radius*gwidth +5;
            this.fillRect(gwidth*gameOptions.com_x*(comid + 1)-xoffset, 8,70,50);
        };

        gr.drawCom(0);
        gr.drawCom(1);
        gr.drawCom(2);

        // add com points-remaining-texts
        let x = gwidth*gameOptions.com_x-35-5-gameOptions.com_radius*gwidth;
        let y =8+24;
        this.comptd = [];
        this.comptd.push(this.add.bitmapText(x,y,'gothic','-').setOrigin(0.5,0.5).setFontSize(32));
        x = 2*gwidth*gameOptions.com_x-35-5-gameOptions.com_radius*gwidth;
        this.comptd.push(this.add.bitmapText(x,y,'gothic','-').setOrigin(0.5,0.5).setFontSize(32));
        x = 3*gwidth*gameOptions.com_x-35-5-gameOptions.com_radius*gwidth;
        this.comptd.push(this.add.bitmapText(x,y,'gothic','-').setOrigin(0.5,0.5).setFontSize(32));

        x = game.config.width * gameOptions.com_x;
        y = gameOptions.com_y;

        /**
         * The Texts "COM1", "COM2" and "COM3"
         * @type {Phaser.GameObjects.BitmapText[]}
         */
        this.com_texts = [];
        this.com_texts[0] = this.add.bitmapText(x,y,'gothic','COM1').setOrigin(0.5,0).setFontSize(32);
        this.com_texts[1] = this.add.bitmapText(x*2,y,'gothic','COM2').setOrigin(0.5,0).setFontSize(32);
        this.com_texts[2] = this.add.bitmapText(x*3,y,'gothic','COM3').setOrigin(0.5,0).setFontSize(32);

        // com tricks display
        x = gwidth*gameOptions.com_x * 1 + gwidth*gameOptions.com_radius + 5 +35;
        y =8+24;
        this.comtdonet = [];
        this.comtdeclardt = [];
        this.comtdonet.push(this.add.bitmapText(x-20,y,'gothic','-').setOrigin(0.5,0.5).setFontSize(32).setTintFill(PlayGame.DEFAULT_BLUE_COLOR));
        this.add.bitmapText(x,y,'gothic','/').setOrigin(0.5,0.5).setFontSize(32);
        this.comtdeclardt.push(this.add.bitmapText(x+20,y,'gothic','-').setOrigin(0.5,0.5).setFontSize(32).setTintFill(PlayGame.DEFAULT_BLUE_COLOR));
        x = gwidth*gameOptions.com_x * 2 + gwidth*gameOptions.com_radius + 5 +35;
        this.comtdonet.push(this.add.bitmapText(x-20,y,'gothic','-').setOrigin(0.5,0.5).setFontSize(32).setTintFill(PlayGame.DEFAULT_BLUE_COLOR));
        this.add.bitmapText(x,y,'gothic','/').setOrigin(0.5,0.5).setFontSize(32)
        this.comtdeclardt.push(this.add.bitmapText(x+20,y,'gothic','-').setOrigin(0.5,0.5).setFontSize(32).setTintFill(PlayGame.DEFAULT_BLUE_COLOR));
        x = gwidth*gameOptions.com_x * 3 + gwidth*gameOptions.com_radius + 5 +35;
        this.comtdonet.push(this.add.bitmapText(x-20,y,'gothic','-').setOrigin(0.5,0.5).setFontSize(32).setTintFill(PlayGame.DEFAULT_BLUE_COLOR));
        this.add.bitmapText(x,y,'gothic','/').setOrigin(0.5,0.5).setFontSize(32)
        this.comtdeclardt.push(this.add.bitmapText(x+20,y,'gothic','-').setOrigin(0.5,0.5).setFontSize(32).setTintFill(PlayGame.DEFAULT_BLUE_COLOR));
    }

    /**
     * COM Tricks done texts
     * @type Phaser.GameObjects.BitmapText[]
     */
    comtdonet;
    /**
     * COM Tricks declared texts
     * @type Phaser.GameObjects.BitmapText[]
     */
    comtdeclardt;

    /**
     * an Array of the Text-Objects for the Com-Points-remaining
     * @type Phaser.GameObjects.BitmapText[]
     */
    comptd;

    /**
     * Sets the remaining points for a COM-player
     * @param comid {number} the ID of the com from 0-2
     * @param points {number} the remaining points of the com
     */
    setComRemainingPoints(comid, points) {
        let txt = this.comptd[comid];
        if (txt != null) txt.text = points.toString();
    }

    /**
     * Sets the declared tricks for a COM-player
     * @param comid {number} the ID of the com from 0-2
     * @param points {number|String} the declared tricks of the com
     */
    setComDeclaredTricks(comid, points) {
        let txt = this.comtdeclardt[comid];
        if (txt != null) txt.text = points.toString();
    }

    /**
     * Sets the tricks (=Stiche) that the player has done
     * @param comid {number} the com for who to set the stat {0,1,2}
     * @param tricks {number} the tricks that the player did
     * @param state {number} Has the player done enough Tricks?
     *  one of {@link TRICKS_TODO}, {@link TRICKS_CORRECT} and {@link TRICKS_TOO_MUCH}
     */
    setComDoneTricks(comid, tricks, state) {
        const TRICKS_TOO_MUCH_COLOR = 0xE40100;
        const TRICKS_CORRECT_COLOR = 0x47E400;
        const TRICKS_TODO_COLOR = 0xE48F12;

        this.comtdonet[comid].text = tricks.toString();
        if (state === PlayGame.TRICKS_TODO) {
            this.comtdonet[comid].setTintFill(TRICKS_TODO_COLOR);
        }
        else if (state === PlayGame.TRICKS_TOO_MUCH) {
            this.comtdonet[comid].setTintFill(TRICKS_TOO_MUCH_COLOR);
        }
        else if (state === PlayGame.TRICKS_CORRECT) {
            this.comtdonet[comid].setTintFill(TRICKS_CORRECT_COLOR);
        }
        else {
            this.comtdonet[comid].setTintFill(PlayGame.DEFAULT_BLUE_COLOR);
        }
    }

    /**
     * Displays an Option to choose how many tricks the player believes they will do
     * @param choices {number} The number of choices the player has left:
     *  5 = [yield,1,2,3,4,5]
     *  4 = [yield,2,3,4,5]
     *  3 = [yield,3,4,5]
     *  ...
     *  1 = [yield,5]
     *  0 = [yield]
     *  @param listener {Controller} Objekt mit der Callback-Methode `tricksChosen(number)`
     */
    displayTrickPicker(choices = 5,listener=this.controller) {
        let gr = this.add.graphics();
        let options = [];
        let texts = [];
        const sh = game.config.height;
        const yoff = sh / 2 - sh / 10;
        const sw = game.config.width;
        const margin = 20;
        const offset = (sw - 2 * margin) / 5;

        for (let i = 1; i <= 5; i++) {
            let tcolor;
            let r;
            if (i < (6 - choices)) {
                r = this.add.rectangle(margin + offset * (i - 1) + offset / 2, yoff, offset * 0.8, offset * 0.8, 0x838383).setOrigin(0.5, 0.5).setStrokeStyle(2, 0x000000);
                tcolor = 0xBBBBBB;
            } else {
                r = this.add.rectangle(margin + offset * (i - 1) + offset / 2, yoff, offset * 0.8, offset * 0.8, 0xffffff).setOrigin(0.5, 0.5).setStrokeStyle(2, 0x000000);
                r.setInteractive();
                r.on('pointerup', function (pointer, localx, localy, event) {
                    for (let j = 0; j < options.length; j++) {
                        options[j].destroy();
                        texts[j].destroy();
                    }
                    //console.log("clicked: i=" + i)
                    this.setPlayerDeclaredTricks(i);
                    listener.tricksChosen(i);
                }, this);
                tcolor = 0x000000;
                r.on('pointerover',function(){r.setStrokeStyle(5,0x0CF2FF)});
                r.on('pointerout',function(){r.setStrokeStyle()});
            }
            let bitmaptext = this.add.bitmapText(margin + offset * (i - 1) + offset / 2, yoff, "gothic", "" + i).setOrigin(0.5, 0.5).setTintFill(tcolor);

            options.push(r);
            texts.push(bitmaptext);
        }

        let r = this.add.rectangle(margin + offset * 0.5, yoff + offset / 2 * 1.2, 4 * offset, offset * 0.6, 0xffffff).setOrigin(0, 0).setStrokeStyle(2, 0x000000).setInteractive();
        r.on('pointerup', function (pointer, localx, localy, event) {
            for (let j = 0; j < options.length; j++) {
                options[j].destroy();
                texts[j].destroy();
            }
            //console.log("clicked: passen")
            this.setPlayerDeclaredTricks("1");
            listener.tricksChosen(0);
        }, this);
        r.on('pointerover',function(){r.setStrokeStyle(5,0x0CF2FF)});
        r.on('pointerout',function(){r.setStrokeStyle()});
        let t = this.add.bitmapText(sw / 2, yoff + offset / 2 * 1.2 + offset * 0.3, "gothic", "Passen").setOrigin(0.5, 0.5).setTintFill(0x000000);
        options.push(r);
        texts.push(t);
    }

    /**
     * Displays the Icon of the Trumpffarbe
     * @param trumpffarbe {String} one of `Deck.BLATT_FARBE`, `Deck.GLOCKE_FARBE`, `Deck.HERZ_FARBE` or `Deck.NUSS_FARBE`
     */
    displayTrumpffarbe(trumpffarbe) {
        let xOff = 50;
        let yOff = game.config.height/2 - 150;
        let width = 100;
        let height = 100;
        let ox = xOff+(width/2);
        let oy = yOff+(height/2);

        if(this.trumprect === undefined) this.trumprect = this.add.rectangle(xOff,yOff,width,height,0xffffff).setOrigin(0,0);
        if(this.trumpicon != null) this.trumpicon.destroy();
        switch (trumpffarbe) {
            case Deck.BLATT_FARBE:
                this.trumpicon = this.add.sprite(ox,oy,'blatt-icon').setOrigin(0.5,0.5).setScale(0.8);
                break;
            case Deck.HERZ_FARBE:
                this.trumpicon = this.add.sprite(ox,oy,'herz-icon').setOrigin(0.5,0.5).setScale(0.8);
                break;
            case Deck.GLOCKE_FARBE:
                this.trumpicon = this.add.sprite(ox,oy,'glocke-icon').setOrigin(0.5,0.5).setScale(0.8);
                break;
            case Deck.NUSS_FARBE:
                this.trumpicon = this.add.sprite(ox,oy,'nuss-icon').setOrigin(0.5,0.5).setScale(0.8);
                break;
        }
    }

    /**
     * Sets a COM enabled or disabled
     * @param comid {number} which com [0,1,2]
     * @param enable {boolean} enable or disable?
     */
    setComEnabled(comid,enable) {
        if (!(comid in [0,1,2])) {
            console.error("Not a valid COM-ID:"+comid);
            return;
        }
        this.com_texts[comid].setTintFill(enable?0xffffff:0x999999);
        this.setComDeclaredTricks(comid,"-");
        this.setComDoneTricks(comid,'-');
    }

    /**
     * Displays the Trumpffarben-Picker
     * @param listener {Controller} Objekt mit der Callback-Methode `trumpffarbePicked(String)`
     */
    displayTrumpffarbenPicker(listener=this.controller) {
        const sh = game.config.height;
        const yOff = sh / 2 - sh / 10;
        const sw = game.config.width;
        const margin = 20;
        const offset = (sw - 2 * margin) / 4;

        let width = offset/2;
        let height = offset/2;

        let tpr = [];
        let tpi = [];
        let farbenarray = [Deck.HERZ_FARBE,Deck.BLATT_FARBE,Deck.GLOCKE_FARBE,Deck.NUSS_FARBE];
        let ffa = ["herz-icon","blatt-icon","glocke-icon","nuss-icon"];

        for (let i = 0; i < farbenarray.length; i++) {
            tpr.push(this.add.rectangle(margin+offset*i+width/2,yOff,width,height,0xffffff).setOrigin(0,0));
            tpr[i].setInteractive().on('pointerup',function () {
                listener.trumpffarbePicked(farbenarray[i]);
                console.log(farbenarray[i]+" was picked");
                for (let j = 0; j < farbenarray.length; j++) { tpr.pop().destroy(); tpi.pop().destroy(); } // clear picker
            },this);
            tpr[i].on('pointerover',function () {
                tpr[i].setStrokeStyle(5,0x0CF2FF);
            },this);
            tpr[i].on('pointerout',function () {
                tpr[i].setStrokeStyle();
            });
            tpi.push(this.add.sprite(margin+offset*i+width,yOff+height/2,ffa[i]).setOrigin(0.5,0.5).setScale(1));
        }
    }
}

