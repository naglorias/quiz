//Creating quiz variables
const questionInput = document.getElementById("question-input");

const answerBtn1 = document.getElementById("ans1"); // answerBtn button
const answerBtn2 = document.getElementById("ans2"); // answerBtn button
const answerBtn3 = document.getElementById("ans3"); // answerBtn button

const answerInp1 = document.getElementById("inp1"); // answerInp button
const answerInp2 = document.getElementById("inp2"); // answerInp button
const answerInp3 = document.getElementById("inp3"); // answerInp button

const ansInputs = document.querySelectorAll(".answer-input"); // All answer inputs
const ansBtns = document.querySelectorAll(".answer-btn"); //All answer btns

const addBtn = document.querySelector(".add-btn"); //add new question btn
const startBtn = document.querySelector(".start-btn"); // start quiz btn
const deleteBtn = document.querySelector(".delete-btn"); // delete quiz button

//Created quiz variables
const answers = document.querySelector(".answers");

//Other variables
let correct = [];
let quesCounter = 1;
let ansCounter = 0;
let notifications = [
  {
    failMessage: "Please Complete Quiz form!",
  },
  {
    failAnswerMessage: "Please Choose one answer!",
  },
  {
    successQuestionMessage: "New Question added",
  },
  {
    successQuizMessage: "Quiz Created",
  },
  {
    successDeleteMessage: "Quiz Deleted",
  },
];
let closeBtn = document.querySelector(".close");

/* Creating quiz functions*/

//Change buttons background function
const changeBtnsBackground = (button) => {
  event.preventDefault();
  document.querySelectorAll(".answer-btn").forEach((btn) => {
    btn.style.background = "#333";
    btn.style.color = "#ccc";
  });
  document.getElementById(button).style.background = "green";
};

//Form validation to check if form is completed or not function
const formValidation = () => {
  if (
    (answerBtn1.style.background === "green" ||
      answerBtn2.style.background === "green" ||
      answerBtn3.style.background === "green") &&
    questionInput.value !== "" &&
    answerInp1.value !== "" &&
    answerInp2.value !== "" &&
    answerInp3.value !== ""
  )
    return true;
  else return false;
};

//Add new question with its answers function
const addNewQuestion = () => {
  if (formValidation()) {
    let answerDiv = document.createElement("div");
    answerDiv.className = "answer";
    answerDiv.innerHTML = `
  <p>Question ${quesCounter} : ${questionInput.value}</p>
  <div>
  <span><input type="radio" name="answers${ansCounter}" id="a${ansCounter}" value="${answerInp1.value}" />${answerInp1.value}</span>
  <span><input type="radio" name="answers${ansCounter}" id="b${ansCounter}" value="${answerInp2.value}" />${answerInp2.value}</span>
  <span><input type="radio" name="answers${ansCounter}" id="c${ansCounter}" value="${answerInp3.value}" />${answerInp3.value}</span>
  </div>
</div>`;
    answers.appendChild(answerDiv);
    if (answerBtn1.style.background === "green") correct.push(answerInp1.value);
    if (answerBtn2.style.background === "green") correct.push(answerInp2.value);
    if (answerBtn3.style.background === "green") correct.push(answerInp3.value);
    questionInput.value = "";
    ansInputs.forEach((ansInput) => {
      ansInput.value = "";
    });
    ansBtns.forEach((ansBtn) => {
      ansBtn.style.background = "#0f0e0e";
    });

    quesCounter++;
    ansCounter++;
    successQuestionMessage();
  } else {
    failMessage();
  }
};

//Start quiz function
const startQuiz = () => {
  if (formValidation()) {
    let answerDiv = document.createElement("div");
    answerDiv.className = "answer";
    answerDiv.innerHTML = `
  <p>Question ${quesCounter} : ${questionInput.value}</p>
  <div>
  <span><input type="radio" name="answers${ansCounter}" id="a${ansCounter}" value="${answerInp1.value}" />${answerInp1.value}</span>
  <span><input type="radio" name="answers${ansCounter}" id="b${ansCounter}" value="${answerInp2.value}" />${answerInp2.value}</span>
  <span><input type="radio" name="answers${ansCounter}" id="c${ansCounter}" value="${answerInp3.value}" />${answerInp3.value}</span>
  </div>
  <button class="submit">Submit</button>
`;
    answers.appendChild(answerDiv);
    if (answerBtn1.style.background === "green") correct.push(answerInp1.value);
    if (answerBtn2.style.background === "green") correct.push(answerInp2.value);
    if (answerBtn3.style.background === "green") correct.push(answerInp3.value);
    questionInput.value = "";
    ansInputs.forEach((ansInput) => {
      ansInput.value = "";
    });
    ansBtns.forEach((ansBtn) => {
      ansBtn.style.background = "#0f0e0e";
    });
    addBtn.disabled = true;
    startBtn.disabled = true;
    quesCounter++;
    ansCounter++;
    document.querySelector(".submit").addEventListener("click", function () {
      if (document.querySelector('input[type="radio"]').checked == false) {
        failAnswerMessage();
      } else {
        submitQuiz();
      }
    });
    successQuizMessage();
  } else {
    failMessage();
  }
};

//Delete quiz function
const deleteQuiz = () => {
  if (answers.innerHTML !== "") {
    if (ansCounter !== 0) {
      correct = [];
      quesCounter = 1;
      ansCounter = 0;
    }
    answers.innerHTML = "";
    addBtn.disabled = false;
    startBtn.disabled = false;
    successDeleteMessage();
  }
};

//Submit quiz function
const submitQuiz = () => {
  let resultsDiv = document.createElement("div");
  resultsDiv.className = "results";
  resultsDiv.innerHTML = `
  <h2>Results</h2>
  <hr />
 <p></p>
  <br>
  <button class="retake">Retake quiz</button>`;
  answers.appendChild(resultsDiv);
  for (let i = 0; i < ansCounter; i++) {
    if (
      (document.getElementById(`a${i}`).checked === true &&
        document.getElementById(`a${i}`).value === correct[i]) ||
      (document.getElementById(`b${i}`).checked === true &&
        document.getElementById(`b${i}`).value === correct[i]) ||
      (document.getElementById(`c${i}`).checked === true &&
        document.getElementById(`c${i}`).value === correct[i])
    ) {
      let para = document.createElement("p");
      let counter = i + 1;
      para.innerHTML = `Question ${counter}: <h3 style="color:green">Right Answer</h3>`;
      resultsDiv.appendChild(para);
    } else {
      let para = document.createElement("p");
      let counter = i + 1;
      para.innerHTML = `Question ${counter}: <h3 style="color:red">Wrong Answer</h3>,Right answer: ${correct[i]}`;
      resultsDiv.appendChild(para);
    }
  }
  answers.appendChild(resultsDiv);
  document.querySelector(".submit").disabled = true;
  document.querySelector(".retake").addEventListener("click", function () {
    retakeQuiz();
  });
};
//Retake Quiz function
const retakeQuiz = () => {
  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.checked = false;
    document.querySelector(".submit").disabled = false;
    document.getElementsByClassName("results")[0].remove();
  });
};
//Display notifications functions
const failMessage = () => {
  const message = document.querySelector(".fail-message");
  message.style.display = "block";
  message.classList.add("fail");
  setTimeout(function () {
    message.style.display = "none";
  }, 2000);
};

const failAnswerMessage = () => {
  const message = document.querySelector(".fail-answers");
  message.style.display = "block";
  message.classList.add("fail");
  setTimeout(function () {
    message.style.display = "none";
  }, 2000);
};

const successQuestionMessage = () => {
  const message = document.querySelector(".question-message");
  message.style.display = "block";
  message.classList.add("success");
  setTimeout(function () {
    message.style.display = "none";
  }, 2000);
};

const successQuizMessage = () => {
  const message = document.querySelector(".quiz-message");
  message.style.display = "block";
  message.classList.add("success");
  setTimeout(function () {
    message.style.display = "none";
  }, 2000);
};

const successDeleteMessage = () => {
  const message = document.querySelector(".delete-message");
  message.style.display = "block";
  message.classList.add("success");
  setTimeout(function () {
    message.style.display = "none";
  }, 2000);
};
/* Event Listeners for Both sides
creating quiz(left side) and created quiz(right side) */

addBtn.addEventListener("click", function () {
  addNewQuestion();
});
startBtn.addEventListener("click", function () {
  startQuiz();
});

deleteBtn.addEventListener("click", function () {
  deleteQuiz();
});
