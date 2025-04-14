const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

window.onload = loadTasks;
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
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task, index) => renderTask(task.text, task.completed, index));
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(taskText, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = taskText;

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const checkBtn = document.createElement("button");
  checkBtn.className = "check";
  checkBtn.innerHTML = "Done";
  checkBtn.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.innerHTML = "✖";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  actions.appendChild(checkBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);
  taskList.appendChild(li);
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  renderTask(text);
  saveTasks();
  taskInput.value = "";
}
loadTheme();