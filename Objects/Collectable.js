import GameObject from "./GameObject.js";

class Collectable extends GameObject {
  #objectImg;

  constructor(context, x, y, width, height, imgPath, CONFIG) {
    super(context, x, y, width, height, imgPath, CONFIG);
  }

  init() {
    this.objectImg = new Image();
    this.objectImg.src = this.imagePath;
  }

  update(timePassedSinceLastRender) {
    // nothing at the moment
  }

  render() {
    //move the image to the desired position
    this.context.translate(this.x, this.y);

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
}

export default Collectable;
