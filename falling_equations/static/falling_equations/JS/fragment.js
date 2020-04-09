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
        if(!deltaTime) return;
        if(this.direction == "Up") this.position.y -= this.speed / deltaTime;
        else if(this.direction == "Down") this.position.y += this.speed / deltaTime;
        else if(this.direction == "Right") this.position.x += this.speed / deltaTime;
        else if(this.direction == "Left") this.position.x -= this.speed / deltaTime;

        else if(this.direction == "UpAndLeft") {
            this.position.x -= this.speed / deltaTime / 1.41;
            this.position.y -= this.speed / deltaTime / 1.41;
        }
        else if(this.direction == "UpAndRight") {
            this.position.x += this.speed / deltaTime / 1.41;
            this.position.y -= this.speed / deltaTime / 1.41;
        }
        else if(this.direction == "DownAndLeft") {
            this.position.x -= this.speed / deltaTime / 1.41;
            this.position.y += this.speed / deltaTime / 1.41;
        }
        else if(this.direction == "DownAndRight") {
            this.position.x += this.speed / deltaTime / 1.41;
            this.position.y += this.speed / deltaTime / 1.41;
        }
    }
}