import GameObject from "./GameObject.js";

class Collectable extends GameObject {
  #objectImg;

  constructor(context, x, y, width, height, imgPath, CONFIG) {
    super(context, x, y, width, height, imgPath, CONFIG);
    this.age = 0;
    this.creationTime = performance.now();
    this.maxAge = 5; //seconds
    this.removeCallback = null;
  }

  init() {
    this.objectImg = new Image();
    this.objectImg.src = this.imagePath;
  }

  update(timePassedSinceLastRender) {
    // calculate new age
    this.age = (performance.now() - this.creationTime) / 1000;
    if (this.age >= this.maxAge && typeof this.removeCallback === "function") {
      // reached maximum age -> remove this collectible
      this.removeCallback();
    }
  }

  render() {
    //call the render() of GameObject.js
    super.render();

    //move the image to the desired position
    this.context.translate(this.x, this.y);

    let percentageAge = 1 - this.age / this.maxAge;
    this.context.fillStyle = "rebeccapurple";

    this.context.beginPath();
    this.context.ellipse(
      (-this.width / 2) * -0.33,
      (-this.height / 2) * -0.15,
      this.width * percentageAge * 0.7,
      this.height * percentageAge * 0.7,
      0,
      0,
      2 * Math.PI
    );
    this.context.fill();
    //this.context.fillRect(-this.width/2, -this.height/2, this.width * percentageAge,15);

    //draw the image
    this.context.drawImage(
      this.objectImg,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    if (this.isColliding) {
      this.context.strokeRect(
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
    }

    //reset the transforms
    this.context.resetTransform();
  }

  onRemove(cb) {
    this.removeCallback = cb;
  }
}

export default Collectable;
