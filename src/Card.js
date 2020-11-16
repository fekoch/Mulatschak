/**
 * The Playingcards
 * @author David Hegyi
 * @version 16.11.2020
 */
class Card{
  constructor(color, number){
      this.color = color;
      this.number = number;
  }

  /**
   * sets color
   * @param {String} color - new color
   */
  setColor(color){
    this.color = color;
  }
  /**
   * sets number
   * @param {number} number - new number
   */
  setNumber(number){
    this.number = number;
  }
    
    /**
   * gets Card color
   * @return the color
   */
  getColor() {
      return this.color;
  }
    /**
   * gets Card number
   * @return the number
   */
  getNumber() {
      return this.number;
  }

    /**
     * returns the Index of the Card in the SpriteSheet
     * @returns {number} the ID from 0 to 32, 34 on an Error
     * @author Felix Koch
     */
  getSpriteID() {
      switch (this.color) {
          case Deck.GLOCKE_FARBE:
              return this.getNumber()-7;
          case Deck.NUSS_FARBE:
              return this.getNumber()-7+8;
          case Deck.HERZ_FARBE:
              return this.getNumber()-7+16;
          case Deck.BLATT_FARBE:
              return this.getNumber()-7+24;
          case Deck.WELI_FARBE:
              return 32;
          default:
              return 34;

      }
  }

}