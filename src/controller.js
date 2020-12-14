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
        this.startPlay();
    }

    /**
     * Starts a Play of 5 Rounds
     * (because everyone has 5 Cards)
     */
    startPlay() {
        // TODO implement

        this.model.handOut();
        if(this.model.getMulti() > 1){
            this.view.displayFadeOutMessage("Der Multiplikator für diese Runde wurde bereits erhöht er lautet"+this.model.getMulti());
        }
        this.roundCounter = 0;
        this.view.showHand(this.model.getPlayer().getHand());

        this.view.displayTrickPicker(5);

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
        this.model.setStack();
        this.newRun();
        setTimeout(function (context) {context.newRun()},1000,this); // makes game more smooth


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