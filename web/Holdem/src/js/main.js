/* Author: Thomas vanBommel */
/* Free card images: https://pixabay.com/vectors/atlasnye-deck-playing-cards-game-884206/ */


import Table from './game/Table.js'
import Player from "./game/Player.js"
import Deck from "./game/Deck.js"
import Canvas from "./game/Canvas.js"
import AI from "./game/AI.js"

const canvas = new Canvas('canvas');
const player = new Player('Player', true);

const fold_button = document.getElementById('btn-fold');
const check_button = document.getElementById('btn-check');
const call_button = document.getElementById('btn-call');
const bet_button = document.getElementById('btn-bet');

// fold_button.addEventListener('click', fold);
// check_button.addEventListener('click', player.check);
// call_button.addEventListener('click', call);
// bet_button.addEventListener('click', bet);

const table = new Table(canvas, './res/images/table.png');
const deck = new Deck();
let deal_action = 0;

let turn_index = 0;

window.setInterval(update, 250);
window.addEventListener('resize', canvas.resize);
canvas.resize();

start()

async function start(){
    populateTable();

    const seats = table.getClaimedSeats();
    const dealer = table.getCurrentDealer();
    let first = null;

    let next = false;
    while(!first) {
        for (let i in seats) {
            const current_player = seats[i].getPlayer();
            if(current_player === dealer) next = true;

            if(next && seats[i].isClaimed()) {
                const t = ((parseInt(i) + 1) % (seats.length));

                first = current_player;
                turn_index = seats.indexOf(seats[t]);
                break;
            }
        }
    }

    await game(seats);
}

async function game(seats){
    for(let i = 0; i < seats.length * 2; i++){
        deal();
        await sleep(250);
    }

    let actions = 0;

    while(table.getCards().length < 5){
        const players = getTurnPlayers(seats);

        // for each player
        for(let i = 0; i < players.length; i++){
            // pay blind
            if(actions === 0 || actions === 1){
                const blind = actions === 0 ? 0.5 : 1;

                table.bet(players[i].takeMoney(table.getBlind() * blind));
            }

            // players turn
            const action = await players[i].turn();
            actions += 1;
        }

        // flopping the cards
        let cards_to_flop = 1;

        if(table.getCards().length === 0){
            cards_to_flop = 3;
        }

        discard();
        flop(cards_to_flop);
    }

    calculateWinner(seats);

    // advance dealer
    turn_index += 1;
    turn_index = turn_index % (seats.length - 1);
    table.advanceDealer();

    console.log(getTurnPlayers(seats));
}



function populateTable(){
    const seats = table.getSeats();
    for(let i in seats){
        const seat = seats[Math.round(Math.random() * (seats.length - 1))];

        if(!seat.isClaimed()) seat.claim(new AI());
    }

    seats[Math.round(seats.length / 2) - 1].claim(player);
}

function getTurnPlayers(seats){
    /* Get the players, in the order of their turn, from the table as a list
       :param seats: <Seat[]> the claimed seats for this turn
       :return: <Player[]> players of the seats provided, in the order of their turns
     */
    const list = [];

    for(let i = 0; i < seats.length; i++){
        const j = (turn_index + i) % (seats.length);
        list.push(seats[j].getPlayer());
    }

    return list;
}

function calculateWinner(seats){
    /* Calculate the winner out of the players in the seats provided
       :param seats: <Seat[]> list of seats at the table
       :return: <Hand[]> winning hands out of the seats provided
     */
    const hands = [];
    const table_hand = table.getHand();

    for(let i = 0; i < seats.length; i++){
        const current_player = seats[i].getPlayer();
        const player_hand = current_player.getHand();
        const hand = Hand.solve(table_hand.concat(player_hand));
        hands.push(hand);

        current_player.showCards();
        current_player.setAction(null);
    }

    const winner = Hand.winners(hands);
    table.winning_hand = winner[0].descr;
    console.log(winner);

    for(let i = 0; i < hands.length; i++){
        if(winner.indexOf(hands[i]) !== -1){
            console.log('winner: ' + i);

            const current_player = seats[i].getPlayer();

            current_player.setWinner(true);
            current_player.giveMoney(table.takePot());
        }
    }
}

function update(){
    const seats = table.getSeats();

    canvas.update();
    table.update(canvas);

    for(let i in seats){
        seats[i].update(canvas);
    }

    render();
}

function render(){
    let ctx = canvas.getContext();
    ctx.clearRect(0, 0, canvas.getWidth(), canvas.getHeight());
    ctx.fillStyle = '#000';
    table.render(canvas);

    if(player.getCards().length > 0) {
        canvas.drawText(
            0.5,
            0.7,
            Hand.solve(player.getHand().concat(table.getHand())).descr,
            '#000',
            0.3 * 0.1,
            'monospace'
        );
    }
}

function discard(){
    /* Throw the top card on the deck away */
    deck.next();
}

function flop(num=1){
    /* Flop card from the desk to the table
       :param num: <int> numbers of cards to flop down
     */
    for(let i = 0; i < num; i++) {
        table.give(deck.next());
    }
}

function deal(){
    const seats = table.getSeats();

    while(true){
        let i = deal_action%seats.length;
        let done = false;

        if(seats[i].isClaimed()){
            seats[i].getPlayer().give(deck.next());
            done = true;
        }

        deal_action++;

        if(done) return;
    }
}