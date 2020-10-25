var quizQuestion = document.querySelector(".quizQuestion");
//access the main question element to change it as the game progresses

var quizChoiceList = document.querySelector(".quizChoices");
var quizItems = quizChoiceList.getElementsByTagName("button");
//quizChoices is the UL, then select off that using quizItems to iterate through list items

var quizMenu = document.querySelector(".quizMenu"); 

var startButton = document.querySelector("#startButton");

var quizTime = document.querySelector(".timer");
//targets the timer element

var step = 0;
//tracker variable to know which question i am on

var time = 31;
//setting time at 60

var options = [{
    question: "In Aladdin, what is the name of Jasmine's pet tiger?",
    choices: ["Rajah", "Bo", "Iago", "Jack"],
    correct: 0,
    },
    {
    question: "In Peter Pan, Captain Hook had a hook on which part of his body?",
    choices: ["Right Foot", "Left Hand", "Left Foot", "Right Hand"],
    images:["assets/images/captainhook.gif"],
    correct: 1,
    },
    {
    question: "In the Lion King, where does Mufasa and his family live?",
    choices: ["Tugetti Plains", "Mugato Jungle", "Courage Dunes", "Pride Rock"],
    images:["assets/images/desert.gif"],
    correct: 3,

    },
    {
    question: "GAME OVER",
    choices: [""],
    images:["assets/images/desert.gif"],
    correct: 99999999999,
    
    }

]

function init () {
    quizQuestion.textContent = "Javascript Coding Quiz!";
    quizChoiceList.setAttribute("style", "display: none");
}

function renderChoices() {
    //display options
    quizChoiceList.setAttribute("style", "display: ");
    if (step == quizItems.length - 1) {
        console.log("GAMEOVER");
        quizChoiceList.setAttribute("style", "display: none")
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
                quizMenu.setAttribute("style", "background-color: green;");
                step++;
            } else {
                console.log("wrong, try again");
                quizMenu.setAttribute("style", "background-color: red;");
            }
        }
        
    }
}
// TIMING FUNCTIONS 
function startTimer() {
    var myVar = setInterval(myTimer, 1000);
    renderChoices();
}

function myTimer() {
  time--;
  quizTime.textContent = time;

  if (time <= 0) {
    myStopFunction();
    }
}

function myStopFunction() {
        clearInterval(myVar);
}

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
    startButton.setAttribute("style", "display: none")
})

init();



