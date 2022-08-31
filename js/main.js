// Select HTML Elements
let quizzApp = document.querySelector('.quizz-app');
let successPopup = document.querySelector('.success');
let failPopup = document.querySelector('.fail');
let currentQ = Array.from(document.querySelectorAll('.current-question'));
let allQs = Array.from(document.querySelectorAll('.all-questions'));
let qText = document.querySelector('.question-text');
let answersBox = document.querySelector('.answers');
let nextQBtn = document.querySelector('.next');
let timerBox = document.querySelector('.time-taken');
let playerRightAnswersSpan = Array.from(document.querySelectorAll('.r-answers'));
let playerGrade = Array.from(document.querySelectorAll('.grade'));

let qsObj = [
    {
        "question": "Inside which HTML element do we put the JavaScript?",
        "answers": ["<scripting>", "<script>", "<javascript>", "<js>"],
        "rightAnswer": "<script>"
    },
    
    {
        "question": "What is the correct JavaScript syntax to change the content of tis HTML element : <p id='demo'>This is a demonstration.</p> ",
        "answers": ["document.getElementById('demo').innerHTML = 'Hello World!';", " document.getElement('p').innerHTML = 'Hello World!';", " document.getElementByName('p').innerHTML = 'Hello World!';", " #demo.innerHTML = 'Hello World!';"],
        "rightAnswer": "document.getElementById('demo').innerHTML = 'Hello World!';"
    },
    {
        "question": "Where is the correct place to insert a JavaScript?",
        "answers": [" The <body> section", " The <head> section", " Both the <head> section and the <body> section are correct"],
        "rightAnswer": "Both the <head> section and the <body> section are correct"
    },
    {
        "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
        "answers": ["<script src='xxx.js'>", "<script name='xxx.js'>", "<script href='xxx.js'>"],
        "rightAnswer": "<script src='xxx.js'>"
    },
    {
        "question": "The external JavaScript file must contain the <script> tag?",
        "answers": ["True", "False"],
        "rightAnswer": "False"
    },
    {
        "question": "How do you write 'Hello World' in an alert box?",
        "answers": ["mesg('Hello World')", "alertBox('Hello World')", "msgBox('Hello World')", "alert('Hello World')"],
        "rightAnswer": "alert('Hello World')"
    },
    {
        "question": "How do you create a function in JavaScript?",
        "answers": ["function : myFunction()", "function myFunction()", "function = myFunction()"],
        "rightAnswer": "function myFunction()"
    },
    {
        "question": "How do you call a function named 'myFunction'?",
        "answers": ["call myFunction()", "call function myFunction()", "myFunction()"],
        "rightAnswer": "myFunction()"
    },
    {
        "question": "How to write an IF statement in JavaScript?",
        "answers": ["if i == 5 then", "if i = 5 then", "if i = 5", "if (i == 5)"],
        "rightAnswer": "if (i == 5)"
    },
    {
        "question": "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        "answers": ["if (i < > 5)", "if (i != 5)", "if i < > 5", "if (i =! 5)"],
        "rightAnswer": "if (i != 5)"
    },
    {
        "question": "How does a WHILE loop start?",
        "answers": ["while (i <= 10; i++)", "while i = 1 to 10", "while (i <= 10)"],
        "rightAnswer": "while (i <= 10)"
    },
    {
        "question": "How does a FOR loop start?",
        "answers": [" for (i = 0; i <= 5)", " for i = 1 to 5", "for (i = 0; i <= 5; i++)", " for (i <= 5; i++)"],
        "rightAnswer": "for (i = 0; i <= 5; i++)"
    },
    {
        "question": "How can you add a comment in a JavaScript?",
        "answers": ["<!-- This Is A Comment -->", "#This Is A Comment", "// This Is A Comment"],
        "rightAnswer": "// This Is A Comment"
    },
    {
        "question": "How to insert a comment that has more than one line?",
        "answers": ["/* This Comment Has More Than One One Line */", "// This Comment Has More Than One One Line //", "<!--This Comment Has More Than One One Line -->"],
        "rightAnswer": "/* This Comment Has More Than One One Line */"
    },
    {
        "question": "How do you declare a JavaScript variable?",
        "answers": ["let varName", "variable varName", "l varName"],
        "rightAnswer": "let varName"
    },
    {
        "question": "What is the correct way to write a JavaScript array?",
        "answers": ["let colors = 'Red', 'Green', 'Blue'", "let colors = (1:'Red', 2:'Green', 3:'Blue')", "let colors = 1 = ('Red'),2 = ('Green'),3 = ('Blue')", "let colors = ['Red', 'Green', 'Blue']"],
        "rightAnswer": "let colors = ['Red', 'Green', 'Blue']"
    },
    {
        "question": "How do you round the number 7.25, to the nearest integer?",
        "answers": ["Math.round(7.25)", "rnd(7.25)", "round(7.25)", "Math.rnd(7.25)"],
        "rightAnswer": "Math.round(7.25)"
    },
    {
        "question": "How do you find the number with the highest value of x and y?",
        "answers": ["Math.max(x, y)", "top(x, y)", "ceil(x, y)", "Math.ceil(x, y)"],
        "rightAnswer": "Math.max(x, y)"
    },
    {
        "question": "What is the correct JavaScript syntax for opening a new window called 'nw' ?",
        "answers": ["nw = window.open('https://www.google.com')", "nw = window.new('https://www.google.com')", "nw = window.newWindow('https://www.google.com')"],
        "rightAnswer": "nw = window.open('https://www.google.com')"
    },
    {
        "question": "JavaScript is the same as Java.",
        "answers": ["True", "False"],
        "rightAnswer": "False"
    },
    {
        "question": "Which event occurs when the user clicks on an HTML element?",
        "answers": ["onclick", "onhover", "onmouseclick", "onmouseover"],
        "rightAnswer": "onclick"
    }

]

let index = 0;
let playerRightAnswers = 0;

// Get Question Answers Function 
function getQAns(ansArr) {
    answersBox.innerText = '';

    let answersBoxArr = [];

    ansArr.forEach((ans, i) => {
        // Create The Answer Box
        let ansBox = document.createElement('div');

        // Add A Class To The ansBox
        ansBox.className = 'answer';

        // Create Answer Components
        let ansInp = document.createElement('input');
        let ansLab = document.createElement('label');

        // Add Text To The Answer Label
        ansLab.innerText = ans;

        // Add Atributes To The Answer Components
        if (i === 0) {
            ansInp.setAttribute('checked', 'true');
        }

        ansInp.name = 'r1';
        ansInp.type = 'radio';
        ansInp.id = `ans-${i + 1}`;
        ansLab.setAttribute('for', `ans-${i + 1}`);

        // Add The Answer Components To The Answer Box
        ansBox.append(ansInp, ansLab);
        
        // Add The Answer Div The The AnswersBox
        answersBox.appendChild(ansBox);
    });
}

function showResults() {
            
    quizzApp.classList.add('hidden');
        
    if (playerRightAnswers >= 10) {
        
        successPopup.classList.remove('hidden');

        playerRightAnswersSpan[0].innerHTML = playerRightAnswers;
        
        playerGrade[0].innerHTML = `Very Good`;
        
    } else {

        failPopup.classList.remove('hidden');
        
        playerRightAnswersSpan[1].innerHTML = playerRightAnswers;
        
        playerGrade[1].innerHTML = `Soo Baad`;
    }
}

// Shuffling The Array Of The Answers
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Get Question Data Function 
function getQData(obj, len) {
    
    if (index <= len - 1) {
        currentQ.forEach(pos => {
            pos.innerHTML = index + 1;
        });
    
        qText.innerText = obj.question;
        
        shuffle(obj.answers)

        getQAns(obj.answers);
    } else {

        showResults();
        nextQBtn.style.cssText = `pointer-events: none; opacity: 0.4;`;
    }
}

// Check The Answer Function 
function checkAns(rightAns) {
    
    let qAnswers = Array.from(document.querySelectorAll(`.answer`));

    qAnswers.forEach(ans => {
        if (ans.firstElementChild.checked) {
            if (ans.lastElementChild.innerText === rightAns) {
                playerRightAnswers++;
            }
        }
    })

}

// Make An AJAX Request 
function getAllQs() {

    let qsNumber = qsObj.length;

    // Shuffling The Questions Object
    qsObj.sort( () => Math.random() - 0.5);

    allQs.forEach(pos => {
        pos.innerHTML = qsNumber;
    })

    if (index === 0) {
        getQData(qsObj[index], qsNumber);
    }

    nextQBtn.addEventListener('click', () => {
        checkAns(qsObj[index].rightAnswer, qsNumber);

        index++;

        getQData(qsObj[index], qsNumber);

    });

}

getAllQs();

