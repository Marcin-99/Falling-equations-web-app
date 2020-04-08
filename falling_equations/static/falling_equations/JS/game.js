import Player from "./player.js";
import Projectile from "./projectile.js";
import Enemy from "./enemy.js";
import inputHandler from "./inputHandler.js";
import {makeStringFromData, isCollision, getRandomEquation, pushNewEnemy, checkSolutions} from "./utilities.js";


export default class Game {
    constructor(ctx, GAME_WIDTH, GAME_HEIGHT) {
        this.ctx = ctx;
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT;
        this.projectiles = [];
        this.enemies = [];
        this.LVL = 1;
        this.lastTime = 0;
        this.player = new Player(GAME_WIDTH, GAME_HEIGHT);
        new inputHandler(this.player, this.projectiles);
        setInterval(getRandomEquation, 5000, this.LVL, this.GAME_WIDTH, this.GAME_HEIGHT, Enemy, this.enemies);
        this.startGameLoop();
    }


    startGameLoop(timestamp) {
        let deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.manageCollisionsOfProjectilesAndEnemiesWithTheWall();
        this.manageCollisionsBetweenProjectilesAndEnemies();

        this.drawEveryObject(deltaTime);

        requestAnimationFrame(this.startGameLoop.bind(this));
    }


    drawEveryObject (deltaTime) {
        this.ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);

        this.player.update(deltaTime);
        this.player.draw(this.ctx);

        for(var i = 0; i < this.projectiles.length; i++)
        {
            this.projectiles[i].update(deltaTime);
            this.projectiles[i].draw(this.ctx);
        }

        for(var i = 0; i < this.enemies.length; i++)
        {
            this.enemies[i].update(deltaTime);
            this.enemies[i].draw(this.ctx);
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
                this.enemies.splice(i, 1);
                i--;
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
}