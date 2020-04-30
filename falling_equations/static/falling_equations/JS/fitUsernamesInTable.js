let userNames = document.getElementsByClassName("usernameInTable");

for (let i = 0; i < userNames.length; i++)
{
    let username = userNames[i].getAttribute("value")
    if (username.length > 14) {
        username = username.slice(0, 14);
        username += "...";
    }

    userNames[i].innerHTML = username;
}
