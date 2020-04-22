import Game from "./game.js";
import {getMousePos, isCollision} from "./Utilities/utilities.js";


export default class inputHandler {
    constructor(player, projectiles, game, canvas, bomb, enemies, enemyHitSound) {
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

            if (mousePos.x > bomb.position.x && mousePos.x < bomb.position.x + bomb.width &&
                mousePos.y > bomb.position.y && mousePos.y < bomb.position.y + bomb.height)
                bomb.isDragged = true;
        }, false);

        document.addEventListener('mouseup', function(evt) {
            for (let i = 0; i < enemies.length; i++) {
                if (isCollision(bomb, enemies[i])) {
                    let explosion = document.getElementById("explosion");
                    explosion.volume = 1;
                    explosion.play();
                    game.equationCounter += 1;
                    enemies.splice(i, 1);
                    game.generateEquationsHandler();
                    player.explosiveBombs -= 1;
                    break;
                }
            }

            bomb.position.x = 10;
            bomb.position.y = 180;
            bomb.isDragged = false;
        }, false);

        document.addEventListener('mousemove', function(evt) {
            var mousePos = getMousePos(canvas, evt);

            if (bomb.isDragged) {
                bomb.update(mousePos);
            }

        }, false);
    }
}













