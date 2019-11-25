/* Author: Thomas vanBommel */



export default class Seat{
    /* Seat class to hold the player at (x, y) to the table */
    constructor(index, divisions, radius_offset=0, width=1, height=1, player=null){
        /* Create a new Seat object
           :param index: <int> which seat do you want the position of
                (0=first(left of dealer) - divisions=last(right of the dealer))
           :param divisions: <int> how many total positions on the table, maximum amount of players at the table
           :param radius_offset: <int/float> default play area is 180deg, far-left to far-right.
                radius_offset will increase the play area by that in degrees, default=0
           :param width: <float> width of the table (multiple of canvas.width) default 1.0 x canvas.width
           :param height: <float> height of the table (multiple of canvas.height) default 1.0 x canvas.height
           :param player: <Player> player sitting in the seat, default=null
         */
        this.index = index;
        this.divisions = divisions;
        this.width = width;
        this.height = height;
        this.radius_offset = radius_offset;
        this.player = player;

        this.size = 0.1;
        this.position = [0, 0];
    }

    update(){
        /* Update values before rendering
           :param canvas: <element> HTML element to render to
         */
        const position = this.tablePosition(
            this.index,
            this.divisions,
            this.width - this.size,
            this.height - this.size,
            this.radius_offset
        );

        this.position = [
            position[0] + this.size / 2,
            position[1] + this.size / 2
        ];
    }

    render(canvas){
        /* Render the seat to the canvas element
           :param canvas: <element> HTML element to render to
         */
        this.renderPlayerCards(canvas);
        this.renderPlayerBadge(canvas);

        if(this.player){
            this.player.render(canvas, this.position, this.size);
        }
    }

    renderPlayerBadge(canvas){
        canvas.drawTextWithBackground(
            this.position[0],
            this.position[1],
            this.player ? this.player.getName() : 'open',
            this.player ? '#fff' : '#000',
            this.player ? '#000' : '#fff',
            0.2 * this.size
        );
    }

    renderPlayerCards(canvas){
        /* Render the cards to the canvas element
           :param canvas: <Canvas> canvas object to render to
         */
        if(!this.player) return;

        if(this.player.visible_cards) {
            canvas.drawCards(this.player.getCards(), this.position[0], this.position[1], this.size);
        }else{
            let list = [];
            for(let i in this.player.getCards()){
                list.push(null);
            }
            canvas.drawCards(list, this.position[0], this.position[1], this.size);
        }
    }

    tablePosition(index, divisions, width, height, offset=0){
        /* Calculated an (x, y) coordinate for any given parameters
           :param index: <int> which seat do you want the position of
                (0=first(left of dealer) - divisions=last(right of the dealer))
           :param divisions: <int> how many total positions on the table, maximum amount of players at the table
           :param width: <int/float> width of the table
           :param height: <int/float> height of the table
           :param offset: <int/float> default play area is 180deg, far-left to far-right.
                offset will increase the play area by that in degrees
           :return: <[x, y]> list of x and y coordinates
         */
        const spread = 180 + offset * 2;
        const size = spread / (divisions - 1);
        const slice = index * size;

        const angle = this.degreeToRadians(spread - slice) - this.degreeToRadians(offset);
        const hw = width / 2;
        const hh = height / 2;

        return [
            hw - (hw * Math.cos(angle)),
            hh + (hh * Math.sin(angle))
        ];
    }

    degreeToRadians(degree){
        /* Convert degrees to radians
           :return: <float/double> radians representing the degrees specified
         */
        return (Math.PI / 180) * degree;
    }

    claim(player){
        /* Claim this seat with a player object
           :param player: <Player> player object to place into this seat
         */
        this.player = player;
    }

    isClaimed(){
        /* Check if the seat is already claimed by another player */
        return !!this.player;
    }

    getPosition(){
        /* Return the position of the seat (center)
           :return: <[x, y]> list of axis positions
         */
        return this.position;
    }

    getPlayer(){
        /* Return the player in this seat
           :return: <Player/null> player object sitting in this seat, or null
         */
        return this.player;
    }

    getIndex(){
        /* Get this seats index
           :return: <int> the seat index, where it is on the table relation to the dealer
         */
        return this.index;
    }
}


