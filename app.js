import { db } from "./firebase.js";
import {
  getDoc,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const displayGrid = document.getElementById("grid");
const btn = document.getElementById("btn");
const instructions = document.getElementById("instructions");
const scores = document.getElementById("scores");
const scoreCount = document.getElementById("score");
const round = document.getElementById("round");
const numOfBlocks = document.getElementById("numOfBlocks");
const gameOver = document.getElementById("game-over");

const square = 10;
let score = 0;
let hiscore = 0;

let squareArr = [];
let activeSquares = [];
let selectedSquares = [];

let gameActive = false;
let roundNum = 1;

for (let i = 0; i < square * square; i++) {
  let squareItems = document.createElement("div");
  squareItems.classList.add("grid-item");
  squareItems.id = `square-${i}`;
  displayGrid.appendChild(squareItems);
  squareArr.push(squareItems);
  squareItems.addEventListener("click", (event) => {
    if (!gameActive) return;

    event.target.style.backgroundColor = "red";
    if (!selectedSquares.includes(event.target)) {
      selectedSquares.push(event.target);
      compare();
    }
  });
}

async function saveHighScores(score) {
  try {
    await setDoc(doc(db, "scores", "hiscore"), { score });
    console.log("High Score saved", score);
  } catch (error) {
    console.error("Error saving high score: ", error);
  }
}

async function getHighScore() {
  try {
    const docRef = doc(db, "scores", "hiscore");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().score;
    } else {
      console.log("No high score found.");
      return 0;
    }
  } catch (e) {
    console.error("Error retrieving high score: ", e);
  }
}

function generateRandomBlock(num) {
  for (let i = 0; i < num && squareArr.length > 0; i++) {
    if (squareArr.length === 0) return;
    let randomIdx = Math.floor(Math.random() * squareArr.length);
    let randomBlock = squareArr[randomIdx];
    numOfBlocks.textContent = num;
    if (randomBlock) {
      randomBlock.classList.add("active-block");
      randomBlock.style.backgroundColor = "red";
      gameActive = false;
      setTimeout(() => {
        gameActive = true;
        let blockColor = (randomBlock.style.backgroundColor = "");
        return () => clearTimeout(blockColor);
      }, 3000);
      activeSquares.push(randomBlock);
      squareArr.splice(randomIdx, 1);
    }
  }
}

async function initialiseGame() {
  hiscore = await getHighScore();
  scoreCount.textContent = score;
  round.textContent = roundNum;
  btn.addEventListener("click", () => {
    instructions.innerHTML = "";
    scores.style.display = "flex";
    round.textContent = roundNum;
    scoreCount.textContent = score;
    scoreCount.style.fontWeight = "bold";
    gameActive = true;
    generateRandomBlock(3);
    btn.remove();
  });
}

async function compare() {
  if (activeSquares.length === selectedSquares.length) {
    for (let i = 0; i < selectedSquares.length; i++) {
      if (!activeSquares.includes(selectedSquares[i])) {
        activeSquares.forEach((item) => {
          item.style.backgroundColor = "green";
        });
        console.log("You lose");
        gameOver.style.visibility = "visible";
        scoreCount.textContent = score;

        gameOver.innerHTML = `
        <h2>Game Over</h2>
        <p>You have made it to round ${roundNum}</p>
        <div><p id="new-hiscore"></p><h3>Hi-Score: <span>${hiscore}</span></h3></div>
        <button id="retry-btn">Retry</button>`;

        if (score > hiscore) {
          hiscore = score;
          await saveHighScores(hiscore);
          let newHiScore = document.getElementById("new-hiscore");
          newHiScore.classList.add("new-hi-score");
          newHiScore.textContent = "New High Score!";
          gameOver.querySelector("span").textContent = hiscore;
        }

        let retryBtn = document.getElementById("retry-btn");
        retryBtn.classList.add("retry-btn");
        retryBtn.addEventListener("click", () => {
          location.reload();
        });

        gameActive = false;
        return;
      }
    }
    selectedSquares.forEach((_, i) => {
      score += 100;
    });
    scoreCount.textContent = score;
    activeSquares.forEach((item) => {
      item.classList.remove("active-block");
      item.style.backgroundColor = "";
    });
    selectedSquares = [];
    activeSquares = [];
    roundNum++;
    round.textContent = roundNum;

    generateRandomBlock(3 + roundNum);
  }
}

console.log(activeSquares);
console.log(selectedSquares);

initialiseGame();
