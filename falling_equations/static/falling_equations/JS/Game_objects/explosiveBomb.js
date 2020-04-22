export default class explosiveBomb {
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


    draw (ctx, count) {
        ctx.drawImage(this.image, this.position.x, this.position.y, 100, 100);

        if (!this.isDragged) {
            ctx.fillStyle = "#ffffff";
            ctx.fillText("x" + count, this.position.x + 35, this.position.y + 60);
        }
    }


    update (mousePos) {
        if (this.isDragged) {
        this.position.x = mousePos.x - 50;
        this.position.y = mousePos.y - 50;
        }
    }
}