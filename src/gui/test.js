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
            // TODO call listener
            console.log(farbenarray[i]+" was picked");
            for (let j = 0; j < farbenarray.length; j++) { tpr.pop().destroy(); tpi.pop().destroy(); } // clear picker
        },this);
        tpi.push(this.add.sprite(margin+offset*i+width,yOff+height/2,ffa[i]).setOrigin(0.5,0.5).setScale(1));
    }
}
