const displayGrid = document.getElementById("grid");
const btn = document.getElementById("btn");
const instructions = document.getElementById("instructions");
const scores = document.getElementById("scores");
const round = document.getElementById("round");
const numOfBlocks = document.getElementById("numOfBlocks");
const gameOver = document.getElementById("game-over");
const retryBtn = document.getElementById("retry-btn");

const square = 10;
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

function initialiseGame() {
  btn.addEventListener("click", () => {
    instructions.innerHTML = "";
    scores.style.display = "flex";
    round.textContent = roundNum;
    gameActive = true;
    generateRandomBlock(3);
    btn.remove();
  });
}

function compare() {
  if (activeSquares.length === selectedSquares.length) {
    for (let i = 0; i < selectedSquares.length; i++) {
      if (!activeSquares.includes(selectedSquares[i])) {
        activeSquares.forEach((item) => {
          item.style.backgroundColor = "green";
        });
        console.log("You lose");
        gameOver.style.visibility = "visible";

        gameOver.innerHTML = `
        <h2>Game Over</h2>
        <p>You have made it to round ${roundNum}</p>
        <button id="retry-btn">Retry</button>`;
        let retryBtn = document.getElementById("retry-btn");
        retryBtn.classList.add("retry-btn");
        retryBtn.addEventListener("click", () => {
          location.reload();
        });

        gameActive = false;
        return;
      }
    }
    console.log("You win");
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
