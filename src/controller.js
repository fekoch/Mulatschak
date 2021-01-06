/**
 * A Controller for a Game
 * @author Felix Koch
 * @author Anne Kreppenhofer
 * @version 2020-11-29
 */
class Controller {
    view;
    model;

    /**
     * Creates a new Controller
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
        this.model = new Model();
        /**
         * An array that contains all the coms
         * @type {Player[]}
         */
        this.comarray  = [this.model.getCom1(),this.model.getCom2(),this.model.getCom3()];
        this.view.displayFadeOutMessage("Das Spiel beginnt!");
        this.startPlay();
    }

    /**
     * Starts a Play of 5 Rounds
     * (because everyone has 5 Cards)
     */
    startPlay() {
        // TODO implement

        this.model.handOut();
        let time_plus = 0;
        if(this.model.getMulti() > 1){ // Message about Multi
            setTimeout(function (context) {
                context.view.displayFadeOutMessage("Der Multiplikator fuer diese Runde wurde bereits erhoeht er lautet"+context.model.getMulti());
                },1000,this);
            time_plus = 1000;
        }

        this.roundCounter = 0;
        setTimeout(function (context) {context.newRound();},time_plus,this);
    }

    /**
     * Starts a Round of 4 Runs
     * (one run for each player)
     */
    newRound() {


        this.view.showHand(this.model.getPlayer().getHand());

        setTimeout(function (context) {
            context.view.displayFadeOutMessage("Stiche ansagen");
        }, 1500, this);

        setTimeout(function (context) {
            context.view.displayTrickPicker(5);
        }, 2000, this);

    }

    /**
     * Starts the Round for real, is called by trumpffarbePicked()
     */
    startRound() {
        console.log("startRound()");

        if(this.roundCounter === 5){
            this.model.punkteauszaehlung();
            // TODO view gets the points
            setTimeout(function (context) { return context.startPlay(); },2000,this);
        }else{
            this.roundCounter++;
            /*
             * if a com starts, call setStack
             * (this ignores the played card of the player for the coms, who come after him/her)
             */
            if (this.model.getRundenBeginner() !== this.model.getPlayer()) this.model.setStack();
            this.newRun();
        }
    }

    /**
     * Starts a run for the currently active Player
     *  or ends the Round if all players played
     */
    newRun() {
        console.log("NewRun ["+this.roundCounter+"]");
        let currPlayer = this.model.getSpieleranderReihe();
        console.log("getSpieler an der Reihe: ");
        console.log(currPlayer);
        if (currPlayer === -1) { // if all players had their turn
            console.log("end of round");
            var stecher =this.model.play();
            this.view.displayFadeOutMessage(stecher.getName()+" hat den Stich gemacht!");
            this.view.hideDropzone();
            this.view.setCardDragEnabled(false);

            let sticheG = stecher.getSticheBekommen();
            let sticheAn = stecher.getSticheAngesagt();
            let stichFarbe = sticheG>=sticheAn?PlayGame.TRICKS_CORRECT:PlayGame.TRICKS_TODO;
            if (stecher === this.model.getPlayer()) this.view.setPlayerDoneTricks(sticheG,stichFarbe);
            else this.view.setComDoneTricks(this.comarray.indexOf(stecher),sticheG,stichFarbe);

            setTimeout(function (context) {context.view.clearComCards();}, 500,this);
            setTimeout(function (context) {context.view.clearPlayerCard()}, 500,this);
            setTimeout(function (context) { return context.startRound(); },1000,this);
        }
        else if (currPlayer === this.model.getPlayer()) {
            console.log("Player")
            this.view.showDropzone();
            this.view.setCardDragEnabled(true);
        }
        else {
            console.log("COM");
            let card = "ERORO";
            if(currPlayer === this.model.getCom1()){
                card = this.model.getCom1().getPlayedCard();
                this.view.comPlayCard(1,card);
            }else if(currPlayer === this.model.getCom2()){
                card = this.model.getCom2().getPlayedCard();
                this.view.comPlayCard(2,this.model.getCom2().getPlayedCard());
            }else if(currPlayer === this.model.getCom3()){
                card = this.model.getCom3().getPlayedCard();
                this.view.comPlayCard(3,this.model.getCom3().getPlayedCard());
            }
            console.log("COM-Name: "+currPlayer.getName());
            console.log("COM-PlayedCard: ");
            console.log(card);
            this.model.naechsterSpieler();

            setTimeout(function (context) {context.newRun()},1000,this); // makes game more smooth
        }

    }

    /**
     * Plays a Card for the Player
     * @param card the card that the player plays
     */
    playCard(card) {
        // TODO implement
        console.log("Played CARD:");
        console.log(card);
        this.view.hideDropzone();
        this.view.setCardDragEnabled(false);
        this.model.setPlayerinStack(card);
        // Model accepts the card or rejected it
        // if the card is accepted
        // else view starts a new user input
        // this.view.showHand
        // this.view showDropzone

        this.model.setStack();
        console.log("SetStack")
        this.model.naechsterSpieler();
        console.log("NextPlayer")
        setTimeout(function (context) {context.newRun()},1000,this); // makes game more smooth
    }

    /**
     * Angesagt Stiche vom Player
     * @param tricks
     */
    tricksChosen(tricks) {
        var stiche = this.model.setSticheAngesagt(tricks);
        this.model.prePlay();
        this.view.setComDeclaredTricks(0,this.model.getCom1().getSticheAngesagt());
        this.view.setComDeclaredTricks(1,this.model.getCom2().getSticheAngesagt());
        this.view.setComDeclaredTricks(2,this.model.getCom3().getSticheAngesagt());

        // TODO falls die Coms es schaffen mehr anzuzeigen dann muss man die angesgaten Stiche anders setzen

        // Player with the highest angesagte Stiche must set the trumpffarbe

        // if it is the player the views shows that
        // Model gets the trumpfarbe

        if(stiche === -1){ // is the Player the Stichsager
            setTimeout(function (context) {context.view.displayTrumpffarbenPicker(context)},1000,this); // makes game more smooth
        }

        // TODO Discard Cards
        // first player starts to discard cards (and the other players also)
        // if players step out




    }
    /**
     *
     */
    trumpffarbePicked(farbe){
        this.model.setTrumpffarbe(farbe);
        this.view.displayTrumpffarbe(farbe);
        this.startRound();
    }
}