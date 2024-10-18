const displayGrid = document.getElementById("grid");

const square = 10;
let squareArr = [];
console.log(squareArr);

for (let i = 0; i < square * square; i++) {
  let squareItems = document.createElement("div");
  squareItems.classList.add("grid-item");
  displayGrid.appendChild(squareItems);
  squareArr.push(squareItems);
}

function generateRandomBlock() {
  if (squareArr.length === 0) return;
  let randomIdx = Math.floor(Math.random() * squareArr.length);
  let randomBlock = squareArr[randomIdx];
  console.log(randomBlock);
  if (randomBlock) {
    randomBlock.classList.add("active-block");
    randomBlock.style.backgroundColor = "red";
  }
}

generateRandomBlock();
generateRandomBlock();
generateRandomBlock();
generateRandomBlock();
generateRandomBlock();
generateRandomBlock();
generateRandomBlock();
generateRandomBlock();
generateRandomBlock();
