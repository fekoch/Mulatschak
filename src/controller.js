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

        this.newRound();
    }

    /**
     * Starts a Round of 4 Runs
     * (one run for each player)
     */
    newRound() {
        // TODO implement ?
        this.model.handOut();

        this.newRun();
    }

    /**
     * Starts a run for the currently active Player
     *  or ends the Round if all players played
     */
    newRun() {
        let currPlayer = this.model.getSpieleranderReihe();
        if (currPlayer === -1) {
            // TODO end of round
            // View shows all cards which are were played
            console.log("end of round");
        }
        else if (currPlayer === this.model.getPlayer()) {
            // TODO player input
            // Model returns played cards
            // View shows played cards
            this.view.showHand(currPlayer.getHand());
            this.view.showDropzone();
        }
        else {
            // TODO com play
            // View shows COM Animation of playing cards
            // View shows all played cards
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
        // Model gets card
        // Model returns Stecher

    }
}