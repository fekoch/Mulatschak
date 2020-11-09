/**
 * The Gamelogic
 * @author David Hegyi
 * @version 8/11/2020
 */
class Model{
    
    /**
     *
     */
    constrctor(){
        deck = new Deck();
        player = new Player();
        com1 = new Player();
        com2 = new Player();
        com3 = new Player();
        ar = [];
        multi = 1;
        trunpffarbe = "";
        stack = [];
    }
    
    /**
     * 
     */
    handOut(){
        do{
            for(var i = 0;i<5;i++){
                this.player.addcard(deck.draw());
                this.com1.addcard(deck.draw);
                this.com2.addcard(deck.draw);
                this.com3.addcard(deck.draw);
            }
        } while();
        
        console.log(this.player);
        console.log(this.com1);
        console.log(this.com2);
        console.log(this.com3);
    }
    
    discard(player, num){
        if(num.length <= 5){
            for(var i = 0;i<num.length;i++){
                player.delcard(player.getCard(num[i]));
            }
        }else{
            alert("You don't have that many Cards to discard");
        }
    }
    
    setTrumpffarbe(farbe){
        this.trumpffarbe = farbe;
    }
    
    restrat(){
        multi = 1;
        trunpffarbe = "";
    }
    
    play(player, card){
        ar[0] = player;
        ar[1] = card;
        this.stack.push();
        player.delcard(card);
        
        
        if(stack.length = 4){
            
        }
    }
}
