import Field from "./Field.js";

export default class Snake extends Field {
  constructor(startX, startY, fieldElement, CELLS_QUANTITY) {
    super(fieldElement, CELLS_QUANTITY);
    this.startX = startX;
    this.startY = startY;
    this.fieldElement = fieldElement;
  }

  #snakeArray = [];
  #steps;
  #direction;

  create(x, y) {
    this.onePart = document.createElement("div");
    this.onePart.classList.add("snake-part");
    this.onePart.style.width = `${this.cellLength}px`;
    this.onePart.style.height = `${this.cellLength}px`;
    this.onePart.style.top = `${y * this.cellLength}px`;
    this.onePart.style.left = `${x * this.cellLength}px`;

    this.#snakeArray.push({ element: this.onePart, x: x, y: y });
    this.fieldElement.append(this.onePart);
  }

  move(SNAKE_SPEED, direction) {
    let intervalTime = SNAKE_SPEED;
    this.#direction = direction;
    clearInterval(this.#steps);

    this.#steps = setInterval(() => {
      const nextElement = this.#snakeArray[0].element.cloneNode(true);

      switch (direction) {
        case 37:
          this.startX = this.startX - 1;
          if (this.startX < 0) alert("Game Over");
          nextElement.style.left = `${this.startX * this.cellLength}px`;
          break;
        case 38:
          this.startY = this.startY - 1;
          if (this.startY < 0) alert("Game Over");
          nextElement.style.top = `${this.startY * this.cellLength}px`;
          break;
        case 39:
          this.startX = this.startX + 1;
          if (this.startX > this.CELLS_QUANTITY - 1) alert("Game Over");
          nextElement.style.left = `${this.startX * this.cellLength}px`;
          break;
        case 40:
          this.startY = this.startY + 1;
          if (this.startY > this.CELLS_QUANTITY - 1) alert("Game Over");
          nextElement.style.top = `${this.startY * this.cellLength}px`;
          break;
      }

      this.#snakeArray.unshift({
        element: nextElement,
        x: this.startX,
        y: this.startY
      });

      this.fieldElement.append(nextElement);

      this.#gameOverCheck();
      this.check();
      const elementToDelete = this.#snakeArray.pop();
      elementToDelete.element.remove();
    }, intervalTime);
  }

  //TODO: FOOD

  spawn() {
    [this.foodX, this.foodY] = this.#getFoodCoords(this.initializate());
    this.#createFoodElement();
  }

  check() {
    if (this.foodX === this.startX && this.foodY === this.startY) {
      this.#addBlockElement();
      this.#changeFoodPosition();
    }
  }

  #getFoodCoords([foodX, foodY]) {
    for (let i = 0; i < this.#snakeArray.length; i++) {
      if (this.#snakeArray[i].x === foodX && this.#snakeArray[i].y === foodY) {
        return this.#getFoodCoords(this.initializate());
      }
    }
    return [foodX, foodY];
  }

  #addBlockElement() {
    const x = this.#snakeArray[this.#snakeArray.length - 1].x;
    const y = this.#snakeArray[this.#snakeArray.length - 1].y;
    this.create(x, y);
  }

  #changeFoodPosition() {
    this.fieldElement.querySelector(".food-part").remove();
    this.spawn();
  }

  #createFoodElement() {
    this.foodPart = document.createElement("div");
    this.foodPart.classList.add("food-part");
    this.foodPart.style.width = `${this.cellLength}px`;
    this.foodPart.style.height = `${this.cellLength}px`;
    this.foodPart.style.left = `${this.foodX * this.cellLength}px`;
    this.foodPart.style.top = `${this.foodY * this.cellLength}px`;
    this.fieldElement.append(this.foodPart);
  }

  #gameOverCheck() {
    for (let i = 1; i < this.#snakeArray.length; i++) {
      if (
        this.#snakeArray[i].x === this.startX &&
        this.#snakeArray[i].y === this.startY
      ) {
        alert("Game Over");
      }
    }
  }
}
