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
var scoresEl = $('#scores');



// Defining global quiz variables 
//-------------------------------------------------------------------------------

// To change value of timer, change the value in the resetTimer() function
var timer = NaN;
var timerInterval;

// Stores what questions have already been presented in an array.
var questionsPicked = [];
var optionsPicked = [];
var currentQuestion = NaN;
var currentAnswers = [];
var feedbackNotice = undefined;

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

// Resets time when called.  To adjust amount of time for the quiz, adjust the variable here and ONLY here.
function resetTimer() {
    timer = 100;
};

// Home/start screen of the web application.
function startScreen() {
    clearInterval(timerInterval);
    resetTimer();

    quizAreaEl.css("width", "65%");

    buttonsEl.empty();
    scoresEl.css("display", "none");
    scoresEl.empty();

    feedbackEl.empty();
    rightNavEl.css("color", "var(--purple");

    leftNavEl.text("View Highscores");
    rightNavEl.text("Time: " + timer.toString());

    boldTextEl.text("Coding Quiz Challenge");
    boldTextEl.css("font-size", "2.5rem").css("text-align", "center");

    subTextEl.text("Try to answer the following code-related questions within the time limit.  Keep in mind that incorrect answers will penalize your score/time by ten seconds!");
    subTextEl.css("display", "flex").css("text-align", "center");

    var startQuizEl = $("<p>");
    startQuizEl.text("Start Quiz").css("text-align", "center");
    buttonsEl.append(startQuizEl).css("display", "flex").css("justify-content", "center");

    formEl.css("display", "none");

    $('input[type="text"]').val('');

    leftNavEl.off("click", startScreen);
    leftNavEl.off("click", viewHighScores);
    leftNavEl.on("click", viewHighScores);
    startQuizEl.on("click", quizBegin);
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

    leftNavEl.off("click", viewHighScores);
    leftNavEl.on("click", startScreen);
};



// Triggered when the quiz starts and contains logic for the timer.
function startTimer() {

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

// When called selects a random question and stores that data in an array to avoid duplicates
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
    //console.log("----------------------------------------------------");
    //console.log("CURRENT QUESTION: " + currentQuestion);
    //console.log(questions[currentQuestion]);
    // ---
    boldTextEl.text(questions[currentQuestion]);

    for (var i = 0; i < (answers[currentQuestion].length - 1); i++) {
        var renderAnswer = $("<p>");
        var list = (i + 1);
        currentAnswers = answers[currentQuestion];
        currentOption = randomOption();
        renderAnswer.text(list + ".  " + currentAnswers[currentOption]).css("text-align", "left").css("font-size", "1rem");
        buttonsEl.append(renderAnswer).css("justify-content", "left");
        // Used for debugging
        //console.log(list + ". " + currentAnswers[currentOption]);
        // ---
    };

    buttonsEl.children().on("click", checkAnswer);
    buttonsEl.children().on("click", renderQuestion);
};

// Checks if an answer is correct after a user selects an option
function checkAnswer(event) {
    clearTimeout(feedbackNotice);

    feedbackEl.empty();

    var line = $("<hr>");
    feedbackEl.append(line);

    // For debugging
    //var answeredString = event.target.innerText.substring(event.target.innerText.indexOf(" ") + 1).trim();
    //var storedCorrectValue = currentAnswers[currentAnswers[currentAnswers.length - 1]];
    //console.log("ANSWERED STRING: " + event.target.innerText.substring(event.target.innerText.indexOf(" ") + 1));
    //console.log("CORRECT STRING INDEX NUM: " + currentAnswers[currentAnswers.length - 1]);
    //console.log("STORED CORRECT VALUE: " + (currentAnswers[currentAnswers[currentAnswers.length - 1]]))
    // ----


    if ((event.target.innerText.substring(event.target.innerText.indexOf(" ") + 1).trim()) === (currentAnswers[currentAnswers[currentAnswers.length - 1]])) {
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

    feedbackNotice = setTimeout(clearFeedback, 2500);
};

// Clears "Correct" or "Wrong" feedback after an answer
function clearFeedback() {
    feedbackEl.empty();
    rightNavEl.css("color", "var(--purple");
};


// Triggered when the quiz ends. 
function allDone() {
    buttonsEl.empty();
    buttonsEl.children().off("click", checkAnswer);
    buttonsEl.children().off("click", renderQuestion);

    clearInterval(timerInterval);
    buttonsEl.children().off("click");

    // Used for debugging
    //console.log("ALL DONE -------------------------------------------");
    // ---

    boldTextEl.text("All done!");
    subTextEl.text("Your final score is " + timer + ".").css("display", "block").css("text-align", "left");

    formEl.css("display", "flex");

    formEl.on("submit", viewHighScores);
};

// Triggered when initials are submitted for saving score
function addScore() {

    var highScores = localStorage.getItem("highscores");


    if (highScores !== null) {
        // Used for debugging
        //console.log("PREVIOUS SCORE DATA");
        //console.log(highScores);
        // ---

        highScores = highScores.split(",");

        // Used for debugging
        //console.log("SPLIT SCORE DATA");
        //console.log(highScores);
        // ---

        var saveScore = [timer, inputEl.val()];


        highScores[highScores.length] = saveScore;

        localStorage.setItem("highscores", highScores.toString());

    } else {
        // Use for debugging
        //console.log("LOCAL STORAGE IS EMPTY");
        // ---

        var saveScore = [timer, inputEl.val()];

        // Use for debugging 
        //console.log(saveScore);
        //console.log(saveScore.toString());
        // ---

        localStorage.setItem("highscores", saveScore.toString());
    };

    $('input[type="text"]').val('');       
};


// Triggered when new scores are submitted or if "View Highscores" is clicked from the start screen
function viewHighScores(event) {
    event.preventDefault();
    formEl.off("submit", viewHighScores);
    leftNavEl.off("click", viewHighScores);


    if (inputEl.val() !== "") {
        addScore();
    };

    leftNavEl.text("Return to Start");

    boldTextEl.text("Highscores");
    boldTextEl.css("text-align", "left");

    formEl.css("display", "none");

    buttonsEl.empty();
    buttonsEl.css("display", "flex").css("flex-wrap", "wrap").css("justify-content", "left");

    var checkForScores = localStorage.getItem("highscores");

    if (checkForScores !== null) {
        subTextEl.css("display", "none");

        //Sorting and rendering of high scores
        checkForScores = checkForScores.split(",");

        // For debugging
        //console.log(checkForScores);
        //console.log(checkForScores.length);
        // ---

        var scoresToSort = [];
        var a = 0;

        for (var i = 0; i < (checkForScores.length / 2); i++) {
            scoresToSort[i] = [checkForScores[a], checkForScores[(a + 1)]];
            a += 2;
        };

        // Use for debugging
        //console.log(scoresToSort);
        // ---

        // Use for debugging
        //console.log("SORTED ARRAY:");
        // ---

        scoresToSort.sort((a, b) => b[0] - a[0]);

        // Use for debugging
        //console.log(scoresToSort);
        // ---

        for (var r = 0; r < scoresToSort.length; r++) {
            var scoreToPrint = scoresToSort[r];
            var list = (r + 1);
            var scoreEl = $("<p>");
            scoreEl.text(list + ". " + scoreToPrint[1].trim() + " - " + scoreToPrint[0]);
            scoresEl.append(scoreEl);
        };

        scoresEl.css("display", "block");

        var goBackEl = $("<p>");
        goBackEl.text("Go Back")
        buttonsEl.append(goBackEl);

        var clearScoresEl = $("<p>");
        clearScoresEl.text("Clear Highscores")
        buttonsEl.append(clearScoresEl);

        buttonsEl.children().css("font-size", "1.5rem").css("padding", " 0vw 1vw").css("margin-right", "1.5vw");

        goBackEl.on("click", startScreen);
        clearScoresEl.on("click", clearStorage);
    } else {
        subTextEl.text("There are no saved scores to display!");
        subTextEl.css("text-align", "left");

        var goBackEl = $("<p>");
        goBackEl.text("Go Back")
        buttonsEl.append(goBackEl);

        buttonsEl.children().css("font-size", "1.5rem").css("padding", "0vw 1vw").css("margin-right", "1.5vw");

        goBackEl.on("click", startScreen);
    };

    leftNavEl.on("click", startScreen);
};


// This function clears localstorage of highscores when called. 
function clearStorage() {
    scoresEl.css("display", "hide");
    scoresEl.empty();
    localStorage.removeItem("highscores");
    subTextEl.css("display", "block").css("text-align", "left");
    subTextEl.text("There are no saved scores to display!");
    buttonsEl.children().eq(1).remove();
};


// This function is called when the page loads.
startScreen();