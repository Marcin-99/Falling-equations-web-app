let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d");
let projectiles = [];
let enemies = [];
let enemyCreated = false;

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);


class Projectile {
    constructor (posX, posY, solution) {
        this.width = 10;
        this.height = 50;
        this.solution = solution;
        this.speed = 50;
        this.position = {
        x: posX,
        y: posY,
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 28, 0, Math.PI * 2);
        ctx.lineWidth = 4;

        ctx.fillStyle = "#00994d";
        ctx.font = "30px Spicy Rice";
        ctx.fill();

        ctx.fillStyle = "#FFFFFF";

        if(this.solution.length == 1) ctx.fillText(this.solution, this.position.x - 9, this.position.y + 12);
        if(this.solution.length == 2) ctx.fillText(this.solution, this.position.x - 17, this.position.y + 12);
        if(this.solution.length == 3) ctx.fillText(this.solution, this.position.x - 25, this.position.y + 12);
    }

    update(deltaTime) {
        if(!deltaTime) return;
        this.position.y -= this.speed / deltaTime;
    }
}


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
        this.solution = "";
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
        ctx.fillStyle = "#00994d";

        ctx.fill();

        ctx.fillStyle = "#00994d";
        ctx.font = "30px Spicy Rice";
        if(this.solution.length == 1) ctx.fillText(this.solution, this.position.x + 16, this.position.y - 10);
        if(this.solution.length == 2) ctx.fillText(this.solution, this.position.x + 8, this.position.y - 10);
        if(this.solution.length == 3) ctx.fillText(this.solution, this.position.x, this.position.y - 10);

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
        if(this.solution) projectiles.push(new Projectile(this.position.x + 25, this.position.y - 10, this.solution));
        this.solution = "";
    }

    changeSolution(char) {
        if(this.solution[0] == "-" && this.solution.length < 3 || this.solution[0] != "-" && this.solution.length < 2)
            player.solution += char;
    }
}


class Enemy {
    constructor(posX, posY) {
        this.width = 200;
        this.height = 4;
        this.speed = 20;
        this.equation = "12+54*(31-54)"
        this.position = {
            x: posX,
            y: posY,
        }
    }

    draw(ctx) {
        ctx.fillStyle = "#990000";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        ctx.font = "30px Spicy Rice";
        ctx.fillText(this.equation, this.position.x + 8, this.position.y - 10);
    }

    update(deltaTime) {
        if(!deltaTime) return;
        this.position.y += this.speed / deltaTime;
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
                case 48:
                    player.changeSolution("0");
                    break;
                case 49:
                    player.changeSolution("1");
                    break;
                case 50:
                    player.changeSolution("2");
                    break;
                case 51:
                    player.changeSolution("3");
                    break;
                case 52:
                    player.changeSolution("4");
                    break;
                case 53:
                    player.changeSolution("5");
                    break;
                case 54:
                    player.changeSolution("6");
                    break;
                case 55:
                    player.changeSolution("7");
                    break;
                case 56:
                    player.changeSolution("8");
                    break;
                case 57:
                    player.changeSolution("9");
                    break;
                case 8:
                    player.solution = player.solution.slice(0, player.solution.length - 1);
                    break;
                case 189:
                    if(!player.solution) player.solution += "-";
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


function pushNewEnemy() {
    enemies.push(new Enemy(Math.floor(Math.random() * GAME_WIDTH), 10));
    setTimeout('pushNewEnemy()', 5000);
}


/*----------------------------------------------------- GAME SECTION --------------------------------------------------*/

let player = new Player(GAME_WIDTH, GAME_HEIGHT);
new inputHandler(player);

let lastTime = 0;

pushNewEnemy();

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    player.update(deltaTime);
    player.draw(ctx);

    for(i = 0; i < projectiles.length; i++)
    {
        projectiles[i].update(deltaTime);
        projectiles[i].draw(ctx);

        if(projectiles[i].position.y < 30) {
            projectiles.splice(i, 1);
            i--;
        }
    }

    for(i = 0; i < enemies.length; i++)
    {
        enemies[i].update(deltaTime);
        enemies[i].draw(ctx);

        if(enemies[i].position.y > GAME_HEIGHT - enemies[i].height) {
            enemies.splice(i, 1);
            i--;
        }
    }

    console.log(projectiles.length);
    requestAnimationFrame(gameLoop);
}

gameLoop();














