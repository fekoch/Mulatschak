/**
 * A Tutorialcontroller for the Tutorial
 * @author Alexander Hristov
 * @version 2020-11-29
 */
class Tutorialcontroller {
    view;
    model;
    c = 5;
    /**
     * Creates a new Tutorialcontroller
     * @param view {PlayGame}
     */
    constructor(view) {
        this.view = view;
        this.deck = new Deck();
        // creates the dropzone; it is linked to the playCard()-Method
        this.view.createDropzones();
        this.roundCounter = 0;
    }

    /*
     * For everybody:
     * Game { * Plays { 5 Rounds { 4 Runs
     * '{' = consists of
     */

    /**
     * Plays a Game which consists of an undefined number of Plays
     */
    playGame() {


        this.startPlay();
    }

    /**
     * Starts a Play of 5 Rounds
     * (because everyone has 5 Cards)
     */
    startPlay() {
        // TODO implement
        this.model = new Model();
        //this.model.setPlayerHand(new Card("HERZ_FARBE",9),new Card("BLATT_FARBE",12),new Card("NUSS_FARBE",13),new Card("HERZ_FARBE",14),new Card("GLOCKE_FARBE",11));
        this.model.getPlayer().hand = [new Card("HERZ_FARBE",9),new Card("BLATT_FARBE",12),new Card("NUSS_FARBE",13),new Card("HERZ_FARBE",14),new Card("GLOCKE_FARBE",11)];
        //if(this.model.getMulti() > 1){
        //    this.view.displayFadeOutMessage("Der Multiplikator für diese Runde wurde bereits erhöht er lautet"+this.model.getMulti());
        //}
        //this.roundCounter = 0;
        this.view.showHand(this.model.getPlayer().getHand());
        this.view.comPlayCard(1,new Card("HERZ_FARBE",7));
        this.view.comPlayCard(2,new Card("GLOCKE_FARBE",7));
        this.view.comPlayCard(3,new Card("NUSS_FARBE",7));
        this.view.displayTrumpffarbe("HERZ_FARBE");

        this.view.showDropzone();

    }
    startPlay1() {
        // TODO implement
        //this.model = new Model();
        //if(this.model.getMulti() > 1){
        //    this.view.displayFadeOutMessage("Der Multiplikator für diese Runde wurde bereits erhöht er lautet"+this.model.getMulti());
        //}
        //this.roundCounter = 0;
        this.view.showHand(this.model.getPlayer().getHand());
        this.view.comPlayCard(1,new Card("HERZ_FARBE",8));
        this.view.comPlayCard(2,new Card("GLOCKE_FARBE",8));
        this.view.comPlayCard(3,new Card("NUSS_FARBE",8));
        this.view.displayTrumpffarbe("HERZ_FARBE");

        this.view.showDropzone();

    }
    startPlay2() {
        // TODO implement
        //this.model = new Model();
        //if(this.model.getMulti() > 1){
        //    this.view.displayFadeOutMessage("Der Multiplikator für diese Runde wurde bereits erhöht er lautet"+this.model.getMulti());
        //}
        //this.roundCounter = 0;
        this.view.showHand(this.model.getPlayer().getHand());
        this.view.comPlayCard(1,new Card("NUSS_FARBE",12));
        this.view.comPlayCard(2,new Card("GLOCKE_FARBE",9));
        this.view.comPlayCard(3,new Card("NUSS_FARBE",10));
        this.view.displayTrumpffarbe("HERZ_FARBE");

        this.view.showDropzone();

    }
    startPlay3() {
        // TODO implement
        //this.model = new Model();
        //if(this.model.getMulti() > 1){
        //    this.view.displayFadeOutMessage("Der Multiplikator für diese Runde wurde bereits erhöht er lautet"+this.model.getMulti());
        //}
        //this.roundCounter = 0;
        this.view.showHand(this.model.getPlayer().getHand());
        this.view.comPlayCard(1,new Card("BLATT_FARBE",11));
        this.view.comPlayCard(2,new Card("NUSS_FARBE",9));
        this.view.comPlayCard(3,new Card("BLATT_FARBE",10));
        this.view.displayTrumpffarbe("HERZ_FARBE");

        this.view.showDropzone();

    }
    startPlay4() {
        // TODO implement
        //this.model = new Model();
        //if(this.model.getMulti() > 1){
        //    this.view.displayFadeOutMessage("Der Multiplikator für diese Runde wurde bereits erhöht er lautet"+this.model.getMulti());
        //}
        //this.roundCounter = 0;
        this.view.showHand(this.model.getPlayer().getHand());
        this.view.comPlayCard(1,new Card("GLOCKE_FARBE",10));
        this.view.comPlayCard(2,new Card("NUSS_FARBE",11));
        this.view.comPlayCard(3,new Card("BLATT_FARBE",9));
        this.view.displayTrumpffarbe("HERZ_FARBE");

        this.view.showDropzone();

    }
    /**
     * Starts a Round of 4 Runs
     * (one run for each player)
     */
    newRound() {

        if(this.roundCounter == 5){
            this.model.punkteauszaehlung();
            // TODO view gets the points
            this.startPlay();
        }else{
            this.roundCounter++;

            this.newRun();
        }
    }

    /**
     * Starts a run for the currently active Player
     *  or ends the Round if all players played
     */
    newRun() {
        let currPlayer = this.model.getSpieleranderReihe();
        if (currPlayer === -1) {
            var stecher =this.model.play();
            this.view.displayFadeOutMessage(stecher.getName()+" hat den Stich gemacht!");
            this.newRound()
            console.log("end of round");
        }
        else if (currPlayer === this.model.getPlayer()) {
            this.view.showDropzone();
        }
        else {

            if(currPlayer === this.model.getCom1()){
                this.view.comPlayCard(1,this.model.getCom1().getPlayedCard());
            }else if(currPlayer === this.model.getCom2()){
                this.view.comPlayCard(2,this.model.getCom2().getPlayedCard());

            }else if(currPlayer === this.model.getCom3()){
                this.view.comPlayCard(3,this.model.getCom3().getPlayedCard());
            }
            this.model.naechsterSpieler();

            setTimeout(function (context) {context.newRun()},1000,this); // makes game more smooth
            // TODO com play
            //setTimeout(function() {window.location.replace("MulatschakTutorial.html")},1000)

            console.log("COM ist an der Reihe");
        }

    }

    /**
     * Plays a Card for the Player
     * @param {Card}card the card that the player plays
     */
    playCard(card) {
        // TODO implement
        /**if((card.equals(new Card("HERZ_FARBE",7)))||(card.equals(new Card("HERZ_FARBE",14))))this.view.displayFadeOutMessage("Well Done", 1000);
        else {
            this.view.displayFadeOutMessage("Try Again", 1000);
            //this.playGame();
        }**/
        console.log("Played CARD:");
        console.log(card);
        //if(card.getColor()=="HERZ_FARBE") {
        if(card.equals(new Card("HERZ_FARBE",9)) || card.equals(new Card("HERZ_FARBE",14)) || (card.equals(new Card("NUSS_FARBE",13)) && this.c==3) || (card.equals(new Card("BLATT_FARBE",12)) && this.c==2) || (card.equals(new Card("GLOCKE_FARBE",11)) && this.c==1)) {
        this.view.hideDropzone();
        this.view.setCardDragEnabled(false);
        this.model.setPlayerinStack(card);
        // Model accepts the card or rejected it
        // if the card is accepted
        // else view starts a new user input
        // this.view.showHand
        // this.view showDropzone
        //this.model.naechsterSpieler();
        //this.model.setStack();
        //if(1==1)this.view.displayFadeOutMessage("Try Again", 1000);
        this.newRun();


            this.view.displayFadeOutMessage("Well Done", 1000);
            //window.location.replace("MulatschakTutorial.html");
            console.log("Hi");
            this.model.getPlayer().delcard(card);
            this.c--;
        }
        else {
            this.view.displayFadeOutMessage("Try Again", 1000);
        }
        //setTimeout(function (context) {context.newRun()},1000,this); // makes game more smooth
        //this.card.enableOutline = false;
        if(this.c==5)this.startPlay();
        if(this.c==4)this.startPlay1();
        if(this.c==3)this.startPlay2();
        if(this.c==2)this.startPlay3();
        if(this.c==1)this.startPlay4();

        if(this.c==0)window.location.replace("Homepage.html");
    }

    /**
     * Angesagt Stiche vom Player
     * @param tricks
     */
    tricksChosen(tricks) {
        var stiche = this.model.setSticheAngesagt(tricks)
        this.model.prePlay();
        this.view.setComDeclaredTricks(0,this.model.getCom1().getSticheAngesagt());
        this.view.setComDeclaredTricks(1,this.model.getCom2().getSticheAngesagt());
        this.view.setComDeclaredTricks(2,this.model.getCom3().getSticheAngesagt());

        // TODO falls die Coms es schaffen mehr anzuzeigen dann muss man die angesgaten Stiche anders setzen

        // Player with the highest angesagte Stiche must set the trumpffarbe

        // if it is the player the views shows that
        // Model gets the trumpfarbe
        this.view.displayFadeOutMessage(stiche);

        if(stiche == -1){
            // TODO VIEW METHOD TO GET TRUMPFFARBE
            this.model.setTrumpffarbe(this.deck.GLOCKE_FARBE);
            this.view.displayFadeOutMessage("Die Trumpffarbe ist Glocken!");
        }

        // TODO Discard Cards
        // first player starts to discard cards (and the other players also)
        // if players step out



        this.newRound();
    }
}