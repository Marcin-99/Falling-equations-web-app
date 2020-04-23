export default class freezingBomb {
    constructor (posX, posY) {
        this.width = 100;
        this.height = 100;
        this.image = document.getElementById("iceBomb");
        this.isDragged = false;
        this.position = {
        x: posX,
        y: posY,
        };
    }


    draw (ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, 84, 84);
    }


    update (mousePos) {
        if (this.isDragged) {
            this.position.x = mousePos.x - 50;
            this.position.y = mousePos.y - 50;
        }
    }


    freeze (enemy) {
        enemy.speed = 0;
    }
}