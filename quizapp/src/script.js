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

function render() {
  document.getElementById(`all-questions`).innerHTML = questions.length;
  showQuestions();
}

function showQuestions() {
  let question = questions[currentQuestion];
  document.getElementById("questionText").innerHTML = question["question"];
  document.getElementById("answer_1").innerHTML = question["answer_1"];
  document.getElementById("answer_2").innerHTML = question["answer_2"];
  document.getElementById("answer_3").innerHTML = question["answer_3"];
  document.getElementById("answer_4").innerHTML = question["answer_4"];
}
