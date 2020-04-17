import Game from "./game.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

var GAME_WIDTH = window.innerWidth * 0.6;
var GAME_HEIGHT = window.innerHeight * 0.8;

if(window.innerWidth < 1200) {
    GAME_WIDTH = window.innerWidth * 0.8;
    GAME_HEIGHT = window.innerHeight * 0.8;
}

document.getElementById("canvas").width = GAME_WIDTH;
document.getElementById("canvas").height = GAME_HEIGHT;

var gameState = "GAME";

new Game(ctx, GAME_WIDTH, GAME_HEIGHT);