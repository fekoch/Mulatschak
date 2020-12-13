var config = {
    type: Phaser.AUTO,
    backgroundColor: "#618f4d",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "thegame",
        height: 750,
        width: 1334
    },
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

var graphics;
function preload() {
    this.load.bitmapFont('gothic','assets/fonts/gothic.png','assets/fonts/gothic.xml');
    this.load.image('nuss-icon','assets/eichel_icon.png');
    this.load.image('herz-icon','assets/herz_icon.png');
    this.load.image('blatt-icon','assets/blatt_icon.png');
    this.load.image('glocke-icon','assets/glocke_icon.png');
}
function create ()
{
    let trumpffarbe = Deck.NUSS_FARBE;

    let xOff = 100;
    let yOff = 100;
    let width = 100;
    let height = 100;
    let ox = xOff+(width/2);
    let oy = yOff+(height/2);
    this.trumprect = this.add.rectangle(xOff,yOff,width,height,0xffffff).setOrigin(0,0);
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

    trumpffarbe = Deck.GLOCKE_FARBE;
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
 * Displays the Icon of the Trumpffarbe
 * @param trumpffarbe {String} one of `Deck.BLATT_FARBE`, `Deck.GLOCKE_FARBE`, `Deck.HERZ_FARBE` or `Deck.NUSS_FARBE`
 */
function displayTrumpffarbe(trumpffarbe) {
}
