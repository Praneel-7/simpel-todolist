let totalTasks = 0;
let completedTasks = 0;

const quotes = [
  "💡 Believe in yourself!",
  "🔥 You are unstoppable!",
  "🎯 Progress over perfection.",
  "🌟 Stay consistent, not perfect.",
  "💥 Small steps lead to big results.",
  "🚀 Keep going, you're doing great!",
  "💪 You've got this!",
  "🧠 Focus and conquer."
];

function showRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quoteBox").textContent = quote;
}

function updateSummary() {
  document.getElementById("taskSummary").textContent =
    `📋 Total Tasks: ${totalTasks} | ✅ Completed: ${completedTasks}`;
}

function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const note = document.getElementById("taskNote").value.trim();
  const date = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;

  if (title === "") return;

  const li = document.createElement("li");

  const taskMain = document.createElement("div");
  taskMain.className = "task-main";

  const taskTitle = document.createElement("span");
  taskTitle.textContent = `🗒️ ${title}`;
  taskMain.appendChild(taskTitle);

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.onclick = () => {
    if (li.classList.contains("completed")) completedTasks--;
    totalTasks--;
    li.remove();
    updateSummary();
  };
  taskMain.appendChild(delBtn);

  const details = document.createElement("div");
  details.className = `task-details priority-${priority}`;
  details.textContent = `📅 Due: ${date || 'No date'} | 🔥 Priority: ${priority}`;

  const noteDiv = document.createElement("div");
  noteDiv.className = "task-note";
  noteDiv.textContent = note ? `📝 Note: ${note}` : "";

  li.appendChild(taskMain);
  li.appendChild(details);
  if (note) li.appendChild(noteDiv);

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    completedTasks += li.classList.contains("completed") ? 1 : -1;
    updateSummary();
  });

  document.getElementById("taskList").appendChild(li);

  totalTasks++;
  updateSummary();

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskNote").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("priority").value = "Medium";
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
}

window.onload = () => {
  document.body.classList.add('light');
  showRandomQuote();
};
