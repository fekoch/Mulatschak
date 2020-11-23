
var CardSet;
var Cardarr;
/**
 * The Deck with all the Playingcards
 * @auhtor David Hegyi
 * @version 07/11/2020
 */
class Deck{
    static GLOCKE_FARBE = "GLOCKE_FARBE";
    static NUSS_FARBE = "NUSS_FARBE";
    static HERZ_FARBE = "HERZ_FARBE";
    static BLATT_FARBE = "BLATT_FARBE";
    static WELI_FARBE = "WELI_FARBE";

    /**
     * Creates all Cards and saves it in a Set
     */
    constructor(){
        this.CardSet = new Set();
        this.Cardarr;
        for(var i = 14;i >= 7;){
            this.CardSet.add(new Card(Deck.NUSS_FARBE,i));
            this.CardSet.add(new Card(Deck.HERZ_FARBE,i));
            this.CardSet.add(new Card(Deck.BLATT_FARBE,i));
            this.CardSet.add(new Card(Deck.GLOCKE_FARBE,i));
            i--;
        }
        this.CardSet.add(new Card(Deck.WELI_FARBE,6));
    }

    /**
     * gives you a random number
     * @return the Random number
     */
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    /**
     * gives you a Card you like depending on the param value
     * @param {number} int - is the value for the number of the card in the array
     */
    getCard(int){
        this.Cardarr = Array.from(this.CardSet);
        this.CardSet.delete(this.Cardarr[int]);
        return this.Cardarr[int];
    }

    /**
     * gives you a random Card
     * @return gives you a random Card
     */
    draw(){
        console.log(this.CardSet);
        console.log(this.CardSet.size);
      return this.getCard(this.getRandomInt(this.CardSet.size));
    }
}
