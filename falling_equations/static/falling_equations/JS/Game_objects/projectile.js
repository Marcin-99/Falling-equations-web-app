export default class Projectile {
    constructor (posX, posY, solution) {
        this.width = 0;
        this.height = 25;
        this.solution = solution;
        this.speed = 150;
        this.changedColorForProperValue = false;
        this.position = {
        x: posX,
        y: posY,
        }
    }


    draw(ctx) {
        ctx.fillStyle = "#00994d";

        if (this.solution.length == 1) ctx.fillText(this.solution, this.position.x - 9, this.position.y + 4);
        if (this.solution.length == 2) ctx.fillText(this.solution, this.position.x - 17, this.position.y + 4);
        if (this.solution.length == 3) ctx.fillText(this.solution, this.position.x - 25, this.position.y + 4);
    }


    update(deltaTime) {
        if (!deltaTime) return;
        this.position.y -= this.speed / deltaTime;
    }


    getRealWidthOfTheProjectile (ctx) {
        this.width = ctx.measureText(this.solution).width;
    }
}