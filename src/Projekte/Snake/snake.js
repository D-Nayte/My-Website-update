let body = document.querySelector("body");
body.height = "800";

let canvas = document.getElementById("background");
canvas.width = "1280";
canvas.height = "720";

let score = document.querySelectorAll(".score");
let points = 0;

function place_score() {
  score.forEach((e) => (e.textContent = points));
}

let interval;

let start = document.querySelector("#start");
let gameover_txt = document.querySelector(".gameover");
let arrows = document.querySelector(".arrows");

document.addEventListener("keydown", (e) => {
  keydown(e.keyCode);
  if (e.keyCode === 13) {
    start.click();
  }
});
document.addEventListener("keyup", () => (arrows.src = "./src/img/arrow_roh.png"));

let kopf_left = new Image();
kopf_left.src = "./src/img/snake_kopf_left.png";
let kopf_right = new Image();
kopf_right.src = "./src/img/snake_kopf_right.png";
let kopf_up = new Image();
kopf_up.src = "./src/img/snake_kopf_up.png";
let kopf_down = new Image();
kopf_down.src = "./src/img/snake_kopf_down.png";
let background_image = new Image();
background_image.src = "/src/Projekte/Snake/src/img/background2.png";

let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let raster_x = 80;
let raster_y = 50;
let cell_width = width / raster_x;
let cell_height = height / raster_y;
let snake = [{ x: 2, y: 2 }];
let food_collected = false;
let food;
let direction = "right";
let points_reduce;

function add(x, y) {
  ctx.fillRect(x * cell_width, y * cell_height, cell_width - 1, cell_height - 1);
}

function draw() {
  ctx.drawImage(background_image, 0, 0, 1280, 850);
  // ctx.fillStyle= "transparent";
  // ctx.fillRect(0,0,1280,720);
  ctx.fillStyle = "#00ff00";

  snake.forEach((e) => {
    let ex = e.x;
    let ey = e.y;
    add(ex, ey);
  });

  ctx.fillStyle = "red";
  add(food.x, food.y);

  switch (direction) {
    case "left":
      ctx.drawImage(kopf_left, snake[0].x * cell_width - 4, snake[0].y * cell_height - 1, 27, 15);
      break;
    case "right":
      ctx.drawImage(kopf_right, snake[0].x * cell_width - 4, snake[0].y * cell_height - 1, 27, 15);
      break;
    case "up":
      ctx.drawImage(kopf_up, snake[0].x * cell_width + 0, snake[0].y * cell_height - 6, 15, 27);
      break;
    case "down":
      ctx.drawImage(kopf_down, snake[0].x * cell_width + 0, snake[0].y * cell_height - 6, 15, 27);
      break;
  }

  place_score();

  requestAnimationFrame(draw);
}

function loop() {
  gameover();
  snake_unshift();
  if (snake[0].x == food.x && snake[0].y == food.y) {
    food_collected = true;
    points += 10;
    place_score();
    snake_unshift(food.x, food.y);
    (food_collected = false), place_food();
  }

  switch (direction) {
    case "left":
      snake[0].x--;
      break;
    case "right":
      snake[0].x++;
      break;
    case "down":
      snake[0].y++;
      break;
    case "up":
      snake[0].y--;
      break;

    default:
      break;
  }
}

function place_food() {
  rnd_x = Math.round(Math.random() * 50);
  rnd_y = Math.round(Math.random() * 50);
  food = { x: rnd_x, y: rnd_y };
}

function keydown(e) {
  switch (e) {
    case 37:
      if (direction === "right") {
        break;
      } else {
        direction = "left";
        arrows.src = "./src/img/arrow_left.png";
      }
      break;

    case 38:
      direction = "up";
      arrows.src = "./src/img/arrow_up.png";

      break;
    case 39:
      if (direction === "left") {
        break;
      } else {
        direction = "right";
        arrows.src = "./src/img/arrow_right.png";
      }
      break;
    case 40:
      direction = "down";
      arrows.src = "./src/img/arrow_down.png";

      break;
    default:
      break;
  }
}

function snake_unshift(posx, posy) {
  if (food_collected) {
    part = { x: posx, y: posy };
    snake.unshift(part);
  }
  for (let i = snake.length - 1; i > 0; i--) {
    let lastpart = snake[i];
    let part = snake[i - 1];
    lastpart.x = part.x;
    lastpart.y = part.y;
  }
}

function gameover() {
  let otherparts = snake.slice(1);
  let kopf = snake[0];

  if (snake[0].x > raster_x || snake[0].x < 0 || snake[0].y > raster_y || snake[0].y < 0) {
    snake = [{ x: 2, y: 2 }];
    place_score();
    clearInterval(points_reduce);
    gameover_txt.style.display = "block";
    clearInterval(interval);
    direction = "right";
    place_food();
    // points = 0;
  }

  let bite = otherparts.find((part) => part.x == kopf.x && part.y == kopf.y);
  if (bite) {
    snake = [{ x: 2, y: 2 }];
    place_score();
    clearInterval(points_reduce);
    gameover_txt.style.display = "block";
    clearInterval(interval);
    direction = "right";
    place_food();
    // points = 0;
  }
}

place_food();
draw();

start.addEventListener("click", () => {
  //restart game
  place_score();
  clearInterval(points_reduce);
  gameover_txt.style.display = "block";
  clearInterval(interval);
  direction = "right";
  place_food();
  direction = "right";
  place_food();
  points = 0;
  snake = [{ x: 2, y: 2 }];
  //start game
  place_score();
  points_reduce = setInterval(function () {
    points -= 1;
  }, 1000);
  interval = setInterval(loop, 100);
  gameover_txt.style.display = "none";
});
