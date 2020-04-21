import {getCookie, makeStringFromData, pushNewEnemy} from "./utilities.js";


const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const Http = new XMLHttpRequest();
        Http.open(method, url);

        Http.responseType = "json";
        let csrftoken = getCookie('csrftoken');
        if (data) {
            Http.setRequestHeader('X-CSRFToken', csrftoken);
        }

        Http.onload = () => {
            resolve(Http.response);
        }

        Http.send(JSON.stringify(data));
    });

    return promise;
};


export function saveGame (level, score, lastEquation) {
    const sendData = () => {
        sendHttpRequest('POST', 'http://127.0.0.1:8000/save', {
            'level': level,
            'score': score,
            'last_equation': lastEquation
        });
    };

    sendData();
}


/*Get json response from given url, where Python script generates and solves random equation.*/
/*Function waits untill process is resolved, then it calls pushNewEnemy() function.*/
export function getRandomEquation(LVL, GAME_WIDTH, GAME_HEIGHT, EnemyClass, enemies) {
    const url = 'http://127.0.0.1:8000/equation/n=' + LVL.toString();

    sendHttpRequest('GET', url).then(responseData => {
        const data = responseData["data"]["equation list"];
        const solution = data[data.length - 1];
        data.pop();
        data.pop();
        let equation = makeStringFromData(data);

        let randomEquation = {
            equation: equation,
            solution: solution,
        }

        pushNewEnemy(randomEquation, GAME_WIDTH, GAME_HEIGHT, EnemyClass, enemies);
    });
}