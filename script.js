const board = document.querySelector(".section_two");

const blockWidth = 50;
const blockHeight = 50;

const rows = Math.floor(board.clientHeight / blockHeight);
const cols = Math.floor(board.clientWidth / blockWidth);

const snakeData = [];
const snake = [{ x: 1, y: 3 }];
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};
let direction = "left";
let intervalTime = null;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const blockDiv = document.createElement("div");
    blockDiv.classList.add("block");

    board.appendChild(blockDiv);
    blockDiv.innerHTML = `${row}-${col}`;
    snakeData[`${row}-${col}`] = blockDiv;
  }
}

function render() {
  const head = snake[0];
  let snakeHead = null;

  snakeData[`${food.x}-${food.y}`].classList.add("food");
  if (direction === "left") {
    snakeHead = { x: head.x, y: head.y - 1 };
  } else if (direction === "right") {
    snakeHead = { x: head.x, y: head.y + 1 };
  } else if (direction === "up") {
    snakeHead = { x: head.x - 1, y: head.y };
  } else if (direction === "down") {
    snakeHead = { x: head.x + 1, y: head.y };
  }

  if (
    snakeHead.x < 0 ||
    snakeHead.x >= rows ||
    snakeHead.y < 0 ||
    snakeHead.y >= cols
  ) {
    alert("Game is Over");
    clearInterval(intervalTime);
  }

  if (snakeHead.x === food.x && snakeHead.y === food.y) {
    snakeData[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    snake.unshift(snakeHead)
  }

  snake.forEach((segment) => {
    const cell = snakeData[`${segment.x}-${segment.y}`];
    if (cell) cell.classList.remove("fill");
  });
  snake.unshift(snakeHead);
  snake.pop();

  snake.forEach((segment) => {
    snakeData[`${segment.x}-${segment.y}`].classList.add("fill");
  });
}

intervalTime = setInterval(() => {
  render();
}, 500);

addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    direction = "up";
  } else if (event.key === "ArrowDown") {
    direction = "down";
  } else if (event.key === "ArrowLeft") {
    direction = "left";
  } else if (event.key === "ArrowRight") {
    direction = "right";
  }
});
