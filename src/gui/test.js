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
        create: create
    }
};

var game = new Phaser.Game(config);

var graphics;

function create ()
{
    const choices = 5;
    
    let gr = this.add.graphics();
    let options = [];
    let texts = [];
    const sh = game.config.height;
    const yoff = sh/2-sh/10;
    const sw = game.config.width;
    const margin = 20;
    const offset = (sw - 2*margin)/5;

    for (let i = 1; i <= 5; i++) {
        // todo text
        if (i < (6-choices) ) {
            let r = this.add.rectangle(margin+offset*(i-1)+offset/2,yoff,offset*0.8,offset*0.8,0x838383).setOrigin(0.5,0.5).setStrokeStyle(2,0x000000);
        }
        else{
            let r = this.add.rectangle(margin+offset*(i-1)+offset/2,yoff,offset*0.8,offset*0.8,0xffffff).setOrigin(0.5,0.5).setStrokeStyle(2,0x000000);
            r.setInteractive();
            r.on('pointerup',function (pointer,localx,localy,event) {
                // todo
            },this);
            // todo hover
        }
    }
}