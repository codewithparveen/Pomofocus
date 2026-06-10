// ── Configuration ──────────────────────────────────────────
// These are the durations (in seconds) for each mode.
// You can change these numbers to adjust the timer lengths.
const MODES = {
  work:  25 * 60,   // 25 minutes
  short:  5 * 60,   // 5 minutes
  long:  15 * 60,   // 15 minutes
};

const TIPS = [
  "Work in focused 25-min blocks for maximum productivity.",
  "After 4 sessions, take a longer 15-minute break.",
  "Put your phone face-down during focus sessions.",
  "One task at a time — multitasking reduces quality.",
  "Drink water between sessions to stay sharp.",
  "Close unnecessary browser tabs before starting.",
];

const LABELS = {
  work:  "Time to focus 🎯",
  short: "Short break — stretch a bit! 🧘",
  long:  "Long break — you earned it! 🎉",
};

// ── State ───────────────────────────────────────────────────
let currentMode   = 'work';   // which mode are we in
let timeLeft      = MODES.work; // seconds remaining
let isRunning     = false;    // is the timer ticking?
let interval      = null;     // holds our setInterval reference
let sessionCount  = 0;        // completed focus sessions
let focusMinutes  = 0;        // total focused minutes
let breakCount    = 0;        // breaks taken

// ── DOM References ──────────────────────────────────────────
// We grab these elements once so we don't have to keep searching for them
const timeDisplay   = document.getElementById('timeDisplay');
const sessionLabel  = document.getElementById('sessionLabel');
const startBtn      = document.getElementById('startBtn');
const ring          = document.getElementById('ring');
const sessionCountEl = document.getElementById('sessionCount');
const focusMinutesEl = document.getElementById('focusMinutes');
const breakCountEl   = document.getElementById('breakCount');
const tipText        = document.getElementById('tipText');
const timerCard      = document.querySelector('.timer-card');

// ── Ring (Circle Progress) ──────────────────────────────────
// The ring is an SVG circle. We control how much of it is "filled"
// using stroke-dashoffset. 553 = full circumference of the circle.
const CIRCUMFERENCE = 553;

function updateRing() {
  // How far through the session are we? (0 = just started, 1 = done)
  const total    = MODES[currentMode];
  const progress = timeLeft / total;

  // offset 0 = full ring, offset 553 = empty ring
  const offset = CIRCUMFERENCE * (1 - progress);
  ring.style.strokeDashoffset = offset;
}

// ── Format Time ─────────────────────────────────────────────
// Converts seconds (like 1500) into "25:00" format
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);     // get minutes
  const s = seconds % 60;                  // get remaining seconds
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  // padStart makes sure we always show 2 digits e.g. "05" not "5"
}

// ── Switch Mode ─────────────────────────────────────────────
// Called when user clicks Focus / Short Break / Long Break tabs
function switchMode(mode) {
  // Stop any running timer first
  clearInterval(interval);
  isRunning = false;

  // Update the state
  currentMode = mode;
  timeLeft    = MODES[mode];

  // Update the display
  timeDisplay.textContent = formatTime(timeLeft);
  sessionLabel.textContent = LABELS[mode];

  // Update Start button text and style
  startBtn.textContent = 'Start';
  startBtn.className   = 'btn-main';
  if (mode !== 'work') startBtn.classList.add('break-btn');

  // Update tab highlight
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

  // Update ring color
  if (mode !== 'work') {
    ring.classList.add('break-mode');
  } else {
    ring.classList.remove('break-mode');
  }

  // Reset ring to full
  updateRing();

  // Stop pulse animation
  timerCard.classList.remove('running');
}

// ── Toggle Timer (Start / Pause) ────────────────────────────
function toggleTimer() {
  if (isRunning) {
    // PAUSE
    clearInterval(interval);
    isRunning = false;
    startBtn.textContent = 'Resume';
    startBtn.classList.remove('pause-mode');
    timerCard.classList.remove('running');
  } else {
    // START
    isRunning = true;
    startBtn.textContent = 'Pause';
    startBtn.classList.add('pause-mode');
    timerCard.classList.add('running');

    // setInterval calls a function every X milliseconds
    // Here we call it every 1000ms = every 1 second
    interval = setInterval(() => {
      timeLeft--;           // subtract 1 second
      updateDisplay();      // update what's shown
      updateRing();         // update the circle

      if (timeLeft <= 0) {  // session is done!
        handleSessionEnd();
      }
    }, 1000);
  }
}

// ── Update Display ───────────────────────────────────────────
function updateDisplay() {
  timeDisplay.textContent = formatTime(timeLeft);

  // Change tab title so you can see the timer even if you switch tabs
  document.title = `${formatTime(timeLeft)} — pomofocus`;
}

// ── Handle Session End ───────────────────────────────────────
function handleSessionEnd() {
  clearInterval(interval);
  isRunning = false;
  timerCard.classList.remove('running');

  if (currentMode === 'work') {
    // Completed a focus session!
    playSound('done');
    sessionCount++;
    focusMinutes += 25;
    sessionCountEl.textContent  = sessionCount;
    focusMinutesEl.textContent  = focusMinutes;

    // Every 4 sessions → long break, otherwise short break
    if (sessionCount % 4 === 0) {
      alert('🎉 Great work! Time for a long break.');
      switchMode('long');
    } else {
      alert('✅ Session done! Take a short break.');
      switchMode('short');
    }
  } else {
    // Break is done — back to work!
    playSound('break');
    breakCount++;
    breakCountEl.textContent = breakCount;
    rotateTip();
    alert('⏰ Break over! Ready to focus again?');
    switchMode('work');
  }
}

// ── Reset Timer ─────────────────────────────────────────────
function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  timeLeft  = MODES[currentMode];

  timeDisplay.textContent  = formatTime(timeLeft);
  startBtn.textContent     = 'Start';
  startBtn.className       = 'btn-main';
  if (currentMode !== 'work') startBtn.classList.add('break-btn');

  document.title = 'pomofocus';
  timerCard.classList.remove('running');
  updateRing();
}

// ── Skip Session ────────────────────────────────────────────
function skipSession() {
  clearInterval(interval);
  isRunning = false;

  if (currentMode === 'work') {
    switchMode('short');
  } else {
    switchMode('work');
  }
}

// ── Rotate Tips ─────────────────────────────────────────────
function rotateTip() {
  const random = Math.floor(Math.random() * TIPS.length);
  tipText.textContent = TIPS[random];
}

// ── Init ─────────────────────────────────────────────────────
// This runs when the page loads — sets everything to its starting state
updateDisplay();
updateRing();

// ── Sound Notification ───────────────────────────────────────
// We use the Web Audio API — built into every browser, no library needed!
// It generates a soft bell-like tone using sound waves (oscillator)
function playSound(type) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  // An oscillator generates a sound wave
  const osc = ctx.createOscillator();
  // A gain node controls the volume
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  if (type === 'done') {
    // Focus session done → two rising tones (cheerful!)
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.setValueAtTime(660, ctx.currentTime + 0.15);
    osc.frequency.setValueAtTime(800, ctx.currentTime + 0.30);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.6);
  } else {
    // Break done → single soft low tone (calm)
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  }
}

// ── Task Input Logic ─────────────────────────────────────────
const taskInput   = document.getElementById('taskInput');
const taskDisplay = document.getElementById('taskDisplay');
const taskTextEl  = document.getElementById('taskText');

// When user presses Enter in the task input, save the task
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const val = taskInput.value.trim();
    if (val) {
      // Show the saved task label, hide the input
      taskTextEl.textContent = '🎯 ' + val;
      taskInput.style.display  = 'none';
      taskDisplay.style.display = 'flex';
    }
  }
});

// Clear task — hides the label and shows input again
function clearTask() {
  taskInput.value           = '';
  taskInput.style.display   = 'block';
  taskDisplay.style.display = 'none';
}