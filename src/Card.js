/**
 * The Playingcards
 * @author David Hegyi
 * @version 6.11.2020
 */
class Card{
  constructor(color, number){
      this.color = color;
      this.number = number;
  }

  //setter of the class Card
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
}
