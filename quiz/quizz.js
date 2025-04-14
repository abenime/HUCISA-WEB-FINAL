let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;
let userAnswers = [];
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const icon = document.querySelector(".toggle-btn");
  icon.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

function loadTheme() {
  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    document.body.classList.add("dark");
    document.querySelector(".toggle-btn").textContent = "☀️";
  }
}
function startQuiz(subject) {
  if (!questions[subject]) {
    alert("Invalid subject selected.");
    return;
  }

  currentQuestions = questions[subject];
  currentIndex = 0;
  score = 0;
  userAnswers = [];

  document.getElementById("backBtn").style.display = "block";
  document.getElementById("subjectSelection").style.display = "none";
  document.querySelector(".question-box").style.display = "block";
  document.getElementById("result").innerText = "";
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 20;
  updateTimer();

  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      userAnswers.push({ ...currentQuestions[currentIndex], userAnswer: "Timed out" });
      nextQuestion();
    }
  }, 1000);

  const q = currentQuestions[currentIndex];
  document.getElementById("questionText").innerText = q.question;
  const optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(btn, option);
    optionsContainer.appendChild(btn);
  });
}

function updateTimer() {
  document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
}

function checkAnswer(button, selected) {
  clearInterval(timer);
  const q = currentQuestions[currentIndex];
  const buttons = document.querySelectorAll(".options button");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === q.answer) {
      btn.classList.add("correct");
    } else if (btn.innerText === selected) {
      btn.classList.add("incorrect");
    }
  });

  userAnswers.push({ ...q, userAnswer: selected });
  if (selected === q.answer) score++;

  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
}
function goBack() {
    clearInterval(timer);
    document.querySelector(".question-box").style.display = "none";
    document.getElementById("result").innerHTML = "";
    document.getElementById("subjectSelection").style.display = "block";
    document.getElementById("backBtn").style.display = "none";
  }
  
function finishQuiz() {
  document.querySelector(".question-box").style.display = "none";
  const resultText = `You scored ${score} out of ${currentQuestions.length}`;
  document.getElementById("result").innerHTML = `<h2>${resultText}</h2>`;

  const backButton = document.createElement("button");
  backButton.innerText = "← Back to Subjects";
  backButton.className = "back-btn";
  backButton.onclick = goBack;
  document.getElementById("result").appendChild(backButton);

  const stored = JSON.parse(localStorage.getItem("quizResults") || "[]");
  stored.push({
    date: new Date().toLocaleString(),
    subject: currentQuestions[0]?.subject || "Unknown",
    score: `${score}/${currentQuestions.length}`,
    answers: userAnswers
  });
  localStorage.setItem("quizResults", JSON.stringify(stored));



}
loadTheme();
