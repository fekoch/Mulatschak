var hand;
var counter;
var reihe;

class Player{
    
    constructor(){
        this.hand = new Set();
        this.counter = 21;
        this.reihe = false;
    }
    
    addcard(card){
        this.hand.add(card);
    }
    
    delcard(card){
        this.hand.delete(card);
    }
    
    setCounter(counter){
        this.counter
    }

}