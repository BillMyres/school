/* Author: Thomas vanBommel */


import Player from "./Player.js";


export default class AI extends Player{
    /* Classes used to control and store AI players functions / information */
    constructor(name='(AI)'){
        /* Create a new AI object
           :param name: <string> AI's name, default='(AI)'
         */
        super(name);
    }

    async turn(table){
        this.is_turn = true;
        this.action = null;

        await sleep (Math.random() * 2000);

        this.action = 'check';

        this.is_turn = false;
        return this.action;
    }
}