var quizQuestion = document.querySelector(".quizQuestion");
//access the main question element to change it as the game progresses

var quizChoiceList = document.querySelector(".quizChoices");
var quizItems = quizChoiceList.getElementsByTagName("button");
//quizChoices is the UL, then select off that using quizItems to iterate through list items(***********)

var quizMenu = document.querySelector(".quizMenu"); 

var startButton = document.querySelector("#startButton");
var restartButton = document.querySelector("#restartButton");
//targets the startbutton

var quizTime = document.querySelector(".timer");
//targets the timer element

var inputSection = document.querySelector(".highscoreInputSection");
//targets highscore submit section after gameover
var highscoreInput = document.querySelector(".highscoreInput");
//targets higschore submit input box
var highscoreList = document.querySelector(".highscoreList");
var highscoreItems = highscoreList.getElementsByTagName("li");
var highscoreScores = highscoreList.getElementsByTagName("p");
//TO ITERATE THROUGH document elements - highscoreList is the UL, then you have to select off it using the prev variable and getElementsbyTagName only (queryselector doesnt work)
var highscoreSubmit = document.querySelector(".highscoreSubmit");
//targets the highscore submit button to add initials to scoreboard

var highScoreView = document.querySelector(".highscores");
//targets the top left view highscores link

var step = 0;
//tracker variable to know which question i am on

var time = 60;
//setting time at 60

var misses = 0;
//tracks player mistakes

var gameMode = 0;
//gamemode is 0 while active, and it is zero when game over

var myVar = 0;

var user = [];

var scores = [];

var usersRanked = [];
var scoresRanked = [];

var highestScore = 0;
var highestUser = "";

//list of question/choices objects to cycle through
var options = [{
    question: "JavaScript is...",
    choices: ["Object based", "Subjective", "Objective", "Evil"],
    correct: 0,
    },
    {
    question: "What does the following expression return? 1 + 5 + ' bottles of milk'",
    choices: ["15 bottles of milk", "6 bottles of milk", "undefined. An exception is thrown", "5 bottles of milk"],
    images:[""],
    correct: 1,
    },
    {
    question: "How do you create an object in JavaScript?",
    choices: ["var obj = [];", "function Foo() {} var obj = new Foo()", "var obj = new Object()", "All of these work"],
    images:[""],
    correct: 3,

    },
    {
    question: "Primitive types are passed by :",
    choices: ["Value", "Pointer", "Reference", "Email"],
    images:[""],
    correct: 0,

    },
    {
    question: "Which is not a primitive data type in JavaScript?",
    choices: ["Boolean", "Number", "String", "Character"],
    images:[""],
    correct: 3,

    },
    {
    question: "GAME OVER",
    choices: [""],
    images:[""],
    correct: 99999999999,
    
    }]


//PRIMARY GAME FUNCTIONS (INITIALIZE GAME STATE, RENDER QUESTION/OPTIONS, CHECK ANSWER) --------------------------------------
function init () {
    quizQuestion.textContent = "Javascript Coding Quiz!";
    quizChoiceList.setAttribute("style", "display: none");
    restartButton.setAttribute("style", "display: none");
    inputSection.setAttribute("style", "display: none");
    highscoreList.setAttribute("style", "display: none");

    //this checks session storage on initialize to get existing users and their scores, if they're both not empty it will add this data to global variables
    var storedUsers = JSON.parse(sessionStorage.getItem("user"));
    var storedScores = JSON.parse(sessionStorage.getItem("score"));
    if (storedUsers !== null && storedScores !== null) {
        user = storedUsers;
        scores = storedScores;
      }

    renderHighscores();
}

function renderChoices() {
    //display options
    quizChoiceList.setAttribute("style", "display: ");
    if (step == options.length - 1) {
        console.log("GAMEOVER");
        quizChoiceList.setAttribute("style", "display: none");
        startButton.textContent = "Score: " + (time); //score CALCULATION
        startButton.setAttribute("style", "display: ");
        restartButton.setAttribute("style", "display: ");
        inputSection.setAttribute("style", "display: ");
        gameMode = 1;
    }
    for (let i = 0; i < quizItems.length; i++) {
        quizQuestion.textContent = options[step].question;
        quizItems[i].textContent = options[step].choices[i];
    }
    
}

function checkAnswer(element) {
    //checks the answer to see if its correct
    for (let i = 0; i < options[step].choices.length; i++) {
        if(element.textContent === options[step].choices[i]) {
            if (options[step].correct === i) {
                console.log("correct");
                quizMenu.setAttribute("style", "background-color: rgb(80, 214, 147);");
                step++;
            } else {
                console.log("wrong, try again");
                //add disabled attribute to buttons after clicked if wrong choice here
                quizMenu.setAttribute("style", "background-color: rgb(196, 78, 78)");
                time-=10;
            }
        }
        
    }
}

// HIGHSCORE AND SESSIONDATA STORAGE FUNCTIONS -------------------------------------------------------

function storeHighscores () {
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("score", JSON.stringify(scores));
    //stores data from both user/scores to sessionStorage to be saved and reused
}

function renderHighscores() {
    console.log(user);
    console.log(scores);

    sortHighscores();

    console.log(user);
    console.log(scores);
    
    for (let i = 0; i < user.length; i++) {

        var userScore = scores[i];
        var userUser = user[i];

        var li = document.createElement("li");
        var p = document.createElement("p");

        li.textContent = "Score: " + userScore;
        p.textContent = "User: " + userUser;

        li.appendChild(p);
        highscoreList.appendChild(li);
  
    }
    console.log(scoresRanked);
    console.log(usersRanked);
    
}

function sortHighscores() {

    for (let i = 0; i < scores.length; i++) {   
        highestScore = Math.max(...scores);
        console.log(highestScore) 
        for (let i = 0; i < scores.length; i++) {
            if (scores[i] === highestScore) {
                highestUser = user[i];
                user.splice(i, 1);
                scores.splice(i, 1);
            }
        }
        usersRanked.push(highestUser);
        scoresRanked.push(highestScore);
    }

    user = usersRanked;
    scores = scoresRanked;
    
}



// TIMING FUNCTIONS --------------------------------------
function startTimer() {
    var myVar = setInterval(myTimer, 1000);
    renderChoices();
}

function myTimer() {
    //stops timer if it reaches 0 or the end of questions
    if (time === 0 || step === options.length - 1) {
        quizChoiceList.setAttribute("style", "display: none");
        quizQuestion.textContent = "GAME OVER";
        gameMode = 1;
        startButton.textContent = "Score: " + (time); //score CALCULATION
        startButton.setAttribute("style", "display: ");
        restartButton.setAttribute("style", "displau: ");
        myStopFunction();
        
    } else {
        time--;
        quizTime.textContent = time;
    }
}

function myStopFunction() {
        clearInterval(myVar);
}


// EVENT LISTENERS --------------------------------------
quizMenu.addEventListener("click", function(event) {
    //event listener for click choices
    var element = event.target;
    //assigns clicked element to var element

    if (element.matches("button") === true) {
        checkAnswer(element);
        //pass element into checkAnswer function
        console.log("step is", step);
        console.log(quizItems.length)
        if(gameMode === 0) {
            renderChoices();
        }
        
    }
    
});

startButton.addEventListener("click", function(event) {
    startTimer();
    startButton.setAttribute("style", "display: none");
})

restartButton.addEventListener("click", function(event) {
    if(gameMode === 1) {
        location.reload();
    }
})

highscoreSubmit.addEventListener("click", function(event) {
    if(gameMode === 1) {
        console.log(highscoreInput.value);
        console.log(time);
        //logs highscore details in console
        if(highscoreInput.value) {
            user.push(highscoreInput.value.trim());
            scores.push(time);
        }
        
        highscoreInput.value = "";

        storeHighscores();
        renderHighscores();
    }
})

highScoreView.addEventListener("click", function(event) {
    console.log(user.length)
    if (user.length > 0) {
        highscoreList.setAttribute("style", "display: ")
    } else {
        alert("Highscore list empty")
    }
    
})



init();



