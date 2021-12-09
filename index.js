import Player from "./Objects/Player.js";
import Collectable from "./Objects/Collectable.js";
import RandomDispatcher, {
  randomNumberBetween,
} from "./Services/RandomDispatcher.js";

let context;
let lastTickTimestamp;
let player;
let collectables = [];
let gameObjects = [];

const CONFIG = {
  width: 800,
  height: 600,
};

const init = () => {
  let canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  canvas.setAttribute("width", CONFIG.width);
  canvas.setAttribute("height", CONFIG.height);

  let dispatcherOptions = { min: 500, max: 5000 };
  let randomDispatcher = new RandomDispatcher(() => {
    let newX = randomNumberBetween(50, CONFIG.width - 50);
    let newY = randomNumberBetween(50, CONFIG.height - 50);

    let randomCollectable = new Collectable(
      context,
      newX,
      newY,
      70,
      70,
      "./images/mouse.png",
      CONFIG
    );
    collectables.push(randomCollectable);
    gameObjects.push(randomCollectable);
  }, dispatcherOptions);

  player = new Player(context, 100, 100, 100, 100, "./images/cat.png", CONFIG);
  gameObjects.push(player);

  lastTickTimestamp = performance.now();
  gameLoop();
};

const gameLoop = () => {
  //how much time has passed since the last tick
  let timePassedSinceLastRender = performance.now() - lastTickTimestamp;
  window.timePassedSinceLastRender = timePassedSinceLastRender;

  update(timePassedSinceLastRender);
  render();

  //set lastTickTimestamp to "now"
  lastTickTimestamp = performance.now();
  //call next iteration of the game loop
  requestAnimationFrame(gameLoop);
};

const update = (timePassedSinceLastRender) => {
  //let isColliding = checkCollisionBetween(player, collectable);
  // console.log(isColliding);

  gameObjects.forEach((gameObject) => {
    gameObject.update(timePassedSinceLastRender);
  });

  collectables.forEach((collectable) => {
    let isColliding = checkCollisionBetween(player, collectable);
    collectable.isColliding = isColliding;
  });
};

const render = () => {
  //clear canvas
  context.resetTransform();
  context.clearRect(0, 0, CONFIG.width, CONFIG.height);

  gameObjects.forEach((gameObject) => {
    gameObject.render(timePassedSinceLastRender);
  });
};

window.onload = () => {
  init();
};

let checkCollisionBetween = (gameObjectA, gameObjectB) => {
  let bbA = gameObjectA.getBoundingBox();
  let bbB = gameObjectB.getBoundingBox();

  return (
    bbA.x < bbB.x + bbB.w &&
    bbA.x + bbA.w > bbB.x &&
    bbA.y < bbB.y + bbB.h &&
    bbA.y + bbA.h > bbB.y
  );
};
