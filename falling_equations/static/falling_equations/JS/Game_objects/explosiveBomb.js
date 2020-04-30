export default class explosiveBomb {
    constructor (posX, posY) {
        this.width = 100;
        this.height = 100;
        this.image = document.getElementById("explosiveBomb");
        this.isDragged = false;
        this.position = {
        x: posX,
        y: posY,
        };
    }


    draw (ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, 100, 100);
    }


    update (mousePos) {
        if (this.isDragged) {
            this.position.x = mousePos.x - 50;
            this.position.y = mousePos.y - 50;
        }
    }
}