class GameObject {
  constructor(context, x, y, width, height, imagePath, CONFIG) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.imagePath = imagePath;
    this.CONFIG = CONFIG;

    this.init();
  }

  init() {}

  update() {}

  render() {}

  getBoundingBox() {
    return {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      w: this.width,
      h: this.height,
    };
  }
}

export default GameObject;
