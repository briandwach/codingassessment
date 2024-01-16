// Defining element selectors
var leftNavEl = $('#highscorenav');
var rightNavEl = $('#time');
var countEl = $('#count');
var quizAreaEl = $('#quizarea');
var boldTextEl = $('#boldtext');
var subTextEl = $('#subtext');
var buttonsEl = $('#buttons');
var feedbackEl = $('#feedback');
var formEl = $('#initials-form');
var inputEl = $('#initials');

// Defining global quiz variables 
//-------------------------------------------------------------------------------

// For furtuer changes to timer, change the value here and in function startTimer()
var timer = 3;
var timerInterval;

// Stores what questions have already been presented in an array.
var questionsPicked = [];
var optionsPicked = [];
var currentQuestion = NaN;
var currentAnswers = [];

// Questions are stored in an array so they can be rendered with iteration.
var questions = [
    /* 0 */ "Inside the HTML document, where do you place your JavaScript code?",
    /* 1 */ "What operator is used to assign a value to a declared variable?",
    /* 2 */ "What are the six primitive data types in JavaScript?",
    /* 3 */ "How do we declare a conditional statement in JavaScript?",
    /* 4 */ "From the given array which index is the letter 'b' on? ['a', 'b', 'c', 'd']",
    /* 5 */ "What are the two types of scopes JavaScript uses?",
    /* 6 */ "In an HTML document, where should the JavaScript reference link be included?",
    /* 7 */ "What is an object method?",
    /* 8 */ "How do we stop a loop from from repeating indefinitely?",
    /* 9 */ "How do we access a value stored in an object?"
];

// Answers for each question are stored as an array inside an object.  The 4th index of each array is the answer (following zero indexing).
var answers = {
    0: ["Inside the <head> element", "Inside the <script> element", "In the <footer> element", "Inside the <link> element", 1],
    1: ["Question mark (?)", "Colon (:)", "Double-equal (==)", "Equal sign (=)", 3],
    2: ["sentence, float, data, bigInt, symbol, undefined", "sentence, int, truthy, bigInt, symbol, undefined", "string, number, boolean, bigInt, symbol, undefined", "string, num, falsy, bigInt, symbol, undefined", 2],
    3: ["difference...between", "while loop", "if...else", "for loop", 2],
    4: ["0", "1", "2", "3", 1],
    5: ["Abroad and local", "Outside and Inside", "Surrounding and Inner", "Global and Local", 3],
    6: ["Below the <body></body> element", "After the </html> element", "At the top of the HTML document", "At the end of the <body> element", 3],
    7: ["A function associated with an object", "An array saved inside of an object", "Keys in an object that have a number assigned to it", "A function that takes an object for an argument", 0],
    8: ["When we have iterated through half of the condition.", "A loop will stop executing when the condition is false.", "We have to explicitly end the loop with the break keyword.", "A loop will stop executing when the condition is true.", 1],
    9: ["Dot notation, Bracket notation", "Period notation, Square bracket notation", "Dot notation, Curl bracket notation", "Equal notation, Abstract notation", 0],
};



// Home/start screen of the web application.
function startScreen() {
    quizAreaEl.css("width", "65%");

    leftNavEl.text("View Highscores");
    rightNavEl.text("Time: " + timer.toString());

    boldTextEl.text("Coding Quiz Challenge");
    boldTextEl.css("font-size", "2.5rem").css("text-align", "center");

    subTextEl.text("Try to answer the following code-related questions within the time limit.  Keep in mind that incorrect answers will penalize your score/time by ten seconds!");
    subTextEl.css("text-align", "center");

    var startQuizEl = $("<p>");
    startQuizEl.text("Start Quiz").css("text-align", "center");
    buttonsEl.append(startQuizEl).css("justify-content", "center");

    formEl.css("display", "none");

    startQuizEl.on('click', quizBegin);
};


// Triggered when the quiz starts.  Contains logic for the questions and answers.
function quizBegin() {
    // quizAreaEl.css("width", "fit-content");
    startTimer();

    // Changes page styling for the quiz.
    leftNavEl.text("Return to Start");
    subTextEl.css("display", "none");
    boldTextEl.css("font-size", "1.5rem").css("text-align", "left");
    buttonsEl.css("display", "block");

    questionsPicked = [];

    renderQuestion();
};



// Triggered when the quiz starts and contains logic for the timer.
function startTimer() {
    timer = 3;

    timerInterval = setInterval(function () {
        timer--;
        rightNavEl.text("Time: " + timer.toString());

        if (timer <= 0) {
            clearInterval(timerInterval);
            allDone();
        };
    }, 1000)
};


// Randomly chooses a question with no duplicates
function randomQuestion() {
    currentQuestion = (Math.floor(Math.random() * questions.length));

    if (!questionsPicked.includes(currentQuestion)) {
        questionsPicked.push(currentQuestion);
    } else {
        randomQuestion();
    };
    return currentQuestion;
};

// Randomly chooses an answer option with no duplicates
function randomOption() {
    currentOption = (Math.floor(Math.random() * (answers[currentQuestion].length - 1)));

    if (!optionsPicked.includes(currentOption)) {
        optionsPicked.push(currentOption);
    } else {
        randomOption();
    };
    return currentOption;
};

function renderQuestion() {
    // Removes child elements from buttonsEl element selector
    buttonsEl.empty();

    if (timer <= 0) {
        timer = 0;
        rightNavEl.text("Time: " + timer.toString());
        allDone();
        return;
    };

    if (questionsPicked.length == questions.length) {
        allDone();
        return;
    };

    optionsPicked = [];
    currentQuestion = randomQuestion();
    // Used for debugging
    console.log("----------------------------------------------------");
    console.log("CURRENT QUESTION: " + currentQuestion);
    console.log(questions[currentQuestion]);
    // ---
    boldTextEl.text(questions[currentQuestion]);

    for (var i = 0; i < (answers[currentQuestion].length - 1); i++) {
        var renderAnswer = $("<p>");
        var list = (i + 1)
        currentAnswers = answers[currentQuestion];
        currentOption = randomOption();
        renderAnswer.text(list + ".  " + currentAnswers[currentOption]).css("text-align", "left").css("font-size", "1rem");
        buttonsEl.append(renderAnswer).css("justify-content", "left");
        console.log(list + ". " + currentAnswers[currentOption]);
    };

    buttonsEl.children().on("click", checkAnswer);
    buttonsEl.children().on("click", renderQuestion);
};

function checkAnswer(event) {
    feedbackEl.empty();
    
    var line = $("<hr>");
    feedbackEl.append(line);
    
    // For debugging
    var answeredString = event.target.innerText.substring(event.target.innerText.indexOf(" ") + 1).trim();
    var storedCorrectValue = currentAnswers[currentAnswers[currentAnswers.length - 1]];
    console.log("ANSWERED STRING: " + event.target.innerText.substring(event.target.innerText.indexOf(" ") + 1));
    console.log("CORRECT STRING INDEX NUM: " + currentAnswers[currentAnswers.length - 1]);
    console.log("STORED CORRECT VALUE: " + (currentAnswers[currentAnswers[currentAnswers.length - 1]]))
    // ----


    if ((event.target.innerText.substring(event.target.innerText.indexOf(" ") + 1).trim()) === (currentAnswers[currentAnswers[currentAnswers.length -1]])) {
        var correctEl = $("<p>");
        correctEl.text("Correct!");
        feedbackEl.append(correctEl);
    } else {
        var wrongEl = $("<p>");
        wrongEl.text("Wrong!");
        feedbackEl.append(wrongEl);
        timer -= 10;
        rightNavEl.css("color", "red");
        rightNavEl.text("Time: " + timer.toString());
    };

setTimeout(clearFeedback, 2500);
};

function clearFeedback() {
    feedbackEl.empty();
    rightNavEl.css("color", "var(--lightpurple");
};


// Triggered when the quiz ends. 
function allDone() {
    buttonsEl.empty();

    clearInterval(timerInterval);
    buttonsEl.children().off("click");
    
    console.log("ALL DONE");

    boldTextEl.text("All done!");
    subTextEl.text("Your final score is " + timer +".").css("display", "block").css("text-align", "left");

    formEl.css("display", "flex");

    //formEl.on("submit", addScore);
    formEl.on("submit", viewHighScores);
};

/*
function addScore(event) {
    event.preventDefault(); 
    
    var highScores = JSON.parse(localStorage.getItem("highscores"));
    
    if (highScores!== null) {
        var name = input.val(); 
        var score = timer;
        highScores.
    } else {
        var tempScore = {
            Initials: inputEl.val(), 
            Score: timer
        };
        localStorage.setItem("highscores", JSON.stringify(tempScore));
    };  

    $('input[type="text"]').val('');        
};
*/

// Triggered when initials and new highscore are submitted.
function viewHighScores(event) {
    event.preventDefault();
    boldTextEl.text("Highscores");
    // subTextEl.css("display", "none");
    formEl.css("display", "none");

    var checkScores = JSON.parse(localStorage.getItem("highscores"));
    if (checkScores !== null) {
        subTextEl.text("Here are the scores");
    } else {
        subTextEl.text("No scores are currently saved");
    };        
};

// This function is called when the page loads.
startScreen();