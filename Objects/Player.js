import GameObject from "./GameObject.js";

class Player extends GameObject {
  constructor(context, x, y, width, height, imgPath, CONFIG) {
    super(context, x, y, width, height, imgPath, CONFIG);

    this.dx = 0;
    this.dy = 0;
    this.currentKeys = {};
    this.velocityMultiplier = 1;
    this.velocity = 0.5;
    this.lastDirection = 1;
    this.state = "idle";
  }

  init() {
    /**
     * Keys we are looking for to move an object:
     * ArrowUp, ArrowDown, ArrowLeft, ArrowRight
     */
    document.onkeydown = (event) => {
      if (event.code.startsWith("Arrow") || event.code === "Space") {
        event.preventDefault();
      }
      this.currentKeys[event.code] = true;
    };

    document.onkeyup = (event) => {
      this.currentKeys[event.code] = false;
    };

    this.sprites = {
      run: {
        src: "./Assets/run-sprite.png",
        frames: 8,
        fps: 20,
        frameSize: {
          width: 400,
          height: 400,
        },
        image: null,
      },
      idle: {
        src: "./Assets/idle-sprite.png",
        frames: 10,
        fps: 20,
        frameSize: {
          width: 400,
          height: 400,
        },
        image: null,
      },
    };

    Object.values(this.sprites).forEach((sprite) => {
      sprite.image = new Image();
      sprite.image.src = sprite.src;
    });
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

    //set the correct speed based on the space key being pressed
    this.velocityMultiplier = this.currentKeys["Space"] ? 1.5 : 1;

    // account for the velocity change in diagonal direction
    if (this.dx !== 0 && this.dy !== 0) {
      this.dx /= Math.hypot(this.dx, this.dy);
      this.dy /= Math.hypot(this.dx, this.dy);
    }

    //calculate new position
    this.x +=
      timePassedSinceLastRender *
      this.dx *
      (this.velocity * this.velocityMultiplier);
    this.y +=
      timePassedSinceLastRender *
      this.dy *
      (this.velocity * this.velocityMultiplier);

    // set the current state for the sprites
    this.state = this.dx === 0 && this.dy === 0 ? "idle" : "run";

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
    //call the render() of GameObject.js
    super.render();

    //move canvas origin to x,0
    this.context.translate(this.x, this.y);

    //mirroring
    this.context.scale(this.lastDirection, 1);

    // get the correct sprite
    let coords = this.getImageSpriteCoordinate(this.sprites[this.state]);

    //draw filled retangle
    this.context.drawImage(
      this.sprites[this.state].image, // image
      coords.sourceX, // source x
      coords.sourceY, // soruce y
      coords.sourceWidth, // source width
      coords.sourceHeight, // source height
      -this.width / 2, // destination x
      -this.height / 2, // destination y
      this.width, // destination width
      this.height // destination height
    );

    //reset the transform
    this.context.resetTransform();
  }

  getImageSpriteCoordinate(sprite) {
    let frameX = Math.floor(
      ((performance.now() / 1000) * sprite.fps) % sprite.frames
    );

    let coords = {
      sourceX: frameX * sprite.frameSize.width, // TODO
      sourceY: 0,
      sourceWidth: sprite.frameSize.width,
      sourceHeight: sprite.frameSize.height,
    };

    return coords;
  }
  getBoundingBox() {
    let bb = super.getBoundingBox();

    //change bounding box
    // width: 20% | 60% | 20% = 100%
    bb.w = bb.w * 0.6;
    bb.x = bb.x + this.width * 0.2;

    // height: 10% | 80% | 10% = 100%
    bb.h = bb.h * 0.86;
    bb.y = bb.y + this.height * 0.1;

    return bb;
  }
}

export default Player;
