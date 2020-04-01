class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 50;
        this.height = 50;
        this.maxSpeedX = 100;
        this.maxSpeedY = 100;
        this.speedX = 0;
        this.speedY = 0;
        this.position = {
            x: 100,
            y: 100,
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.position.x + 25, this.position.y);
        ctx.lineTo(this.position.x + 50, this.position.y + 50);
        ctx.lineTo(this.position.x, this.position.y + 50);
        ctx.lineTo(this.position.x + 25, this.position.y);
        ctx.fillStyle = '#00994d';
        ctx.fill();
    }

    update(deltaTime) {
        if(!deltaTime) return;
        this.position.x += this.speedX / deltaTime;
        this.position.y += this.speedY / deltaTime;

        if(this.position.y < 0) this.position.y = 0;
        if(this.position.y + this.height > this.gameHeight) this.position.y = this.gameHeight - this.height;

        if(this.position.x < 0) this.position.x = 0;
        if(this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;
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

    shoot() {

    }
}


class inputHandler {
    constructor(player) {
        document.addEventListener('keydown', (event) => {
            switch(event.keyCode) {
                case 37:
                    player.moveLeft();
                    break;
                case 38:
                    player.moveUp();
                    break;
                case 39:
                    player.moveRight();
                    break;
                case 40:
                    player.moveDown();
                    break;
                case 32:
                    player.shoot();
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch(event.keyCode) {
                case 37:
                    if(player.speedX < 0)
                        player.stopX();
                    break;
                case 38:
                    if(player.speedY < 0)
                        player.stopY();
                    break;
                case 39:
                    if(player.speedX > 0)
                        player.stopX();
                    break;
                case 40:
                    if(player.speedY > 0)
                        player.stopY();
                    break;
            }
        });
    }
}



/*----------------------------------------------------- GAME SECTION --------------------------------------------------*/

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d");

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

let player = new Player(GAME_WIDTH, GAME_HEIGHT);
new inputHandler(player);

player.draw(ctx);

let lastTime = 0;


function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    player.update(deltaTime);
    player.draw(ctx)

    requestAnimationFrame(gameLoop)
}

gameLoop();














