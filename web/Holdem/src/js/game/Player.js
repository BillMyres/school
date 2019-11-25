/* Author: Thomas vanBommel */

let test = null;

export default class Player{
    /* Class to represent a player at a poker table, with a name and cards */
    constructor(name='null', visible_cards=false){
        /* Create a new player object
           :param name: <string> players name
           :param cards: <Cards> players cards object, representing the players hand and position
           :param visible_cards: <boolean> true=cards are visible, false=their not, default=false
         */
        this.name = name;
        this.cards = [];
        this.is_dealer = false;
        this.is_turn = false;
        this.visible_cards = visible_cards;

        this.action = null;
        this.money = 1000;
        this.winner = false;

        // this.fold_button = document.getElementById('btn-fold');
        // this.check_button = document.getElementById('btn-check');
        // this.call_button = document.getElementById('btn-call');
        // this.bet_button = document.getElementById('btn-bet');
        //
        // // fold_button.addEventListener('click', fold);
        // this.check_button.addEventListener('click', this.check);
        // // call_button.addEventListener('click', call);
        // // bet_button.addEventListener('click', bet);
        //
        // this.fold_button.setAttribute('disabled', '');
        // this.check_button.setAttribute('disabled', '');
        // this.call_button.setAttribute('disabled', '');
        // this.bet_button.setAttribute('disabled', '');
    }

    async turn(table){
        this.is_turn = true;
        this.action = null;

        const action_element = document.getElementById('action');
        action_element.innerText = '';

        let action;
        while((action = action_element.innerText) === ''){
            await sleep (500);
        }

        this.action = action;
        console.log(action);

        this.is_turn = false;
        return action;
    }

    // check(){
    //     /* Tell the player object to perform a 'check' */
    //     this.action = 'check';
    //     console.log('set: ' + this.action);
    // }
    //
    // bet(){
    //     /* Tell the player object to perform a 'bet' */
    //     this.action = 'bet';
    //     console.log('set: ' + this.action);
    // }

    render(canvas, position, size){
        /* Render the player to the canvas element
           :param canvas: <element> HTML element to render to
           :param position: <[x, y]> list of x and y coordinates
           :param size: <float> size to base the renders off of
         */
        test = this.action;

        if(this.isDealer()){
            canvas.drawTextWithBackground(
                position[0],
                position[1] + size * 0.3,
                'DEALER',
                '#000',
                '#ff0',
                0.2 * size
            );
        }

        if(this.is_turn){
            canvas.drawTextWithBackground(
                position[0],
                position[1] - size * 0.3,
                'TURN',
                '#fff',
                '#00f',
                0.2 * size
            );
        }else if(this.action){
            canvas.drawTextWithBackground(
                position[0],
                position[1] - size * 0.3,
                this.action,
                '#000',
                '#888',
                0.2 * size
            );
        }

        canvas.drawText(
            position[0],
            position[1] - size * 1.4,
            '$' + this.money,
            '#ff0'
        );

        if(this.winner) {
            canvas.drawTextWithBackground(
                position[0],
                position[1] + size * 0.4,
                'WINNER',
                '#fff',
                '#000',
                0.3 * size
            );
        }


    }



    setAction(action){
        /* Set the players action
           :param action: <string> representing the action played by the player, ie. 'call'
         */
        this.action = action;
    }

    getAction(){
        return this.action;
    }

    setWinner(winner){
        /* Set if this player is a winner or not, this will draw a winner tag on the canvas
           :param winner: <boolean> true=is winner, false=is not winner
         */
        this.winner = winner;
    }

    getWinner(){
        /* get if this player is or is not a winner
           :return: <boolean> true=is winner, false=is not winner
         */
        return this.winner;
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

    isTurn(){
        /* Ask if it is currently the players turn
           :return: true=yes it's this players turn, false=it's not
         */
        return this.is_turn;
    }

    setTurn(is_turn){
        /* Set if it is currently the players turn */
        this.is_turn = is_turn;
    }

    showCards(){
        /* set the players cards to visible */
        this.visible_cards = true;
    }

    isDealer(){
        /* Ask if this player is the current dealer
           :return: true=player is dealer, false=he's not
         */
        return this.is_dealer;
    }

    setDealer(is_dealer){
        /* Set if this player is the dealer
           :param is_dealer: true=player is dealer, false=he's not
         */
        this.is_dealer = is_dealer;
    }

    getName(){
        /* Get the players name
           :return: <string> players name
         */
        return this.name;
    }

    takeCards(){
        /* Take the cards on the table, but remove them too
           :return: <Cards> object representing the table cards
         */
        let cards = this.cards.slice();

        this.cards = [];
        return cards;
    }

    giveMoney(amount){
        /* Give the player money
           :param amount: <int> the amount of money to be added to this players money
         */
        this.money += amount;
    }

    takeMoney(amount){
        /* Take money from the players money
           :param amount: <int> the amount of money to be take from the players money
           :return: <int> the amount of money requested , if there is enough
         */
        let new_amount = this.money - amount;

        if(new_amount > 0) {
            this.money -= amount;
            return amount;
        }

        new_amount = this.money;
        this.money = 0;
        return new_amount;
    }


    getCards(){
        /* Get the players cards
           :return: <Card[]> list of card objects representing the players hand
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
}