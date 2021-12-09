import GameObject from "./GameObject.js";

class Player extends GameObject {
  constructor(context, x, y, width, height, imgPath, CONFIG) {
    super(context, x, y, width, height, imgPath, CONFIG);

    this.dx = 0;
    this.dy = 0;
    this.currentKeys = {};
    this.velocity = 0.5;
    this.lastDirection = 1;
  }

  init() {
    /**
     * Keys we are looking for to move an object:
     * ArrowUp, ArrowDown, ArrowLeft, ArrowRight
     */
    document.onkeydown = (event) => {
      this.currentKeys[event.code] = true;
    };

    document.onkeyup = (event) => {
      this.currentKeys[event.code] = false;
    };

    this.playerImg = new Image();
    this.playerImg.src = "./images/cat.png";
  }

  update(timePassedSinceLastRender) {
    // set the value of dx (along the x axis)
    if (this.currentKeys["ArrowRight"]) this.dx = 1;
    else if (this.currentKeys["ArrowLeft"]) this.dx = -1;
    else this.dx = 0;

    // set the value of dy (along the y axis)
    if (this.currentKeys["ArrowDown"]) this.dy = 1;
    else if (this.currentKeys["ArrowUp"]) this.dy = -1;
    else this.dy = 0;

    //store the last direction the player moved in
    if (this.dx != 0) this.lastDirection = this.dx;

    //calculate new position
    this.x += timePassedSinceLastRender * this.dx * this.velocity;
    this.y += timePassedSinceLastRender * this.dy * this.velocity;

    //set the boundries
    this.#processBoundaries();
  }

  #processBoundaries() {
    //boundaries
    if (this.x < this.width / 2) this.x = this.width / 2;
    if (this.x > this.CONFIG.width - this.width / 2)
      this.x = this.CONFIG.width - this.width / 2;

    if (this.y < this.height / 2) this.y = this.height / 2;
    if (this.y > this.CONFIG.height - this.height / 2)
      this.y = this.CONFIG.height - this.height / 2;
  }

  render() {
    //move canvas origin to x,0
    this.context.translate(this.x, this.y);

    //mirroring
    this.context.scale(this.lastDirection, 1);

    //draw filled retangle
    this.context.drawImage(
      this.playerImg,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    //reset the transform
    this.context.resetTransform();
  }
}

export default Player;
