/* Author: Thomas vanBommel */


export default class Card{
    /* Class to hold the value and sprite of a single card */
    constructor(value, sprite){
        /* Create a new card object
           :param value: <string 'A/2-9/T/J/Q/K' + 'h/d/c/s'> 2 digit string representing the card (ie. 'Kh'=king-hearts)
           :param sprite: <Sprite> Sprite image to be used for this card
         */
        this.value = value;
        this.sprite = sprite;
    }

    getValue(){
        /* Get the value of this card
           :return: <string 'A/2-9/T/J/Q/K' + 'h/d/c/s'> 2 digit string representing the card (ie. 'Kh'=king-hearts)
         */
        return this.value;
    }

    getSprite(){
        /* Get the sprite for this card
           :return: <Image> image of the sprite for this card
         */
        return this.sprite;
    }
}