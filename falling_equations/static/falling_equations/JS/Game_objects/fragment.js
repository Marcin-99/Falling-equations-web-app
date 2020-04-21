export default class Fragment {
    constructor (posX, posY, char, direction) {
        this.char = char;
        this.direction = direction;
        this.speed = 100;
        this.position = {
            x: posX,
            y: posY,
        }
    }


    draw(ctx) {
        ctx.fillStyle = "#990000";
        ctx.font = "30px Spicy Rice";
        ctx.fillText(this.char, this.position.x, this.position.y);
    }


    update(deltaTime) {
        if (!deltaTime) return;
        switch (this.direction) {
        case "Up":
            this.position.y -= this.speed / deltaTime;
            break;
        case "Down":
            this.position.y += this.speed / deltaTime;
            break;
        case "Right":
            this.position.x += this.speed / deltaTime;
            break;
        case "Left":
            this.position.x -= this.speed / deltaTime;
            break;
        case "UpAndLeft":
            this.position.x -= this.speed / deltaTime / 1.41;
            this.position.y -= this.speed / deltaTime / 1.41;
            break;
        case "UpAndRight":
            this.position.x += this.speed / deltaTime / 1.41;
            this.position.y -= this.speed / deltaTime / 1.41;
            break;
        case "DownAndLeft":
            this.position.x -= this.speed / deltaTime / 1.41;
            this.position.y += this.speed / deltaTime / 1.41;
            break;
        case "DownAndRight":
            this.position.x += this.speed / deltaTime / 1.41;
            this.position.y += this.speed / deltaTime / 1.41;
            break;
        }
    }
}