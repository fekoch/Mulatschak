/**
 * The Gamelogic
 * @author David Hegyi
 * @version 8/11/2020
 */
class Model{
    // TODO Playmethode Stecher zurück geben
    // TODO Punkteberechnung
    // TODO Weli-suchen
    // TODO DOCUMENTATION
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
        this.player.setRundeGewonnen(true);
    }
    /**
	* Setzt Karten im Array
	 * @param {Card} card1 - Karte des Spielers 
	 */
    setStack() {
        this.com1.playCard(this.com1.getCard(1));
        this.com2.playCard(this.com2.getCard(1));
        this.com3.playCard(this.com3.getCard(1));
	}
    // TODO DOCUMENTATION
    setPlayerinStack(card1){
        this.player.playCard(card1);
    }
    /**
     * Gives you the current playing player
     * @return {Player|Number} the current playing player
     */
    getSpieleranderReihe(){
        if(this.justacounter == 4){
            this.justacounter = 0;
            return -1;
        }
        if(this.player.getRundeGewonnen() == true){
            this.justacounter + 1;
           return this.player;
        } else if(this.com1.getRundeGewonnen() == true){
            this.justacounter + 1;
            return this.com1;
        }else if(this.com2.getRundeGewonnen() == true){
            this.justacounter + 1;
            return this.com2;
        }else if(this.com3.getRundeGewonnen() == true){
            this.justacounter + 1;
            return this.com3;
        }
        
    }
    
    /**
     * Änderet den derzeitig spielenden Spieler
     * (diese methode muss 4mal eingesetzt werden bevor das model spielt mit es auf den anfangswert wieder zurück gesetzt wird, DANKE!!)
     */
    naechsterSpieler(){
        if(this.player.getRundeGewonnen() == true){
           this.player.setRundeGewonnen(false);
            this.com1.setRundeGewonnen(true);
        } else if(this.com1.getRundeGewonnen() == true){
            this.com1.setRundeGewonnen(false);
            this.com2.setRundeGewonnen(true);
        }else if(this.com2.getRundeGewonnen() == true){
            this.com2.setRundeGewonnen(false);
            this.com3.setRundeGewonnen(true);
        }else if(this.com3.getRundeGewonnen() == true){
            this.com3.setRundeGewonnen(false);
            this.player.setRundeGewonnen(true);
        }
    }
    
    /**
     * setzt die Trumpffarbe
     * @param {String} farbe - die neue trumpffarbe
     */
    setTrumpffarbe(farbe){
        this.trumpffarbe = farbe;
    }
    
    /**
     *  set SticheAngesagt
     *  @param {Integer} anzahl 
     */
    setSticheAngesagt(anzahl) {
        this.setSticheAngesagt = anzahl;
    }
    
    /**
     * Get Player
     * @return {Player} player obj
     */
    getPlayer() {
        return this.player;
    }
    /**
     * Get Com1 
     * @return {Player} com1 obj
     */
    getCom1() {
        return this.com1;
    }
    /**
     * Get Com2 
     * @return {Player} com2 obj
     */
    getCom2() {
        return this.com2;
    }
    /**
     * Get Com3
     * @return {Player} com3 obj
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
     * @param {Integer} num - ein Array, dieses sagt welche Karte (nach der nummer der reihenfolgen 0-5) gelöscht werden soll
     */
    discard(num){
        if(num.length <= 5 && this.trumpffarbe != "Herz"){
            for(var i = 0;i<num.length;i++){
                this.player.delcard(this.player.getCard(num[i]));
            }
        }else{
            alert("You can't discard a card");
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
     * gibt an wer am meisten stiche angesagt hat und giebt diese person zurück
     * @return {Player} eine Person
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
     * Bestimmt welche der 4 Karten die höchste ist und setzt den Gewinner
     */
    play(){
        if(this.player.getRundeGewonnen())this.gewinnerfarbe=this.stack[0].getColor();
        else if(this.com1.getRundeGewonnen())this.gewinnerfarbe=this.stack[1].getColor();
        else if(this.com2.getRundeGewonnen())this.gewinnerfarbe=this.stack[2].getColor();
        else if(this.com3.getRundeGewonnen())this.gewinnerfarbe=this.stack[3].getColor();
        
        this.ar[0]=this.stack[0];
        // Schauen welche Karten die Trumpffarbe haben, und die höchste Trumpffarbenkarte bestimmen
            for(var i = 0;i<4;i++){
                if(this.stack[i].getColor()==this.trumpffarbe && 
                   this.stack[i].getNumber()>=this.ar[0].getNumber()) {
                    this.ar[0]=this.stack[i];                                   
                    this.trumpfVorhanden = true;
                }
            }
        // Falls die Trupffarbe nicht vorkommt gewinnt die höchste Karte mit der Gewinnerfarbe
            if(this.trumpfVorhanden===false) {
                for(i = 0;i<4;i++){
                    if(this.stack[i].getColor()==this.gewinnerfarbefarbe && 
                       this.stack[i].getNumber()>this.ar[0].getNumber()) {
                        this.ar[0]=this.stack[i];
                    }
                }
            }
        // Falls der Spieler die Runde gewonnen hat kriegt er +1 stiche und gilt als gewinner der Runde
            if(this.ar[0]==this.stack[0]) {
                this.player.setSticheBekommen(this.player.getSticheBekommen()+1);
                this.player.setRundeGewonnen(true);
                this.com1.setRundeGewonnen(false);
                this.com2.setRundeGewonnen(false);
                this.com3.setRundeGewonnen(false);
            }
        // Falls der Com1 die Runde gewonnen hat kriegt er +1 stiche und gilt als gewinner der Runde
            if(this.ar[0]==this.stack[1]) {
                this.com1.setSticheBekommen(this.com1.getSticheBekommen()+1);
                this.player.setRundeGewonnen(false);
                this.com1.setRundeGewonnen(true);
                this.com2.setRundeGewonnen(false);
                this.com3.setRundeGewonnen(false);
            }
        // Falls der Com2 die Runde gewonnen hat kriegt er +1 stiche und gilt als gewinner der Runde
            if(this.ar[0]==this.stack[2]) {
                this.com2.setSticheBekommen(this.com2.getSticheBekommen()+1);
                this.player.setRundeGewonnen(false);
                this.com1.setRundeGewonnen(false);
                this.com2.setRundeGewonnen(true);
                this.com3.setRundeGewonnen(false);
            }
        // Falls der Com3 die Runde gewonnen hat kriegt er +1 stiche und gilt als gewinner der Runde
            if(this.ar[0]==this.stack[3]) {
                this.com3.setSticheBekommen(this.com3.getSticheBekommen()+1);
                this.player.setRundeGewonnen(false);
                this.com1.setRundeGewonnen(false);
                this.com2.setRundeGewonnen(false);
                this.com3.setRundeGewonnen(true);
            }
        }
}
