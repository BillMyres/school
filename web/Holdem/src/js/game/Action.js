/* Author: Thomas vanBommel */


export default class Action{
    constructor(table){
        /* Create a new Action object
           :param table: <Table> table object to pass money back and forth with
         */
        this.name = name;
        this.func = func;
        this.table = table;
    }

    check(){
        /* Perform a check action on the table provided */
        this.table.setLastAction('check');
    }

    bet(amount){
        /* Perform a bet action on the table provided
           :param amount: <int> amount of money to be place on the table
         */
        this.table.setLastAction('bet');
        this.table.setLastBet(amount);
        this.table.addToPot(amount);
    }

    call(){
        /* Perform a call action on the table provided */
        this.table.setLastAction('call');
        this.table.addToPot(this.table.getLastBet());
    }

    fold(){
        /* Perform a fold action on the table provided */
        this.table.setLastAction('fold');
    }
}