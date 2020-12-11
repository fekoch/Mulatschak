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
}
function create ()
{
    const choices = 0;
    
    let gr = this.add.graphics();
    let options = [];
    let texts = [];
    const sh = game.config.height;
    const yoff = sh/2-sh/10;
    const sw = game.config.width;
    const margin = 20;
    const offset = (sw - 2*margin)/5;

    for (let i = 1; i <= 5; i++) {
        let tcolor;
        let r;
        if (i < (6-choices) ) {
            r = this.add.rectangle(margin+offset*(i-1)+offset/2,yoff,offset*0.8,offset*0.8,0x838383).setOrigin(0.5,0.5).setStrokeStyle(2,0x000000);
            tcolor =0xBBBBBB;
        }
        else{
            r = this.add.rectangle(margin+offset*(i-1)+offset/2,yoff,offset*0.8,offset*0.8,0xffffff).setOrigin(0.5,0.5).setStrokeStyle(2,0x000000);
            r.setInteractive();
            r.on('pointerup',function (pointer,localx,localy,event) {
                for (let j = 0; j < options.length ; j++) {
                    options[j].destroy();
                    texts[j].destroy();
                }
                console.log("clicked: i="+i)
            },this);
            tcolor =0x000000;
        }
        let bitmaptext = this.add.bitmapText(margin+offset*(i-1)+offset/2,yoff,"gothic",""+i).setOrigin(0.5,0.5).setTintFill(tcolor);

        options.push(r);
        texts.push(bitmaptext);
    }

    let r = this.add.rectangle(margin+offset*0.5,yoff+offset/2*1.2,4*offset,offset*0.6,0xffffff).setOrigin(0,0).setStrokeStyle(2,0x000000).setInteractive();
    r.on('pointerup',function (pointer,localx,localy,event) {
        for (let j = 0; j < options.length ; j++) {
            options[j].destroy();
            texts[j].destroy();
        }
        console.log("clicked: passen")
    },this);
    let t = this.add.bitmapText(sw/2,yoff+offset/2*1.2+offset*0.3,"gothic","Passen").setOrigin(0.5,0.5).setTintFill(0x000000);
    options.push(r);
    texts.push(t);
}