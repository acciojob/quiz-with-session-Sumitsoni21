//your JS code here.

// Store references
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Retrieve saved progress (if any)
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render the quiz
function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionContainer = document.createElement("div");
    const questionTitle = document.createElement("p");
    questionTitle.innerText = question.question;
    questionContainer.appendChild(questionTitle);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = choice;

      // Restore checked state
      if (userAnswers[i] === choice) {
        radio.checked = true;
      }

      // Save answer on change
      radio.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice));
      questionContainer.appendChild(label);
      questionContainer.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionContainer);
  }
}

// Submit quiz and calculate score
submitButton.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    const userAnswer = userAnswers[i];
    const correctAnswer = questions[i].answer;
    if (userAnswer && userAnswer === correctAnswer) {
      score++;
    }
  }

  // Save score in localStorage
  localStorage.setItem("score", score.toString());

  // Display score
  scoreElement.innerText = `Your score is ${score} out of 5.`;
});

// Show previous score if any
window.addEventListener("DOMContentLoaded", () => {
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreElement.innerText = `Your score is ${savedScore} out of 5.`;
  }
});

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();
