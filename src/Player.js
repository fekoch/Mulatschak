var hand;

/**
 * Creates a player
 * @author David Hegyi
 * @version 08/11/2020
 */
class Player{

    playedCard;

    /**
     * Creates a new Player
     */
    constructor(){
        var name = "";
        this.hand = [];
        var counter = 21;
        var reihe = false;
        var sticheAngesagt = 0;
        var sticheBekommen = 0;
        this.rundeGewonnen = false;
        var reihe;
        this.playedCard = null;
    }
    
    /**
     * adds a card into the hand
     * @param {Card} card - the added Card
     */
    addcard(card){
        this.hand.push(card);
    }
    
    /**
     * deleats a card from the hand
     * @param {Card} card - the deleted Card
     */
    delcard(card){
        var set = new Set(this.hand);
        set.delete(card);
        this.hand = Array.from(set);
    }
    
    /**
     * gives you a Card you like depending on the param value
     * @param {number} int - is the value for the number of the card in the array
     */
    getCard(int){
        return this.hand[int];
    }
    
    /**
     * returns hand
     * @return hand
     */
    getHand(){
        return this.hand;
    }
    
    /**
     * chnages the counter
     * @param {number} counter - the new counter
     */
    setCounter(counter){
        this.counter = counter;
        console.log(counter);
    }
    
    /**
     * sets reihe, that tells you if this player starts the round
     * @param (boolean) reihe - true if he starts, false if not
     */
    setReihe(beginn){
        this.reihe = beginn;
    }
    
    /**
     * sets sticheBekommen
     * @param the sticheBekommen
     */
    setSticheBekommen(bekommen) {
        this.sticheBekommen=bekommen;
    }
    /**
     * gets sticheBekommen
     * @return the sticheBekommen
     */
    getSticheBekommen() {
        return this.sticheBekommen;
    }

    /**
     * fügt einen bekommenen stich hinzu
     */
    addStich(){
        this.sticheBekommen + 1;
    }
    /**
     * sets rundeGewonnen
     * @param gewonnen {boolean} if the player has won
     */
    setRundeGewonnen(gewonnen) {
        this.rundeGewonnen=gewonnen;
        this.reihe = gewonnen;
    }

    /**
     * gets rundeGewonnen
     * @return gewonnen {boolean} the rundeGewonnen
     */
    getRundeGewonnen() {
        return this.rundeGewonnen;
    }
    
    /**
     *  set SticheAngesagt
     *  @param anzahl
     */
    setSticheAngesagt(anzahl) {
        this.setSticheAngesagt=anzahl;
    }
    /**
     * get sticheAngesagt
     * @return sticheAngesagt
     */
    getSticheAngesagt() {
        return this.sticheAngesagt;
    }

    /**
     * Sets a selected Card of the Hand as played
     *  (and removes it from the hand)
     * @param card {Card} the card to play
     */
    playCard(card){
        if (this.hand.includes(card)) {
            this.delcard(card);
            this.playedCard = card;
        }
        else console.error("The card "+card+" is not int the hand of the player "+this);
    }

    /**
     * Retruns the played Card
     * @return {Card|null}
     */
    getPlayedCard() {
        return this.playedCard;
    }

    /**
     * Clears the played Card
     */
    clearPlayedCard() {
        this.playedCard = null;
    }

    /**
     * setzt den namen eines spielers
     * @param {String} name
     */
    setName(name){
        this.name = name;
    }

    /**
     * gibt den name eines spieler zurück
     * @returns {string} name des palyers
     */
    getName(){
        return name;
    }

    /**
     * setzt den namen eines spielers
     * @param {Boolean} name
     */
    setReihe(reihe){
        this.reihe = reihe;
    }

    /**
     * gibt den name eines spieler zurück
     * @returns {string} name des palyers
     */
    getReihe(){
        return this.reihe;
    }
}