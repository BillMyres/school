/* Author: Thomas vanBommel */



export default class Canvas{
    /* Canvas class for rendering to a HTML canvas element */
    constructor(id){
        /* Create a new Canvas object to render to an HTML canvas element
           :param id: <string> id of the canvas element in the HTML document
         */
        this.element = document.getElementById(id);
        this.context = this.element.getContext('2d');
    }

    update(){
        /* Update the canvas values and context */
        this.context = this.element.getContext('2d');
    }

    resize(){
        /* Resize the canvas for the size of the window */
        this.element.width = this.element.clientWidth;
        this.element.height = this.element.width * 0.59323;
    }

    drawRect(x, y, width, height, color){
        /* Draw rectangle to the canvas
           :param x: <float> where on the x axis to draw the rectangle, multiple of canvas.getWidth()
           :param y: <float> where on the y axis to draw the rectangle, multiple of canvas.getHeight()
           :param width: <float> how wide to draw the rectangle, multiple of canvas.getWidth()
           :param height: <float> how tall to draw the rectangle, multiple of canvas.getHeight()
           :param color: <string> HTML hash color ie '#ffffff'=white
         */
        this.context.fillStyle = color;
        this.context.fillRect(
            x * this.getWidth(), y * this.getHeight(),
            width * this.getWidth(), height * this.getHeight()
        );
    }

    drawOutline(x, y, width, height, color){
        /* Draw rectangle outline to the canvas
           :param x: <float> where on the x axis to draw the outline, multiple of canvas.getWidth()
           :param y: <float> where on the y axis to draw the outline, multiple of canvas.getHeight()
           :param width: <float> how wide to draw the outline, multiple of canvas.getWidth()
           :param height: <float> how tall to draw the outline, multiple of canvas.getHeight()
           :param color: <string> HTML hash color ie '#ffffff'=white
         */
        this.context.strokeStyle = color;
        this.context.strokeRect(
            x * this.getWidth(), y * this.getHeight(),
            width * this.getWidth(), height * this.getHeight()
        );
    }

    drawText(x, y, text, color, font_size, font_family='monospace', align='center'){
        /* Draw text to the canvas (centered)
           :param x: <float> where on the x axis to draw the text, multiple of canvas.getWidth()
           :param y: <float> where on the y axis to draw the text, multiple of canvas.getHeight()
           :param text: <string> string to write to the canvas
           :param color: <string> HTML hash color ie '#ffffff'=white
           :param font_size: <int/float> size of the font in pixels
           :param font_family: <string> font style family, default='monospace'
           :param align: <string> how to align the string, default='center'
         */
        this.context.fillStyle = color;
        this.context.font = (font_size * this.getWidth()) + 'px ' + font_family;
        this.context.textAlign = align;

        this.context.fillText(text, x * this.getWidth(), y * this.getHeight());
    }

    drawTextWithBackground(x, y, text, color, background_color, font_size, font_family='monospace', align='center'){
        /* Draw text to the canvas with a background
           :param x: <float> where on the x axis to draw the text, multiple of canvas.getWidth()
           :param y: <float> where on the y axis to draw the text, multiple of canvas.getHeight()
           :param text: <string> string to write to the canvas
           :param color: <string> HTML hash color ie '#ffffff'=white
           :param background_color: <string> HTML hash color ie '#ffffff'=white
           :param font_size: <int/float> size of the font in pixels, multiple of canvas.getWidth()
           :param font_family: <string> font style family, default='monospace'
           :param align: <string> how to align the string, default='center'
         */
        const width = (font_size * text.length) * 0.65;

        this.drawRect(x - width / 2, y - font_size * 1.2, width, font_size * 1.5, background_color);
        this.drawText(x, y, text, color, font_size, font_family, align);
    }

    drawImage(image, x, y, width, height){
        /* Draw an image to the canvas
           :param image: <Image> image to draw
           :param x: <float> where on the x axis to draw the image, multiple of canvas.getWidth()
           :param y: <float> where on the y axis to draw the image, multiple of canvas.getHeight()
           :param width: <float> how wide to draw the image, multiple of canvas.getWidth()
           :param height: <float> how tall to draw the image, multiple of canvas.getHeight()
         */
        this.context.drawImage(image,
            x * this.getWidth(), y * this.getHeight(),
            width * this.getWidth(), height * this.getHeight()
        );
    }

    drawSprite(sprite, x, y, width, height){
        /* Draw an image to the canvas
           :param sprite: <Sprite> sprite to draw
           :param x: <float> where on the x axis to draw the sprite, multiple of canvas.getWidth()
           :param y: <float> where on the y axis to draw the sprite, multiple of canvas.getHeight()
           :param width: <float> how wide to draw the sprite, multiple of canvas.getWidth()
           :param height: <float> how tall to draw the sprite, multiple of canvas.getHeight()
         */
        this.context.drawImage(
            sprite.getImage(), sprite.getX(), sprite.getY(), sprite.getWidth(), sprite.getHeight(),
            x * this.getWidth(), y * this.getHeight(),
            width * this.getWidth(), height * this.getHeight()
        );
    }

    drawCard(card, x, y, width){
        /* Draw card to the canvas
           :param card: <Card> card object to be rendered to the canvas
           :param x: <float> where on the x axis to draw the cards, multiple of canvas.getWidth()
           :param y: <float> where on the y axis to draw the cards, multiple of canvas.getHeight()
           :param width: <float> how wide to draw a single card, multiple of canvas.width
         */
        const height = width * 2.5; // TODO fix the ratio here

        if(card){
            this.drawSprite(card.getSprite(), x - width / 2, y - height / 2, width, width * (1.5 * (this.getWidth() / this.getHeight())))
        }else{
            this.drawOutline(x - width / 2, y - height / 2, width, height, '#fff');
        }
    }

    drawCards(cards, x, y, width){
        /* Draw multiple cards to the canvas, centered at (x, y)
           :param cards: <Card[]> list of card objects to be rendered to the canvas
           :param x: <float> where on the x axis to draw the cards, multiple of canvas.getWidth()
           :param y: <float> where on the y axis to draw the cards, multiple of canvas.getHeight()
           :param width: <float> how wide to draw a single card, multiple of canvas.width
         */
        const height = width * 1.5;

        let dyn_x = x - (width / 2) * (cards.length - 1);

        for(let i in cards){
            this.drawCard(cards[i], dyn_x, y, width, height);
            dyn_x += width;
        }

        if(cards.length === 0){
            this.drawCard(null, x, y, width, height);
        }
    }

    getElement(){
        /* Get the HTML element for this canvas element
           :return: <HTML> canvas object
         */
        return this.element;
    }

    getContext(){
        /* Get the context for the canvas element
           :return: <getContext('2d')> of canvas element
         */
        return this.context;
    }

    getWidth(){
        /* Get the width of the canvas element
           :return: <int> width of the canvas element
         */
        return this.element.width;
    }

    getHeight(){
        /* Get the height of the canvas element
           :return: <int> height of the canvas element
         */
        return this.element.height;
    }
}