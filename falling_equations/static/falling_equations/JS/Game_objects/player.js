import Projectile from "./projectile.js";


export default class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.hitPoints = 3;
        this.width = 50;
        this.height = 50;
        this.maxSpeedX = 100;
        this.maxSpeedY = 100;
        this.speedX = 0;
        this.speedY = 0;
        this.solution = "";
        this.position = {
            x: 100,
            y: 100,
        }
        this.heart = document.getElementById("sourceHeart");
        this.playerImage = document.getElementById("sourceProfileImage");
    }

    draw(ctx) {
        /*ctx.beginPath();
        ctx.moveTo(this.position.x + 25, this.position.y);
        ctx.lineTo(this.position.x + 50, this.position.y + 50);
        ctx.lineTo(this.position.x, this.position.y + 50);
        ctx.lineTo(this.position.x + 25, this.position.y);
        ctx.fillStyle = "#00994d";
        ctx.fill();*/

        ctx.save();
        ctx.beginPath();
        ctx.arc(this.position.x + 26, this.position.y + 40, 40, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(this.playerImage, this.position.x - 14, this.position.y, 80, 80);
        ctx.restore();

        for(let i = 0; i < this.hitPoints; i++)
            ctx.drawImage(this.heart, 5 + i * 15, 5, 50, 50);

        ctx.fillStyle = "#00994d";
        ctx.font = "30px Spicy Rice";
        if (this.solution.length == 1) ctx.fillText(this.solution, this.position.x + 16, this.position.y - 10);
        if (this.solution.length == 2) ctx.fillText(this.solution, this.position.x + 8, this.position.y - 10);
        if (this.solution.length == 3) ctx.fillText(this.solution, this.position.x, this.position.y - 10);
    }


    update(deltaTime) {
        if (!deltaTime) return;
        this.position.x += this.speedX / deltaTime;
        this.position.y += this.speedY / deltaTime;

        if (this.position.y < 0) this.position.y = 0;
        if (this.position.y + this.height > this.gameHeight) this.position.y = this.gameHeight - this.height;

        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;
    }


    moveLeft() {
        this.speedX = -this.maxSpeedX;
    }


    moveRight() {
        this.speedX = this.maxSpeedX;
    }


    moveUp() {
        this.speedY = -this.maxSpeedY;
    }


    moveDown() {
        this.speedY = this.maxSpeedY;
    }


    stopX() {
        this.speedX = 0;
    }


    stopY() {
        this.speedY = 0;
    }


    shoot(projectiles) {
        if (this.solution) projectiles.push(new Projectile(this.position.x + 25, this.position.y - 10, this.solution));
        this.solution = "";
    }


    changeSolution(char) {
        if (this.solution[0] == "-" && this.solution.length < 3 || this.solution[0] != "-" && this.solution.length < 2)
            this.solution += char;
    }
}