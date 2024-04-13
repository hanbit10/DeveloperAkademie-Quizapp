let questions = [];

var xhr = new XMLHttpRequest();
xhr.open("GET", "/quizapp/assets/data/quiz.json", true);
xhr.responseType = "json";
xhr.onload = function () {
  if (xhr.status === 200) {
    var data = xhr.response;
    questions = data;
  }
};
xhr.send();

let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_SUCCESS = new Audio("/quizapp/assets/sounds/powerup.wav");
let AUDIO_FAIL = new Audio("/quizapp/assets/sounds/failure.wav");

function render() {
  document.getElementById(`all-questions`).innerHTML = questions.length;
  showQuestions();
}

function getId(element) {
  return document.getElementById(element);
}

function showQuestions() {
  if (gameIsOver()) {
    //This Shows End Screen
    showEndScreen();
  } else {
    //This Shows Next Screen
    updateProgressBar();
    showNextScreen();
  }
}

function answer(selection) {
  let question = questions[currentQuestion];
  let selectedAnswer = Object.keys(question).indexOf(`${selection}`);
  let idOfrightAnswer = `answer_${question["right_answer"]}`;

  if (rightAnswerSelected(selectedAnswer, question)) {
    getId(selection).parentNode.classList.add("bg-success");
    AUDIO_SUCCESS.play();
    rightQuestions++;
  } else {
    getId(selection).parentNode.classList.add("bg-danger");
    getId(idOfrightAnswer).parentNode.classList.add("bg-success");
    AUDIO_FAIL.play();
  }
  getId(`nextButton`).disabled = false;
}

function nextQuestion() {
  currentQuestion++;
  getId(`nextButton`).disabled = true;
  restAnswerButtons();
  showQuestions();
}

function rightAnswerSelected(selectedAnswer, question) {
  return selectedAnswer == question["right_answer"];
}

function restAnswerButtons() {
  for (let i = 1; i <= 4; i++) {
    getId(`answer_${i}`).parentNode.classList.remove("bg-danger");
    getId(`answer_${i}`).parentNode.classList.remove("bg-success");
  }
}

//resets the index of the questions and restart the game
function restartQuestions() {
  getId("headerImg").src = "/quizapp/assets/img/quiz-bg.jpg";
  currentQuestion = 0;
  rightQuestions = 0;
  getId("endScreen").classList.add("d-none");
  getId("questionBody").classList.remove("d-none");
  render();
}

function showEndScreen() {
  getId("endScreen").classList.remove("d-none");
  getId("questionBody").classList.add("d-none");
  getId("amountOfQuestions").innerHTML = questions.length;
  getId("amountOfRightQuestions").innerHTML = rightQuestions;
  getId("headerImg").src = "/quizapp/assets/img/trophy.png";
  getId("progressBar").parentNode.classList.add("d-none");
}

function showNextScreen() {
  let question = questions[currentQuestion];
  getId("questionNumber").innerHTML = currentQuestion + 1;
  getId("questionText").innerHTML = question["question"];
  getId("answer_1").innerHTML = question["answer_1"];
  getId("answer_2").innerHTML = question["answer_2"];
  getId("answer_3").innerHTML = question["answer_3"];
  getId("answer_4").innerHTML = question["answer_4"];
}

function updateProgressBar() {
  let percent = ((currentQuestion + 1) / questions.length) * 100;
  getId("progressBar").innerHTML = /*html*/ `<div>${percent}%</div>`;
  getId("progressBar").style.width = `${percent}%`;
}

function gameIsOver() {
  return currentQuestion >= questions.length;
}
