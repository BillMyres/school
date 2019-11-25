/* Author: Thomas vanBommel */


import Card from "./Card.js";
import Sprite from "./Sprite.js";


export default class Deck{
    /* Deck class to hold a list of cards.
       Cards pulled from the deck will not be able to be pulled again, until placed back into the deck
     */
    constructor(){
        /* Create a new Deck object */
        this.cards = this.generateCards();
        this.shuffle();
    }

    generateCards(){
        /* Generate 52 Card objects representing all the cards in a normal deck
           :return: <string[] 'A/2-9/T/J/Q/K' + 'h/d/c/s'> list of Card objects representing all the cards in a normal deck
        */
        const card_img = new Image;
        card_img.src="./res/images/cards.png";
        const types  = ['h', 'd', 'c', 's'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];

        const width = 136;
        const height = 204;
        const offset = 11;

        let cards = [];

        for(let t in types) {
            for(let v in values) {
                const sprite = new Sprite(offset + (width + offset) * (v), offset + (height + offset) * t, width, height, card_img);
                cards.push(new Card(values[v] + types[t], sprite));
            }
        }

        return cards;
    }

    addCards(cards){
        /* Add cards into the deck
           :param cards: <Card[]> list of cards to be put into the deck
         */
        this.cards = this.cards.concat(cards);
    }

    shuffle(){
        /* Shuffle the cards in this object */
        for(let i = 0; i < 50; i++) {
            this.cards.sort(() => Math.random() - 0.5);
        }
    }

    next(count=1){
        /* Get the next card(s) in the deck array
           :param count: <int> how many Card objects to return; default 1
           :return: <Card or []> 1count=Card >1count=List of Card objects
         */
        if(count === 0) return null;
        if(count === 1) {
            return this.cards.splice(
                this.cards.length - 1,
                1
            )[0];
        }

        return this.multipleCards(count);
    }

    multipleCards(count=1){
        /* Get the next cards in the deck array
           :param count: <int> how many Card objects to return; default 1
           :return: <[]> List of Card objects from the top of the deck
         */
        let list = [];

        for(let i = 0; i < count; i++){
            list.push(this.next());
        }

        return list;
    }
}