var ar;
var stack;
var deck;
        var player;
        var com1;
        var com2;
        var com3;
/**
 * The Gamelogic
 * @author David Hegyi
 * @version 8/11/2020
 */
class Model{
    
    /**
     *
     */
    constructor(){
        this.deck = new Deck();
        this.player = new Player();
        this.com1 = new Player();
        this.com2 = new Player();
        this.com3 = new Player();
        this.ar = [];
        var multi = 1;
        var trumpffarbe = "";
        this.stack = [];
        var trumpfVorhanden = false;
        var gewinnerfarbe = "";
    }
    
    
    /**
     * setzt die Trumpffarbe
     * @param farbe - die neue trumpffarbe
     */
    setTrumpffarbe(farbe){
        this.trumpffarbe = farbe;
    }
    
    /**
     *  set SticheAngesagt
     *  @param anzahl 
     */
    setSticheAngesagt(anzahl) {
        this.setSticheAngesagt = anzahl;
    }
    
    /**
     * Get Player
     * @return player
     */
    getPlayer() {
        return this.player;
    }
    /**
     * Get Com1 
     * @return com1
     */
    getCom1() {
        return this.com1;
    }
    /**
     * Get Com2 
     * @return com2
     */
    getCom2() {
        return this.com2;
    }
    /**
     * Get Com3
     * @return com3
     */
    getCom3() {
        return this.com3;
    }
    
     /**
     * Lässt alle Personen 5 Kartenziehen
     */
    handOut(){
        var handp;
        var handc1;
        var handc2;
        var handc3;
        //do{
           // var j= 0;
            for(var i = 0;i<5;i++){
                this.player.addcard(this.deck.draw());
                this.com1.addcard(this.deck.draw());
                this.com2.addcard(this.deck.draw());
                this.com3.addcard(this.deck.draw());
            }
           // if(j=1){
            //    this.multi=this.multi*2;
           // }
           // j=1;
            //handp = this.player.getHand;
       // } while(j=0);
        //(handp[0].number > 10||handp[1].number > 10||handp[2].number > 10||handp[3].number > 10)&&(handc1[0].number > 10||handc1[1].number > 10||handc1[2].number > 10||handc1[3].number > 10)&&(handc2[0].number > 10||handc2[1].number > 10||handc2[2].number > 10||handc2[3].number > 10)&&(handc3[0].number > 10||handc3[1].number > 10||handc3[2].number > 10||handc3[3].number > 10)
        console.log(this.player);
        console.log(this.com1);
        console.log(this.com2);
        console.log(this.com3);
    }
    
    
    /**
     * discarded eine zahl an Karten für einen bestimmten spieler
     * @param player - spieler
     * @param num - ein Array, dieses sagt welche Karte (nach der nummer der reihenfolgen 0-5) gelöscht werden soll
     */
    discard(player, num){
        if(num.length <= 5){
            for(var i = 0;i<num.length;i++){
                player.delcard(player.getCard(num[i]));
            }
        }else{
            alert("You don't have that many Cards to discard");
        }
    }
    
    /**
     * setzt die werte zurück
     */
    restart(){
        this.multi = 1;
        this.trumpffarbe = "";
        this.gewinnerfarbe = "";
    }
    
    /** 
     * giebt an wer am meisten stiche angesagt hat und giebt diese person zurück
     * @return eine Person
     */
    prePlay(){
        if(this.player.getSticheAngesagt > this.com1.getSticheAngesagt && this.player.getSticheAngesagt > this.com2.getSticheAngesagt && this.player.getSticheAngesagt > this.com3.getSticheAngesagt){
            this.player.setRundeGewonnen(true);
            return this.player;
        }else if(this.player.getSticheAngesagt < this.com1.getSticheAngesagt && this.com1.getSticheAngesagt > this.com2.getSticheAngesagt && this.com1.getSticheAngesagt > this.com3.getSticheAngesagt){
            this.com1.setRundeGewonnen(true);
            return this.com1;
        }else if(this.com2.getSticheAngesagt > this.com1.getSticheAngesagt && this.player.getSticheAngesagt < this.com2.getSticheAngesagt && this.com2.getSticheAngesagt > this.com3.getSticheAngesagt){
            this.com2.setRundeGewonnen(true);
            return this.com2;     
        }else if(this.com3.getSticheAngesagt > this.com1.getSticheAngesagt && this.player.getSticheAngesagt > this.com2.getSticheAngesagt && this.com3.getSticheAngesagt < this.com3.getSticheAngesagt){
            this.com3.setRundeGewonnen(true);
            return this.com3;
        }
    }
    
    /**
     *
     */
   play(card1,comcard1, comcard2, comcard3){
        //ar[0] = player1;
        //ar[1] = card1;
        this.stack.push(card1);
        this.player.delcard(card1);
        this.stack.push(comcard1);
        this.com1.delcard(comcard1);
        this.stack.push(comcard2);
        this.com2.delcard(comcard2);
        this.stack.push(comcard3);
        this.com2.delcard(comcard3);
        if(this.player.getRundeGewonnen())this.gewinnerfarbe=card1.getColor();
        else if(this.com1.getRundeGewonnen())this.gewinnerfarbe=comcard1.getColor();
        else if(this.com2.getRundeGewonnen())this.gewinnerfarbe=comcard2.getColor();
        else if(this.com3.getRundeGewonnen())this.gewinnerfarbe=comcard3.getColor();
        // Hier kommt noch die Methode für die Stiche damit bei der ersten Runde der Spieler mit der höchsten Stichanzahl als erstes Spielt und somit die Gewinnerfarbe bestimmt
        
        ar[0]=card1
        // Schauen welche Karten die Trumpffarbe haben, und die höchste Trumpffarbenkarte bestimmen
            for(var i = 0;i<4;i++){
                if(stack[i].getColor()==this.trumpffarbe && 
                   stack[i].getNumber()>=ar[0].getNumber()) {
                    ar[0]=stack[i];                                   
                    this.trumpfVorhanden = true;
                }
            }
        // Falls die Trupffarbe nicht vorkommt gewinnt die höchste Karte mit der Gewinnerfarbe
            if(this.trumpfVorhanden===false) {
                for(i = 0;i<4;i++){
                    if(stack[i].getColor()==this.gewinnerfarbefarbe && 
                       stack[i].getNumber()>ar[0].getNumber()) {
                        ar[0]=stack[i];
                    }
                }
            }
        // Falls der Spieler die Runde gewonnen hat kriegt er +1 stiche und gilt als gewinner der Runde
            if(ar[0]==this.player) {
                this.player.setSticheBekommen(this.player.getSticheBekommen()+1);
                this.player.setRundeGewonnen(true);
                this.com1.setRundeGewonnen(false);
                this.com2.setRundeGewonnen(false);
                this.com3.setRundeGewonnen(false);
            }
        // Falls der Com1 die Runde gewonnen hat kriegt er +1 stiche und gilt als gewinner der Runde
            if(ar[0]==this.com1) {
                this.com1.setSticheBekommen(this.com1.getSticheBekommen()+1);
                this.player.setRundeGewonnen(false);
                this.com1.setRundeGewonnen(true);
                this.com2.setRundeGewonnen(false);
                this.com3.setRundeGewonnen(false);
            }
        // Falls der Com2 die Runde gewonnen hat kriegt er +1 stiche und gilt als gewinner der Runde
            if(ar[0]==this.com2) {
                this.com2.setSticheBekommen(this.com2.getSticheBekommen()+1);
                this.player.setRundeGewonnen(false);
                this.com1.setRundeGewonnen(false);
                this.com2.setRundeGewonnen(true);
                this.com3.setRundeGewonnen(false);
            }
        // Falls der Com3 die Runde gewonnen hat kriegt er +1 stiche und gilt als gewinner der Runde
            if(ar[0]==this.com3) {
                this.com3.setSticheBekommen(this.com3.getSticheBekommen()+1);
                this.player.setRundeGewonnen(false);
                this.com1.setRundeGewonnen(false);
                this.com2.setRundeGewonnen(false);
                this.com3.setRundeGewonnen(true);
            }
        }
}
