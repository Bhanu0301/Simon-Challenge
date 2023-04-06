
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];     // Initializing a empty Array that gets added with color that need to be pressed
var userClickedPattern = []; // It stores colors pressed by user in order..!

var started = false; //Initialize stared to false, as the game starts it becomes true
var level = 0; // When the game is started then the game is at level 0

$(document).keypress(function() {
  if (!started) {  //If not started
    $("#level-title").text("Level " + level); // Make the level initialized to "Level 0"
    nextSequence(); //call next sequence function
    started = true; //Now the game started
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id"); //What is userChosen Color ?? --> On click find what attribute that button contains(color)
  userClickedPattern.push(userChosenColour); //Add it to userClicked Pattern to match with the gamePattern

  playSound(userChosenColour); //PlaySound function for Choosen color
  animatePress(userChosenColour); //Small Animation on click -->Animation Function

  checkAnswer(userClickedPattern.length-1); // Check Ans Function
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      // Call startOver() if the user gets the sequence wrong. --> Begins from start
      startOver();
    }

}

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level); //Each time the correct nextSequence is pressed, the level increases

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); //Select a randomnumber*4  and choose the color at that index-->push to gamepattern

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {   //-->playSound(green)
  var audio = new Audio("sounds/" + name + ".mp3"); //-->play green.mp3 sound from sounds/ folder
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); //css change provided when we have shadow of grey color
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Create a new function called startOver() and is called when the game is over when wrong pattern pressed.
function startOver() {

  // Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
