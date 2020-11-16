
var CardSet;
var Cardarr;
/**
 * The Deck with all the Playingcards
 * @auhtor David Hegyi
 * @version 07/11/2020
 */
class Deck{
    static NUSS_FARBE= "Nuss";
    static BLATT_FARBE="Blatt";
    static HERZ_FARBE="Herz";
    static GLOCKE_FARBE="Glocke";
    static WELI_FARBE="Weli";

    /**
     * Creates all Cards and saves it in a Set
     */
    constructor(){
        this.CardSet = new Set();
        this.Cardarr;
        for(var i = 14;i >= 7;){
            this.CardSet.add(new Card(Deck.NUSS_FARBE,i));
            this.CardSet.add(new Card(Deck.BLATT_FARBE,i));
            this.CardSet.add(new Card(Deck.HERZ_FARBE,i));
            this.CardSet.add(new Card(Deck.GLOCKE_FARBE,i));
            i--;
        }
        this.CardSet.add(new Card(Deck.NUSS_FARBE,6));
        this.CardSet.add(new Card(Deck.BLATT_FARBE,6));
        this.CardSet.add(new Card(Deck.HERZ_FARBE,6));
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
