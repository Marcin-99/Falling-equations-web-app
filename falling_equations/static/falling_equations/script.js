let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d");
let projectiles = [];
let enemies = [];
var LVL = 5;

var GAME_WIDTH = window.innerWidth * 0.6;
var GAME_HEIGHT = window.innerHeight * 0.8;

if(window.innerWidth < 1200) {
    GAME_WIDTH = window.innerWidth * 0.8;
    GAME_HEIGHT = window.innerHeight * 0.8;
}

document.getElementById("canvas").width = GAME_WIDTH;
document.getElementById("canvas").height = GAME_HEIGHT;


class Projectile {
    constructor (posX, posY, solution) {
        this.width = 50;
        this.height = 50;
        this.solution = solution;
        this.speed = 150;
        this.position = {
        x: posX,
        y: posY,
        }
    }

    draw(ctx) {
        ctx.fillStyle = "#00994d";

        if(this.solution.length == 1) ctx.fillText(this.solution, this.position.x - 9, this.position.y + 4);
        if(this.solution.length == 2) ctx.fillText(this.solution, this.position.x - 17, this.position.y + 4);
        if(this.solution.length == 3) ctx.fillText(this.solution, this.position.x - 25, this.position.y + 4);
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


function makeStringFromData(data) {
    equation = "";
    for(i = 0; i < data.length; i++)
    {
        equation += data[i];
    }

    return equation;
}


/*Function sends request for needed data.*/
const sendHttpRequest = (method, url) => {
    const promise = new Promise((resolve, reject) => {
        const Http = new XMLHttpRequest();

        Http.open(method, url);
        Http.responseType = "json";

        Http.onload = () => {
            resolve(Http.response);
        }

    Http.send();
    });

    return promise;
};


/*Get json response from given url, where Python script generates and solves random equation.*/
/*Function waits untill process is resolved, then it calls pushNewEnemy() function.*/
function getRandomEquation() {
    const url = 'http://127.0.0.1:8000/equation/n=' + LVL.toString();

    sendHttpRequest('GET', url).then(responseData => {
        const data = responseData["equation"];
        const solution = data[data.length - 1];
        data.pop();
        data.pop();
        const equation = makeStringFromData(data);

        randomEquation = {
            equation: equation,
            solution: solution,
        }

        pushNewEnemy(randomEquation);
    });

    setTimeout('getRandomEquation()', 5000);
}


/*Push new enemy to a list with arguments given by previous function after getting json response from Python script*/
function pushNewEnemy(randomEquation) {
    var randomPosX = Math.floor(Math.random() * GAME_WIDTH);
    let newEnemy = new Enemy(randomPosX, 10, randomEquation.equation, randomEquation.solution);

    while(newEnemy.position.x + newEnemy.width > GAME_WIDTH)
    {
        var randomPosX = Math.floor(Math.random() * GAME_WIDTH);
        newEnemy.position.x = randomPosX;
    }

    enemies.push(newEnemy);
}


function isCollision(projectile, enemy)
{
   if(projectile.position.x + projectile.width > enemy.position.x && projectile.position.x < enemy.position.x + enemy.width &&
   projectile.position.y < enemy.position.y + enemy.height && projectile.position.y + projectile.height > enemy.position.y)
       return true;
   else
       return false;
}


function checkSolutions(projectile, enemy)
{
    if(parseInt(projectile.solution) == parseInt(enemy.solution)) return true;
    else return false;
}


function returnColor(enemy) {
    enemy.changeColor = false;
}


/*----------------------------------------------------- GAME SECTION --------------------------------------------------*/


let player = new Player(GAME_WIDTH, GAME_HEIGHT);
new inputHandler(player);

let lastTime = 0;

getRandomEquation();

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    player.update(deltaTime);
    player.draw(ctx);

    /*Collision of projectiles with the wall. */
    for(i = 0; i < projectiles.length; i++)
    {
        if(projectiles[i].position.y < 30) {
            projectiles.splice(i, 1);
            i--;
        }
    }

    for(i = 0; i < projectiles.length; i++)
    {
        projectiles[i].update(deltaTime);
        projectiles[i].draw(ctx);

        /*Checking all collisions between enemies and projectiles*/
        for(j = 0; j < enemies.length; j++)
        {
            if(isCollision(projectiles[i], enemies[j]))
            {
                if(checkSolutions(projectiles[i], enemies[j]))
                {
                    enemies.splice(j, 1);
                    j--;
                }
                else
                {
                    enemies[j].changeColor = true;
                    setTimeout('returnColor(enemies[j])', 200);
                }
                projectiles.splice(i, 1);
                i--;
                break;
            }
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

    requestAnimationFrame(gameLoop);
}

gameLoop();