var quizQuestion = document.querySelector(".quizQuestion");
//access the main question element to change it as the game progresses

var quizChoiceList = document.querySelector(".quizChoices");
var quizItems = quizChoiceList.getElementsByTagName("button");
//quizChoices is the UL, then select off that using quizItems to iterate through list items

var quizMenu = document.querySelector(".quizMenu");

var step = 0;
//tracker variable to know which question i am on

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
    choices: ["Rocky Mountain", "Forest", "Desert", "Pride Rock"],
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

function renderChoices() {
    //display options
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
    for (let i = 0; i < 4; i++) {
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

quizMenu.addEventListener("click", function(event) {
    //event listener for click choices
    var element = event.target;

    if (element.matches("button") === true) {
        checkAnswer(element);
        console.log("step is", step);
        console.log(quizItems.length)
    }
    renderChoices();
});

renderChoices();



