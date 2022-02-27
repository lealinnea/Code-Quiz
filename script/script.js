var timeleft = 20;
var numCorrect = 0;
var numIncorrect = 0;
var questionAnswered = false;


var Questions = [{
  id: 0,
  q: "What is character encloses a string?",
  a: [{ text: "Parentheses", isCorrect: false },
  { text: "Brackets", isCorrect: false },
  { text: "Quotes", isCorrect: true },
  { text: "None of the above", isCorrect: false }
  ]

},
{
  id: 1,
  q: "What does JS stand for?",
  a: [{ text: "Jump Start", isCorrect: false, isSelected: false },
  { text: "Junk Storage", isCorrect: false },
  { text: "Just Save", isCorrect: false },
  { text: "Java Script", isCorrect: true }
  ]

},
{
  id: 2,
  q: "What does CSS stand for",
  a: [{ text: "Call System Start", isCorrect: false },
  { text: "Computer System Settings", isCorrect: false },
  { text: "Cascading Style Sheet", isCorrect: true },
  { text: "None of the above", isCorrect: false }
  ]

}

]


var start = true;

function iterate(id) {

  var result = document.getElementsByClassName("result");
  result[0].innerText = "";

  const question = document.getElementById("question");

  question.innerText = Questions[id].q;

  const option1 = document.getElementById('option1');
  const option2 = document.getElementById('option2');
  const option3 = document.getElementById('option3');
  const option4 = document.getElementById('option4');

  option1.innerText = Questions[id].a[0].text;
  option2.innerText = Questions[id].a[1].text;
  option3.innerText = Questions[id].a[2].text;
  option4.innerText = Questions[id].a[3].text;

  option1.value = Questions[id].a[0].isCorrect;
  option2.value = Questions[id].a[1].isCorrect;
  option3.value = Questions[id].a[2].isCorrect;
  option4.value = Questions[id].a[3].isCorrect;

  var selected = "";


  option1.addEventListener("click", () => {
    selected = option1.value;
  })
  option2.addEventListener("click", () => {
    selected = option2.value;
  })
  option3.addEventListener("click", () => {
    selected = option3.value;
  })
  option4.addEventListener("click", () => {
    selected = option4.value;
  })


  const submit = document.getElementsByClassName("submit");

  submit[0].addEventListener("click", () => {
    if (selected == "true") {
      numCorrect++;
      questionAnswered = true;
      hideShow();
      nextQuestion();
    } 
    else {
      timeleft -= 5;
      numIncorrect++;
      questionAnswered = true;
      nextQuestion();
      hideShow();
    }
   
  })
}

if (start) {
  iterate("0");
}

function hideShow() {
  if (questionAnswered) {
    document.getElementById('submit-button').style.display = "none";
    document.getElementById('next-button').style.display = "inline";
  }
  else {
    document.getElementById('submit-button').style.display = "inline";
    document.getElementById('next-button').style.display = "none";
  }
}



// Next button and method
const next = document.getElementsByClassName('next')[0];
var id = 0;


function nextQuestion() {
  if (id < 2) {
    id++;
    iterate(id);
    console.log(id);
    questionAnswered = false;
    hideShow();
  }
}

//timer

document.getElementById("gameStart").addEventListener("click", function(){
var cdTimer = setInterval(function () {
  if (timeleft <= 0) {
    clearInterval(cdTimer); 
    document.getElementById("countdown").innerHTML = "OUT OF TIME";
    //score
    document.getElementById("score").innerHTML = "You got " + numCorrect + " CORRECT and " + numIncorrect + " INCORRECT!";
    document.getElementById("score").style.display = "none";
    console.log(numIncorrect);
    console.log(numCorrect);
  } 
  else {
    document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
  }
  timeleft -= 1;
}, 1000);

});

//submit name

var comment = document.getElementById("msg");
var saveButton = document.getElementById("save");
var savedName = document.getElementById("saved-name");

function saveName() {
  var personName = {
    comment: comment.value.trim()
  };
  localStorage.setItem("personName", JSON.stringify(personName));
}

function renderName() {
  var pName = JSON.parse(localStorage.getItem("personName"));
  if (pName !== null) {
    document.getElementById("saved-comment").innerHTML = pName.comment;
    document.getElementById("save").style.display = "inline";
    document.getElementById("score").style.display = "inline";
  } else {
    return;
  }
}

saveButton.addEventListener("click", function (event) {
  event.preventDefault();
  saveName();
  renderName();
});

function init() {
  renderName();
}
init();



