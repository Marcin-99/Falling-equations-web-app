var username = document.getElementById("username").getAttribute('value');
if(username.length > 10) {
    username = username.slice(0, 10);
    username += "...";
}
document.getElementById("username").innerHTML = username;


var equation = document.getElementById("equation");
if(equation) {
    equation = equation.getAttribute('value');
    var textLength = equation.length * 26 + 20;
    document.getElementById("equation").style.width = String(textLength) + "px";
}