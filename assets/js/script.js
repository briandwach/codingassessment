// Defining element selectors
var leftNavEl = $('#highscorenav');
var rightNavEl = $('#time');
var countEl = $('#count');
var boldTextEl = $('#boldtext');
var subTextEl = $('#subtext');
var buttonsEl = $('#buttons');
var feedbackEl = $('#feedback');

// Defining global quiz variables 
var timer = 120; 

var questions = [
    /* 1 */ "Inside the HTML document, where do you place your JavaScript code?",
    /* 2 */ "What operator is used to assign a value to a declared variable?",
    /* 3 */ "What are the six primitive data types in JavaScript?",
    /* 4 */ "How do we declare a conditional statement in JavaScript?",
    /* 5 */ "From the given array which index is the letter 'b' on? ['a', 'b', 'c', 'd']",
    /* 6 */ "What are the two types of scopes JavaScript uses?",
    /* 7 */ "In an HTML document, where should the JavaScript reference link be included?",
    /* 8 */ "What is an object method?",
    /* 9 */ "How do we stop a loop from from repeating indefinitely?",
    /* 10 */ "How do we access a value stored in an object?"
];

var answers = {
    one: ["Inside the <head> element", "Inside the <script> element", "In the <footer> element", "Inside the <link> element"],
    two: ["Question mark (?)", "Colon (:)", "Double-equal (==)", "Equal sign (=)"],
    three: ["sentence, float, data, bigInt, symbol, undefined", "sentence, int, truthy, bigInt, symbol, undefined", "string, number, boolean, bigInt, symbol, undefined", "string, num, falsy, bigInt, symbol, undefined"],
    four: ["difference...between", "while loop", "if...else", "for loop"],
    five: ["0", "1", "2", "3"],
    six: ["Abroad and local", "Outside and Inside", "Surrounding and Inner", "Global and Local"],
    seven: ["Below the <body></body> element", "After the </html> element", "At the top of the HTML document", "At the end of the <body> element"],
    eight: ["A function associated with an object", "An array saved inside of an object", "Keys in an object that have a number assigned to it", "A function that takes and object for an argument"],
    nine: ["When we have iterated through half of the condition.", "A loop will stop executing when the condition is false.", "We have to explicitly end the loop with the break keyword.", "A loop will stop executing when the condition is true."],
    ten: ["Do notation, Bracket notation", "Period notation, Square bracket notation", "Dot notation, Curl bracket notation", "Equal notation, Abstract notation"],
};


function quizBegin() {
    console.log("test");
};

function startScreen() {
    leftNavEl.text("View Highscores");
    rightNavEl.text("Time: " + timer.toString());

    boldTextEl.text("Coding Quiz Challenge");
    boldTextEl.css("font-size", "2.5rem").css("text-align", "center");

    subTextEl.text("Try to answer the following code-related questions within the time limit.  Keep in mind that incorrect answers will penalize your score/time by ten seconds!");
    subTextEl.css("text-align", "center");

    var startQuizEl = $("<p>");
    startQuizEl.text("Start Quiz").css("text-align", "center");
    buttonsEl.append(startQuizEl).css("justify-content", "center");

    
    startQuizEl.on('click', quizBegin);
};


startScreen();