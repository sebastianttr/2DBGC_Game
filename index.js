import Player from "./Objects/Player.js";
import Collectable from "./Objects/Collectable.js";
import PointsDisplay from "./Objects/PointsDisplay.js";
import RandomDispatcher, {
  randomNumberBetween,
} from "./Services/RandomDispatcher.js";


let context;
let lastTickTimestamp;
let player;
let collectables = [];
let gameObjects = [];
let pointsDisplay;

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
      "./Assets/mouse.png",
      CONFIG
    );
    collectables.push(randomCollectable);
    gameObjects.push(randomCollectable);
  }, dispatcherOptions);

  player = new Player(context, 100, 100, 100, 100, "./Assets/cat.png", CONFIG);
  gameObjects.push(player);

  pointsDisplay = new PointsDisplay(context,  CONFIG.width/2, 25, 150, 110, CONFIG,false);
  gameObjects.push(pointsDisplay);

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
  // update all game objects
  gameObjects.forEach((gameObject) => {
    gameObject.update(timePassedSinceLastRender);
  });



  // set the collison prop for when the collision happens between player and store in removeItems array
  let removeItems = [];
  collectables.forEach((collectable,index) => {
    if(checkCollisionBetween(player, collectable)){
      removeItems[index] = collectable;
      pointsDisplay.increase();
    }
  });

  // remove all of the collected items from colletables and gameObjects arrays
  removeItems
    .forEach((removeItem,index) => {
      collectables.splice(collectables.indexOf(removeItem), 1);
      gameObjects.splice(gameObjects.indexOf(removeItem), 1);
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


window.onload = () => {
  init();
};
