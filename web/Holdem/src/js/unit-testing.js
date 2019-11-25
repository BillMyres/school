/* Author: Thomas vanBommel */


import Seat from "./game/Seat.js"
import Table from "./game/Table.js"
import Player from "./game/Player.js"


let count = 0;

const testSeat = new Seat(0, 10);
const testTable = new Table(document.createElement('canvas'), './res/images/table.png');
const testPlayer = new Player();

testing();

function testing(){
    const funcs = {
        'degreeToRadians': testSeat.degreeToRadians,
        'tablePosition': testSeat.tablePosition,

        'check': testTable.check,
        'bet': testTable.bet,
        'call': testTable.call,
        'getBlind': testTable.getBlind,
        'getLastBet': testTable.getLastBet,
        'hasDealer': testTable.hasDealer,

        'setAction': testPlayer.setAction,
        'getAction': testPlayer.getAction,
        'giveMoney': testPlayer.giveMoney,
        'takeMoney': testPlayer.takeMoney,
        'isDealer': testPlayer.isDealer,

        // 'generateCards': testDeck.generateCards,
    };

    const testing = [
        [funcs['degreeToRadians'], [testSeat, 0], 0],
        [funcs['degreeToRadians'], [testSeat, 45], Math.PI / 4],
        [funcs['degreeToRadians'], [testSeat, 90], Math.PI / 2],
        [funcs['degreeToRadians'], [testSeat, 180], Math.PI],
        [funcs['degreeToRadians'], [testSeat, 360], Math.PI * 2],

        [funcs['tablePosition'], [testSeat, 0, 5, 1, 1, 0], [1, 0.5]],
        [funcs['tablePosition'], [testSeat, 2, 5, 1, 1, 0], [0.5, 1]],
        [funcs['tablePosition'], [testSeat, 4, 5, 1, 1, 0], [0, 0.5]],
        [funcs['tablePosition'], [testSeat, 6, 5, 1, 1, 0], [0.5, 0]],

        [funcs['check'], [testTable], 'check'],
        [funcs['bet'], [testTable, 100], 'bet'],
        [funcs['call'], [testTable], 'call'],
        [funcs['getBlind'], [testTable], 200],
        [funcs['getLastBet'], [testTable], 100],
        [funcs['hasDealer'], [testTable], null],

        [funcs['setAction'], [testPlayer, 'testing'], undefined],
        [funcs['getAction'], [testPlayer], 'testing'],
        [funcs['giveMoney'], [testPlayer, 1500], undefined],
        [funcs['takeMoney'], [testPlayer, 10000], 2500],
        [funcs['isDealer'], [testPlayer], false],

        // [funcs['generateCards'], [testDeck], ],
    ];

    for(let i = 0; i < testing.length; i++){
        test(testing[i][0], testing[i][1], testing[i][2]);
    }
}

function test(func, args, expected){
    /* test a function against expected-result and print it to the website
       :param func: <Function> function to test
       :param args: <[]> list of arguments to be send to the function
       :param expected: <Object> expected result to test with
     */
    const result = func.call(... args);

    log(func, args, expected, result);
}

function log(func, args, expected, result){
    /* test a function against expected-result and print it to the website
       :param func: <Function> function to test
       :param args: <[]> list of arguments to be send to the function
       :param expected: <Object> expected result to test with
       :param result: Result from the test
     */
    let passed = expected === result ? 'PASSED' : 'FAILED';
    const message = `TEST ${ count } - ${ passed }`;

    args.shift();

    // title
    if(passed === 'PASSED'){
        console.log(message);
    }else{
        console.warn(message);
    }

    // function
    console.log(`\tfunction: \t${ func.name }()`);

    // arguments
    if(args.length > 0) {
        console.log(`\targuments: \t${ args.toString() }`);
    }

    // results
    console.log('\texpected: \t' + expected);
    console.log('\tresult: \t' + result);
    console.log();

    // append to document
    const div = document.createElement('div');
    div.classList.add('test-container', 'border');

    if(passed === 'PASSED'){
        div.classList.add('border-success');
    }else{
        div.classList.add('border-danger');
    }

    const div_test = document.createElement('h5');
    div_test.innerText = `Test #${ count++ } ( ${ passed } )`;
    div.append(div_test);

    const div_func = document.createElement('div');
    div_func.innerText = `${ func.name }(${ args.toString() })`;
    div.append(div_func);

    const div_expected = document.createElement('div');
    div_expected.innerText = `expected: ${ expected }`;
    div.append(div_expected);

    const div_result = document.createElement('div');
    div_result.innerHTML = `result: &nbsp; ${ result }`;
    div.append(div_result);

    document.getElementById('tests').append(div);
}