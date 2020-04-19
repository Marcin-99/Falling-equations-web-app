import Player from "./player.js";
import Projectile from "./projectile.js";
import Enemy from "./enemy.js";
import Fragment from "./fragment.js";
import inputHandler from "./inputHandler.js";
import {makeStringFromData, isCollision, getRandomEquation, pushNewEnemy, checkSolutions,
        setIntervalLimited, getDirectionForEveryFragment} from "./utilities.js";


export default class Game {
    constructor(ctx, GAME_WIDTH, GAME_HEIGHT) {
        this.gameState = "MENU";
        this.gameStarted = false;
        this.ctx = ctx;
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT;
        this.projectiles = [];
        this.enemies = [];
        this.fragments = [];
        this.LVL = 1;
        this.points = 0;
        this.equationCounter = 0;
        this.lastTime = 0;
        this.player = new Player(GAME_WIDTH, GAME_HEIGHT);
        this.backgroundMusic = document.getElementById("backgroundMusic");
        this.enemyHitSound = document.getElementById("enemyHit");
        this.isMusicPlayed = false;
        new inputHandler(this.player, this.projectiles, this);

        this.startGameLoop();
    }


    startGameLoop(timestamp) {
        if(this.player.hitPoints <= 0) {
            this.gameState = "ENDGAME";
            this.gameStarted = false;
        }
        let deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        if(this.gameState == "MENU") {
            this.drawEveryObjectForMenu();
        }
        else if(this.gameState == "RUNNING") {
            if(this.gameStarted == false) {
                setIntervalLimited(getRandomEquation, 5000, 3, this.LVL, this.GAME_WIDTH, this.GAME_HEIGHT, Enemy, this.enemies);
                this.gameStarted = true;
            }
            this.playMusic();
            this.setValuesInHtml();

            this.manageCollisionsOfProjectilesAndEnemiesWithTheWall();
            this.manageCollisionsBetweenProjectilesAndEnemies();

            this.drawEveryObjectForGame(deltaTime);
        }
        else if(this.gameState == "ENDGAME") {
            this.drawEveryObjectForEndGameScreen();
        }

        requestAnimationFrame(this.startGameLoop.bind(this));
    }


    playMusic () {
        if(this.isMusicPlayed == false) {
            this.backgroundMusic.volume = document.getElementById("backgroundMusic").getAttribute("volume");
            this.backgroundMusic.play();
            this.isMusicPlayed = true;
            }
    }


    drawEveryObjectForMenu () {
        this.ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);

        this.ctx.font = "40px Shadows Into Light";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Press ENTER To Start", this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2);
    }


    drawEveryObjectForEndGameScreen () {
        this.ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);

        this.ctx.font = "40px Shadows Into Light";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Game over!", this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2);
    }


    drawEveryObjectForGame (deltaTime) {
        this.ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);

        this.ctx.textAlign = "left";
        this.player.update(deltaTime);
        this.player.draw(this.ctx);

        for(var i = 0; i < this.projectiles.length; i++)
        {
            this.projectiles[i].update(deltaTime);
            this.projectiles[i].draw(this.ctx);
            if(this.projectiles[i].changedColorForProperValue == false) this.projectiles[i].getRealWidthOfTheProjectile(this.ctx);
        }

        for(var i = 0; i < this.enemies.length; i++)
        {
            this.enemies[i].update(deltaTime);
            this.enemies[i].draw(this.ctx);
            if(this.enemies[i].changedColorForProperValue == false) this.enemies[i].getRealWidthOfTheEnemy(this.ctx);
        }

        for(var i = 0; i < this.fragments.length; i++)
        {
            this.fragments[i].update(deltaTime);
            this.fragments[i].draw(this.ctx);
        }
    }


    manageCollisionsOfProjectilesAndEnemiesWithTheWall () {
        for(var i = 0; i < this.projectiles.length; i++)
        {
            if(this.projectiles[i].position.y < 30) {
                this.projectiles.splice(i, 1);
                i--;
            }
        }

        for(var i = 0; i < this.enemies.length; i++)
        {
            if(this.enemies[i].position.y > this.GAME_HEIGHT - this.enemies[i].height) {
                this.player.hitPoints -= 1;
                this.enemies.splice(i, 1);
                i--;
                this.equationCounter += 1;
                if(this.equationCounter % 3 == 0 && this.equationCounter != 0) {
                    this.LVL += 1;
                    setIntervalLimited(getRandomEquation, 5000, 3, this.LVL, this.GAME_WIDTH, this.GAME_HEIGHT, Enemy, this.enemies);
                }
            }
        }

        for(var i = 0; i < this.fragments.length; i++)
        {
            if(this.fragments[i].position.x > this.GAME_WIDTH || this.fragments[i].position.x < 0 ||
               this.fragments[i].position.y > this.GAME_HEIGHT || this.fragments[i].position.y < 0) {
                this.fragments.splice(i, 1);
                }
        }
    }


    manageCollisionsBetweenProjectilesAndEnemies () {
        for(var i = 0; i < this.projectiles.length; i++)
        {
            /*Checking all collisions between enemies and projectiles*/
            for(var j = 0; j < this.enemies.length; j++)
            {
                if(isCollision(this.projectiles[i], this.enemies[j]))
                {
                    if(checkSolutions(this.projectiles[i], this.enemies[j]))
                    {
                        this.equationCounter += 1;
                        this.points += 1;
                        if(this.equationCounter % 3 == 0 && this.equationCounter != 0) {
                            this.LVL += 1;
                            setIntervalLimited(getRandomEquation, 5000, 3, this.LVL, this.GAME_WIDTH, this.GAME_HEIGHT, Enemy, this.enemies);
                        }
                        this.enemyHitSound.volume = 1;
                        this.enemyHitSound.play();
                        this.createFragments(this.enemies[j]);
                        this.enemies.splice(j, 1);
                        j--;
                    }
                    this.projectiles.splice(i, 1);
                    i--;
                    break;
                }
            }
        }
    }


    setValuesInHtml () {
        /*Write LVL and number of points.*/
        document.getElementById("LVL").innerHTML = "LVL: " + this.LVL;
        document.getElementById("points").innerHTML = "SCORE: " + this.points;

        document.getElementById("infobar").style.display = "block";
        /*Change color of LVL and points when LVL increases.*/
        var color = 8 - this.LVL;
        color = color.toString() + color.toString() + color.toString() + color.toString();
        document.getElementById("infobar").style.color = "#ff" + color;
    }


    createFragments (enemy) {
        const equationLength = enemy.equation.length;
        const savedWidth = enemy.width;
        var direction = "";

        for(var i = 0; i < equationLength; i++) {
            var char = enemy.equation[0];

            direction = getDirectionForEveryFragment(equationLength, i);

            this.fragments.push(new Fragment(enemy.position.x + savedWidth - enemy.width, enemy.position.y, char, direction));

            enemy.equation = enemy.equation.slice(1, enemy.equation.length);
            enemy.getRealWidthOfTheEnemy(this.ctx);
        }
    }


    changeGameState (newGameState) {
       this.gameState = newGameState;
    }
}