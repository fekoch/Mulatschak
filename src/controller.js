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
        // TODO implement
        this.model = new Model();

        this.startPlay();
    }

    /**
     * Starts a Play of 5 Rounds
     * (because everyone has 5 Cards)
     */
    startPlay() {
        // TODO implement
        this.model.handOut();
        this.roundCounter = 0;
        this.newRound();
    }

    /**
     * Starts a Round of 4 Runs
     * (one run for each player)
     */
    newRound() {

        if(this.roundCounter == 5){
            // Punkteberechnen
            this.newPlay();
        }else{
            this.roundCounter++;
            this.model.setStack()
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
            // Model returns den Stecher in der Play Methode sollte es funktionieren
            // View gets Stecher
            // View shows Stecher
            // Model clears Stack
            // Model sets new first Player
            // TODO end of round
            // View shows all cards which are were played
            this.newRound()
            console.log("end of round");
        }
        else if (currPlayer === this.model.getPlayer()) {
            // TODO player input

            this.view.showHand(currPlayer.getHand());
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

            console.log("COM ist an der Reihe");
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
        this.model.naechsterSpieler();
        setTimeout(function (context) {context.newRun()},1000,this); // makes game more smooth


    }
}