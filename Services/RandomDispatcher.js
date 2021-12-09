let randomNumberBetween = (minRandomNumber, maxRandomNumber) => {
  return Math.floor(
    Math.random() * (maxRandomNumber - minRandomNumber + 1) + minRandomNumber
  );
};

class RandomDispatcher {
  constructor(callback, options = { min: 1000, max: 5000 }) {
    //throw an error if callback is not a function
    if (typeof callback !== "function")
      throw Error("Callback must be a function!");

    this.callback = callback;
    this.options = options;

    // kick off the first iteration
    this.loop();
  }

  loop() {
    // get a random number between the min and the max of the options prop
    const timeoutVal = randomNumberBetween(this.options.min, this.options.max);

    //clear previous timeout
    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.callback();
      this.loop();
    }, timeoutVal);
  }
}

export default RandomDispatcher;

export { randomNumberBetween };
