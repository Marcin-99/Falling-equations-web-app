import Game from "./game.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let GAME_WIDTH = window.innerWidth * 0.6;
let GAME_HEIGHT = window.innerHeight * 0.8;

if (window.innerWidth < 1200) {
    GAME_WIDTH = window.innerWidth * 0.8;
    GAME_HEIGHT = window.innerHeight * 0.8;
}

document.getElementById("canvas").width = GAME_WIDTH;
document.getElementById("canvas").height = GAME_HEIGHT;

let gameState = "GAME";


new Game(ctx, canvas, GAME_WIDTH, GAME_HEIGHT);