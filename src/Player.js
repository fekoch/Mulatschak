var hand;

/**
 * Creates a player
 * @author David Hegyi
 * @version 08/11/2020
 */
class Player{
    
    /** 
     * Creates a new Player
     */
    constructor(){
        this.hand = [];
        counter = 21;
        reihe = false;
        sticheAngesagt = 0;
        sticheBekommen = 0;
        rundeGewonnen = false;
    }
    
    /**
     * adds a card into the hand
     * @param {Card} card - the added Card
     */
    addcard(card){
        this.hand.add(card);
    }
    
    /**
     * deleats a card from the hand
     * @param {Card} card - the deleted Card
     */
    delcard(card){
        this.hand.delete(card);
    }
    
    /**
     * gives you a Card you like depending on the param value
     * @param {number} int - is the value for the number of the card in the array
     */
    getCard(int){
        this.Cardarr = Array.from(this.hand);
        this.hand.delete(this.Cardarr[int]);
        return this.Cardarr[int];
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
     * sets rundeGewonnen
     * @param the sticheBekommen
     */
    setRundeGewonnen(gewonnen) {
        this.RundeGewonnen=gewonnen;
    } 
    /**
     * gets rundeGewonnen
     * @return the rundeGewonnen
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
}
