"use strict";

const startBtnElement = document.querySelector(".start-game");
const deskElement = document.querySelector(".desk");
const totalScoreElement = document.querySelector(".total-score");
const clickCounterElement = document.querySelector(".click-counter");
const bestTimeElement = document.querySelector(".best");
const worstTimeElement = document.querySelector(".worst");
const meanTimeElement = document.querySelector(".mean");

let clickCounter = 0;
let maxCounter = 10;

let startTime = 0;
let endTime = 0;
let totalScore = 0;

let timeArray = [];

hideElement(startBtnElement);

startBtnElement.addEventListener("click", startGame);

// Скриваємо елемент при кліку
function hideElement(element) {
  element.addEventListener("click", (e) => {
    element.classList.toggle("hide");
  });
}

// Отримуємо рандомне значення
function getRandomValue(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// створюємо елемент для кліку
function createTargetElement() {
  const target = `<div class="target" style="top: ${getRandomValue(
    50,
    500
  )}px; left: ${getRandomValue(50, 600)}px"></div>`;

  deskElement.insertAdjacentHTML("afterbegin", target);

  startTime = new Date().getTime();

  const targetElement = document.querySelector(".target");

  targetElement.addEventListener("click", getData);
  targetElement.addEventListener("click", removeTargetElement);
}

// Отримуємо данні
function getData() {
  clickCounter++;

  clickCounterElement.textContent = clickCounter;

  createDataElement();
}

function createDataElement() {
  endTime = new Date().getTime();
  const time = endTime - startTime;
  const score = 10000 - time * 2;
  totalScore += score;

  totalScoreElement.textContent = totalScore;

  const list = document.querySelector(".list");

  const scoreDataElement = `
            <li class="item">
              <div>
                <p>Time: <span class="time">${time / 1000}</span> s</p>
                <p>Score: <span class="score">${score}</span></p>
              </div>
            </li>
  `;

  list.insertAdjacentHTML("beforeend", scoreDataElement);

  timeArray.push(time / 1000);
  console.log(timeArray);
  getBestResult();
  getWorstResult();
  getMeanResult();
}

function startGame() {
  totalScore = 0;
  totalScoreElement.textContent = totalScore;

  clickCounter = 0;
  clickCounterElement.textContent = clickCounter;

  timeArray = [];
  bestTimeElement.textContent = 0;
  worstTimeElement.textContent = 0;
  meanTimeElement.textContent = 0;

  createTargetElement();

  const list = document.querySelector(".list");
  list.remove();

  createResultListElement();
}

// створюємо список
function createResultListElement() {
  const results = document.querySelector(".results");
  const listElement = '<ol class="list"></ol>';
  results.insertAdjacentHTML("beforeend", listElement);
}

// Видаляємо елемент після кліку
function removeTargetElement() {
  const targetElement = document.querySelector(".target");

  targetElement.remove();

  if (clickCounter < maxCounter) {
    createTargetElement();
  } else {
    startBtnElement.classList.toggle("hide");
  }
}

function getBestResult() {
  let best = 0;

  for (let i = 0; i < timeArray.length; i++) {
    if (best === 0 || timeArray[i] < best) {
      best = timeArray[i];
    }
  }

  bestTimeElement.textContent = best;
}

function getWorstResult() {
  let worst = 0;

  for (let i = 0; i < timeArray.length; i++) {
    if (worst === 0 || timeArray[i] > worst) {
      worst = timeArray[i];
    }
  }

  worstTimeElement.textContent = worst;
}

function getMeanResult() {
  let mean = 0;

  for (let i = 0; i < timeArray.length; i++) {
    mean += timeArray[i];
  }

  mean = mean / timeArray.length;

  meanTimeElement.textContent = mean.toFixed(3);
}
