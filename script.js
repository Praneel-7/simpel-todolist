
const work = ["SQL WORK!!", "💧DRINK WATER 4L", "OBS+REC!!", "🧠 Reflectt"];
const workDays = ["S", "M", "T", "W", "T", "F", "S"];
const fitness = ["SQL WORK!!", "💧DRINK WATER 4L", "OBS+REC!!", "🧠 Reflect"];
const fitnessDays = ["S", "M", "T", "W", "T", "F", "S"];

window.onload = () => {
  generateCalendar();
  loadCalendarState();
  updateProgress();
  loadQuote();
};

function addTask() {
  const input = document.getElementById("taskInput");
  const note = document.getElementById("taskNote");
  const category = document.getElementById("taskCategory").value;
  const taskText = input.value.trim();
  const taskNote = note.value.trim();

  if (taskText === "") return;

  const taskItem = document.createElement("li");
  taskItem.classList.add("task-added");
  taskItem.innerHTML = `
    ${taskText}
    ${taskNote ? `<span class="task-note">📝 ${taskNote}</span>` : ""}
    <button onclick="this.parentElement.remove()">❌</button>
  `;

  document.getElementById(category).appendChild(taskItem);
  input.value = "";
  note.value = "";
}

// --- Monthly Tracker ---
function generateCalendar() {
  const grid = document.getElementById("calendarGrid");
  grid.innerHTML = "";
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const box = document.createElement("div");
    box.className = "calendar-day";
    box.textContent = day;

    box.addEventListener("click", () => {
      box.classList.toggle("marked");
      saveCalendarState();
      updateProgress();
    });

    grid.appendChild(box);
  }
}

function saveCalendarState() {
  const markedDays = [];
  document.querySelectorAll(".calendar-day").forEach((box, index) => {
    if (box.classList.contains("marked")) markedDays.push(index);
  });
  localStorage.setItem("monthlyStreak", JSON.stringify(markedDays));
}

function loadCalendarState() {
  const saved = JSON.parse(localStorage.getItem("monthlyStreak")) || [];
  const boxes = document.querySelectorAll(".calendar-day");
  saved.forEach(index => {
    if (boxes[index]) boxes[index].classList.add("marked");
  });
}

function updateProgress() {
  const boxes = document.querySelectorAll(".calendar-day");
  const marked = document.querySelectorAll(".calendar-day.marked").length;
  const percent = boxes.length ? Math.round((marked / boxes.length) * 100) : 0;

  document.getElementById("progressBar").style.width = `${percent}%`;
  document.getElementById("progressPercent").textContent = `🔥 ${percent}% Complete`;
}

// --- Motivation Quote ---
const quotes = [
  "💡 if you put in 80%,you get 80% back.",
  "🔥 but if u put in 100%, you get 1000% back. ",
  "🎯 the last 20% is where the magic happens.",
  "🌟 because almonst nobody is mad enoough to go all in.",
  "💥 only a perfect storm of delusion,obsession and a pinch of childhood trauma makes the extra 20% possible.",
  "🚀 its the part where you keep going long after logic says retreat.",
  "💪 beacuse at a certain point, success isnt about talent or luck",
  "🧠 its bout whos willing to suffer for the longest, pain is the filter, feww pass it!."
];

function loadQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").textContent = `💬 "${quote}"`;
}
