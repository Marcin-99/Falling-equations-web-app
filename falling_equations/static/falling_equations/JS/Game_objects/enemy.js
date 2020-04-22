export default class Enemy {
    constructor(posX, posY, equation, solution) {
        this.width = equation.length * 17 + 20;
        this.height = 5;
        this.changedColorForProperValue = false;
        this.speed = 20;
        this.position = {
            x: posX,
            y: posY,
        }
        this.equation = equation;
        this.solution = solution;
    }


    draw(ctx) {
        if (!this.changeColor) ctx.fillStyle = "#990000";
        else ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.position.x, this.position.y, this.width, 5);

        ctx.fillStyle = "#990000";
        ctx.font = "30px Spicy Rice";
        ctx.fillText(this.equation, this.position.x, this.position.y - 10);
    }


    update(deltaTime) {
        if (!deltaTime) return;
        this.position.y += this.speed / deltaTime;
    }


    getRealWidthOfTheEnemy (ctx) {
        this.width = ctx.measureText(this.equation).width;
        this.changedColorForProperValue = true;
    }
}