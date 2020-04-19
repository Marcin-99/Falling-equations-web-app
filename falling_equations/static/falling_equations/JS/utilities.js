export function makeStringFromData(data) {
    var equation = "";
    for(var i = 0; i < data.length; i++)
    {
        equation += data[i];
    }

    return equation;
}


export function isCollision(object1, object2)
{
   if(object1.position.x + object1.width > object2.position.x && object1.position.x < object2.position.x + object2.width &&
   object1.position.y < object2.position.y + object2.height && object1.position.y + object1.height > object2.position.y)
       return true;
   else
       return false;
}


/*Push new enemy to a list with arguments given by previous function after getting json response from Python script*/
export function pushNewEnemy(randomEquation, GAME_WIDTH, GAME_HEIGHT, EnemyClass, enemies) {
    var randomPosX = Math.floor(Math.random() * GAME_WIDTH);
    let newEnemy = new EnemyClass(randomPosX, 10, randomEquation.equation, randomEquation.solution);

    while(newEnemy.position.x + newEnemy.width > GAME_WIDTH)
    {
        var randomPosX = Math.floor(Math.random() * GAME_WIDTH);
        newEnemy.position.x = randomPosX;
    }

    enemies.push(newEnemy);
}


export function checkSolutions(projectile, enemy)
{
    if(parseInt(projectile.solution) == parseInt(enemy.solution)) return true;
    else return false;
}


export function setIntervalLimited(callback, interval, x, LVL, GAME_WIDTH, GAME_HEIGHT, Enemy, enemies) {

    for (var i = 0; i < x; i++) {
        setTimeout(callback, i * interval, LVL, GAME_WIDTH, GAME_HEIGHT, Enemy, enemies);
    }

}


export function getDirectionForEveryFragment(equationLength, i) {
    if(equationLength >= 7) {
        if(i == 0) return "Left";
        else if(i == equationLength - 1) return "Right";
        else if(i == 1) return "UpAndLeft";
        else if(i == 2) return "DownAndLeft";
        else if (i == equationLength - 2) return "DownAndRight";
        else if (i == equationLength - 3) return "UpAndRight";
        else if (i % 2 != 0) return "Up";
        else return "Down";
    }
    else {
        if(i == 0) return "Left";
        else if(i == equationLength - 1) return "Right";
        else if (i % 2 != 0) return "Up";
        else return "Down";
    }
}


export function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}