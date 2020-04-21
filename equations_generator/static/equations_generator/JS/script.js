var equation = document.getElementById("equation");

if(equation) {
    equation = equation.getAttribute('value');
    var textLength = equation.length * 26 + 20;
    document.getElementById("equation").style.width = String(textLength) + "px";
}