export function makeStringFromData(data) {
    let string = data.reduce(function(x, y) {
        return x + y;
    });

    return string;
}


export function isCollision(object1, object2)
{
   if (object1.position.x + object1.width > object2.position.x && object1.position.x < object2.position.x + object2.width &&
   object1.position.y < object2.position.y + object2.height && object1.position.y + object1.height > object2.position.y)
       return true;
   else
       return false;
}


/*Push new enemy to a list with arguments given by previous function after getting json response from Python script*/
export function pushNewEnemy(randomEquation, GAME_WIDTH, GAME_HEIGHT, EnemyClass, enemies) {
    let randomPosX = Math.floor(Math.random() * GAME_WIDTH);
    let newEnemy = new EnemyClass(randomPosX, 10, randomEquation.equation, randomEquation.solution);

    while(newEnemy.position.x + newEnemy.width > GAME_WIDTH)
    {
        let randomPosX = Math.floor(Math.random() * GAME_WIDTH);
        newEnemy.position.x = randomPosX;
    }

    enemies.push(newEnemy);
}


export function checkSolutions(projectile, enemy)
{
    if (parseInt(projectile.solution) == parseInt(enemy.solution)) return true;
    else return false;
}


export function setIntervalLimited(callback, interval, x, LVL, GAME_WIDTH, GAME_HEIGHT, Enemy, enemies) {

    for (let i = 0; i < x; i++) {
        setTimeout(callback, i * interval, LVL, GAME_WIDTH, GAME_HEIGHT, Enemy, enemies);
    }

}


export function getDirectionForEveryFragment(equationLength, i) {
    if (equationLength >= 7) {
        switch (i) {
        case 0:
            return "Left";
            break;
        case equationLength - 1:
            return "Right";
            break;
        case 1:
            return "UpAndLeft";
            break;
        case 2:
            return "DownAndLeft";
            break;
        case equationLength - 2:
            return "DownAndRight";
            break;
        case equationLength - 3:
            return "UpAndRight";
            break;
        default:
            if (i % 2 != 0) return "Up";
            else return "Down";
            break;
        }
    }
    else {
        switch (i) {
            case 0:
                return "Left";
                break
            case equationLength - 1:
                return "Right";
                break
            default:
                if (i % 2 != 0) return "Up";
                else return "Down";
                break;
        }
    }
}


export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}