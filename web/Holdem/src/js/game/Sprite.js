/* Author: Thomas vanBommel */

export default class Sprite{
    constructor(x, y, width, height, image){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }

    getX(){
        /* Get the image for this sprite
           :return: <Image> image for this sprite
         */
        return this.x;
    }
    getY(){
        /* Get the image for this sprite
           :return: <Image> image for this sprite
         */
        return this.y;
    }
    getWidth(){
        /* Get the image for this sprite
           :return: <Image> image for this sprite
         */
        return this.width;
    }
    getHeight(){
        /* Get the image for this sprite
           :return: <Image> image for this sprite
         */
        return this.height;
    }
    getImage(){
        /* Get the image for this sprite
           :return: <Image> image for this sprite
         */
        return this.image;
    }
}