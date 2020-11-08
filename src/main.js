class main{
  main(){
    const deck = new Deck();
    do {
      card = deck.draw();
      alert(card.getColor+","+card.getNumber);
      r = confirm("draw again?");
    } while (r == true);
  }
}
