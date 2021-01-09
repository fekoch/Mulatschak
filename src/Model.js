/**
 * The Gamelogic
 * @author David Hegyi
 * @version 8/11/2020
 */
class Model{

    // TODO Punkteberechnung
    // TODO DOCUMENTATION
    // TODO Hohen Karten zählen
    // TODO SetTrumpffarbe COMS
    // TODO SetStiche COMS (mit den hohen Karten)
    /**
     *
     */
    constructor(){
        this.player = new Player();
        this.player.setName("Du");
        this.com1 = new Player();
        this.com1.setName("COM1");
        this.com2 = new Player();
        this.com2.setName("COM2");
        this.com3 = new Player();
        this.com3.setName("COM3");
        this.ar = [];
        this.multi = 1;
        this.trumpffarbe = "";
        this.stack = [];
        this.trumpfVorhanden = false;
        this.gewinnerfarbe = "";
        this.player.setRundeGewonnen(true);
        this.justacounter = 0;
    }
    /**
     * gibt an wer am meisten stiche angesagt hat und gibt diese person zurück
     * @return {Player} eine Person
     */
    stichsager(){

        if((this.player.getSticheAngesagt() > this.com1.getSticheAngesagt()) && (this.player.getSticheAngesagt() > this.com2.getSticheAngesagt()) && (this.player.getSticheAngesagt() > this.com3.getSticheAngesagt())){
            return this.player;
        }else if(this.player.getSticheAngesagt() < this.com1.getSticheAngesagt() && this.com1.getSticheAngesagt() > this.com2.getSticheAngesagt() && this.com1.getSticheAngesagt() > this.com3.getSticheAngesagt()){
            return this.com1;
        }else if(this.com2.getSticheAngesagt() > this.com1.getSticheAngesagt() && this.player.getSticheAngesagt() < this.com2.getSticheAngesagt() && this.com2.getSticheAngesagt() > this.com3.getSticheAngesagt()){
            return this.com2;
        }else if(this.com3.getSticheAngesagt() > this.com1.getSticheAngesagt() && this.player.getSticheAngesagt() < this.com3.getSticheAngesagt() && this.com2.getSticheAngesagt() < this.com3.getSticheAngesagt()){
            return this.com3;
        }
        else {
            return this.player;
        }
    }

    /**
     *  set SticheAngesagt
     *  @param {integer} anzahl TODO document
     *  @return -1, if the player is the Stichsager
     */
    setSticheAngesagt(anzahl) {
        this.player.setSticheAngesagt(anzahl);
        this.com1.setSticheAngesagt(Math.floor(Math.random() * Math.floor(3)));
        this.com2.setSticheAngesagt(Math.floor(Math.random() * Math.floor(3)));
        this.com3.setSticheAngesagt(Math.floor(Math.random() * Math.floor(3)));
        let arr = [
            Deck.HERZ_FARBE,
            Deck.GLOCKE_FARBE,
            Deck.BLATT_FARBE,
            Deck.NUSS_FARBE
        ];
        if(this.stichsager() === this.player){
            //player wählt
            return -1;
        } else{
            let randomIndex = Math.floor(Math.random() * arr.length);
            this.setTrumpffarbe(arr[randomIndex]);
            return 0;
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
     * Lässt alle Personen 5 Kartenziehen
     */
    handOut(){
        var handp = [];
        var handc1 = [];
        var handc2 = [];
        var handc3 = [];
        var j = 0;
        do{
            this.deck = new Deck();
            this.player.hand = [];
            this.com1.hand = [];
            this.com2.hand = [];
            this.com3.hand = []
        for(var i = 0;i<5;i++){
            this.player.addcard(this.deck.draw());
            this.com1.addcard(this.deck.draw());
            this.com2.addcard(this.deck.draw());
            this.com3.addcard(this.deck.draw());
        }
         if(j=1){
            this.multi=this.multi*2;
         }
         j=1;
        handp = this.player.getHand();
            handc1 = this.player.getHand();
            handc2 = this.player.getHand();
            handc3 = this.player.getHand();
         } while(Math.max(handp[0].getNumber(),handp[1].getNumber(),handp[2].getNumber(),handp[3].getNumber()) < 10 && Math.max(handc1[0].getNumber(),handc1[1].getNumber(),handc1[2].getNumber(),handc1[3].getNumber()) < 10 && Math.max(handc2[0].getNumber(),handc2[1].getNumber(),handc2[2].getNumber(),handc2[3].getNumber()) < 10 && Math.max(handc3[0].getNumber(),handc3[1].getNumber(),handc3[2].getNumber(),handc3[3].getNumber()) < 10);
        console.log(this.player);
        console.log(this.com1);
        console.log(this.com2);
        console.log(this.com3);
        console.log(this.multi);
    }

    /**
     * Gibt den Multiplikator zurueck
     * @returns {Integer}
     */
    getMulti(){
        return this.multi;
    }

    /**
     * discarded eine zahl an Karten für einen bestimmten spieler
     * @param {Integer} num - ein Array, dieses sagt welche Karte (nach der nummer der reihenfolgen 0-5) gelöscht werden soll
     */
    discard(num){
        if(num.length <= 5 && this.trumpffarbe != Deck.HERZ_FARBE){
            for(var i = 0;i<num.length;i++){
                this.player.delcard(this.player.getCard(num[i]));
            }
        }else{
            alert("You can't discard a card");
        }
    }

    /**
     * gibt an wer am meisten stiche angesagt hat und gibt diese person zurück
     * @return {Player} eine Person
     */
    prePlay(){
        if(this.stichsager() == this.player){
            this.player.setRundeGewonnen(true);
            return this.player;
        }else if(this.stichsager() == this.com1){
            this.com1.setRundeGewonnen(true);
            return this.com1;
        }else if(this.stichsager() == this.com2){
            this.com2.setRundeGewonnen(true);
            return this.com2;
        }else if(this.stichsager() == this.com3){
            this.com3.setRundeGewonnen(true);
            return this.com3;
        }
    }


    /**
	* Setzt Karten im Array
	 * @param {Card} card1 - Karte des Spielers 
	 */
    setStack() {
        //falls player als erstes ist
        var outofbounds = true;
        if(this.getRundenBeginner() == this.player){
            var color = this.player.getPlayedCard().getColor();
            var i1 = 0;
            var i2 = 0;
            var i3 = 0;

            /*
            COM 1
             */
            outofbounds = true;
            for(;i1<this.com1.getHand().length;i1++){
                if((this.com1.getCard(i1).getColor() == color && this.com1.getCard(i1).getNumber() > this.player.getPlayedCard().getNumber())||(this.com1.getCard(i1).getColor() == this.trumpffarbe && this.player.getPlayedCard().getColor() != this.trumpffarbe)){
                    outofbounds = false;
                    break;
                }
            }
            if(outofbounds == true){
                i1 = 0;
                for(;i1<this.com1.getHand().length;i1++){
                    if(this.com1.getCard(i1).getColor() == color ||this.com1.getCard(i1).getColor() == this.trumpffarbe){
                        outofbounds = false;
                        break;
                    }
                }
                if(outofbounds == true){
                    i1 = 0;
                }
            }

            /*
            COM 2
             */
            outofbounds = true;
            for(;i2<this.com2.getHand().length;i2++){
                if((this.com2.getCard(i2).getColor() == color && this.com2.getCard(i2).getNumber() > this.player.getPlayedCard().getNumber())||(this.com2.getCard(i2).getColor() == this.trumpffarbe && this.player.getPlayedCard().getColor() != this.trumpffarbe)){
                    outofbounds = false;
                    break;
                }
            }
            if(outofbounds == true){
                i2 = 0;
                for(;i2<this.com2.getHand().length;i2++){
                    if(this.com2.getCard(i2).getColor() == color ||this.com2.getCard(i2).getColor() == this.trumpffarbe){
                        outofbounds = false;
                        break;
                    }
                }
                if(outofbounds == true){
                    i2 = 0;
                }
            }

            /*
            COM 3
             */
            outofbounds = true;
            for(;i3<this.com3.getHand().length;i3++){
                if((this.com3.getCard(i3).getColor() == color && this.com3.getCard(i3).getNumber() > this.player.getPlayedCard().getNumber())||(this.com3.getCard(i3).getColor() == this.trumpffarbe && this.player.getPlayedCard().getColor() != this.trumpffarbe)){
                    outofbounds = false;
                    break;
                }
            }
            if(outofbounds == true){
                i3 = 0;
                for(;i3<this.com3.getHand().length;i3++){
                    if(this.com3.getCard(i3).getColor() == color ||this.com3.getCard(i3).getColor() == this.trumpffarbe){
                        outofbounds = false;
                        break;
                    }
                }
                if(outofbounds == true){
                    i3 = 0;
                }
            }
        // Falls Com1 die Runde beginnt
        } else if(this.getRundenBeginner() == this.com1){
            var i1 = 0;
            var i2 = 0;
            var i3 = 0;

            /*
            COM 1
             */
            outofbounds = true;
            for(;i1<this.com1.getHand().length;i1++){
                if(this.com1.getCard(i1).getColor() == this.trumpffarbe ){
                    outofbounds = false;
                    break;
                }
            }
                if(outofbounds == true){
                    i1 = 0;
                }
            var color = this.com1.getCard(i1).getColor();
            /*
            COM 2
             */
            outofbounds = true;
            for(;i2<this.com2.getHand().length;i2++){
                if((this.com2.getCard(i2).getColor() == color && this.com2.getCard(i2).getNumber() > this.player.getPlayedCard().getNumber())||(this.com2.getCard(i2).getColor() == this.trumpffarbe && this.player.getPlayedCard().getColor() != this.trumpffarbe)){
                    outofbounds = false;
                    break;
                }
            }
            if(outofbounds == true){
                i2 = 0;
                for(;i2<this.com2.getHand().length;i2++){
                    if(this.com2.getCard(i2).getColor() == color ||this.com2.getCard(i2).getColor() == this.trumpffarbe){
                        outofbounds = false;
                        break;
                    }
                }
                if(outofbounds == true){
                    i2 = 0;
                }
            }
            /*
            COM 3
             */
            outofbounds = true;
            for(;i3<this.com3.getHand().length;i3++){
                if((this.com3.getCard(i3).getColor() == color && this.com3.getCard(i3).getNumber() > this.player.getPlayedCard().getNumber())||(this.com3.getCard(i3).getColor() == this.trumpffarbe && this.player.getPlayedCard().getColor() != this.trumpffarbe)){
                    outofbounds = false;
                    break;
                }
            }
            if(outofbounds == true){
                i3 = 0;
                for(;i3<this.com3.getHand().length;i3++){
                    if(this.com3.getCard(i3).getColor() == color ||this.com3.getCard(i3).getColor() == this.trumpffarbe){
                        outofbounds = false;
                        break;
                    }
                }
                if(outofbounds == true){
                    i3 = 0;
                }
            }
        // Falls COM 2 beginnt
        } else if(this.getRundenBeginner() == this.com2){
            var i2 = 0;
            var i3 = 0;
            var i1 = 0;
            /*
            COM 2
             */
            outofbounds = true;
            for(;i2<this.com2.getHand().length;i2++){
                if(this.com1.getCard(i2).getColor() == this.trumpffarbe ){
                    outofbounds = false;
                    break;
                }
            }
            if(outofbounds == true){
                i2 = 0;
            }
            var color = this.com2.getCard(i2).getColor();

            /*
            COM 3
             */
            outofbounds = true;
            for(;i3<this.com3.getHand().length;i3++){
                if((this.com3.getCard(i3).getColor() == color && this.com3.getCard(i3).getNumber() > this.player.getPlayedCard().getNumber())||(this.com3.getCard(i3).getColor() == this.trumpffarbe && this.player.getPlayedCard().getColor() != this.trumpffarbe)){
                    outofbounds = false;
                    break;
                }
            }
            if(outofbounds == true){
                i3 = 0;
                for(;i3<this.com3.getHand().length;i3++){
                    if(this.com3.getCard(i3).getColor() == color ||this.com3.getCard(i3).getColor() == this.trumpffarbe){
                        outofbounds = false;
                        break;
                    }
                }
                if(outofbounds == true){
                    i3 = 0;
                }
            }

            /*
            COM 1
             */
            outofbounds = true;
            for(;i1<this.com1.getHand().length;i1++){
                if((this.com1.getCard(i1).getColor() == color && this.com1.getCard(i1).getNumber() > this.player.getPlayedCard().getNumber())||(this.com1.getCard(i1).getColor() == this.trumpffarbe && this.player.getPlayedCard().getColor() != this.trumpffarbe)){
                    outofbounds = false;
                    break;
                }
            }
            if(outofbounds == true){
                i1 = 0;
                for(;i1<this.com1.getHand().length;i1++){
                    if(this.com1.getCard(i1).getColor() == color ||this.com1.getCard(i1).getColor() == this.trumpffarbe){
                        outofbounds = false;
                        break;
                    }
                }
                if(outofbounds == true){
                    i1 = 0;
                }
            }

            // Falls COM 3 beginnt
        } else if(this.getRundenBeginner() == this.com3){
            var i3 = 0;
            var i1 = 0;
            var i2 = 0;
            /*
            COM 3
             */
            outofbounds = true;
            for(;i3<this.com3.getHand().length;i3++){
                if(this.com1.getCard(i3).getColor() == this.trumpffarbe ){
                    outofbounds = false;
                    break;
                }
            }
            if(outofbounds == true){
                i3 = 0;
            }
            var color = this.com3.getCard(i3).getColor();

            /*
            COM 1
             */
            outofbounds = true;
            for(;i1<this.com1.getHand().length;i1++){
                if((this.com1.getCard(i1).getColor() == color && this.com1.getCard(i1).getNumber() > this.player.getPlayedCard().getNumber())||(this.com1.getCard(i1).getColor() == this.trumpffarbe && this.player.getPlayedCard().getColor() != this.trumpffarbe)){
                    outofbounds = false;
                    break;
                }
            }
            if(outofbounds == true){
                i1 = 0;
                for(;i1<this.com1.getHand().length;i1++){
                    if(this.com1.getCard(i1).getColor() == color ||this.com1.getCard(i1).getColor() == this.trumpffarbe){
                        outofbounds = false;
                        break;
                    }
                }
                if(outofbounds == true){
                    i1 = 0;
                }
            }

            /*
            COM 2
             */
            outofbounds = true;
            for(;i2<this.com2.getHand().length;i2++){
                if((this.com2.getCard(i2).getColor() == color && this.com2.getCard(i2).getNumber() > this.player.getPlayedCard().getNumber())||(this.com2.getCard(i2).getColor() == this.trumpffarbe && this.player.getPlayedCard().getColor() != this.trumpffarbe)){
                    outofbounds = false;
                    break;
                }
            }
            if(outofbounds == true){
                i2 = 0;
                for(;i2<this.com2.getHand().length;i2++){
                    if(this.com2.getCard(i2).getColor() == color ||this.com2.getCard(i2).getColor() == this.trumpffarbe){
                        outofbounds = false;
                        break;
                    }
                }
                if(outofbounds == true){
                    i2 = 0;
                }
            }

        }
        //console.log(i1);
        //console.log(i2);
        //console.log(i3);
        this.com1.playCard(this.com1.getCard(i1));
        this.com2.playCard(this.com2.getCard(i2));
        this.com3.playCard(this.com3.getCard(i3));
	}

    /**
     * the play playes a card
     * @param {Card} card1
     */
    setPlayerinStack(card1){
        console.log(this.getRundenBeginner());
        if(this.getRundenBeginner() != this.player){
            var color = this.getRundenBeginner().getPlayedCard().getColor();
            if(card1.getColor() != color && card1.getColor() != this.trumpffarbe) {
                for(var i = 0;i<4;i++){
                    if(this.player.getCard(i).getColor() == this.trumpffarbe||this.player.getCard(i).getColor() == color){
                        return false;
                    }
                }
            }
        }
        this.player.playCard(card1);
        return true;
    }
    /**
     * Gives you the current playing player
     * @return {Player|Number} the current playing player
     */
    getRundenBeginner(){
        if(this.player.getRundeGewonnen() == true){
            return this.player;
        } else if(this.com1.getRundeGewonnen() == true){
            return this.com1;
        }else if(this.com2.getRundeGewonnen() == true){
            return this.com2;
        }else if(this.com3.getRundeGewonnen() == true){
            return this.com3;
        }

    }
    /**
     * Gives you the current playing player
     * @return {Player|-1} the current playing player, or -1 if all had their turn
     */
    getSpieleranderReihe(){
        console.log("getSpieleranderReihe was called"+this.justacounter+" times");
        if(this.justacounter == 4){
            this.justacounter = 0;
            return -1;
        }
        else if (this.justacounter == 0) {
            // des is a pfusch, i just wanna die
            // but it should work
            let rundenbeginner = this.getRundenBeginner();
            this.player.setReihe(false);
            this.com1.setReihe(false);
            this.com2.setReihe(false);
            this.com3.setReihe(false);
            rundenbeginner.setReihe(true);
        }
        if(this.player.getReihe() == true){
            this.justacounter += 1;
           return this.player;
        } else if(this.com1.getReihe() == true){
            this.justacounter += 1;
            return this.com1;
        }else if(this.com2.getReihe() == true){
            this.justacounter += 1;
            return this.com2;
        }else if(this.com3.getReihe() == true){
            this.justacounter += 1;
            return this.com3;
        }
        
    }

    
    /**
     * Änderet den derzeitig spielenden Spieler
     */
    naechsterSpieler(){
        if(this.player.getReihe() == true){
           this.player.setReihe(false);
            this.com1.setReihe(true);
        } else if(this.com1.getReihe() == true){
            this.com1.setReihe(false);
            this.com2.setReihe(true);
        }else if(this.com2.getReihe() == true){
            this.com2.setReihe(false);
            this.com3.setReihe(true);
        }else if(this.com3.getReihe() == true){
            this.com3.setReihe(false);
            this.player.setReihe(true);
        }
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
     * Bestimmt welche der 4 Karten die höchste ist und setzt den Gewinner
    * @return {Player} der Spieler der den Stich gemacht hat
     */
    play(){
       this.trumpfVorhanden = false;
       this.weliVorhanden = false;
        this.stack[0] = this.player.getPlayedCard();
        this.stack[1] = this.com1.getPlayedCard();
        this.stack[2] = this.com2.getPlayedCard();
        this.stack[3] = this.com3.getPlayedCard();
        if(this.player.getRundeGewonnen())this.gewinnerfarbe=this.stack[0].getColor();
        else if(this.com1.getRundeGewonnen())this.gewinnerfarbe=this.stack[1].getColor();
        else if(this.com2.getRundeGewonnen())this.gewinnerfarbe=this.stack[2].getColor();
        else if(this.com3.getRundeGewonnen())this.gewinnerfarbe=this.stack[3].getColor();
        
        this.ar[0]= null;

       for(var i = 0;i<4;i++){
           console.log(this.stack[i].getColor());
           if(this.stack[i].getColor()=="WELI_FARBE") {
               console.log(this.stack[i].getColor());
               this.ar[0]=this.stack[i];
               this.weliVorhanden = true;
               break;
           }
       }
       if(this.weliVorhanden==false) {


           // Schauen welche Karten die Trumpffarbe haben, und die höchste Trumpffarbenkarte bestimmen
           for (var i = 0; i < 4; i++) {
               if (this.stack[i].getColor() == this.trumpffarbe) {
                   if (this.ar[0] == null) {
                       this.ar[0] = this.stack[i];
                   } else if (this.stack[i].getNumber() > this.ar[0].getNumber()) {
                       this.ar[0] = this.stack[i];
                   }

                   this.trumpfVorhanden = true;
               }
           }

           // Falls die Trupffarbe nicht vorkommt gewinnt die höchste Karte mit der Gewinnerfarbe
           if (this.trumpfVorhanden == false) {
               for (i = 0; i < 4; i++) {
                   if (this.stack[i].getColor() == this.gewinnerfarbe) {
                       if (this.ar[0] == null) {
                           this.ar[0] = this.stack[i];
                       } else if (this.stack[i].getNumber() > this.ar[0].getNumber()) {
                           this.ar[0] = this.stack[i];
                       }
                   }
               }
           }
       }

           // Falls der Spieler die Runde gewonnen hat kriegt er +1 stiche und gilt als gewinner der Runde
           if (this.ar[0] == this.stack[0]) {
               this.player.addStich();
               this.player.setRundeGewonnen(true);
               this.com1.setRundeGewonnen(false);
               this.com2.setRundeGewonnen(false);
               this.com3.setRundeGewonnen(false);
               return this.player;
           }
           // Falls der Com1 die Runde gewonnen hat kriegt er +1 stiche und gilt als gewinner der Runde
           if (this.ar[0] == this.stack[1]) {
               this.com1.addStich();
               this.player.setRundeGewonnen(false);
               this.com1.setRundeGewonnen(true);
               this.com2.setRundeGewonnen(false);
               this.com3.setRundeGewonnen(false);
               return this.com1;
           }
           // Falls der Com2 die Runde gewonnen hat kriegt er +1 stiche und gilt als gewinner der Runde
           if (this.ar[0] == this.stack[2]) {
               this.com2.addStich();
               this.player.setRundeGewonnen(false);
               this.com1.setRundeGewonnen(false);
               this.com2.setRundeGewonnen(true);
               this.com3.setRundeGewonnen(false);
               return this.com2;
           }
           // Falls der Com3 die Runde gewonnen hat kriegt er +1 stiche und gilt als gewinner der Runde
           if (this.ar[0] == this.stack[3]) {
               this.com3.addStich();
               this.player.setRundeGewonnen(false);
               this.com1.setRundeGewonnen(false);
               this.com2.setRundeGewonnen(false);
               this.com3.setRundeGewonnen(true);
               return this.com3;
           }



    }

    punkteauszaehlung(){
        var pl = [this.player,this.com1,this.com2,this.com3]
        for(var i = 0;i<4;i++) {
            if(this.stichsager() == pl[i]){
                if(pl[i].getSticheBekommen() >= pl[i].getSticheAngesagt()){
                    pl[i].setCounter(pl[i].getCounter() - pl[i].getSticheBekommen() * this.multi);
                } else {
                    pl[i].setCounter(pl[i].getCounter() +10 * this.multi);
                }
            }else if (pl[i].getSticheBekommen()>0) {
                pl[i].setCounter(pl[i].getCounter() - pl[i].getSticheBekommen() * this.multi);
            } else {
                pl[i].setCounter(pl[i].getCounter() +5 * this.multi);
            }
        }
        this.player.setSticheBekommen(0);
        this.com1.setSticheBekommen(0);
        this.com2.setSticheBekommen(0);
        this.com3.setSticheBekommen(0);
        this.player.setRundeGewonnen(true);
        this.multi = 1;
        this.trumpffarbe = "";
        this.gewinnerfarbe = "";
    }
}
