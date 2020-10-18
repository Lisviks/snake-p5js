const foodPos = {};
const fps = 10;
const segmentSize = 20;

let snake = [];
let snakeLength = 3;
let snakePosX = 0;
let snakePosY = 0;
let snakeDirX = 0;
let snakeDirY = 0;
let direction = '';
let gameover = false;

function setup() {
  createCanvas(600, 600);
  background(100);
  foodPos.x = genFoodPos(Math.floor(random(0, width / segmentSize)));
  foodPos.y = genFoodPos(Math.floor(random(0, height / segmentSize)));
  snakePosX = width / 2;
  snakePosY = height / 2;
  moveSnake(snakePosX, snakePosY);
}

function draw() {
  frameRate(fps);
  background(100);

  push();
  fill(0, 255, 0);
  square(foodPos.x, foodPos.y, segmentSize);
  pop();

  snakePosX += snakeDirX;
  snakePosY += snakeDirY;
  moveSnake(snakePosX, snakePosY);
  gameover = hit(snakePosX, snakePosY);

  if (gameover && direction) {
    noLoop();
    direction = '';
  }
  if (
    snake[snake.length - 1].x === foodPos.x &&
    snake[snake.length - 1].y === foodPos.y
  ) {
    snakeLength++;
    foodPos.x = genFoodPos(Math.floor(random(0, width / segmentSize)));
    foodPos.y = genFoodPos(Math.floor(random(0, height / segmentSize)));
  }
}

function keyPressed() {
  if (gameover) {
    restart();
  }
  if (keyCode === LEFT_ARROW && direction !== 'RIGHT') {
    snakeDirX = -segmentSize;
    snakeDirY = 0;
    direction = 'LEFT';
  }
  if (keyCode === RIGHT_ARROW && direction !== 'LEFT') {
    snakeDirX = segmentSize;
    snakeDirY = 0;
    direction = 'RIGHT';
  }
  if (keyCode === UP_ARROW && direction !== 'DOWN') {
    snakeDirY = -segmentSize;
    snakeDirX = 0;
    direction = 'UP';
  }
  if (keyCode === DOWN_ARROW && direction !== 'UP') {
    snakeDirY = segmentSize;
    snakeDirX = 0;
    direction = 'DOWN';
  }
}

function drawSnakeHead() {
  const head = snake[snake.length - 1];
  push();
  fill(255, 0, 0);
  square(head.x, head.y, segmentSize);
  pop();
}

function drawSnakeTail() {
  for (let i = 0; i < snake.length - 1; i++) {
    square(snake[i].x, snake[i].y, segmentSize);
  }
}

function moveSnake(x, y) {
  snake.push({ x, y });
  drawSnakeHead();
  if (snake.length > snakeLength) {
    drawSnakeTail();
    snake.shift();
  }
}

function genFoodPos(randomNum) {
  let num = randomNum;
  if (randomNum !== 0) num *= segmentSize;
  return num;
}

function hit(x, y) {
  if (x < 0 || y < 0 || y >= height || x >= width) {
    return true;
  }
  for (let i = 0; i < snake.length - 1; i++) {
    if (snake[i].x === x && snake[i].y === y) {
      return true;
    }
  }
}

function restart() {
  background(100);
  gameover = false;
  loop();
  snakeLength = 3;
  snake = [];
  snakePosX = width / 2;
  snakePosY = height / 2;
}
