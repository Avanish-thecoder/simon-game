let pads = document.querySelectorAll(".pad");
let startBtn = document.querySelector("#startBtn");
let restartBtn = document.querySelector("#restartBtn");
let levelEl = document.querySelector("#level");
let statusEl = document.querySelector("#status");

let colors = ["green", "red", "yellow", "blue"];

let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let acceptingInput = false;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomColor() {
  let idx = Math.floor(Math.random() * colors.length);
  return colors[idx];
}

function flashBtn(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function showSequence() {
  acceptingInput = false;
  statusEl.innerText = "Watch the sequence...";
  userSeq = [];

  let i = 0;

  let interval = setInterval(() => {
    let color = gameSeq[i];
    let btn = document.querySelector(`.${color}`);
    flashBtn(btn);
    i++;

    if (i >= gameSeq.length) {
      clearInterval(interval);
      setTimeout(() => {
        acceptingInput = true;
        statusEl.innerText = "Your turn!";
      }, 400);
    }
  }, 700);
}

function nextRound() {
  level++;
  levelEl.innerText = level;
  userSeq = [];

  gameSeq.push(randomColor());
  showSequence();
}

function startGame() {
  gameSeq = [];
  userSeq = [];
  level = 0;
  started = true;
  acceptingInput = false;

  levelEl.innerText = level;
  statusEl.innerText = "Game Started!";
  setTimeout(nextRound, 700);
}

function gameOver() {
  statusEl.innerText = "Game Over! Press Restart or Start Game";
  document.body.style.backgroundColor = "red";

  setTimeout(() => {
    document.body.style.backgroundColor = "#222";
  }, 300);

  started = false;
  acceptingInput = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  levelEl.innerText = level;
}

function checkAnswer(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      acceptingInput = false;
      statusEl.innerText = "Correct! Next level...";
      setTimeout(nextRound, 800);
    }
  } else {
    gameOver();
  }
}

pads.forEach((pad) => {
  pad.addEventListener("click", function () {
    if (!started || !acceptingInput) return;

    let color = this.dataset.color;
    userSeq.push(color);

    flashBtn(this);
    checkAnswer(userSeq.length - 1);
  });
});

startBtn.addEventListener("click", function () {
  if (!started) {
    startGame();
  }
});

restartBtn.addEventListener("click", function () {
  startGame();
});