import Player from "./Game_objects/player.js";
import Projectile from "./Game_objects/projectile.js";
import Enemy from "./Game_objects/enemy.js";
import Fragment from "./Game_objects/fragment.js";
import explosiveBomb from "./Game_objects/explosiveBomb.js";
import freezingBomb from "./Game_objects/freezingBomb.js";
import inputHandler from "./inputHandler.js";
import {makeStringFromData, isCollision, pushNewEnemy, checkSolutions,
        setIntervalLimited, getDirectionForEveryFragment, getMousePos} from "./Utilities/utilities.js";
import {saveGame, getRandomEquation} from "./Utilities/ajax.js";


export default class Game {
    constructor(ctx, canvas, GAME_WIDTH, GAME_HEIGHT) {
        this.gameState = "MENU";
        this.gameStarted = false;
        this.ctx = ctx;
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT;
        this.projectiles = [];
        this.enemies = [];
        this.fragments = [];
        this.explosiveBombs = [];
        this.freezingBombs = [];
        this.LVL = 1;
        this.points = 0;
        this.equationCounter = 0;
        this.lastTime = 0;
        this.player = new Player(GAME_WIDTH, GAME_HEIGHT);
        this.backgroundMusic = document.getElementById("backgroundMusic");
        this.backgroundMusic.loop = true;
        this.enemyHitSound = document.getElementById("enemyHit");
        this.lostHealthSound = document.getElementById("lostHealth");
        this.isMusicPlayed = false;
        this.lastEquation = "";
        this.explosiveBombs.push(new explosiveBomb(10, 180));
        this.freezingBombs.push(new freezingBomb(18, 300));

        new inputHandler(this.player, this.projectiles, this, canvas, this.explosiveBombs, this.freezingBombs, this.enemies, this.enemyHitSound);
        this.startGameLoop();
    }


    startGameLoop(timestamp) {
        if (this.player.hitPoints <= 0) {
            if (this.gameStarted == true) saveGame(this.LVL, this.points, this.lastEquation);
            this.gameState = "ENDGAME";
            this.gameStarted = false;
        }
        let deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        switch (this.gameState) {
            case "MENU":
                this.drawEveryObjectForMenu();
                break;
            case "RUNNING":
                if (this.gameStarted == false) {
                    setIntervalLimited(getRandomEquation, 5000, 3, this.LVL, this.GAME_WIDTH, this.GAME_HEIGHT, Enemy, this.enemies);
                    this.gameStarted = true;
                }
                this.playMusic();
                this.manageCollisionsOfProjectilesAndEnemiesWithTheWall();
                this.manageCollisionsBetweenProjectilesAndEnemies();
                this.manageCollisionsBetweenPlayerEnemiesAndFragments();

                this.drawEveryObjectForGame(deltaTime);
                break;
            case "ENDGAME":
                this.drawEveryObjectForEndGameScreen();
                break;
        }

        requestAnimationFrame(this.startGameLoop.bind(this));
    }


    playMusic () {
        if (this.isMusicPlayed == false) {
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

        this.ctx.fillStyle = "#000000";
        this.ctx.fillText("LVL: " + this.LVL, 10, 40);
        this.ctx.fillText("SCORE: " + this.points, 10, 80);

        this.ctx.textAlign = "left";
        this.player.update(deltaTime);
        this.player.draw(this.ctx);

        for (let i = 0; i < this.projectiles.length; i++)
        {
            this.projectiles[i].update(deltaTime);
            this.projectiles[i].draw(this.ctx);
            if (this.projectiles[i].changedColorForProperValue == false) this.projectiles[i].getRealWidthOfTheProjectile(this.ctx);
        }

        for (let i = 0; i < this.enemies.length; i++)
        {
            this.enemies[i].update(deltaTime);
            this.enemies[i].draw(this.ctx);
            if (this.enemies[i].changedColorForProperValue == false) this.enemies[i].getRealWidthOfTheEnemy(this.ctx);
        }

        for (let i = 0; i < this.fragments.length; i++)
        {
            this.fragments[i].update(deltaTime);
            this.fragments[i].draw(this.ctx);
        }

        for (let i = 0; i < this.explosiveBombs.length; i++) {
            this.explosiveBombs[i].draw(this.ctx);
        }
        if (this.explosiveBombs.length > 0) {
            this.ctx.fillStyle = "#ffffff";
            this.ctx.fillText(this.explosiveBombs.length, this.explosiveBombs[0].position.x + 40, this.explosiveBombs[0].position.y + 74);
        }

        for (let i = 0; i < this.freezingBombs.length; i++) {
            this.freezingBombs[i].draw(this.ctx);
        }
        if (this.freezingBombs.length > 0) {
            this.ctx.fillStyle = "#ffffff";
            this.ctx.fillText(this.freezingBombs.length, this.freezingBombs[0].position.x + 36, this.freezingBombs[0].position.y + 56);
        }
    }


    manageCollisionsOfProjectilesAndEnemiesWithTheWall () {
        for (let i = 0; i < this.projectiles.length; i++)
        {
            if (this.projectiles[i].position.y < 30) {
                this.projectiles.splice(i, 1);
                i--;
            }
        }

        for (let i = 0; i < this.enemies.length; i++)
        {
            if (this.enemies[i].position.y > this.GAME_HEIGHT - this.enemies[i].height) {
                this.player.hitPoints = 0;
                this.lostHealthSound.volume = 0.3;
                this.lostHealthSound.play();
                this.lastEquation = this.enemies[i].equation;
            }
        }

        for (let i = 0; i < this.fragments.length; i++)
        {
            if (this.fragments[i].position.x > this.GAME_WIDTH || this.fragments[i].position.x < 0 ||
               this.fragments[i].position.y > this.GAME_HEIGHT || this.fragments[i].position.y < 0) {
                this.fragments.splice(i, 1);
                }
        }
    }


    manageCollisionsBetweenProjectilesAndEnemies () {
        for (let i = 0; i < this.projectiles.length; i++)
        {
            /*Checking all collisions between enemies and projectiles*/
            for(let j = 0; j < this.enemies.length; j++)
            {
                if (isCollision(this.projectiles[i], this.enemies[j]))
                {
                    if (checkSolutions(this.projectiles[i], this.enemies[j]))
                    {
                        this.equationCounter += 1;
                        this.points += 50;
                        this.generateEquationsHandler();
                        this.enemyHitSound.volume = 1;
                        this.enemyHitSound.play();
                        this.createFragments(this.enemies[j], "#00994d");
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


    manageCollisionsBetweenPlayerEnemiesAndFragments () {
        for (let i = 0; i < this.fragments.length; i++) {
            if (isCollision(this.fragments[i], this.player)) {
                this.lastEquation = "Fragment: " + this.fragments[i].char;
                this.player.hitPoints -= 1;
                this.lostHealthSound.volume = 0.3;
                this.lostHealthSound.play();
                this.fragments.splice(i, 1);
                i -= 1;
            }
        }

        for (let i = 0; i < this.enemies.length; i++) {
            if (isCollision(this.enemies[i], this.player)) {
                this.lastEquation = this.enemies[i].equation;
                this.player.hitPoints -= 1;
                this.lostHealthSound.volume = 0.3;
                this.lostHealthSound.play();
                this.enemies.splice(i, 1);
                this.equationCounter += 1;
                this.generateEquationsHandler();
                i -= 1;
            }
        }
    }


    createFragments (enemy, color) {
        if (enemy.speed == 0) color = "#66b3ff";
        const equationLength = enemy.equation.length;
        const savedWidth = enemy.width;
        let direction = "";

        for (let i = 0; i < equationLength; i++) {
            let char = enemy.equation[0];

            direction = getDirectionForEveryFragment(equationLength, i);

            this.fragments.push(new Fragment(enemy.position.x + savedWidth - enemy.width, enemy.position.y, char, direction, color));

            enemy.equation = enemy.equation.slice(1, enemy.equation.length);
            enemy.getRealWidthOfTheEnemy(this.ctx);
        }
    }


    changeGameState (newGameState) {
       this.gameState = newGameState;
    }


    generateEquationsHandler () {
        if (this.equationCounter % 3 == 0 && this.equationCounter != 0) {
            this.LVL += 1;
            setIntervalLimited(getRandomEquation, 5000, 3, this.LVL, this.GAME_WIDTH, this.GAME_HEIGHT, Enemy, this.enemies);
        }

        if (this.equationCounter % 6 == 0 && this.equationCounter != 0) this.explosiveBombs.push(new explosiveBomb(10, 180));
        if (this.equationCounter % 6 == 0 && this.equationCounter != 0) this.freezingBombs.push(new freezingBomb(18, 300));
    }
}