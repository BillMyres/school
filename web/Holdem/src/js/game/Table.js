/* Author: Thomas vanBommel */


import Seat from "./Seat.js";


export default class Table{
    /* Table class to hold the background image and table cards */
    constructor(canvas, background_image_path, number_of_seats=7){
        /* Create a new Table object
           :param canvas: <element> HTML element to render the table to
           :param background_image_path: <string> path to the background-image for the game
           :param number_of_seats: <int> how many seats should be generated at the table, default=7
         */
        this.canvas = canvas;
        this.cards = [];
        this.background_image = new Image();
        this.background_image.src = background_image_path;

        this.seats = [];
        this.pot = 0;
        this.blind = 200;
        this.last_bet = 0;
        this.last_action = null;
        this.winning_hand = null;

        const radius_offset = 45;

        for(let i = 0; i < number_of_seats; i++) {
            this.seats.push(new Seat(i, number_of_seats, radius_offset));
        }
    }

    update(canvas){
        /* Update values before rendering
           :param canvas: <element> HTML element to render to
         */
        for(let i in this.seats){
            this.seats[i].update(canvas);
        }
    }

    render(canvas){
        /* Render the table to the canvas element
           :param canvas: <element> HTML element to render to
         */
        canvas.drawImage(this.background_image, 0, 0, 1, 1);
        canvas.drawCards(this.cards, 0.5, 0.5, 0.08);

        canvas.drawTextWithBackground(
            0.5,
            0.375,
            'Pot $' + this.pot,
            '#fff',
            '#000',
            0.03
        );

        if(!this.winning_hand) {
            canvas.drawTextWithBackground(
                0.5,
                0.65,
                'Big-Blind $' + this.blind,
                '#fff',
                '#000',
                0.03
            );
        }else{
            canvas.drawTextWithBackground(
                0.5,
                0.65,
                'Win: ' + this.winning_hand,
                '#fff',
                '#000',
                0.03
            );
        }

        for(let i in this.seats){
            this.seats[i].render(canvas);
        }
    }



    check(){
        /* Sets the last_action to 'check' */
        try {
            if (this.last_action !== 'bet' || this.last_action !== 'call') {
                this.last_action = 'check';
            }
        }catch(e){}

        return 'check';
    }

    bet(amount){
        /* Sets the last_action to 'bet' and places amount into the tables pot
           :param amount: the amount to be placed into the tables pot
         */
        this.last_action = 'bet';
        this.last_bet = amount;

        this.addToPot(amount);

        return 'bet';
    }

    addToPot(amount){
        /* Add to the tables pot
           :param amount: <int> amount to be added to the pot
         */
        this.pot += amount;
        this.last_bet = amount;
    }

    call(){
        /* Sets the last_action to 'call' and places last_bet amount into the tables pot
         */
        this.last_action = 'call';
        this.addToPot(this.last_bet);

        return 'call';
    }

    getBlind(){
        /* Get the current blind for the table
           :return: <int> the amount for the current blind at the table
         */
        return this.blind;
    }

    getLastAction(){
        /* Get the last action of the table
           :return: <string> representing the last action places, (ie. 'call')
         */
        return this.last_action
    }

    setLastAction(action){
        /* Set the last_action played at this table
           :param action: <string> representing the last action played (ie. 'call')
         */
        this.last_action = action;
    }

    clearLastAction(){
        /* Clear the last action placed */
        this.last_action = null;
    }

    getLastBet(){
        /* Get the last bet paid to the pot
           :return: <int> the last bet paid to the pot
        */
        return this.last_bet
    }

    setLastBet(amount){
        /* Set the last bet paid to the pot
           :param amount: <int> amount paid to the pot
         */
        this.last_bet = amount;
    }

    takePot(amount=this.pot){
        /* Take from the tables pot
           :param amount: <int> amount to subtract from the pot, default=pot.value
           :return: the amount that was asked for, in the case of there not being enough it will return the entire pot
         */
        if(this.pot - amount >= 0){
            this.pot -= amount;
            return amount;
        }

        const amt = this.pot;
        this.pot = 0;

        return amt;
    }

    give(cards){
        /* Add card to the list of cards held by this object
           :param card: <Card or Card[]> card object representing a playing card in the game
         */
        if(Array.isArray(cards)){
            this.cards.concat(cards);
        }else{
            this.cards.push(cards);
        }
    }

    takeCards(){
        /* Take the cards on the table, but remove them too
           :return: <Cards> object representing the table cards
         */
        let cards = this.cards.slice();

        this.cards = [];
        return cards;
    }

    getCards(){
        /* Get the cards on the table
           :return: <Cards> object representing the table cards
         */
        return this.cards;
    }

    getHand(){
        /* Get the values from all the cards as a list
           :return: <string[]> list of strings representing the cards in this object
         */
        let hand = [];

        for(let i in this.cards){
            const card = this.cards[i];
            if(card) hand.push(card.getValue());
        }

        return hand;
    }

    getSeats(){
        /* Get the seats at the table
           :return: <Seat[]> list of seats at this table
         */
        return this.seats;
    }

    getClaimedSeats(){
        /* Get the claimed seats at the table
           :return: <Seat[]> list of claimed seats at this table
         */
        let list = [];

        for(let i in this.seats){
            if(this.seats[i].isClaimed()) {
                list.push(this.seats[i]);
            }
        }

        return list;
    }

    hasDealer(){
        /* Check if this table has a dealer
           :return: <Player or null> returns the player or null
         */
        const seats = this.getClaimedSeats();
        let dealer = null;

        for(let i in seats){
            const player = seats[i].getPlayer();

            if(player.isDealer()) {
                dealer = player;
            }
        }

        return dealer;
    }

    getCurrentDealer(){
        /* Get the current dealer at the table, will set a dealer if there is none
           :return: <Player or null> the current dealer at the table, or null
         */
        const seats = this.getClaimedSeats();
        let dealer = null;

        if(!this.hasDealer()){
            dealer = seats[seats.length - 1].getPlayer();
            dealer.setDealer(true);
        }

        return dealer;
    }

    advanceDealer(){
        /* Advance dealers, to the left */
        const seats = this.getClaimedSeats();

        let new_dealer = null;
        let next = false;

        while(new_dealer === null){
            for(let i in seats){
                const player = seats[i].getPlayer();

                if(player.isDealer()){
                    player.setDealer(false);
                    next = true;
                }else if(next){
                    player.setDealer(true);
                    new_dealer = player;
                    break;
                }
            }
        }
    }
}