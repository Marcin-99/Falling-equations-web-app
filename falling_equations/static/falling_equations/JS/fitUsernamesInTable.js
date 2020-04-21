let usernames = document.getElementsByClassName("usernameInTable");

for (let i = 0; i < usernames.length; i++)
{
    let username = usernames[i].getAttribute("value")
    if (username.length > 14) {
        username = username.slice(0, 14);
        username += "...";
    }
    usernames[i].innerHTML = username;
}
