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
        this.hand = new Set();
        this.counter = 21;
        this.reihe = false;
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

}