const displayGrid = document.getElementById("grid");

const square = 10;
let squareArr = [];
console.log(squareArr);

function generateRandomBlock() {}

for (let i = 0; i < square * square; i++) {
  let squareItems = document.createElement("div");
  squareItems.classList.add("grid-item");
  displayGrid.appendChild(squareItems);
  squareArr.push(squareItems);
}
