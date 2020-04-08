export default class Enemy {
    constructor(posX, posY, equation, solution) {
        this.width = equation.length * 16 + 12;
        this.height = 20;
        this.speed = 10;
        this.position = {
            x: posX,
            y: posY,
        }
        this.equation = equation;
        this.solution = solution;
        this.changeColor = false
    }

    draw(ctx) {
        if(!this.changeColor) ctx.fillStyle = "#990000";
        else ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.position.x, this.position.y, this.width, 5)

        ctx.fillStyle = "#990000";
        ctx.font = "30px Spicy Rice";
        ctx.fillText(this.equation, this.position.x + 8, this.position.y - 10);
    }

    update(deltaTime) {
        if(!deltaTime) return;
        this.position.y += this.speed / deltaTime;
    }
}