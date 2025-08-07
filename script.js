let workDuration = 25;
let breakDuration = 5;
let sessions = 4;

let currentSession = 0;
let isBreak = false;
let timer;
let timeLeft;

const settingsBar = document.getElementById("settingsBar");
const showSettingsBtn = document.getElementById("showSettingsBtn");
const body = document.body;

function startTimer() {
  workDuration = parseInt(document.getElementById("workInput").value);
  breakDuration = parseInt(document.getElementById("breakInput").value);
  sessions = parseInt(document.getElementById("sessionsInput").value);

  currentSession = 0;
  isBreak = false;

  settingsBar.style.display = "none";
  showSettingsBtn.style.display = "block";

  startInterval(workDuration * 60);
}

function startInterval(duration) {
  clearInterval(timer);
  timeLeft = duration;
  updateTheme(); // Apply correct theme
  updateDisplay();

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      if (!isBreak) {
        currentSession++;
        if (currentSession >= sessions) {
          isBreak = true;
          document.getElementById("status").textContent = "All sessions done!";
          return;
        }
        isBreak = true;
        startInterval(breakDuration * 60);
      } else {
        isBreak = false;
        startInterval(workDuration * 60);
      }
    }
  }, 1000);
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("timer").textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  document.getElementById("status").textContent = isBreak
    ? `Break (${currentSession}/${sessions})`
    : `Work (${currentSession + 1}/${sessions})`;
}

function updateTheme() {
  if (isBreak) {
    body.classList.add("light-mode");
  } else {
    body.classList.remove("light-mode");
  }
}

function resetTimer() {
  clearInterval(timer);
  document.getElementById("timer").textContent = "00:00";
  document.getElementById("status").textContent = "Reset";
  settingsBar.style.display = "block";
  showSettingsBtn.style.display = "none";
  body.classList.remove("light-mode"); // Reset to dark mode
}

function showSettings() {
  settingsBar.style.display = "block";
  showSettingsBtn.style.display = "none";
}
