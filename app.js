const displayGrid = document.getElementById("grid");
const btn = document.getElementById("btn");

const square = 10;
let squareArr = [];
let activeSquares = [];
let selectedSquares = [];

for (let i = 0; i < square * square; i++) {
  let squareItems = document.createElement("div");
  squareItems.classList.add("grid-item");
  squareItems.id = `square-${i}`;
  displayGrid.appendChild(squareItems);
  squareArr.push(squareItems);
  squareItems.addEventListener("click", (event) => {
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
    console.log(randomBlock);
    if (randomBlock) {
      randomBlock.classList.add("active-block");
      randomBlock.style.backgroundColor = "red";
      setTimeout(() => {
        let blockColor = (randomBlock.style.backgroundColor = "");
        return () => clearTimeout(blockColor);
      }, 2000);
      activeSquares.push(randomBlock);
      squareArr.splice(randomIdx, 1);
    }
  }
}

function initialiseGame() {
  btn.addEventListener("click", () => {
    generateRandomBlock(10);
    btn.remove();
  });
}

initialiseGame();

// function compare() {
//   if (activeSquares.length === selectedSquares.length) {
//     for (let i = 0; i < activeSquares.length; i++) {
//       if (activeSquares[i].id !== selectedSquares[i].id) {
//         console.log("You lose");
//         return;
//       }
//     }
//     console.log("You win");
//     generateRandomBlock(12);
//   } else {
//     console.log("Selections incomplete");
//   }
// }

function compare() {
  if (activeSquares.length === selectedSquares.length) {
    for (let i = 0; i < selectedSquares.length; i++) {
      if (!activeSquares.includes(selectedSquares[i])) {
        console.log("You lose");
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

    generateRandomBlock(10); // Generate new blocks if the player wins
  } else {
    console.log("Selections incomplete");
  }
}

console.log(activeSquares);
console.log(selectedSquares);
