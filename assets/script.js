var quizQuestion = document.querySelector(".quizQuestion");
//access the main question element to change it as the game progresses

var quizChoiceList = document.querySelector(".quizChoices");
var quizItems = quizChoiceList.getElementsByTagName("button");
//quizChoices is the UL, then select off that using quizItems to iterate through list items

var quizMenu = document.querySelector(".quizMenu"); 

var startButton = document.querySelector("#startButton");
var restartButton = document.querySelector("#restartButton");
//targets the startbutton

var quizTime = document.querySelector(".timer");
//targets the timer element

var step = 0;
//tracker variable to know which question i am on

var time = 10;
//setting time at 60

var misses = 0;
//tracks player mistakes

var gameMode = 0;

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
    question: "GAME OVER",
    choices: [""],
    images:[""],
    correct: 99999999999,
    
    }

]
//PRIMARY GAME FUNCTIONS (INITIALIZE GAME STATE, RENDER QUESTION/OPTIONS, CHECK ANSWER) --------------------------------------
function init () {
    quizQuestion.textContent = "Javascript Coding Quiz!";
    quizChoiceList.setAttribute("style", "display: none");
    restartButton.setAttribute("style", "display: none");
    
}

function renderChoices() {
    //display options
    quizChoiceList.setAttribute("style", "display: ");
    if (step == quizItems.length - 1) {
        console.log("GAMEOVER");
        quizChoiceList.setAttribute("style", "display: none");
        startButton.textContent = "Score: " + (time * 4 - (misses * 2)); //score CALCULATION
        startButton.setAttribute("style", "display: ");
        restartButton.setAttribute("style", "display: ");
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
                misses++;
            }
        }
        
    }
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
        startButton.textContent = "Score: " + (time * 4 - (misses * 2)); //score CALCULATION
        startButton.setAttribute("style", "display: ");
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
    }
    renderChoices();
});

startButton.addEventListener("click", function(event) {
    startTimer();
    startButton.setAttribute("style", "display: none");
    if(gameMode === 1) {
        //add functionality to when clicked to add score to highscores
    }
})

restartButton.addEventListener("click", function(event) {
    if(gameMode === 1) {
        location.reload();
    }
})

init();




