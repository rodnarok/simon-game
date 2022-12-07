var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

$(".btn").click(function() {
    
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

/*function handler(userClick){
    var userChosenColour = userClick;
}*/

$(document).keydown(function() {
    if (start === false) {
        nextSequence();
        start = true;
    }});
    
    




function nextSequence(){

    userClickedPattern = [];
    
    $("h1").text("Level " + level);
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("sucess" + " game " +gamePattern.length + " user " + userClickedPattern.length);
        if (gamePattern.length === userClickedPattern.length){
            console.log("sucess");
            setTimeout(function() { nextSequence() }, 1000 );
        }
    } else {
        
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        console.log("wrong");

        $("body").addClass("game-over");

        setTimeout (function() {
            $("body").removeClass("game-over"), 200});

        $("h1").text("Game Over, Press Any Key To Restart");
        startOver();
    }
}

function startOver(){
    start = false;
    level = 0;
    gamePattern = [];
        
}