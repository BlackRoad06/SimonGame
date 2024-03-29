var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = []; 
var level = 0;
var started = false;



$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function(){
    
    if(!started){
    nextSequence();
    $("#level-title").html("Level " + level);
    }    
    started = true;
})


function nextSequence(){
    level++;
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("#level-title").html("Level " + level);
    userClickedPattern = [];
  
}



function playSound(name){
    var audio1 = new Audio("./sounds/" + name + ".mp3");
    audio1.play();
}


function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();  
    }
  
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}