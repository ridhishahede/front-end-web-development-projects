var gamePatterns = [];
var userClickedPattern = [];
var buttonColours = ["red" , "blue" , "green" , "yellow"];

  var level = 0;
var started = false;

function playsong(name) {
  var audio = new Audio(name);
  audio.play();
}


  $(".btn").on("click" , function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    var userchoosenSong = "sounds/" + userChosenColour + ".mp3";
    playsong(userchoosenSong);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

  });
  // console.log(userClickedPattern);

  $(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

  function nextSequence() {
    userClickedPattern = [];
        level ++;
    $("h1").text("Level" + " - " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePatterns.push(randomChosenColour);

    var choosenID = "#" + randomChosenColour;
    $(choosenID).fadeOut(100).fadeIn(100);
    var choosenSong = "sounds/" + randomChosenColour + ".mp3";
    playsong(choosenSong);

  }

function animatePress(currentColour) {
  var userChoosenID = "#" + currentColour;
  $(userChoosenID).addClass("pressed");
  setTimeout(function () {
   $(userChoosenID).removeClass("pressed");
 }, 100);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePatterns[currentLevel]) {
    console.log("SUCCESS!");
    if(currentLevel === gamePatterns.length - 1) {
      setTimeout(nextSequence(), 2000);
    }
  }
  else {
    console.log("FAILED");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
     $("body").removeClass("game-over");
   }, 200);
   $("h1").text("Game Over, Press Any Key to Restart");
   startOver();
  }

function startOver(){
  level = 0;
  started = false;
  gamePatterns = [];
}

}
