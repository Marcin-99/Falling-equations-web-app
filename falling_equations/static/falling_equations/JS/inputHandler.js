import Game from "./game.js";
import {getMousePos, isCollision} from "./Utilities/utilities.js";


export default class inputHandler {
    constructor(player, projectiles, game, canvas, explosiveBombs, freezingBombs, enemies, enemyHitSound) {
        document.addEventListener('keydown', (event) => {
            if (game.gameState == "RUNNING") {
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
                        player.shoot(projectiles);
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
                        if (!player.solution) player.solution += "-";
                        break;
                }
            }

            else if (game.gameState == "MENU") {
                switch(event.keyCode) {
                    case 13:
                        game.changeGameState("RUNNING");
                        break;
                }
            }
        });


        document.addEventListener('keyup', (event) => {
            switch(event.keyCode) {
                case 37:
                    if (player.speedX < 0)
                        player.stopX();
                    break;
                case 38:
                    if (player.speedY < 0)
                        player.stopY();
                    break;
                case 39:
                    if (player.speedX > 0)
                        player.stopX();
                    break;
                case 40:
                    if (player.speedY > 0)
                        player.stopY();
                    break;
            }
        });


        document.addEventListener('mousedown', function(evt) {
            var mousePos = getMousePos(canvas, evt);

            for (let i = 0; i < explosiveBombs.length; i++) {
                if (mousePos.x > explosiveBombs[i].position.x && mousePos.x < explosiveBombs[i].position.x + explosiveBombs[i].width &&
                    mousePos.y > explosiveBombs[i].position.y && mousePos.y < explosiveBombs[i].position.y + explosiveBombs[i].height)
                    explosiveBombs[i].isDragged = true;
            }

            for (let i = 0; i < freezingBombs.length; i++) {
                if (mousePos.x > freezingBombs[i].position.x && mousePos.x < freezingBombs[i].position.x + freezingBombs[i].width &&
                    mousePos.y > freezingBombs[i].position.y && mousePos.y < freezingBombs[i].position.y + freezingBombs[i].height)
                    freezingBombs[i].isDragged = true;
            }
        }, false);


        /*Managing explosive bombs.*/
        document.addEventListener('mouseup', function(evt) {
            for (let i = 0; i < enemies.length; i++) {
                for (let j = 0; j < explosiveBombs.length; j++) {
                    if (isCollision(explosiveBombs[j], enemies[i])) {
                        game.createFragments(enemies[i], "#000000");
                        let explosion = document.getElementById("explosion");
                        explosion.volume = 1;
                        explosion.play();
                        game.equationCounter += 1;
                        game.points += 100;
                        enemies.splice(i, 1);
                        explosiveBombs.pop();
                        game.generateEquationsHandler();
                        break;
                    }
                }
            }

            for (let i = 0; i < explosiveBombs.length; i++) {
                explosiveBombs[i].position.x = 10;
                explosiveBombs[i].position.y = 180;
                explosiveBombs[i].isDragged = false;
            }
        }, false);


        /*Managing freezing bombs.*/
        document.addEventListener('mouseup', function(evt) {
            for (let i = 0; i < enemies.length; i++) {
                for (let j = 0; j < freezingBombs.length; j++) {
                    if (isCollision(freezingBombs[j], enemies[i])) {
                        let explosion = document.getElementById("iceExplosion");
                        explosion.volume = 1;
                        enemies[i].color =
                        explosion.play();
                        freezingBombs[j].freeze(enemies[i]);
                        freezingBombs.pop();
                        break;
                    }
                }
            }

            for (let i = 0; i < freezingBombs.length; i++) {
                freezingBombs[i].position.x = 18;
                freezingBombs[i].position.y = 300;
                freezingBombs[i].isDragged = false;
            }

        }, false);


        document.addEventListener('mousemove', function(evt) {
            var mousePos = getMousePos(canvas, evt);

            for (let i = 0; i < explosiveBombs.length; i++) {
                if (explosiveBombs[i].isDragged) {
                    explosiveBombs[i].update(mousePos);
                }
            }

            for (let i = 0; i < freezingBombs.length; i++) {
                if (freezingBombs[i].isDragged) {
                    freezingBombs[i].update(mousePos);
                }
            }

        }, false);
    }
}