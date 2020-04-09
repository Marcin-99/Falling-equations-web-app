var username = document.getElementById("username").getAttribute('value');

if(username.length > 10) {
    username = username.slice(0, 10);
    username += "...";
}

document.getElementById("username").innerHTML = username;