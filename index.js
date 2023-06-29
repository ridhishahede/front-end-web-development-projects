var randomNumber1 = Math.floor(Math.random() * 6) + 1; //1-6
var randomImageSource1 = "images/dice" + randomNumber1 + ".png";

document.querySelectorAll("img")[0].setAttribute("src", randomImageSource1);


var randomNumber2 = Math.floor(Math.random() * 6) + 1;

var randomImageSource2 = "images/dice" + randomNumber2 + ".png";

document.querySelectorAll("img")[1].setAttribute("src", randomImageSource2);

var result = document.querySelectorAll('h1')[0];

if(randomNumber1 > randomNumber2){
  result.innerHTML = "Player 1 wins";
}
else if(randomNumber2 > randomNumber1){
  result.innerHTML = "Player 2 wins";
}
else {
  result.innerHTML = "DRAW!";
}
